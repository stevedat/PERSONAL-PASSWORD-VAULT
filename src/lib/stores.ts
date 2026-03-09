import { writable, get } from 'svelte/store';
import type { VaultItem } from './types';
import type { ReminderType } from './reminders';
import { browser } from '$app/environment';

// --- Basic Stores ---
export const isUnlocked = writable(false);
export const vaultItems = writable<VaultItem[]>([]);
export const searchQuery = writable('');
export const categoryFilter = writable<string>('all');
export const darkMode = writable(true); // Assuming default is true
export const showAddForm = writable(false);
export const editingItem = writable<VaultItem | null>(null);
export const biometricEnabled = writable(false);
export const showReminder = writable<ReminderType | null>(null);

// --- App State and Auto-Lock ---

// App state: 'active', 'inactive', 'background'
export const appState = writable<'active' | 'inactive' | 'background'>('active');
export const isCriticalOperation = writable(false);

const AUTO_LOCK_TIMEOUT = 1 * 60 * 1000; // 1 minute
let lockTimer: ReturnType<typeof setTimeout>;
let lastActivity = Date.now();

// --- Core Functions ---

export function lock(reason: 'auto' | 'manual' = 'auto') {
  if (get(isCriticalOperation)) {
    if (import.meta.env.DEV) console.log('[stores] Lock prevented by critical operation');
    return;
  }
  if (import.meta.env.DEV) console.log(`[stores] Locking vault (reason: ${reason})`);
  isUnlocked.set(false);
  vaultItems.set([]);
  editingItem.set(null);
  showAddForm.set(false);
  sessionStorage.removeItem('pv_master_key');
}

export function startAutoLock() {
	clearTimeout(lockTimer);
	const timeout = AUTO_LOCK_TIMEOUT;
	if (timeout > 0 && get(isUnlocked)) {
		lockTimer = setTimeout(() => lock('auto'), timeout);
	}
}

export function resetAutoLock() {
  lastActivity = Date.now();
  startAutoLock();
}

export function startCriticalOperation() {
  isCriticalOperation.set(true);
  clearTimeout(lockTimer); // Pause auto-lock during critical op
  if (import.meta.env.DEV) console.log('[stores] Critical operation STARTED');
}

export function endCriticalOperation() {
  isCriticalOperation.set(false);
  resetAutoLock(); // Resume auto-lock
  if (import.meta.env.DEV) console.log('[stores] Critical operation ENDED');
}


// --- Lifecycle Management ---

function handleVisibilityChange() {
  if (!browser) return;
  if (document.hidden) {
    appState.set('background');
    // Lock immediately when app goes to background if it's unlocked
    if (get(isUnlocked)) {
      lock('auto');
    }
  } else {
    appState.set('active');
  }
}

function handleUserActivity() {
  lastActivity = Date.now();
}

// Set up monitoring for app state (background/foreground)
export function initializeAppStateMonitoring() {
  if (!browser) return;
  document.addEventListener('visibilitychange', handleVisibilityChange);
}

// Set up activity tracking for auto-lock
export function initializeActivityTracking() {
  if (!browser) return;
  const activityEvents = ['mousemove', 'keydown', 'touchstart', 'scroll'];
  activityEvents.forEach(event => document.addEventListener(event, handleUserActivity, { capture: true, passive: true }));
  
  // Check for inactivity periodically
  lockTimer = setInterval(() => {
    if (get(isUnlocked) && Date.now() - lastActivity > AUTO_LOCK_TIMEOUT) {
      lock('auto');
    }
  }, 10000); // Check every 10 seconds
}

export function cleanup() {
  if (!browser) return;
  clearTimeout(lockTimer);
  document.removeEventListener('visibilitychange', handleVisibilityChange);
  const activityEvents = ['mousemove', 'keydown', 'touchstart', 'scroll'];
  activityEvents.forEach(event => document.removeEventListener(event, handleUserActivity, { capture: true }));
}

// Initialize darkMode from localStorage
if (browser) {
  const storedDarkMode = localStorage.getItem('pv_dark_mode');
  if (storedDarkMode) {
    darkMode.set(JSON.parse(storedDarkMode));
  }
  darkMode.subscribe(value => {
    localStorage.setItem('pv_dark_mode', JSON.stringify(value));
    document.documentElement.classList.toggle('dark', value);
  });
}
