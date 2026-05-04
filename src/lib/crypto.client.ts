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
  private static readonly KEY_SIZE = 256 / 32; // 256 bits (for crypto-js)
  private static readonly KEY_LENGTH = 256; // bits (for WebCrypto)
  private static readonly ITERATIONS = 600000;

  // Modern WebCrypto Key Derivation
  private static async deriveWebCryptoKey(password: string, salt: Uint8Array): Promise<CryptoKey> {
    const encoder = new TextEncoder();
    const passwordKey = await crypto.subtle.importKey(
      "raw",
      encoder.encode(password),
      "PBKDF2",
      false,
      ["deriveKey", "deriveBits"]
    );

    return crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt: salt,
        iterations: this.ITERATIONS,
        hash: "SHA-256",
      },
      passwordKey,
      { name: "AES-GCM", length: this.KEY_LENGTH },
      false,
      ["encrypt", "decrypt"]
    );
  }

  // Legacy Crypto-JS Key Derivation (for backward compatibility during decryption)
  private static async deriveLegacyKey(password: string, salt: ArrayBuffer): Promise<lib.WordArray> {
    if (typeof crypto !== 'undefined' && crypto.subtle) {
      try {
        const encoder = new TextEncoder();
        const passwordKey = await crypto.subtle.importKey(
          "raw",
          encoder.encode(password),
          "PBKDF2",
          false,
          ["deriveBits"]
        );
        const bits = await crypto.subtle.deriveBits(
          {
            name: "PBKDF2",
            salt: salt,
            iterations: this.ITERATIONS,
            hash: "SHA-256",
          },
          passwordKey,
          this.KEY_SIZE * 32
        );
        return arrayBufferToWordArray(bits);
      } catch (e) {
        console.warn("WebCrypto PBKDF2 failed, falling back to crypto-js", e);
      }
    }
    
    return PBKDF2(password, arrayBufferToWordArray(salt), {
      keySize: this.KEY_SIZE,
      iterations: this.ITERATIONS
    });
  }

  static generateId(): string {
    return crypto.randomUUID();
  }

  /**
   * Generate a human-readable recovery key (256-bit)
   * Format: XXXX-XXXX-XXXX-XXXX-XXXX-XXXX-XXXX-XXXX
   */
  static generateRecoveryKey(): string {
    const bytes = crypto.getRandomValues(new Uint8Array(20));
    // Base32 encoding (RFC 4648) for readability
    const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // No I, O, 0, 1 to avoid confusion
    let encoded = '';
    for (let i = 0; i < bytes.length; i++) {
      encoded += alphabet[bytes[i] % 32];
    }
    // Format as groups of 4: XXXX-XXXX-XXXX-XXXX-XXXX
    return encoded.match(/.{1,4}/g)!.join('-');
  }

  /**
   * Hash recovery key for verification (SHA-256)
   */
  static async hashRecoveryKey(recoveryKey: string): Promise<string> {
    const normalizedKey = recoveryKey.replace(/-/g, '').toUpperCase();
    const encoder = new TextEncoder();
    const data = encoder.encode(normalizedKey);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = new Uint8Array(hashBuffer);
    let hex = '';
    for (let i = 0; i < hashArray.length; i++) {
      hex += hashArray[i].toString(16).padStart(2, '0');
    }
    return hex;
  }

  /**
   * Encrypt vault using recovery key (same algorithm as master password)
   */
  static async encryptWithRecoveryKey(items: VaultItem[], recoveryKey: string): Promise<EncryptedVault> {
    const normalizedKey = recoveryKey.replace(/-/g, '').toUpperCase();
    return this.encrypt(items, normalizedKey);
  }

  /**
   * Decrypt vault using recovery key
   */
  static async decryptWithRecoveryKey(encryptedVault: EncryptedVault, recoveryKey: string): Promise<VaultItem[]> {
    const normalizedKey = recoveryKey.replace(/-/g, '').toUpperCase();
    return this.decrypt(encryptedVault, normalizedKey);
  }

  static async encrypt(items: VaultItem[], password: string): Promise<EncryptedVault> {
    // We now use pure WebCrypto AES-GCM (Version 2)
    const salt = crypto.getRandomValues(new Uint8Array(32));
    const iv = crypto.getRandomValues(new Uint8Array(12)); // GCM standard IV length
    
    const key = await this.deriveWebCryptoKey(password, salt);
    
    const encoder = new TextEncoder();
    const encodedData = encoder.encode(JSON.stringify(items));
    
    const encryptedData = await crypto.subtle.encrypt(
      { name: "AES-GCM", iv },
      key,
      encodedData
    );

    return {
      data: encryptedData,
      salt: salt.buffer,
      iv: iv.buffer,
      version: 2
    };
  }

  static async decrypt(encryptedVault: EncryptedVault, password: string): Promise<VaultItem[]> {
    if (encryptedVault.version === 2) {
      // V2: Pure WebCrypto AES-GCM
      const salt = new Uint8Array(encryptedVault.salt);
      const iv = new Uint8Array(encryptedVault.iv);
      const key = await this.deriveWebCryptoKey(password, salt);
      
      const decryptedData = await crypto.subtle.decrypt(
        { name: "AES-GCM", iv },
        key,
        encryptedVault.data
      );
      
      const decoder = new TextDecoder();
      return JSON.parse(decoder.decode(decryptedData));
    } else {
      // Legacy V1: crypto-js AES-CBC
      const key = await this.deriveLegacyKey(password, encryptedVault.salt);
      const ciphertext = arrayBufferToWordArray(encryptedVault.data);
      const iv = arrayBufferToWordArray(encryptedVault.iv);

      const decrypted = AES.decrypt({ ciphertext: ciphertext } as lib.CipherParams, key, { iv });
      const decryptedText = decrypted.toString(enc.Utf8);
      
      if (!decryptedText) {
        throw new Error('Decryption failed. Invalid password?');
      }
      return JSON.parse(decryptedText);
    }
  }

  static async verifyPassword(encryptedVault: EncryptedVault, password: string): Promise<boolean> {
    try {
      await this.decrypt(encryptedVault, password);
      return true;
    } catch (e) {
      return false;
    }
  }
}
