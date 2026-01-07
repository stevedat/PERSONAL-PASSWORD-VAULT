# PWA Freeze/Hang Issues - Debug & Fix 🔧

## Vấn Đề

### Triệu chứng:
- PWA đôi khi bị đứng/freeze
- Không thao tác được
- Không load
- Không ghi được

### Nguyên nhân có thể:

## 1. ❌ IndexedDB Transaction Blocking

### Vấn đề:
```typescript
// IndexedDB transaction có thể bị block nếu:
// 1. Transaction quá lâu
// 2. Nhiều transaction cùng lúc
// 3. Transaction không close
```

### Triệu chứng:
- Save/Load bị treo
- UI freeze khi save
- Timeout errors

### Fix:
```typescript
// Add timeout to IndexedDB operations
static async saveVault(items: VaultItem[], masterPassword: string): Promise<void> {
  return Promise.race([
    this._saveVault(items, masterPassword),
    new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Save timeout')), 10000)
    )
  ]);
}
```

## 2. ❌ Service Worker Cache Blocking

### Vấn đề:
```javascript
// Service Worker có thể block nếu:
// 1. Cache quá lớn
// 2. Nhiều cache operations
// 3. Cache.match() chậm
```

### Triệu chứng:
- App load chậm
- Freeze khi offline
- Network requests timeout

### Fix:
```javascript
// Add timeout to cache operations
event.respondWith(
  Promise.race([
    caches.match(event.request),
    new Promise((resolve) => 
      setTimeout(() => resolve(fetch(event.request)), 3000)
    )
  ])
);
```

## 3. ❌ PBKDF2 Blocking Main Thread

### Vấn đề:
```typescript
// PBKDF2 600k iterations = ~500ms
// Blocks main thread
// UI freeze during encryption/decryption
```

### Triệu chứng:
- UI freeze khi unlock
- UI freeze khi save
- Scroll lag

### Fix:
```typescript
// Use Web Worker for crypto operations
// Or show loading indicator
```

## 4. ❌ Memory Leak

### Vấn đề:
```typescript
// Timers không clear
// Event listeners không remove
// Large objects không release
```

### Triệu chứng:
- App chậm dần
- Freeze sau dùng lâu
- High memory usage

### Fix:
```typescript
// Clear timers in cleanup
onDestroy(() => {
  clearTimeout(lockTimer);
  clearTimeout(backgroundTimer);
});
```

## 5. ❌ Race Conditions

### Vấn đề:
```typescript
// Multiple saves cùng lúc
// Save during lock
// Save during background
```

### Triệu chứng:
- Data loss
- Inconsistent state
- Freeze during save

### Fix:
```typescript
// Use critical operation flag
if (isCriticalOperation) {
  console.log('Lock prevented during save');
  return;
}
```

## Diagnostic Tools

### 1. Performance Monitor

```javascript
// Add to main page
let lastActivity = Date.now();
let freezeCount = 0;

setInterval(() => {
  const now = Date.now();
  const delta = now - lastActivity;
  
  if (delta > 1000) {
    freezeCount++;
    console.error('[FREEZE DETECTED]', {
      duration: delta,
      count: freezeCount,
      timestamp: new Date().toISOString()
    });
  }
  
  lastActivity = now;
}, 100);
```

### 2. IndexedDB Monitor

```typescript
// Wrap all IndexedDB operations
static async saveVault(items: VaultItem[], masterPassword: string): Promise<void> {
  const start = Date.now();
  console.log('[Storage] Save started');
  
  try {
    await this._saveVault(items, masterPassword);
    console.log('[Storage] Save completed', Date.now() - start, 'ms');
  } catch (error) {
    console.error('[Storage] Save failed', Date.now() - start, 'ms', error);
    throw error;
  }
}
```

### 3. Service Worker Monitor

```javascript
// In sw.js
let requestCount = 0;
let cacheHits = 0;
let cacheMisses = 0;

self.addEventListener('fetch', (event) => {
  requestCount++;
  
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        cacheHits++;
        console.log('[SW] Cache hit', cacheHits, '/', requestCount);
      } else {
        cacheMisses++;
        console.log('[SW] Cache miss', cacheMisses, '/', requestCount);
      }
      return response || fetch(event.request);
    })
  );
});
```

## Quick Fixes

### Fix 1: Add Timeouts

```typescript
// src/lib/storage.ts
static async saveVault(items: VaultItem[], masterPassword: string): Promise<void> {
  const timeout = new Promise((_, reject) => 
    setTimeout(() => reject(new Error('Save timeout after 10s')), 10000)
  );
  
  const save = (async () => {
    const db = await this.openDB();
    const encryptedVault = await CryptoEngine.encrypt(items, masterPassword);
    
    const storageData = {
      data: this.arrayBufferToBase64(encryptedVault.data),
      iv: this.arrayBufferToBase64(encryptedVault.iv),
      salt: this.arrayBufferToBase64(encryptedVault.salt)
    };
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put(storageData, 'vault');
      
      // Add transaction timeout
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
      transaction.onabort = () => reject(new Error('Transaction aborted'));
      
      request.onerror = () => reject(request.error);
    });
  })();
  
  return Promise.race([save, timeout]);
}
```

