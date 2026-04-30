import type { VaultItem } from "./types";
import { Capacitor } from "@capacitor/core";
import { IndexedDBAdapter } from "./indexeddb-adapter";
import { SQLiteAdapter } from "./sqlite-adapter";

export interface IStorageAdapter {
  init(): Promise<void>;
  saveVault(items: VaultItem[], masterPassword: string): Promise<void>;
  loadVault(masterPassword: string): Promise<VaultItem[]>;
  hasVault(): Promise<boolean>;
}

export class StorageEngine {
  private static adapter: IStorageAdapter | null = null;

  static async getAdapter(): Promise<IStorageAdapter> {
    if (this.adapter) return this.adapter;

    if (Capacitor.isNativePlatform()) {
      this.adapter = new SQLiteAdapter();
    } else {
      this.adapter = new IndexedDBAdapter();
    }

    await this.adapter.init();
    return this.adapter;
  }

  static async saveVault(items: VaultItem[], masterPassword: string): Promise<void> {
    const adapter = await this.getAdapter();
    await adapter.saveVault(items, masterPassword);
    
    // Auto-sync in background
    import("./sync-engine").then(({ SyncEngine }) => {
      SyncEngine.pushVault(items, masterPassword).catch(e => console.error("[StorageEngine] Auto-sync failed:", e));
    });
  }

  static async loadVault(masterPassword: string): Promise<VaultItem[]> {
    const adapter = await this.getAdapter();
    return adapter.loadVault(masterPassword);
  }

  static async hasVault(): Promise<boolean> {
    const adapter = await this.getAdapter();
    return adapter.hasVault();
  }

  // Backup and Restore methods can remain here or move to BackupManager
  static async exportVault(masterPassword: string): Promise<Blob> {
    const { BackupManager } = await import("./backup");
    const items = await this.loadVault(masterPassword);
    return BackupManager.quickExport(items, masterPassword);
  }

  static async importVault(file: File, masterPassword: string): Promise<VaultItem[]> {
    const { RestoreManager } = await import("./restore");
    const result = await RestoreManager.importVault(file, masterPassword, []);
    return result.items;
  }
}
