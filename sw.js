const CACHE_NAME = 'ancient-apothecary-v1';
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

// Notifications
self.addEventListener('message', e => {
  if (!e.data) return;

  // Water reminder
  if (e.data.type === 'SCHEDULE_REMINDER') {
    const interval = e.data.intervalMs || 7200000;
    setInterval(() => {
      self.registration.showNotification('Ancient Apothecary', {
        body: 'Time to drink water, dear. Your body will thank you.',
        icon: 'icons/icon-192.png',
        badge: 'icons/icon-192.png',
        tag: 'water-reminder'
      });
    }, interval);
  }

  // Daily morning notification
  if (e.data.type === 'SCHEDULE_DAILY') {
    function scheduleMorning() {
      const now = new Date();
      const next = new Date(now);
      next.setHours(8, 0, 0, 0);
      if (next <= now) next.setDate(next.getDate() + 1);
      const ms = next - now;
      setTimeout(() => {
        self.registration.showNotification('Ancient Apothecary', {
          body: 'Good morning. Your daily recipe is ready.',
          icon: 'icons/icon-192.png',
          badge: 'icons/icon-192.png',
          tag: 'daily-morning'
        });
        // Schedule next day
        scheduleMorning();
      }, ms);
    }
    scheduleMorning();
  }
});

// Open app on notification click
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(
    self.clients.matchAll({ type: 'window' }).then(clients => {
      if (clients.length) return clients[0].focus();
      return self.clients.openWindow('/');
    })
  );
});
