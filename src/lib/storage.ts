import type { EncryptedVault, VaultItem } from './crypto';
import { CryptoEngine } from './crypto';

const DB_NAME = 'PocketVaultDB';
const DB_VERSION = 1;
const STORE_NAME = 'vault';

export class StorageEngine {
  private static db: IDBDatabase | null = null;
  
  private static async openDB(): Promise<IDBDatabase> {
    if (typeof window === 'undefined') {
      throw new Error('IndexedDB not available on server');
    }
    
    if (this.db) return this.db;
    
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve(request.result);
      };
      
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      };
    });
  }
  
  static async saveVault(items: VaultItem[], masterPassword: string): Promise<void> {
    const db = await this.openDB();
    const encryptedVault = await CryptoEngine.encrypt(items, masterPassword);
    
    // Convert ArrayBuffers to base64 for storage
    const storageData = {
      data: this.arrayBufferToBase64(encryptedVault.data),
      iv: this.arrayBufferToBase64(encryptedVault.iv),
      salt: this.arrayBufferToBase64(encryptedVault.salt)
    };
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put(storageData, 'vault');
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }
  
  static async loadVault(masterPassword: string): Promise<VaultItem[]> {
    const db = await this.openDB();
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get('vault');
      
      request.onerror = () => reject(request.error);
      request.onsuccess = async () => {
        if (!request.result) {
          resolve([]);
          return;
        }
        
        try {
          // Convert base64 back to ArrayBuffers
          const encryptedVault: EncryptedVault = {
            data: this.base64ToArrayBuffer(request.result.data),
            iv: this.base64ToArrayBuffer(request.result.iv),
            salt: this.base64ToArrayBuffer(request.result.salt)
          };
          
          const items = await CryptoEngine.decrypt(encryptedVault, masterPassword);
          resolve(items);
        } catch (error) {
          reject(error);
        }
      };
    });
  }
  
  static async hasVault(): Promise<boolean> {
    if (typeof window === 'undefined') return false;
    
    const db = await this.openDB();
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get('vault');
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(!!request.result);
    });
  }
  
  static async exportVault(masterPassword: string): Promise<Blob> {
    const items = await this.loadVault(masterPassword);
    const { BackupManager } = await import('./backup');
    return BackupManager.quickExport(items, masterPassword);
  }
  
  static async importVault(file: File, masterPassword: string): Promise<VaultItem[]> {
    const { RestoreManager } = await import('./restore');
    const result = await RestoreManager.importVault(file, masterPassword, []);
    return result.items;
  }
  
  private static arrayBufferToBase64(buffer: ArrayBuffer): string {
    const bytes = new Uint8Array(buffer);
    let binary = '';
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