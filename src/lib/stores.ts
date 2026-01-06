import { writable } from 'svelte/store';
import type { VaultItem } from './crypto';

export const isUnlocked = writable(false);
export const vaultItems = writable<VaultItem[]>([]);
export const searchQuery = writable('');
export const darkMode = writable(false);
export const showAddForm = writable(false);
export const editingItem = writable<VaultItem | null>(null);

// Auto-lock functionality
let lockTimer: number;

export function startAutoLock() {
  clearTimeout(lockTimer);
  lockTimer = setTimeout(() => {
    lock();
  }, 5 * 60 * 1000); // 5 minutes
}

export function resetAutoLock() {
  startAutoLock();
}

export function lock() {
  isUnlocked.set(false);
  vaultItems.set([]);
  clearTimeout(lockTimer);
}

// Handle visibility change for auto-lock
if (typeof document !== 'undefined') {
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      lock();
    }
  });
}