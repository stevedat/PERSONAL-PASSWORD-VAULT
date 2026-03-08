
import type { EncryptedVault, VaultItem } from './types';
import { CryptoEngine } from './crypto.client';

const DB_NAME = 'PocketVaultDB';
const DB_VERSION = 1;
const STORE_NAME = 'vault';

export class StorageEngine {
  private static db: IDBDatabase | null = null;

  private static async openDB(): Promise<IDBDatabase> {
    if (typeof window === 'undefined') {
      throw new Error('IndexedDB can only be used in the browser');
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

    return new Promise<void>((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put(encryptedVault, 'vault');

      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
  }

  static async loadVault(masterPassword: string): Promise<VaultItem[]> {
    const db = await this.openDB();

    return new Promise<VaultItem[]>((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get('vault');

      transaction.onerror = () => reject(transaction.error);

      request.onsuccess = async () => {
        if (request.result) {
          try {
            const items = await CryptoEngine.decrypt(request.result, masterPassword);
            resolve(items);
          } catch (error) {
            reject(error);
          }
        } else {
          resolve([]);
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
}
