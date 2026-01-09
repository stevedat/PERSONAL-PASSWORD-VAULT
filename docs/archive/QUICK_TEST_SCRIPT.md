# Quick Test Script - Console Commands

## Mục Đích
Các commands để test nhanh trong console mà không cần UI.

## Setup

Mở console (F12) và paste các commands dưới đây:

## 1. Check Current State

```javascript
// Check số lượng passwords hiện tại
console.log('Current vault items:', $vaultItems.length);
console.log('Items:', $vaultItems.map(i => ({ id: i.id, title: i.title })));

// Check editing state
console.log('Editing item:', $editingItem);

// Check form state
console.log('Show add form:', $showAddForm);
```

## 2. Monitor Store Changes

```javascript
// Watch vault items changes
const unsubscribe1 = vaultItems.subscribe(items => {
  console.log('🔵 VAULT CHANGED:', items.length, 'items');
  items.forEach((item, index) => {
    console.log(`  ${index + 1}. ${item.title} (${item.id.substring(0, 8)}...)`);
  });
});

// Watch editing state
const unsubscribe2 = editingItem.subscribe(item => {
  console.log('✏️ EDITING:', item ? `${item.title} (${item.id.substring(0, 8)}...)` : 'null');
});

// Watch form state
const unsubscribe3 = showAddForm.subscribe(show => {
  console.log('📝 FORM:', show ? 'OPEN' : 'CLOSED');
});

// To stop watching (run this when done):
// unsubscribe1(); unsubscribe2(); unsubscribe3();
```

## 3. Verify Store Reactivity

```javascript
// Force store update to test reactivity
console.log('Before update:', $vaultItems.length);
vaultItems.update(items => [...items]);
console.log('After update:', $vaultItems.length);
// Should see: [Main] vaultItems store changed
```

## 4. Check Auto-Backup

```javascript
// This requires IndexedDB access
(async () => {
  const db = await indexedDB.open('PocketVaultDB', 2);
  db.onsuccess = () => {
    const tx = db.result.transaction(['auto-backups'], 'readonly');
    const store = tx.objectStore('auto-backups');
    const request = store.getAll();
    
    request.onsuccess = () => {
      console.log('📦 AUTO-BACKUPS:', request.result.length);
      request.result.forEach((backup, index) => {
        const date = new Date(backup.timestamp);
        console.log(`  ${index + 1}. ${backup.itemCount} items - ${date.toLocaleString()}`);
      });
    };
  };
})();
```

## 5. Check Reminder Stats

```javascript
// Check reminder statistics
const stats = JSON.parse(localStorage.getItem('pv_reminder_stats') || '{}');
console.log('📊 REMINDER STATS:', {
  passwordsSinceBackup: stats.passwordsSinceBackup || 0,
  daysSinceBackup: stats.daysSinceBackup || 0,
  lastBackupDate: stats.lastBackupDate || 'Never',
  remindersDismissed: stats.remindersDismissed || 0
});

// Check reminder preferences
const prefs = JSON.parse(localStorage.getItem('pv_reminder_prefs') || '{}');
console.log('⚙️ REMINDER PREFS:', {
  enabled: prefs.enabled !== false,
  neverShow: prefs.neverShow || false,
  shownThisSession: prefs.shownThisSession || false
});
```

## 6. Simulate Operations

### Simulate Add
```javascript
console.log('🆕 Simulating ADD operation...');
console.log('1. Click + button');
console.log('2. Fill form');
console.log('3. Click Save');
console.log('Expected logs:');
console.log('  [Main] Add new password clicked');
console.log('  [AddEditForm] Saving item');
console.log('  [Main] saveItem called: {isNew: true}');
console.log('  [Main] Vault saved to storage');
console.log('  [AutoBackup] Creating backup');
```

### Simulate Edit
```javascript
console.log('✏️ Simulating EDIT operation...');
console.log('1. Click ✏️ button');
console.log('2. Modify data');
console.log('3. Click Update');
console.log('Expected logs:');
console.log('  [VaultItem] Edit clicked');
console.log('  [AddEditForm] Editing item (1 time only!)');
console.log('  [Main] saveItem called: {isNew: false}');
console.log('  [Main] Updating existing item');
console.log('  [Main] Vault saved to storage');
```

