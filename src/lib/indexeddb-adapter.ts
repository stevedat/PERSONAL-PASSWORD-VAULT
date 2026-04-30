import type { IStorageAdapter } from "./storage";
import type { VaultItem, EncryptedVault } from "./types";
import { CryptoEngine } from "./crypto.client";

const DB_NAME = "PocketVaultDB";
const DB_VERSION = 1;
const STORE_NAME = "vault";

export class IndexedDBAdapter implements IStorageAdapter {
  private db: IDBDatabase | null = null;

  async init(): Promise<void> {
    if (typeof window === "undefined") {
      throw new Error("Ứng dụng chỉ hoạt động trên trình duyệt");
    }

    if (this.db) return;

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      };
    });
  }

  async saveVault(items: VaultItem[], masterPassword: string): Promise<void> {
    if (!this.db) await this.init();

    const startTime = Date.now();

    const timeout = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Save timeout after 10 seconds")), 10000)
    );

    const saveOperation = (async () => {
      const encryptedVault = await CryptoEngine.encrypt(items, masterPassword);

      const storageData = {
        data: encryptedVault.data,
        iv: encryptedVault.iv,
        salt: encryptedVault.salt,
        version: encryptedVault.version,
        timestamp: Date.now(),
      };

      return new Promise<void>((resolve, reject) => {
        const transaction = this.db!.transaction([STORE_NAME], "readwrite");
        const store = transaction.objectStore(STORE_NAME);
        const request = store.put(storageData, "vault");

        transaction.oncomplete = () => resolve();
        transaction.onerror = () => reject(transaction.error || new Error("Transaction failed"));
        transaction.onabort = () => reject(new Error("Transaction aborted"));
        
        request.onsuccess = () => {};
        request.onerror = () => reject(request.error || new Error("Put request failed"));
      });
    })();

    try {
      await Promise.race([saveOperation, timeout]);
    } catch (error) {
      console.error("[Storage] Save failed:", error);
      throw error;
    }
  }

  async loadVault(masterPassword: string): Promise<VaultItem[]> {
    if (!this.db) await this.init();

    const timeout = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Load timeout after 10 seconds")), 10000)
    );

    const loadOperation = (async () => {
      return new Promise<VaultItem[]>((resolve, reject) => {
        const transaction = this.db!.transaction([STORE_NAME], "readonly");
        const store = transaction.objectStore(STORE_NAME);
        const request = store.get("vault");

        transaction.onerror = () => reject(transaction.error);
        request.onerror = () => reject(request.error);

        request.onsuccess = async () => {
          if (!request.result) {
            resolve([]);
            return;
          }

          try {
            const data = typeof request.result.data === "string" ? this.base64ToArrayBuffer(request.result.data) : request.result.data;
            const iv = typeof request.result.iv === "string" ? this.base64ToArrayBuffer(request.result.iv) : request.result.iv;
            const salt = typeof request.result.salt === "string" ? this.base64ToArrayBuffer(request.result.salt) : request.result.salt;

            const encryptedVault: EncryptedVault = { 
              data, 
              iv, 
              salt,
              version: request.result.version 
            };

            const items = await CryptoEngine.decrypt(encryptedVault, masterPassword);
            resolve(items);
          } catch (error) {
            console.error("[Storage] Decrypt error:", error);
            reject(error);
          }
        };
      });
    })();

    try {
      return await Promise.race([loadOperation, timeout]);
    } catch (error) {
      console.error("[Storage] Load failed:", error);
      throw error;
    }
  }

  async hasVault(): Promise<boolean> {
    if (typeof window === "undefined") return false;
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], "readonly");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get("vault");

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(!!request.result);
    });
  }

  private base64ToArrayBuffer(base64: string): ArrayBuffer {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes.buffer;
  }
}
