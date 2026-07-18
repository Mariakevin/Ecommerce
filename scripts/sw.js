// === SERVICE WORKER: Chennai Retail ===
const CACHE_NAME = 'chennai-retail-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/styles/tokens.css',
  '/styles/base.css',
  '/styles/components.css',
  '/scripts/app.js',
  '/manifest.json',
  '/images/branding/logo.svg',
  '/images/branding/favicon.svg',
  '/offline.html',
  '/styles/utilities.css',
  '/scripts/analytics.js',
  '/scripts/cart-recovery.js',
  '/src/data/products.json'
];

// Install: Pre-cache critical assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate: Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys => 
      Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// Fetch: Cache-first for static, network-first for API
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Static assets: Cache-first
  if (request.destination === 'image' || 
      request.destination === 'style' || 
      request.destination === 'script' ||
      url.pathname.match(/\.(css|js|jpg|jpeg|png|svg|webp|woff2)$/)) {
    event.respondWith(
      caches.match(request).then(cached => {
        if (cached) return cached;
        return fetch(request).then(response => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
          }
          return response;
        });
      })
    );
    return;
  }
  
  // HTML pages: Stale-while-revalidate
  if (request.destination === 'document' || url.pathname.endsWith('.html')) {
    event.respondWith(
      caches.open(CACHE_NAME).then(cache => 
        cache.match(request).then(cached => {
          const fetchPromise = fetch(request).then(response => {
            if (response.ok) {
              cache.put(request, response.clone());
            }
            return response;
          }).catch(() => cached || caches.match('/offline.html'));
          return cached || fetchPromise;
        })
      )
    );
    return;
  }
  
  // Everything else: Network-first
  event.respondWith(
    fetch(request).catch(() => caches.match(request))
  );
});
