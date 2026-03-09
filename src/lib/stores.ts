import { writable, get } from "svelte/store";
import { browser } from "$app/environment";
import type { VaultItem } from "./types";
import type { ReminderType } from "./reminders";

// --- Basic Stores ---
export const isUnlocked = writable(false);
export const vaultItems = writable<VaultItem[]>([]);
export const searchQuery = writable("");
export const categoryFilter = writable<string>("all"); // 'all' or category type
export const darkMode = writable(true); // Default to dark mode
export const showAddForm = writable(false);
export const editingItem = writable<VaultItem | null>(null);
export const biometricEnabled = writable(false);
export const appState = writable("active"); // 'active', 'background', 'locked'
export const showReminder = writable<ReminderType | null>(null);

// --- App State and Auto-Lock ---

// Critical operation flag to prevent locking during saves
export const isCriticalOperation = writable(false);

export function startCriticalOperation() {
  isCriticalOperation.set(true);
  clearTimeout(lockTimer); // Pause auto-lock during critical op
  if (import.meta.env.DEV) console.log("[stores] Critical operation STARTED");
}

export function endCriticalOperation() {
  isCriticalOperation.set(false);
  resetAutoLock(); // Resume auto-lock
  if (import.meta.env.DEV) console.log("[stores] Critical operation ENDED");
}

// Helper to get current state
function getCurrentAppState() {
  let currentState;
  appState.subscribe((state) => (currentState = state))();
  return currentState;
}

// Auto-lock configuration
const LOCK_TIMEOUT = 5 * 60 * 1000; // 5 minutes
const BACKGROUND_LOCK_DELAY = 10 * 1000; // 10 seconds after going to background
let lockTimer: ReturnType<typeof setTimeout>;
let backgroundTimer: ReturnType<typeof setTimeout>;
let lastActivity = Date.now();

// --- Core Functions ---

export function lock(reason = "manual") {
  // Prevent locking during critical operations (like saving)
  if (get(isCriticalOperation)) {
    if (import.meta.env.DEV)
      console.log("[stores] Lock prevented by critical operation");
    return;
  }

  if (import.meta.env.DEV) console.log(`[stores] Locking vault (reason: ${reason})`);

  isUnlocked.set(false);
  vaultItems.set([]);
  editingItem.set(null);
  showAddForm.set(false);
  appState.set("locked");

  clearTimeout(lockTimer);
  clearTimeout(backgroundTimer);

  // Clear sensitive data from memory and session
  if (typeof window !== "undefined") {
    sessionStorage.removeItem("pv_master_key");
    sessionStorage.removeItem("pv_temp_password");

    // Force garbage collection if available
    // @ts-ignore
    if (window.gc) {
      // @ts-ignore
      window.gc();
    }
  }
}

export function startAutoLock() {
  clearTimeout(lockTimer);
  lastActivity = Date.now();

  const timeout = LOCK_TIMEOUT;
  if (timeout > 0 && get(isUnlocked)) {
    lockTimer = setTimeout(() => lock("timeout"), timeout);
  }
}

export function resetAutoLock() {
  lastActivity = Date.now();
  startAutoLock();
}

// Enhanced background detection for iOS PWA
let visibilityTimeout: ReturnType<typeof setTimeout>;

export function initializeAppStateMonitoring() {
  if (typeof document === "undefined") return;

  // Detect if running as PWA (standalone mode)
  const isStandalone =
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as any).standalone === true;

  // Standard visibility API with debounce
  document.addEventListener("visibilitychange", debounceVisibilityChange);

  // iOS PWA specific events
  window.addEventListener("pagehide", handlePageHide);
  window.addEventListener("pageshow", handlePageShow);

  // Focus/blur events for additional coverage with debounce
  window.addEventListener("blur", debounceWindowBlur);
  window.addEventListener("focus", debounceWindowFocus);

  // PWA-specific: Lock immediately when app is hidden/closed
  if (isStandalone) {
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        // Lock immediately when PWA is hidden/closed
        setTimeout(() => {
          if (document.hidden) {
            lock("pwa-hidden");
          }
        }, 1000); // 1 second delay to avoid false positives
      }
    });
  }

  // iOS specific app state events
  if ("standalone" in window.navigator && (window.navigator as any).standalone) {
    // Running as PWA on iOS
    document.addEventListener(
      "webkitvisibilitychange",
      debounceVisibilityChange,
    );
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

function handlePageHide(event: Event) {
  // iOS PWA is being backgrounded or closed
  handleAppBackground();
}

function handlePageShow(event: PageTransitionEvent) {
  // iOS PWA is being foregrounded
  if (event.persisted) {
    // Page was restored from cache
    handleAppForeground();
  }
}

function handleWindowBlur() {
  // Only trigger if not already in background state
  const currentState = getCurrentAppState();
  if (currentState !== "background") {
    handleAppBackground();
  }
}

function handleWindowFocus() {
  handleAppForeground();
}

function handleAppBackground() {
  const currentState = getCurrentAppState();
  if (currentState === "background") return; // Already in background

  // Add debounce to prevent rapid state changes
  clearTimeout(backgroundTimer);

  appState.set("background");

  // Start background lock timer
  backgroundTimer = setTimeout(() => {
    const stillInBackground = getCurrentAppState() === "background";
    if (stillInBackground) {
      lock("background");
    }
  }, BACKGROUND_LOCK_DELAY);
}

function handleAppForeground() {
  const currentState = getCurrentAppState();
  if (currentState === "active") return; // Already active

  clearTimeout(backgroundTimer);

  const timeInBackground = Date.now() - lastActivity;

  if (
    timeInBackground > BACKGROUND_LOCK_DELAY &&
    currentState === "background"
  ) {
    // App was in background too long, lock it
    lock("background_timeout");
  } else {
    appState.set("active");
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
  if (typeof document === "undefined") return;

  const events = [
    "mousedown",
    "mousemove",
    "keypress",
    "scroll",
    "touchstart",
    "touchmove",
    "click",
    "keydown",
  ];

  const throttledTrackActivity = throttle(trackActivity, 1000);

  events.forEach((event) => {
    document.addEventListener(event, throttledTrackActivity, { passive: true });
  });
}

// Utility function to throttle activity tracking
function throttle(func: Function, limit: number) {
  let inThrottle: boolean;
  return function (this: any, ...args: any[]) {
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Cleanup function
export function cleanup() {
  clearTimeout(lockTimer);
  clearTimeout(backgroundTimer);
  clearTimeout(visibilityTimeout);

  if (typeof document !== "undefined") {
    document.removeEventListener("visibilitychange", debounceVisibilityChange);
    // @ts-ignore
    document.removeEventListener(
      "webkitvisibilitychange",
      debounceVisibilityChange,
    );
  }

  if (typeof window !== "undefined") {
    window.removeEventListener("pagehide", handlePageHide);
    window.removeEventListener("pageshow", handlePageShow);
    window.removeEventListener("blur", debounceWindowBlur);
    window.removeEventListener("focus", debounceWindowFocus);
  }
}

// Initialize darkMode from localStorage
if (browser) {
  const storedDarkMode = localStorage.getItem("pv_dark_mode");
  if (storedDarkMode) {
    darkMode.set(JSON.parse(storedDarkMode));
  }
  darkMode.subscribe((value) => {
    localStorage.setItem("pv_dark_mode", JSON.stringify(value));
    document.documentElement.classList.toggle("dark", value);
  });
}
