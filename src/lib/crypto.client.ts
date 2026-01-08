
import type { VaultItem, EncryptedVault } from './types';

// This class acts as a proxy to a Web Worker, offloading heavy crypto operations.
// This is the CLIENT-SIDE implementation.
export class CryptoEngine {
  private static worker: Worker | null = null;
  private static taskQueue: Array<{ type: string; payload: any; resolve: (value: any) => void; reject: (reason?: any) => void; }> = [];
  private static isWorkerInitializing = false;

  // Initializes the worker and sets up message handling.
  private static async initializeWorker(): Promise<Worker> {
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
      
      if (this.taskQueue.length > 0) {
        this.worker.postMessage(this.taskQueue[0]);
      }
      
      return this.worker;
    } catch (error) {
      console.error('[CryptoEngine] Failed to initialize worker:', error);
      this.taskQueue.forEach(task => task.reject(error));
      this.taskQueue = [];
      throw error;
    } finally {
      this.isWorkerInitializing = false;
    }
  }

  private static async postTask<T>(type: string, payload: any): Promise<T> {
    await this.initializeWorker();

    return new Promise((resolve, reject) => {
        const task = { type, payload, resolve, reject };
        this.taskQueue.push(task);
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

  static generateId(): string {
    return crypto.randomUUID();
  }
}
