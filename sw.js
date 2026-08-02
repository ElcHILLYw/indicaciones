/* Manual de Indicaciones en Urgencias — service worker
   Guarda la app completa para que funcione sin conexión.
   Sube el número de VERSION cada vez que cambies index.html. */
const VERSION = 'indicaciones-v6';
const ARCHIVOS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './icon-180.png',
  './icon-maskable-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(VERSION)
      .then(c => c.addAll(ARCHIVOS))
      .then(() => self.skipWaiting())
      .catch(() => {})
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* Estrategia: primero la caché (la app es estática y pesa poco),
   y en segundo plano se refresca desde la red si hay conexión. */
self.addEventListener('fetch', e => {
  if(e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(guardado => {
      const red = fetch(e.request).then(resp => {
        if(resp && resp.status === 200 && resp.type === 'basic'){
          const copia = resp.clone();
          caches.open(VERSION).then(c => c.put(e.request, copia));
        }
        return resp;
      }).catch(() => guardado);
      return guardado || red;
    })
  );
});
