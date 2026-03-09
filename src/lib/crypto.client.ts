
import type { VaultItem, EncryptedVault } from './types';
import { lib, AES, enc, PBKDF2 } from 'crypto-js';

// Helper to convert WordArray to ArrayBuffer
function wordArrayToArrayBuffer(wordArray: lib.WordArray): ArrayBuffer {
    const len = wordArray.sigBytes;
    const ab = new ArrayBuffer(len);
    const ua = new Uint8Array(ab);
    for (let i = 0; i < len; i++) {
        ua[i] = (wordArray.words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
    }
    return ab;
}

// Helper to convert ArrayBuffer to WordArray
function arrayBufferToWordArray(arrayBuffer: ArrayBuffer): lib.WordArray {
    const u8a = new Uint8Array(arrayBuffer);
    const len = u8a.length;
    const words: number[] = [];
    for (let i = 0; i < len; i++) {
        words[i >>> 2] |= u8a[i] << (24 - (i % 4) * 8);
    }
    return lib.WordArray.create(words, len);
}

// This class performs cryptographic operations directly on the main thread.
export class CryptoEngine {
  private static readonly KEY_SIZE = 256 / 32; // 256 bits
  private static readonly ITERATIONS = 1000;

  private static deriveKey(password: string, salt: lib.WordArray): lib.WordArray {
    return PBKDF2(password, salt, {
        keySize: this.KEY_SIZE,
        iterations: this.ITERATIONS
    });
  }

  static async encrypt(data: VaultItem[], masterPassword: string): Promise<EncryptedVault> {
    const plaintext = JSON.stringify(data);
    const salt = lib.WordArray.random(128 / 8); // 128-bit salt

    const key = this.deriveKey(masterPassword, salt);

    const iv = lib.WordArray.random(128 / 8); // 128-bit IV
    const encrypted = AES.encrypt(plaintext, key, { iv: iv });
    
    // The encrypted.ciphertext is a WordArray. Convert to ArrayBuffer
    const dataBuffer = wordArrayToArrayBuffer(encrypted.ciphertext);

    return {
      data: dataBuffer,
      iv: wordArrayToArrayBuffer(iv),
      salt: wordArrayToArrayBuffer(salt),
      version: 2
    };
  }

  static async decrypt(encryptedVault: EncryptedVault, masterPassword: string): Promise<VaultItem[]> {
    const salt = arrayBufferToWordArray(encryptedVault.salt);
    const iv = arrayBufferToWordArray(encryptedVault.iv);
    
    const key = this.deriveKey(masterPassword, salt);

    const cipherParams = lib.CipherParams.create({
        ciphertext: arrayBufferToWordArray(encryptedVault.data)
    });

    try {
        const decrypted = AES.decrypt(cipherParams, key, { iv: iv });
        const plaintext = decrypted.toString(enc.Utf8);

        if (!plaintext) {
            throw new Error('Decryption failed: empty plaintext');
        }

        const items = JSON.parse(plaintext);
        return items;
    } catch (e) {
        console.error("Decryption error, likely wrong password", e);
        throw new Error('Invalid master password or corrupted data.');
    }
  }

  static generateId(): string {
    return crypto.randomUUID();
  }
}
