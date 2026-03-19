const CACHE_NAME = 'zenwealth-cache-v1'; // Bumped version to force phone to update

// Install Event - Bulletproof version
self.addEventListener('install', (event) => {
  self.skipWaiting(); // Forces the browser to activate this immediately
  
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Removed the risky './' which breaks on GitHub Pages
      return cache.addAll([
        'index.html',
        'manifest.json',
        'icon-192.png',
        'icon-512.png'
      ]).catch(err => console.log("Cache error bypassed:", err)); 
      // ^ This catch prevents the SW from crashing if a file path is weird
    })
  );
});

// Fetch Event - Required for PWA installability
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
