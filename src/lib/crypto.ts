
import type { VaultItem, EncryptedVault } from './crypto';

// The CryptoEngine now acts as a proxy to a Web Worker.
// All heavy crypto operations are offloaded from the main thread.
export class CryptoEngine {
  private static worker: Worker | null = null;
  private static taskQueue: Array<{ type: string; payload: any; resolve: (value: any) => void; reject: (reason?: any) => void; }> = [];
  private static isWorkerInitializing = false;

  // Initializes the worker and sets up message handling
  private static async initializeWorker(): Promise<Worker> {
    // If worker exists, return it
    if (this.worker) {
      return this.worker;
    }

    // If another process is already initializing, wait for it
    if (this.isWorkerInitializing) {
      return new Promise((resolve) => {
        const interval = setInterval(() => {
          if (this.worker) {
            clearInterval(interval);
            resolve(this.worker);
          }
        }, 50);
      });
    }

    // Mark as initializing
    this.isWorkerInitializing = true;

    // Dynamically import the worker module only on the client-side
    const WorkerModule = await import('./crypto.worker.ts?worker');
    const worker = new WorkerModule.default() as Worker;

    worker.onmessage = (event) => {
      const nextTask = this.taskQueue.shift();
      if (!nextTask) return;

      const { type, payload } = event.data;
      if (type.endsWith('_success')) {
        nextTask.resolve(payload);
      } else if (type === 'error') {
        nextTask.reject(new Error(payload));
      }
    };

    worker.onerror = (error) => {
      const nextTask = this.taskQueue.shift();
      if (nextTask) {
        nextTask.reject(error);
      }
    };

    this.worker = worker;
    this.isWorkerInitializing = false;
    return worker;
  }

  private static async postTask<T>(type: string, payload: any): Promise<T> {
    // Ensure this only runs in the browser before initializing worker
    if (typeof window === 'undefined') {
        // This case should ideally not be hit if called from client-side components,
        // but serves as a safeguard.
        return Promise.reject(new Error('Crypto operations can only be performed in the browser.'));
    }

    const worker = await this.initializeWorker();
    
    return new Promise((resolve, reject) => {
      this.taskQueue.push({ type, payload, resolve, reject });
      // If this is the only task in the queue, post it immediately
      if (this.taskQueue.length === 1) {
        worker.postMessage({ type, payload });
      }
    });
  }

  static async encrypt(data: VaultItem[], masterPassword: string): Promise<EncryptedVault> {
    return this.postTask<EncryptedVault>('encrypt', { data, masterPassword });
  }

  static async decrypt(encryptedVault: EncryptedVault, masterPassword: string): Promise<VaultItem[]> {
    return this.postTask<VaultItem[]>('decrypt', { encryptedVault, masterPassword });
  }
  
  static generateId(): string {
    // This does not require the worker
    return crypto.randomUUID();
  }
}
