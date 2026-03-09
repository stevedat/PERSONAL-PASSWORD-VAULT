import { w as writable, g as get } from "./index.js";
const isUnlocked = writable(false);
const vaultItems = writable([]);
const searchQuery = writable("");
const categoryFilter = writable("all");
const darkMode = writable(true);
const showAddForm = writable(false);
const editingItem = writable(null);
const biometricEnabled = writable(false);
const showReminder = writable(null);
const isCriticalOperation = writable(false);
const AUTO_LOCK_TIMEOUT = 1 * 60 * 1e3;
let lockTimer;
function lock(reason = "auto") {
  if (get(isCriticalOperation)) {
    return;
  }
  isUnlocked.set(false);
  vaultItems.set([]);
  editingItem.set(null);
  showAddForm.set(false);
  sessionStorage.removeItem("pv_master_key");
}
function startAutoLock() {
  clearTimeout(lockTimer);
  const timeout = AUTO_LOCK_TIMEOUT;
  if (get(isUnlocked)) {
    lockTimer = setTimeout(() => lock("auto"), timeout);
  }
}
function resetAutoLock() {
  startAutoLock();
}
function startCriticalOperation() {
  isCriticalOperation.set(true);
  clearTimeout(lockTimer);
}
function endCriticalOperation() {
  isCriticalOperation.set(false);
  resetAutoLock();
}
export {
  searchQuery as a,
  showReminder as b,
  categoryFilter as c,
  darkMode as d,
  editingItem as e,
  biometricEnabled as f,
  startCriticalOperation as g,
  endCriticalOperation as h,
  isUnlocked as i,
  resetAutoLock as r,
  showAddForm as s,
  vaultItems as v
};
