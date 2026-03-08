
// src/lib/crypto.ts

import AES from 'crypto-js/aes';
import SHA256 from 'crypto-js/sha256';
import Utf8 from 'crypto-js/enc-utf8';
import Hex from 'crypto-js/enc-hex';
import * as CryptoJS from 'crypto-js';

export class Crypto {
  private key!: CryptoJS.lib.WordArray;

  init(masterPassword: string, salt: string): string {
    this.key = SHA256(masterPassword + salt);
    return SHA256(this.key).toString(Hex);
  }

  encrypt(plaintext: string, nonce: string): string {
    if (!this.key) {
      throw new Error('Crypto engine not initialized.');
    }
    const iv = Hex.parse(nonce);
    const encrypted = AES.encrypt(plaintext, this.key, { iv });
    return encrypted.toString();
  }

  decrypt(ciphertext: string, nonce: string): string {
    if (!this.key) {
      throw new Error('Crypto engine not initialized.');
    }
    const iv = Hex.parse(nonce);
    const decrypted = AES.decrypt(ciphertext, this.key, { iv });
    return decrypted.toString(Utf8);
  }
}
