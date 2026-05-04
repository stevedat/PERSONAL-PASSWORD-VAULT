import { account, databases, APPWRITE_DATABASE_ID, APPWRITE_COLLECTION_ID, APPWRITE_PROJECT_ID } from './appwrite';
import { StorageEngine } from './storage';
import { CryptoEngine } from './crypto.client';
import { RestoreManager } from './restore';
import type { VaultItem, EncryptedVault } from './types';
import { ID, AppwriteException } from 'appwrite';

export interface SyncStatus {
  lastSync: number | null;
  status: 'idle' | 'syncing' | 'error' | 'offline' | 'conflict';
  error?: string;
}

export interface CloudVaultDocument {
  $id?: string;
  userId: string;
  data: string;
  iv: string;
  salt: string;
  version: number;
  device_id: string;
  sync_timestamp: number;
}

export class SyncEngine {
  private static deviceId = this.getOrCreateDeviceId();

  private static getOrCreateDeviceId(): string {
    if (typeof window === 'undefined') return 'server';
    let id = localStorage.getItem('pv_device_id');
    if (!id) {
      id = 'device_' + crypto.randomUUID().split('-')[0];
      localStorage.setItem('pv_device_id', id);
    }
    return id;
  }

  /**
   * Check if user is logged in
   */
  static async isAuthenticated(): Promise<boolean> {
    // If the project ID is the default placeholder, don't even try to connect
    if (APPWRITE_PROJECT_ID === 'pocketvault-project-id') {
      return false;
    }

    // Fast path to prevent 401 console errors if we know we're not logged in
    if (typeof window !== 'undefined' && !localStorage.getItem('pv_cloud_sync_enabled')) {
      return false;
    }

    try {
      await account.get();
      if (typeof window !== 'undefined') {
        localStorage.setItem('pv_cloud_sync_enabled', 'true');
      }
      return true;
    } catch (e) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('pv_cloud_sync_enabled');
      }
      return false;
    }
  }

  /**
   * Push local vault to Cloud
   */
  static async pushVault(items: VaultItem[], masterPassword: string): Promise<void> {
    try {
      if (!await this.isAuthenticated()) return;

      const user = await account.get();
      
      // Encrypt for cloud (same format as backup)
      const encryptedVault = await CryptoEngine.encrypt(items, masterPassword);
      
      const payload = {
        userId: user.$id,
        data: this.arrayBufferToBase64(encryptedVault.data),
        iv: this.arrayBufferToBase64(encryptedVault.iv),
        salt: this.arrayBufferToBase64(encryptedVault.salt),
        version: encryptedVault.version || 2,
        device_id: this.deviceId,
        sync_timestamp: Date.now()
      };

      try {
        // Try to update existing document (Document ID is userId)
        await databases.updateDocument(
          APPWRITE_DATABASE_ID,
          APPWRITE_COLLECTION_ID,
          user.$id,
          payload
        );
      } catch (error) {
        if (error instanceof AppwriteException && error.code === 404) {
          // Create new if doesn't exist
          await databases.createDocument(
            APPWRITE_DATABASE_ID,
            APPWRITE_COLLECTION_ID,
            user.$id,
            payload
          );
        } else {
          throw error;
        }
      }

      this.updateLastSync(Date.now());
    } catch (error) {
      console.error('[SyncEngine] Push failed:', error);
      throw error;
    }
  }

  /**
   * Pull and merge vault from Cloud
   */
  static async pullAndMerge(masterPassword: string): Promise<VaultItem[]> {
    try {
      if (!await this.isAuthenticated()) {
         throw new Error("Người dùng chưa đăng nhập đồng bộ đám mây");
      }

      const user = await account.get();
      let doc: CloudVaultDocument;

      try {
        doc = await databases.getDocument(
          APPWRITE_DATABASE_ID,
          APPWRITE_COLLECTION_ID,
          user.$id
        ) as unknown as CloudVaultDocument;
      } catch (error) {
        if (error instanceof AppwriteException && error.code === 404) {
          // No cloud vault exists yet. Push local vault to cloud to initialize it.
          const localItems = await StorageEngine.loadVault(masterPassword);
          if (localItems.length > 0) {
            await this.pushVault(localItems, masterPassword);
          }
          return localItems;
        }
        throw error;
      }

      // If we pushed this recently ourselves, no need to merge
      const lastSync = this.getLastSync();
      if (doc.device_id === this.deviceId && lastSync && doc.sync_timestamp <= lastSync) {
         return await StorageEngine.loadVault(masterPassword);
      }

      // Decrypt Cloud Vault
      const encryptedVault: EncryptedVault = {
        data: this.base64ToArrayBuffer(doc.data),
        iv: this.base64ToArrayBuffer(doc.iv),
        salt: this.base64ToArrayBuffer(doc.salt),
        version: doc.version
      };

      const cloudItems = await CryptoEngine.decrypt(encryptedVault, masterPassword);
      
      // Load Local Vault
      let localItems: VaultItem[] = [];
      try {
        localItems = await StorageEngine.loadVault(masterPassword);
      } catch (e) {
        // Local vault might be empty or missing
      }

      // Merge Cloud into Local
      const preview = RestoreManager.previewMerge(cloudItems, localItems);
      const mergedItems = RestoreManager.applyMerge(preview);

      // Save Merged Vault Locally (This automatically triggers a background pushVault)
      await StorageEngine.saveVault(mergedItems, masterPassword);

      this.updateLastSync(Date.now());

      return mergedItems;
    } catch (error) {
      console.error('[SyncEngine] Pull failed:', error);
      throw error;
    }
  }

  // --- Utils ---

  private static updateLastSync(timestamp: number) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('pv_last_sync', timestamp.toString());
    }
  }

  public static getLastSync(): number | null {
    if (typeof window === 'undefined') return null;
    const ts = localStorage.getItem('pv_last_sync');
    return ts ? parseInt(ts, 10) : null;
  }

  private static arrayBufferToBase64(buffer: ArrayBuffer): string {
    const bytes = new Uint8Array(buffer);
    let binary = "";
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  private static base64ToArrayBuffer(base64: string): ArrayBuffer {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes.buffer;
  }
}
