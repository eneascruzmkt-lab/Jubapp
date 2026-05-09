const CACHE_NAME = 'jubapp-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/css/app.css',
  '/js/app.js',
  '/js/router.js',
  '/js/store.js',
  '/manifest.json'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request)
      .then(res => {
        const clone = res.clone();
        caches.open(CACHE_NAME).then(c => c.put(e.request, clone));
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});

// Water reminder notification
self.addEventListener('message', e => {
  if (e.data && e.data.type === 'SCHEDULE_REMINDER') {
    const interval = e.data.intervalMs || 7200000; // default 2h
    setInterval(() => {
      self.registration.showNotification('Mama Juba\'s Almanac', {
        body: 'Time to drink water, dear. Your body will thank you.',
        icon: 'icons/icon-192.png',
        badge: 'icons/icon-192.png',
        tag: 'water-reminder'
      });
    }, interval);
  }
});
