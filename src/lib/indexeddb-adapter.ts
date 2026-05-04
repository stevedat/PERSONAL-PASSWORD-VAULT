import type { IStorageAdapter } from "./storage";
import type { VaultItem, EncryptedVault } from "./types";
import { CryptoEngine } from "./crypto.client";

const DB_NAME = "PocketVaultDB";
const DB_VERSION = 3; // v3: added auto-backups + recovery stores
const STORE_NAME = "vault";
const RECOVERY_STORE = "recovery";

/**
 * Shared upgrade handler — creates all stores needed by the app.
 * Called by both IndexedDBAdapter and AutoBackupService.
 */
export function handleDBUpgrade(db: IDBDatabase) {
  if (!db.objectStoreNames.contains("vault")) {
    db.createObjectStore("vault");
  }
  if (!db.objectStoreNames.contains("auto-backups")) {
    const store = db.createObjectStore("auto-backups", { keyPath: "id" });
    store.createIndex("timestamp", "timestamp", { unique: false });
  }
  if (!db.objectStoreNames.contains("recovery")) {
    db.createObjectStore("recovery");
  }
}

export { DB_NAME, DB_VERSION };

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
        handleDBUpgrade(db);
      };
    });
  }

  async saveVault(items: VaultItem[], masterPassword: string): Promise<void> {
    if (!this.db) await this.init();

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

  // --- Recovery Key Methods ---

  /**
   * Save recovery vault (encrypted with recovery key) + hash for verification
   */
  async saveRecoveryData(
    items: VaultItem[],
    recoveryKey: string,
    passwordHint?: string
  ): Promise<void> {
    if (!this.db) await this.init();

    const encryptedVault = await CryptoEngine.encryptWithRecoveryKey(items, recoveryKey);
    const recoveryKeyHash = await CryptoEngine.hashRecoveryKey(recoveryKey);

    const recoveryData = {
      vault: {
        data: encryptedVault.data,
        iv: encryptedVault.iv,
        salt: encryptedVault.salt,
        version: encryptedVault.version,
      },
      recoveryKeyHash,
      passwordHint: passwordHint || null,
      timestamp: Date.now(),
    };

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([RECOVERY_STORE], "readwrite");
      const store = transaction.objectStore(RECOVERY_STORE);
      const request = store.put(recoveryData, "recovery");

      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error || new Error("Recovery save failed"));
      request.onerror = () => reject(request.error || new Error("Recovery put failed"));
    });
  }

  /**
   * Load recovery data (hash + encrypted vault)
   */
  async getRecoveryData(): Promise<{
    recoveryKeyHash: string;
    passwordHint: string | null;
    vault: { data: ArrayBuffer; iv: ArrayBuffer; salt: ArrayBuffer; version?: number };
    timestamp: number;
  } | null> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([RECOVERY_STORE], "readonly");
      const store = transaction.objectStore(RECOVERY_STORE);
      const request = store.get("recovery");

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result || null);
    });
  }

  /**
   * Check if recovery data exists
   */
  async hasRecoveryData(): Promise<boolean> {
    if (typeof window === "undefined") return false;
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([RECOVERY_STORE], "readonly");
      const store = transaction.objectStore(RECOVERY_STORE);
      const request = store.get("recovery");

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(!!request.result);
    });
  }

  /**
   * Recover vault using recovery key, then re-encrypt with new master password
   */
  async recoverVault(recoveryKey: string, newMasterPassword: string): Promise<VaultItem[]> {
    if (!this.db) await this.init();

    const recoveryData = await this.getRecoveryData();
    if (!recoveryData) {
      throw new Error("No recovery data found");
    }

    // Verify recovery key hash
    const inputHash = await CryptoEngine.hashRecoveryKey(recoveryKey);
    if (inputHash !== recoveryData.recoveryKeyHash) {
      throw new Error("Invalid recovery key");
    }

    // Decrypt vault with recovery key
    const encryptedVault: EncryptedVault = {
      data: recoveryData.vault.data,
      iv: recoveryData.vault.iv,
      salt: recoveryData.vault.salt,
      version: recoveryData.vault.version,
    };

    const items = await CryptoEngine.decryptWithRecoveryKey(encryptedVault, recoveryKey);

    // Re-encrypt with new master password
    await this.saveVault(items, newMasterPassword);

    // Update recovery vault with new data
    await this.saveRecoveryData(items, recoveryKey, recoveryData.passwordHint);

    return items;
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
