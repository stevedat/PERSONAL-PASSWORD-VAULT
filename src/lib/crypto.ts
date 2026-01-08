
import type { VaultItem, EncryptedVault } from './crypto';
// Import the worker using the ?worker suffix, which is the recommended Vite syntax
import CryptoWorker from './crypto.worker.ts?worker';

// The CryptoEngine now acts as a proxy to a Web Worker.
// All heavy crypto operations are offloaded from the main thread.
export class CryptoEngine {
  private static worker: Worker | null = null;
  private static currentTask: { resolve: (value: any) => void; reject: (reason?: any) => void; } | null = null;

  private static getWorker(): Worker {
    if (typeof window === 'undefined') {
      // This check ensures we don't try to create a worker on the server.
      throw new Error('CryptoEngine only works in the browser.');
    }
    if (!this.worker) {
      // Instantiate the worker from the special Vite import.
      this.worker = new CryptoWorker();

      this.worker.onmessage = (event) => {
        if (!this.currentTask) return;

        const { type, payload } = event.data;
        if (type.endsWith('_success')) {
          this.currentTask.resolve(payload);
        } else if (type === 'error') {
          this.currentTask.reject(new Error(payload));
        }
        this.currentTask = null;
      };

      this.worker.onerror = (error) => {
        if (this.currentTask) {
          this.currentTask.reject(error);
          this.currentTask = null;
        }
      };
    }
    return this.worker;
  }

  private static postTask<T>(type: string, payload: any): Promise<T> {
    return new Promise((resolve, reject) => {
      if (this.currentTask) {
        // This simple implementation only handles one task at a time.
        // For a more robust solution, a queue system would be needed.
        reject(new Error('A crypto operation is already in progress.'));
        return;
      }
      this.currentTask = { resolve, reject };
      this.getWorker().postMessage({ type, payload });
    });
  }

  static async encrypt(data: VaultItem[], masterPassword: string): Promise<EncryptedVault> {
    return this.postTask<EncryptedVault>('encrypt', { data, masterPassword });
  }

  static async decrypt(encryptedVault: EncryptedVault, masterPassword: string): Promise<VaultItem[]> {
    return this.postTask<VaultItem[]>('decrypt', { encryptedVault, masterPassword });
  }
  
  static generateId(): string {
    return crypto.randomUUID();
  }
}
