import { writable } from 'svelte/store';
import type { VaultItem } from './crypto';

export const isUnlocked = writable(false);
export const vaultItems = writable<VaultItem[]>([]);
export const searchQuery = writable('');
export const darkMode = writable(false);
export const showAddForm = writable(false);
export const editingItem = writable<VaultItem | null>(null);
export const biometricEnabled = writable(false);
export const appState = writable('active'); // 'active', 'background', 'locked'

// Helper to get current state
function getCurrentAppState() {
  let currentState;
  appState.subscribe(state => currentState = state)();
  return currentState;
}

// Auto-lock configuration
const LOCK_TIMEOUT = 5 * 60 * 1000; // 5 minutes
const BACKGROUND_LOCK_DELAY = 10 * 1000; // 10 seconds after going to background
let lockTimer: number;
let backgroundTimer: number;
let lastActivity = Date.now();

export function startAutoLock() {
  clearTimeout(lockTimer);
  lastActivity = Date.now();
  
  lockTimer = setTimeout(() => {
    lock('timeout');
  }, LOCK_TIMEOUT);
}

export function resetAutoLock() {
  lastActivity = Date.now();
  startAutoLock();
}

export function lock(reason = 'manual') {
  console.log(`Vault locked: ${reason}`);
  isUnlocked.set(false);
  vaultItems.set([]);
  appState.set('locked');
  clearTimeout(lockTimer);
  clearTimeout(backgroundTimer);
  
  // Clear sensitive data from memory and session
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem('pv_master_key');
    sessionStorage.removeItem('pv_temp_password');
    
    // Force garbage collection if available
    if (window.gc) {
      window.gc();
    }
  }
}

// Enhanced background detection for iOS PWA
let visibilityTimeout;

export function initializeAppStateMonitoring() {
  if (typeof document === 'undefined') return;

  // Standard visibility API with debounce
  document.addEventListener('visibilitychange', debounceVisibilityChange);
  
  // iOS PWA specific events
  window.addEventListener('pagehide', handlePageHide);
  window.addEventListener('pageshow', handlePageShow);
  
  // Focus/blur events for additional coverage with debounce
  window.addEventListener('blur', debounceWindowBlur);
  window.addEventListener('focus', debounceWindowFocus);
  
  // iOS specific app state events
  if ('standalone' in window.navigator && window.navigator.standalone) {
    // Running as PWA on iOS
    document.addEventListener('webkitvisibilitychange', debounceVisibilityChange);
  }
}

function debounceVisibilityChange() {
  clearTimeout(visibilityTimeout);
  visibilityTimeout = setTimeout(handleVisibilityChange, 100);
}

function debounceWindowBlur() {
  clearTimeout(visibilityTimeout);
  visibilityTimeout = setTimeout(handleWindowBlur, 100);
}

function debounceWindowFocus() {
  clearTimeout(visibilityTimeout);
  visibilityTimeout = setTimeout(handleWindowFocus, 100);
}

function handleVisibilityChange() {
  if (document.hidden) {
    handleAppBackground();
  } else {
    handleAppForeground();
  }
}

function handlePageHide(event) {
  // iOS PWA is being backgrounded or closed
  handleAppBackground();
}

function handlePageShow(event) {
  // iOS PWA is being foregrounded
  if (event.persisted) {
    // Page was restored from cache
    handleAppForeground();
  }
}

function handleWindowBlur() {
  // Only trigger if not already in background state
  const currentState = getCurrentAppState();
  if (currentState !== 'background') {
    handleAppBackground();
  }
}

function handleWindowFocus() {
  handleAppForeground();
}

function handleAppBackground() {
  const currentState = getCurrentAppState();
  if (currentState === 'background') return; // Already in background
  
  // Add debounce to prevent rapid state changes
  clearTimeout(backgroundTimer);
  
  console.log('App backgrounded');
  appState.set('background');
  
  // Start background lock timer
  backgroundTimer = setTimeout(() => {
    const stillInBackground = getCurrentAppState() === 'background';
    if (stillInBackground) {
      lock('background');
    }
  }, BACKGROUND_LOCK_DELAY);
}

function handleAppForeground() {
  const currentState = getCurrentAppState();
  if (currentState === 'active') return; // Already active
  
  console.log('App foregrounded');
  clearTimeout(backgroundTimer);
  
  const timeInBackground = Date.now() - lastActivity;
  
  if (timeInBackground > BACKGROUND_LOCK_DELAY && currentState === 'background') {
    // App was in background too long, lock it
    lock('background_timeout');
  } else {
    appState.set('active');
    resetAutoLock();
  }
}

// Activity tracking for more precise auto-lock
export function trackActivity() {
  lastActivity = Date.now();
  resetAutoLock();
}

// Initialize activity listeners
export function initializeActivityTracking() {
  if (typeof document === 'undefined') return;
  
  const events = [
    'mousedown', 'mousemove', 'keypress', 'scroll', 
    'touchstart', 'touchmove', 'click', 'keydown'
  ];
  
  const throttledTrackActivity = throttle(trackActivity, 1000);
  
  events.forEach(event => {
    document.addEventListener(event, throttledTrackActivity, { passive: true });
  });
}

// Utility function to throttle activity tracking
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

// Cleanup function
export function cleanup() {
  clearTimeout(lockTimer);
  clearTimeout(backgroundTimer);
  clearTimeout(visibilityTimeout);
  
  if (typeof document !== 'undefined') {
    document.removeEventListener('visibilitychange', debounceVisibilityChange);
    document.removeEventListener('webkitvisibilitychange', debounceVisibilityChange);
  }
  
  if (typeof window !== 'undefined') {
    window.removeEventListener('pagehide', handlePageHide);
    window.removeEventListener('pageshow', handlePageShow);
    window.removeEventListener('blur', debounceWindowBlur);
    window.removeEventListener('focus', debounceWindowFocus);
  }
}