import type { VaultItem, EncryptedVault } from './crypto';
import { CryptoEngine } from './crypto';

export interface AutoBackup {
  id: string;
  timestamp: number;
  itemCount: number;
  size: number;
}

export interface AutoBackupConfig {
  enabled: boolean;
  maxBackups: number;
  autoRotate: boolean;
}

export interface AutoBackupEntry {
  id: string;
  timestamp: number;
  vault: {
    data: string;
    iv: string;
    salt: string;
  };
  itemCount: number;
  size: number;
}

export class AutoBackupService {
  private static readonly DB_NAME = 'PocketVaultDB';
  private static readonly STORE_NAME = 'auto-backups';
  private static readonly CONFIG_KEY = 'pv_autobackup_config';
  private static readonly DEFAULT_MAX_BACKUPS = 3;
  
  private static db: IDBDatabase | null = null;
  
  /**
   * Initialize auto-backup database
   */
  private static async openDB(): Promise<IDBDatabase> {
    if (typeof window === 'undefined') {
      throw new Error('IndexedDB not available on server');
    }
    
    if (this.db) return this.db;
    
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.DB_NAME, 2);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve(request.result);
      };
      
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        // Create auto-backups store if it doesn't exist
        if (!db.objectStoreNames.contains(this.STORE_NAME)) {
          const store = db.createObjectStore(this.STORE_NAME, { keyPath: 'id' });
          store.createIndex('timestamp', 'timestamp', { unique: false });
        }
      };
    });
  }
  
  /**
   * Create auto-backup with better error handling
   */
  static async createBackup(items: VaultItem[], masterPassword: string): Promise<void> {
    const config = this.getConfig();
    if (!config.enabled) {
      if (import.meta.env.DEV) console.log('[AutoBackup] Auto-backup disabled, skipping');
      return;
    }
    
    if (import.meta.env.DEV) console.log('[AutoBackup] Creating backup for', items.length, 'items');
    
    try {
      // Add timeout to prevent hanging
      const timeoutPromise = new Promise<never>((_, reject) => 
        setTimeout(() => reject(new Error('Auto-backup timeout after 10 seconds')), 10000)
      );
      
      const backupPromise = this.performBackup(items, masterPassword, config);
      
      await Promise.race([backupPromise, timeoutPromise]);
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('[AutoBackup] Backup creation failed:', errorMessage);
      
      // Don't throw - auto-backup failure should not break the main operation
      // Just log the error and continue
    }
  }
  
  /**
   * Perform the actual backup operation
   */
  private static async performBackup(items: VaultItem[], masterPassword: string, config: AutoBackupConfig): Promise<void> {
    const db = await this.openDB();
    
    // Encrypt vault
    const encryptedVault = await CryptoEngine.encrypt(items, masterPassword);
    
    // Convert to base64 for storage
    const vault = {
      data: this.arrayBufferToBase64(encryptedVault.data),
      iv: this.arrayBufferToBase64(encryptedVault.iv),
      salt: this.arrayBufferToBase64(encryptedVault.salt)
    };
    
    // Create backup entry
    const backup: AutoBackupEntry = {
      id: this.generateId(),
      timestamp: Date.now(),
      vault,
      itemCount: items.length,
      size: JSON.stringify(vault).length
    };
    
    if (import.meta.env.DEV) {
      console.log('[AutoBackup] Backup created:', {
        id: backup.id,
        itemCount: backup.itemCount,
        size: backup.size,
        sizeKB: (backup.size / 1024).toFixed(2) + 'KB'
      });
    }
    
    // Save backup with enhanced error handling
    await new Promise<void>((resolve, reject) => {
      try {
        const tx = db.transaction([this.STORE_NAME], 'readwrite');
        const store = tx.objectStore(this.STORE_NAME);
        
        // Set up all event handlers before making the request
        tx.oncomplete = () => {
          if (import.meta.env.DEV) console.log('[AutoBackup] Transaction completed successfully');
          resolve();
        };
        
        tx.onerror = (event) => {
          console.error('[AutoBackup] Transaction failed:', tx.error || event);
          reject(tx.error || new Error('Transaction failed'));
        };
        
        tx.onabort = (event) => {
          console.error('[AutoBackup] Transaction aborted:', event);
          reject(new Error('Transaction aborted'));
        };
        
        const request = store.put(backup);
        
        request.onsuccess = () => {
          if (import.meta.env.DEV) console.log('[AutoBackup] Put operation successful');
          // Don't resolve here - wait for transaction to complete
        };
        
        request.onerror = (event) => {
          console.error('[AutoBackup] Put operation failed:', request.error || event);
          reject(request.error || new Error('Put operation failed'));
        };
        
      } catch (syncError) {
        console.error('[AutoBackup] Synchronous error in transaction setup:', syncError);
        reject(syncError);
      }
    });
    
    if (import.meta.env.DEV) console.log('[AutoBackup] Backup saved to IndexedDB');
    
    // Rotate if needed
    if (config.autoRotate) {
      await this.rotateBackups();
    }
  }
  
  /**
   * List all auto-backups
   */
  static async listBackups(): Promise<AutoBackup[]> {
    try {
      const db = await this.openDB();
      
      return new Promise((resolve, reject) => {
        const tx = db.transaction([this.STORE_NAME], 'readonly');
        const store = tx.objectStore(this.STORE_NAME);
        const index = store.index('timestamp');
        const request = index.openCursor(null, 'prev'); // Newest first
        
        const backups: AutoBackup[] = [];
        
        request.onsuccess = () => {
          const cursor = request.result;
          if (cursor) {
            const entry: AutoBackupEntry = cursor.value;
            backups.push({
              id: entry.id,
              timestamp: entry.timestamp,
              itemCount: entry.itemCount,
              size: entry.size
            });
            cursor.continue();
          } else {
            resolve(backups);
          }
        };
        
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error('Failed to list backups:', error);
      return [];
    }
  }
  
  /**
   * Restore from auto-backup
   */
  static async restoreBackup(id: string, masterPassword: string): Promise<VaultItem[]> {
    try {
      const db = await this.openDB();
      
      return new Promise((resolve, reject) => {
        const tx = db.transaction([this.STORE_NAME], 'readonly');
        const store = tx.objectStore(this.STORE_NAME);
        const request = store.get(id);
        
        request.onsuccess = async () => {
          if (!request.result) {
            reject(new Error('Backup not found'));
            return;
          }
          
          try {
            const entry: AutoBackupEntry = request.result;
            
            // Convert back to ArrayBuffers
            const encryptedVault: EncryptedVault = {
              data: this.base64ToArrayBuffer(entry.vault.data),
              iv: this.base64ToArrayBuffer(entry.vault.iv),
              salt: this.base64ToArrayBuffer(entry.vault.salt)
            };
            
            // Decrypt
            const items = await CryptoEngine.decrypt(encryptedVault, masterPassword);
            resolve(items);
          } catch (error) {
            reject(error);
          }
        };
        
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Restore failed: ${errorMessage}`);
    }
  }
  
  /**
   * Delete specific backup
   */
  static async deleteBackup(id: string): Promise<void> {
    try {
      const db = await this.openDB();
      
      return new Promise((resolve, reject) => {
        const tx = db.transaction([this.STORE_NAME], 'readwrite');
        const store = tx.objectStore(this.STORE_NAME);
        const request = store.delete(id);
        
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error('Failed to delete backup:', error);
    }
  }
  
  /**
   * Rotate backups (keep only last N)
   */
  static async rotateBackups(): Promise<void> {
    const config = this.getConfig();
    const backups = await this.listBackups();
    
    if (import.meta.env.DEV) {
      console.log('[AutoBackup] Rotating backups:', {
        current: backups.length,
        max: config.maxBackups
      });
    }
    
    // Delete oldest backups if we exceed max
    if (backups.length > config.maxBackups) {
      const toDelete = backups.slice(config.maxBackups);
      if (import.meta.env.DEV) console.log('[AutoBackup] Deleting', toDelete.length, 'old backups');
      
      for (const backup of toDelete) {
        await this.deleteBackup(backup.id);
      }
      
      if (import.meta.env.DEV) console.log('[AutoBackup] Rotation complete');
    } else {
      if (import.meta.env.DEV) console.log('[AutoBackup] No rotation needed');
    }
  }
  
  /**
   * Get configuration
   */
  static getConfig(): AutoBackupConfig {
    if (typeof window === 'undefined') {
      return this.getDefaultConfig();
    }
    
    try {
      const stored = localStorage.getItem(this.CONFIG_KEY);
      if (!stored) {
        return this.getDefaultConfig();
      }
      
      return { ...this.getDefaultConfig(), ...JSON.parse(stored) };
    } catch {
      return this.getDefaultConfig();
    }
  }
  
  /**
   * Update configuration
   */
  static updateConfig(config: Partial<AutoBackupConfig>): void {
    if (typeof window === 'undefined') return;
    
    const current = this.getConfig();
    const updated = { ...current, ...config };
    
    try {
      localStorage.setItem(this.CONFIG_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error('Failed to save auto-backup config:', error);
    }
  }
  
  /**
   * Get default configuration
   */
  private static getDefaultConfig(): AutoBackupConfig {
    return {
      enabled: true, // Enable by default as requested
      maxBackups: this.DEFAULT_MAX_BACKUPS,
      autoRotate: true
    };
  }
  
  /**
   * Generate unique ID
   */
  private static generateId(): string {
    return `backup_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
  
  /**
   * Convert ArrayBuffer to base64
   */
  private static arrayBufferToBase64(buffer: ArrayBuffer): string {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }
  
  /**
   * Convert base64 to ArrayBuffer
   */
  private static base64ToArrayBuffer(base64: string): ArrayBuffer {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes.buffer;
  }
}
