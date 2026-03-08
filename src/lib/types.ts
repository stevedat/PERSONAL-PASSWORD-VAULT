// src/lib/types.ts

export interface VaultItem {
  id: string;
  title: string;
  username: string;
  password_encrypted: string; // Should be base64 encoded string
  note_encrypted?: string;    // Should be base64 encoded string
  category?: string;
  last_modified: number;      // Unix timestamp
}

export interface EncryptedVault {
  iv?: string;               // Base64 encoded IV
  salt: string;             // Base64 encoded salt
  data?: string;             // Base64 encoded encrypted data
  version?: number;
  keyHash: string;
  items: { nonce: string; ciphertext: string; }[];
}