### Fix 2: Debounce Save Operations

```typescript
// src/lib/stores.ts
let saveDebounceTimer: number;

export function debouncedSave(items: VaultItem[], password: string) {
  clearTimeout(saveDebounceTimer);
  
  saveDebounceTimer = setTimeout(async () => {
    try {
      await StorageEngine.saveVault(items, password);
      console.log('[Store] Debounced save completed');
    } catch (error) {
      console.error('[Store] Debounced save failed', error);
    }
  }, 500); // Wait 500ms before saving
}
```

### Fix 3: Loading Indicators

```svelte
<!-- Show loading during crypto operations -->
<script>
  let isProcessing = false;
  
  async function saveItem(item) {
    isProcessing = true;
    try {
      await onSave(item);
    } finally {
      isProcessing = false;
    }
  }
</script>

{#if isProcessing}
  <div class="loading-overlay">
    <div class="spinner"></div>
    <p>Processing...</p>
  </div>
{/if}
```

### Fix 4: Error Recovery

```typescript
// Auto-retry on failure
static async saveVaultWithRetry(
  items: VaultItem[], 
  masterPassword: string,
  maxRetries = 3
): Promise<void> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      await this.saveVault(items, masterPassword);
      return;
    } catch (error) {
      console.error(`[Storage] Save attempt ${i + 1} failed`, error);
      
      if (i === maxRetries - 1) {
        throw error;
      }
      
      // Wait before retry
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
}
```

### Fix 5: Service Worker Optimization

```javascript
// static/sw.js
const CACHE_NAME = 'pocketvault-v3';
const MAX_CACHE_SIZE = 50; // Limit cache size

self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }
  
  const url = new URL(event.request.url);
  
  // Skip extension requests
  if (!url.origin === self.location.origin) {
    return;
  }
  
  event.respondWith(
    // Add timeout to cache operations
    Promise.race([
      caches.match(event.request).then((response) => {
        if (response) {
          return response;
        }
        
        return fetch(event.request).then((response) => {
          if (!response || response.status !== 200) {
            return response;
          }
          
          // Cache in background (non-blocking)
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, response.clone()).catch(() => {
              // Ignore cache errors
            });
          });
          
          return response;
        });
      }),
      // Timeout after 5 seconds
      new Promise((resolve) => 
        setTimeout(() => resolve(fetch(event.request)), 5000)
      )
    ]).catch(() => {
      // Fallback to network
      return fetch(event.request);
    })
  );
});
```

## Testing Checklist

### Test Scenarios:

**1. Heavy Load**
```
- Add 100+ passwords
- Save multiple times quickly
- Check for freeze
```

**2. Offline Mode**
```
- Disconnect network
- Try to save
- Try to load
- Check for freeze
```

**3. Background/Foreground**
```
- Save password
- Switch to another app immediately
- Switch back
- Check data saved
```

**4. Long Session**
```
- Keep app open for 1 hour
- Perform various operations
- Check for memory leaks
- Check for slowdown
```

**5. Concurrent Operations**
```
- Save while loading
- Edit while saving
- Delete while saving
- Check for race conditions
```

## Monitoring in Production

### Add Error Tracking

```typescript
// Global error handler
window.addEventListener('error', (event) => {
  console.error('[Global Error]', {
    message: event.message,
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno,
    error: event.error
  });
  
  // Send to analytics
  if (window.gtag) {
    gtag('event', 'exception', {
      description: event.message,
      fatal: false
    });
  }
});

// Unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  console.error('[Unhandled Rejection]', event.reason);
  
  if (window.gtag) {
    gtag('event', 'exception', {
      description: event.reason?.message || 'Unhandled rejection',
      fatal: false
    });
  }
});
```

### Performance Monitoring

```typescript
// Track slow operations
const performanceObserver = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (entry.duration > 1000) {
      console.warn('[Slow Operation]', {
        name: entry.name,
        duration: entry.duration,
        type: entry.entryType
      });
    }
  }
});

performanceObserver.observe({ entryTypes: ['measure', 'navigation'] });
```

## Kết Luận

### Nguyên nhân chính:
1. ❌ IndexedDB blocking (most likely)
2. ❌ PBKDF2 blocking main thread
3. ❌ Service Worker cache issues
4. ❌ Memory leaks
5. ❌ Race conditions

### Giải pháp:
1. ✅ Add timeouts to all async operations
2. ✅ Debounce save operations
3. ✅ Show loading indicators
4. ✅ Add error recovery
5. ✅ Optimize Service Worker
6. ✅ Add monitoring

### Next Steps:
1. Implement timeout fixes
2. Add performance monitoring
3. Test on real devices
4. Monitor production errors

---

**Ngày**: 7 tháng 1, 2026
**Priority**: Critical 🔴
**Status**: Investigating
