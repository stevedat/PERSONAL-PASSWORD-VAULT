import type { IStorageAdapter } from "./storage";
import type { VaultItem, EncryptedVault } from "./types";
import { CryptoEngine } from "./crypto.client";
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from "@capacitor-community/sqlite";
import { Capacitor } from "@capacitor/core";

export class SQLiteAdapter implements IStorageAdapter {
  private sqlite: SQLiteConnection;
  private db: SQLiteDBConnection | null = null;
  private readonly DB_NAME = "pocketvault_db";

  constructor() {
    this.sqlite = new SQLiteConnection(CapacitorSQLite);
  }

  async init(): Promise<void> {
    if (!Capacitor.isNativePlatform()) return;
    
    try {
      // Check if connection exists
      const isConn = (await this.sqlite.isConnection(this.DB_NAME, false)).result;
      
      if (isConn) {
        this.db = await this.sqlite.retrieveConnection(this.DB_NAME, false);
      } else {
        this.db = await this.sqlite.createConnection(this.DB_NAME, false, "no-encryption", 1, false);
      }
      
      await this.db.open();
      
      // Create table if not exists
      const query = `
        CREATE TABLE IF NOT EXISTS vault (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          data TEXT NOT NULL,
          iv TEXT NOT NULL,
          salt TEXT NOT NULL,
          version INTEGER NOT NULL,
          timestamp INTEGER NOT NULL
        );
      `;
      await this.db.execute(query);
    } catch (e) {
      console.error("[SQLite] Init error:", e);
      throw e;
    }
  }

  async saveVault(items: VaultItem[], masterPassword: string): Promise<void> {
    if (!this.db) await this.init();

    try {
      const encryptedVault = await CryptoEngine.encrypt(items, masterPassword);

      // We must store as base64 strings in SQLite
      const dataStr = this.arrayBufferToBase64(encryptedVault.data);
      const ivStr = this.arrayBufferToBase64(encryptedVault.iv);
      const saltStr = this.arrayBufferToBase64(encryptedVault.salt);
      const version = encryptedVault.version || 1;
      const timestamp = Date.now();

      // Clear existing vault (we only store one vault for now)
      await this.db!.execute("DELETE FROM vault");

      // Insert new vault
      const query = `INSERT INTO vault (data, iv, salt, version, timestamp) VALUES (?, ?, ?, ?, ?)`;
      await this.db!.run(query, [dataStr, ivStr, saltStr, version, timestamp]);
    } catch (e) {
      console.error("[SQLite] Save failed:", e);
      throw e;
    }
  }

  async loadVault(masterPassword: string): Promise<VaultItem[]> {
    if (!this.db) await this.init();

    try {
      const query = "SELECT * FROM vault ORDER BY timestamp DESC LIMIT 1";
      const result = await this.db!.query(query);

      if (!result.values || result.values.length === 0) {
        return [];
      }

      const row = result.values[0];

      const encryptedVault: EncryptedVault = {
        data: this.base64ToArrayBuffer(row.data),
        iv: this.base64ToArrayBuffer(row.iv),
        salt: this.base64ToArrayBuffer(row.salt),
        version: row.version
      };

      const items = await CryptoEngine.decrypt(encryptedVault, masterPassword);
      return items;
    } catch (e) {
      console.error("[SQLite] Load failed:", e);
      throw e;
    }
  }

  async hasVault(): Promise<boolean> {
    if (!this.db) await this.init();

    try {
      const query = "SELECT COUNT(id) as count FROM vault";
      const result = await this.db!.query(query);
      return result.values && result.values.length > 0 && result.values[0].count > 0;
    } catch (e) {
      console.error("[SQLite] Check vault failed:", e);
      return false;
    }
  }

  // --- Utils ---

  private arrayBufferToBase64(buffer: ArrayBuffer): string {
    const bytes = new Uint8Array(buffer);
    let binary = "";
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
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
