
import type { VaultItem, EncryptedVault } from './types';
import { Crypto } from './crypto';
import { lib } from 'crypto-js';

// This class performs cryptographic operations directly on the main thread.
export class CryptoEngine {

  private static generateRandom(bytes: number): string {
    return lib.WordArray.random(bytes).toString();
  }

  static async encrypt(data: VaultItem[], masterPassword: string): Promise<EncryptedVault> {
    const crypto = new Crypto();
    const salt = this.generateRandom(16);
    const keyHash = crypto.init(masterPassword, salt);

    const encryptedItems: { nonce: string; ciphertext: string; }[] = [];

    for (const item of data) {
      const nonce = this.generateRandom(16); // IV for AES is 128 bits (16 bytes)
      const plaintext = JSON.stringify(item);
      const ciphertext = crypto.encrypt(plaintext, nonce);

      encryptedItems.push({
        nonce: nonce,
        ciphertext: ciphertext,
      });
    }

    return {
      salt: salt,
      keyHash: keyHash,
      items: encryptedItems,
    };
  }

  static async decrypt(encryptedVault: EncryptedVault, masterPassword: string): Promise<VaultItem[]> {
    const crypto = new Crypto();
    const salt = encryptedVault.salt;
    const keyHash = crypto.init(masterPassword, salt);

    if (keyHash !== encryptedVault.keyHash) {
      throw new Error('Invalid master password');
    }

    const decryptedItems: VaultItem[] = [];

    for (const item of encryptedVault.items) {
      const nonce = item.nonce;
      const ciphertext = item.ciphertext;
      const plaintext = crypto.decrypt(ciphertext, nonce);
      const decryptedItem = JSON.parse(plaintext);
      decryptedItems.push(decryptedItem);
    }

    return decryptedItems;
  }

  static generateId(): string {
    return crypto.randomUUID();
  }
}
