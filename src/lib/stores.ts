import { writable } from 'svelte/store';
import type { VaultItem } from './types';
import type { ReminderType } from './reminders';

export const isUnlocked = writable(false);
export const vaultItems = writable<VaultItem[]>([]);
export const searchQuery = writable('');
export const categoryFilter = writable<string>('all');
export const darkMode = writable(true);
export const showAddForm = writable(false);
export const editingItem = writable<VaultItem | null>(null);
export const biometricEnabled = writable(false);
export const showReminder = writable<ReminderType | null>(null);

// New store to indicate a critical operation is in progress
export const isCriticalOperation = writable(false);

export function startCriticalOperation() {
  isCriticalOperation.set(true);
}

export function endCriticalOperation() {
  isCriticalOperation.set(false);
}

let lockTimer: number;

export function startAutoLock(timeout: number) {
  clearTimeout(lockTimer);
  lockTimer = setTimeout(() => {
    lock();
  }, timeout);
}

export function resetAutoLock(timeout: number) {
  startAutoLock(timeout);
}

export function lock() {
  let isCritical = false;
  isCriticalOperation.subscribe($isCritical => {
    isCritical = $isCritical;
  })();

  if (isCritical) {
    return;
  }

  isUnlocked.set(false);
  vaultItems.set([]);
  editingItem.set(null);
  showAddForm.set(false);
}
