
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
  private static readonly ITERATIONS = 600000;

  private static deriveKey(password: string, salt: lib.WordArray): lib.WordArray {
    return PBKDF2(password, salt, {
      keySize: this.KEY_SIZE,
      iterations: this.ITERATIONS
    });
  }

  static async encrypt(items: VaultItem[], password: string): Promise<string> {
    const salt = lib.WordArray.random(128 / 8);
    const key = this.deriveKey(password, salt);
    const iv = lib.WordArray.random(128 / 8);

    const encrypted = AES.encrypt(JSON.stringify(items), key, { iv });
    const encryptedVault: EncryptedVault = {
      data: wordArrayToArrayBuffer(encrypted.ciphertext),
      salt: wordArrayToArrayBuffer(salt),
      iv: wordArrayToArrayBuffer(iv)
    };

    return JSON.stringify(encryptedVault, (k, v) => {
        if (v instanceof ArrayBuffer) {
            return { type: 'Buffer', data: Array.from(new Uint8Array(v)) };
        }
        return v;
    });
  }

  static async decrypt(encryptedVaultJSON: string, password: string): Promise<VaultItem[]> {
    const encryptedVault: EncryptedVault = JSON.parse(encryptedVaultJSON, (k, v) => {
        if (v && v.type === 'Buffer') {
            return new Uint8Array(v.data).buffer;
        }
        return v;
    });

    const salt = arrayBufferToWordArray(encryptedVault.salt);
    const iv = arrayBufferToWordArray(encryptedVault.iv);
    const key = this.deriveKey(password, salt);
    const ciphertext = arrayBufferToWordArray(encryptedVault.data);

    const decrypted = AES.decrypt({ ciphertext: ciphertext } as lib.CipherParams, key, { iv });
    const decryptedText = decrypted.toString(enc.Utf8);
    if (!decryptedText) {
      throw new Error('Decryption failed. Invalid password?');
    }
    return JSON.parse(decryptedText);
  }

  static async verifyPassword(encryptedVault: string, password: string): Promise<boolean> {
    try {
      await this.decrypt(encryptedVault, password);
      return true;
    } catch (e) {
      return false;
    }
  }
}