### Simulate Delete
```javascript
console.log('🗑️ Simulating DELETE operation...');
console.log('1. Click 🗑️ button');
console.log('2. Confirm');
console.log('Expected logs:');
console.log('  [Main] Delete item: {id}');
console.log('  [Main] Deleting item, new count: X');
console.log('  [Main] Item deleted, vault updated');
```

## 7. Performance Check

```javascript
// Measure save operation time
console.time('Save Operation');
// Perform save operation in UI
// Then in console:
console.timeEnd('Save Operation');
// Should be < 500ms
```

## 8. Clear All Data (CAUTION!)

```javascript
// ⚠️ WARNING: This will delete ALL vault data!
// Only use for testing!

if (confirm('⚠️ DELETE ALL DATA? This cannot be undone!')) {
  // Clear vault
  vaultItems.set([]);
  
  // Clear session
  sessionStorage.clear();
  
  // Clear local storage
  localStorage.removeItem('pv_reminder_stats');
  localStorage.removeItem('pv_reminder_prefs');
  localStorage.removeItem('pv_autobackup_config');
  
  // Clear IndexedDB
  indexedDB.deleteDatabase('PocketVaultDB');
  
  console.log('✅ All data cleared. Refresh page to start fresh.');
}
```

## 9. Export Debug Info

```javascript
// Export all debug info for troubleshooting
const debugInfo = {
  timestamp: new Date().toISOString(),
  vaultItemsCount: $vaultItems.length,
  items: $vaultItems.map(i => ({ id: i.id, title: i.title })),
  editingItem: $editingItem ? { id: $editingItem.id, title: $editingItem.title } : null,
  showAddForm: $showAddForm,
  reminderStats: JSON.parse(localStorage.getItem('pv_reminder_stats') || '{}'),
  reminderPrefs: JSON.parse(localStorage.getItem('pv_reminder_prefs') || '{}'),
  autoBackupConfig: JSON.parse(localStorage.getItem('pv_autobackup_config') || '{}'),
  sessionHasMasterKey: !!sessionStorage.getItem('pv_master_key')
};

console.log('📋 DEBUG INFO:');
console.log(JSON.stringify(debugInfo, null, 2));

// Copy to clipboard
copy(JSON.stringify(debugInfo, null, 2));
console.log('✅ Debug info copied to clipboard!');
```

## 10. Test Reactive Statements

```javascript
// Test if reactive statements are working
console.log('🧪 Testing reactive statements...');

// Test 1: Change vault items
console.log('Test 1: Updating vault items...');
const currentCount = $vaultItems.length;
vaultItems.update(items => [...items]);
console.log('Expected: [Main] vaultItems store changed');
console.log('Expected: [Main] Filtered items updated');

// Test 2: Open form
console.log('Test 2: Opening form...');
showAddForm.set(true);
console.log('Expected: [Main] showAddForm store changed: true');

// Test 3: Close form
console.log('Test 3: Closing form...');
showAddForm.set(false);
console.log('Expected: [Main] showAddForm store changed: false');
```

---

## Usage Tips

### Quick Health Check
```javascript
// Run this to quickly check if everything is working
console.log('🏥 HEALTH CHECK');
console.log('Vault items:', $vaultItems.length);
console.log('Form open:', $showAddForm);
console.log('Editing:', !!$editingItem);
console.log('Master key cached:', !!sessionStorage.getItem('pv_master_key'));
console.log('✅ All systems operational');
```

### Monitor All Changes
```javascript
// Run this at the start of testing to monitor everything
console.log('👀 MONITORING ALL CHANGES...');
vaultItems.subscribe(items => console.log('📦 Vault:', items.length, 'items'));
editingItem.subscribe(item => console.log('✏️ Editing:', item?.title || 'null'));
showAddForm.subscribe(show => console.log('📝 Form:', show ? 'OPEN' : 'CLOSED'));
console.log('✅ Monitoring active. Perform operations and watch console.');
```

---

**Note**: Các commands này chỉ dùng cho testing/debugging. Không dùng trong production!
