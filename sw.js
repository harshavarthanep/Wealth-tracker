const CACHE_NAME = 'zenwealth-cache-v1';
const urlsToCache = [
  '.',
  '.index.html',
  '.manifest.json',
  '.icon-192',
  '.icon-512'
  // Add icon-192.png and icon-512.png here once you have them
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
