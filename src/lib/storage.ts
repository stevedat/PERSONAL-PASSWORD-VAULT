import type { EncryptedVault, VaultItem } from './crypto';
import { CryptoEngine } from './crypto';

const DB_NAME = 'PocketVaultDB';
const DB_VERSION = 1;
const STORE_NAME = 'vault';

export class StorageEngine {
  private static db: IDBDatabase | null = null;
  
  private static async openDB(): Promise<IDBDatabase> {
    if (typeof window === 'undefined') {
      throw new Error('Ứng dụng chỉ hoạt động trên trình duyệt');
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
    console.log('[Storage] Save started, items:', items.length);
    const startTime = Date.now();
    
    // Add timeout to prevent hanging
    const timeout = new Promise<never>((_, reject) => 
      setTimeout(() => reject(new Error('Save timeout after 10 seconds')), 10000)
    );
    
    const saveOperation = (async () => {
      const db = await this.openDB();
      const encryptedVault = await CryptoEngine.encrypt(items, masterPassword);
      
      // Convert ArrayBuffers to base64 for storage
      const storageData = {
        data: this.arrayBufferToBase64(encryptedVault.data),
        iv: this.arrayBufferToBase64(encryptedVault.iv),
        salt: this.arrayBufferToBase64(encryptedVault.salt),
        timestamp: Date.now() // Add timestamp for debugging
      };
      
      return new Promise<void>((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.put(storageData, 'vault');
        
        // Handle transaction completion
        transaction.oncomplete = () => {
          console.log('[Storage] Save completed in', Date.now() - startTime, 'ms');
          resolve();
        };
        
        transaction.onerror = () => {
          console.error('[Storage] Transaction error:', transaction.error);
          reject(transaction.error || new Error('Transaction failed'));
        };
        
        transaction.onabort = () => {
          console.error('[Storage] Transaction aborted');
          reject(new Error('Transaction aborted'));
        };
        
        request.onsuccess = () => {
          // Request succeeded, wait for transaction to complete
        };
        
        request.onerror = () => {
          console.error('[Storage] Request error:', request.error);
          reject(request.error || new Error('Put request failed'));
        };
      });
    })();
    
    try {
      await Promise.race([saveOperation, timeout]);
    } catch (error) {
      console.error('[Storage] Save failed:', error);
      throw error;
    }
  }
  
  static async loadVault(masterPassword: string): Promise<VaultItem[]> {
    console.log('[Storage] Load started');
    const startTime = Date.now();
    
    // Add timeout to prevent hanging
    const timeout = new Promise<never>((_, reject) => 
      setTimeout(() => reject(new Error('Load timeout after 10 seconds')), 10000)
    );
    
    const loadOperation = (async () => {
      const db = await this.openDB();
      
      return new Promise<VaultItem[]>((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.get('vault');
        
        transaction.onerror = () => {
          console.error('[Storage] Transaction error:', transaction.error);
          reject(transaction.error);
        };
        
        request.onerror = () => {
          console.error('[Storage] Request error:', request.error);
          reject(request.error);
        };
        
        request.onsuccess = async () => {
          if (!request.result) {
            console.log('[Storage] No vault found');
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
            console.log('[Storage] Load completed in', Date.now() - startTime, 'ms, items:', items.length);
            resolve(items);
          } catch (error) {
            console.error('[Storage] Decrypt error:', error);
            reject(error);
          }
        };
      });
    })();
    
    try {
      return await Promise.race([loadOperation, timeout]);
    } catch (error) {
      console.error('[Storage] Load failed:', error);
      throw error;
    }
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