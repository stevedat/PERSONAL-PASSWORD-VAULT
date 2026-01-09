# Form State & PWA Update Fix

## Issues Fixed

### 1. Form State Bug - Edit data showing in Add New form
**Problem**: Khi user edit một password, sau đó cancel, rồi click "Add New", form vẫn hiển thị data của item vừa edit.

**Root Cause**: 
- Có 2 reactive statements riêng biệt xử lý `$editingItem` và `$showAddForm`
- Khi cancel edit, cả 2 stores được clear cùng lúc
- Reactive statements chạy không đồng bộ, dẫn đến race condition
- Form reset logic không chạy đúng thứ tự

**Solution**:
1. **Merged reactive statements**: Gộp 2 reactive statements thành 1 để xử lý đồng bộ
2. **Added condition check**: Chỉ reset form khi thực sự cần (có data cũ)
3. **Fixed order in addNew()**: Clear `editingItem` TRƯỚC, sau đó mới set `showAddForm`

**Code Changes**:

```javascript
// BEFORE: 2 separate reactive statements (race condition)
$: {
  if ($editingItem && $editingItem.id !== lastEditingId) {
    // Load edit data
  } else if (!$editingItem && lastEditingId !== null) {
    // Clear edit state
  }
}

$: {
  if ($showAddForm && !$editingItem) {
    // Reset form - MAY RUN BEFORE editingItem is cleared!
  }
}

// AFTER: Single reactive statement (synchronized)
$: {
  if ($editingItem && $editingItem.id !== lastEditingId) {
    // EDIT MODE: Load item data
    lastEditingId = $editingItem.id;
    isEditing = true;
    // ... load all fields
  } else if ($showAddForm && !$editingItem) {
    // ADD MODE: Reset only if needed
    if (isEditing || title || username || password || note || category !== 'other') {
      // Reset all fields
      isEditing = false;
      title = '';
      username = '';
      password = '';
      // ... reset all
    }
  }
}
```

**addNew() function fix**:
```javascript
// BEFORE
function addNew() {
  showAddForm.set(true);      // Set first
  editingItem.set(null);      // Clear second - TOO LATE!
}

// AFTER
function addNew() {
  editingItem.set(null);      // Clear FIRST
  showAddForm.set(true);      // Then show form
}
```

### 2. PWA Update System
**Problem**: User cần biết PWA sẽ update như thế nào khi webapp có code mới.

**How PWA Update Works**:

#### Service Worker Update Flow:
1. **Browser checks for updates**: Mỗi khi user mở PWA hoặc reload page
2. **New SW detected**: Browser download SW mới nếu có thay đổi
3. **SW waits**: SW mới ở trạng thái "waiting" cho đến khi:
   - User đóng tất cả tabs/windows của app
   - Hoặc gọi `skipWaiting()` để activate ngay

#### Our Implementation:
```javascript
// static/sw.js
const CACHE_NAME = 'pocketvault-v4'; // Bump version = force update
const APP_VERSION = '1.0.1';

self.addEventListener('install', (event) => {
  // Force immediate activation
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  // Delete old caches
  caches.keys().then((cacheNames) => {
    cacheNames.forEach((cacheName) => {
      if (cacheName !== CACHE_NAME) {
        caches.delete(cacheName);
      }
    });
  });
  
  // Notify all clients about update
  self.clients.matchAll().then((clients) => {
    clients.forEach((client) => {
      client.postMessage({
        type: 'SW_UPDATED',
        version: APP_VERSION,
        cacheName: CACHE_NAME
      });
    });
  });
  
  // Take control immediately
  self.clients.claim();
});
```

#### Update Detection (UpdateNotification component):
```javascript
// Check for updates every 60 seconds
setInterval(() => {
  registration.update();
}, 60000);

// Listen for SW updates
navigator.serviceWorker.addEventListener('message', (event) => {
  if (event.data.type === 'SW_UPDATED') {
    showUpdateBanner = true;
    newVersion = event.data.version;
  }
});
```

#### User Experience:
1. **Auto-check**: PWA tự động check update mỗi 60 giây
2. **Update banner**: Hiển thị banner khi có update mới
3. **One-click update**: User click "Update Now" → reload page
4. **Immediate activation**: Không cần đóng app, update ngay lập tức

## Testing Steps

### Test Form State Fix:
1. ✅ Add new password → Save → Success
2. ✅ Edit password → Change data → Cancel
3. ✅ Click "Add New" → Form should be EMPTY (not showing edit data)
4. ✅ Edit password → Save → Success
5. ✅ Click "Add New" → Form should be EMPTY
6. ✅ Edit password → Cancel → Edit another password → Correct data shown

### Test PWA Update:
1. ✅ Deploy new version with bumped CACHE_NAME (v3 → v4)
2. ✅ Open PWA (old version)
3. ✅ Wait 60 seconds or reload
4. ✅ Update banner should appear
5. ✅ Click "Update Now"
6. ✅ Page reloads with new version
7. ✅ Check console: Should see new cache version

## Technical Details

### Form State Management:
- **Single source of truth**: One reactive statement handles both modes
- **Conditional reset**: Only reset when form has old data
- **Proper order**: Clear editingItem before showing add form
- **lastEditingId tracking**: Prevents infinite reactive loops

### PWA Update Mechanism:
- **skipWaiting()**: New SW activates immediately without waiting
- **clients.claim()**: Takes control of all pages immediately
- **Cache versioning**: Increment CACHE_NAME to force update
- **Message passing**: SW notifies clients about updates
- **Auto-check**: 60-second interval for update detection

## Version History
- **v1.0.0** (CACHE v3): Initial release
- **v1.0.1** (CACHE v4): Form state fix + PWA update improvements

## Notes
- Form state fix eliminates race condition between reactive statements
- PWA update is automatic and seamless for users
- No need to close app for updates (skipWaiting + claim)
- Update banner shows version info for transparency
- Cache versioning ensures all assets are refreshed
