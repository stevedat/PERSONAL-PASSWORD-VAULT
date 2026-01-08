
import type { VaultItem, EncryptedVault } from './types';

// SERVER-SIDE implementation of the CryptoEngine.
// This version throws errors because crypto operations should not run on the server.
export class CryptoEngine {
  private static throwError(): Promise<any> {
    return Promise.reject(new Error('Crypto operations are not available on the server.'));
  }

  static encrypt(data: VaultItem[], masterPassword: string): Promise<EncryptedVault> {
    return this.throwError();
  }

  static decrypt(encryptedVault: EncryptedVault, masterPassword: string): Promise<VaultItem[]> {
    return this.throwError();
  }

  // This function is safe and can be implemented on the server if needed,
  // but for consistency, we'll keep it aligned with the client.
  // Note: Node.js 16+ has a global crypto object.
  static generateId(): string {
    // In a pure server environment (no SvelteKit polyfills), you might need:
    // import { randomUUID } from 'crypto'; return randomUUID();
    return crypto.randomUUID();
  }
}
