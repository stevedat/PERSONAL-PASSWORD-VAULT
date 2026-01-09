// src/lib/types.ts

export interface VaultItem {
  id: string;
  title: string;
  username: string;
  password?: string;         // Plain-text password (decrypted)
  note?: string;             // Plain-text note (decrypted)
  password_encrypted?: string; // Base64 encoded string
  note_encrypted?: string;    // Base64 encoded string
  category?: string;
  last_modified: number;      // Unix timestamp
}

export interface EncryptedVault {
  iv: string | ArrayBuffer;   // Base64 encoded or raw IV
  salt: string | ArrayBuffer; // Base64 encoded or raw salt
  data: string | ArrayBuffer; // Base64 encoded or raw encrypted data
  version?: number;
}
