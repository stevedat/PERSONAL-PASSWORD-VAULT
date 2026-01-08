
import type { VaultItem, EncryptedVault } from './crypto';

// This class acts as a proxy to a Web Worker, offloading heavy crypto operations.
export class CryptoEngine {
  private static worker: Worker | null = null;
  private static taskQueue: Array<{ type: string; payload: any; resolve: (value: any) => void; reject: (reason?: any) => void; }> = [];
  private static isWorkerInitializing = false;

  // Initializes the worker and sets up message handling.
  // This is safe to call multiple times.
  private static async initializeWorker(): Promise<Worker> {
    // This check is the key fix. It prevents any of this code from running on the server.
    if (import.meta.env.SSR) {
      // Return a mock worker or throw an error if server-side crypto is attempted.
      // For this app, crypto operations are client-only, so we can effectively do nothing.
      return Promise.reject(new Error('Web Worker cannot be initialized on the server.'));
    }

    if (this.worker) {
      return this.worker;
    }

    if (this.isWorkerInitializing) {
      return new Promise((resolve, reject) => {
        const interval = setInterval(() => {
          if (this.worker) {
            clearInterval(interval);
            resolve(this.worker);
          } else if (!this.isWorkerInitializing) {
            clearInterval(interval);
            reject(new Error('Worker initialization failed.'));
          }
        }, 50);
      });
    }

    this.isWorkerInitializing = true;

    try {
      const WorkerModule = await import('./crypto.worker.ts?worker');
      const worker = new WorkerModule.default() as Worker;

      worker.onmessage = (event) => {
        const nextTask = this.taskQueue.shift();
        if (!nextTask) return;

        const { type, payload } = event.data;
        if (type.endsWith('_success')) {
          nextTask.resolve(payload);
        } else if (type === 'error') {
          nextTask.reject(new Error(payload.message || 'Unknown worker error'));
        }

        // Process next task in queue
        if (this.taskQueue.length > 0) {
          this.worker?.postMessage(this.taskQueue[0]);
        }
      };

      worker.onerror = (error) => {
        console.error('[CryptoEngine] Worker error:', error);
        const nextTask = this.taskQueue.shift();
        if (nextTask) {
          nextTask.reject(error);
        }
      };

      this.worker = worker;
      
      // Process the first task if it exists
      if (this.taskQueue.length > 0) {
        this.worker.postMessage(this.taskQueue[0]);
      }
      
      return this.worker;
    } catch (error) {
      console.error('[CryptoEngine] Failed to initialize worker:', error);
      // Reject all pending tasks
      this.taskQueue.forEach(task => task.reject(error));
      this.taskQueue = [];
      throw error; // Re-throw the error to the caller
    } finally {
      this.isWorkerInitializing = false;
    }
  }

  // A robust method to queue tasks and ensure worker is ready.
  private static async postTask<T>(type: string, payload: any): Promise<T> {
    // Immediately reject if on the server.
    if (import.meta.env.SSR) {
      return Promise.reject(new Error('Crypto operations are not available on the server.'));
    }

    // Wait for the worker to be ready before queueing the task.
    await this.initializeWorker();

    return new Promise((resolve, reject) => {
        const task = { type, payload, resolve, reject };
        // Add task to the queue.
        this.taskQueue.push(task);
        // If the worker is idle (only this task in queue), post it immediately.
        if (this.taskQueue.length === 1) {
            this.worker?.postMessage({ type, payload });
        }
    });
}


  static async encrypt(data: VaultItem[], masterPassword: string): Promise<EncryptedVault> {
    return this.postTask<EncryptedVault>('encrypt', { data, masterPassword });
  }

  static async decrypt(encryptedVault: EncryptedVault, masterPassword: string): Promise<VaultItem[]> {
    return this.postTask<VaultItem[]>('decrypt', { encryptedVault, masterPassword });
  }

  // This function does not require the worker and is safe to call anywhere.
  static generateId(): string {
    return crypto.randomUUID();
  }
}
