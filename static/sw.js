const CACHE_NAME = 'pocketvault-v2';
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/icon.svg',
  '/favicon.svg'
];

// Enhanced PWA features for iOS
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Skip non-GET requests and extension requests
  if (event.request.method !== 'GET' || 
      event.request.url.startsWith('chrome-extension://') ||
      event.request.url.startsWith('moz-extension://') ||
      event.request.url.startsWith('safari-web-extension://') ||
      event.request.url.startsWith('extension://')) {
    return;
  }
  
  // Skip requests that are not from our origin
  const url = new URL(event.request.url);
  const isOurOrigin = url.origin === self.location.origin;
  
  if (!isOurOrigin) {
    return;
  }
  
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      
      return fetch(event.request).then((response) => {
        // Only cache successful responses from same origin
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache).catch(err => {
            // Silently ignore cache errors for unsupported schemes
            if (!err.message.includes('chrome-extension')) {
              console.debug('Cache put failed:', err.message);
            }
          });
        });
        
        return response;
      }).catch(() => {
        // Return offline fallback if available
        return caches.match('/') || new Response('Offline', { status: 503 });
      });
    })
  );
});

// Background sync for iOS PWA
self.addEventListener('sync', (event) => {
  if (event.tag === 'vault-backup') {
    event.waitUntil(performBackgroundSync());
  }
});

async function performBackgroundSync() {
  // Perform any background tasks here
  console.log('Background sync performed');
}

// Handle app state changes
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'APP_STATE_CHANGE') {
    const { state } = event.data;
    
    if (state === 'background') {
      // App went to background, could trigger security measures
      console.log('App backgrounded via service worker');
    } else if (state === 'foreground') {
      // App came to foreground
      console.log('App foregrounded via service worker');
    }
  }
});

// iOS PWA specific handling
self.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the mini-infobar from appearing on mobile
  event.preventDefault();
  // Store the event so it can be triggered later
  self.deferredPrompt = event;
});

// Handle PWA installation
self.addEventListener('appinstalled', (event) => {
  console.log('PocketVault PWA installed');
});