// sw.js — Service Worker StreamLoader
// Stratégie :
//   - HTML : network-first (pour propager les MAJ immédiatement)
//   - CSS/JS/images/fonts : stale-while-revalidate (rapide, mais se met à jour)
//   - /api/* : JAMAIS caché (SSE, POST, données dynamiques)
//   - POST/DELETE/PUT : jamais cachés

const VERSION = 'v1';
const STATIC_CACHE = `sl-static-${VERSION}`;
const RUNTIME_CACHE = `sl-runtime-${VERSION}`;

// Assets précachés au premier install (le "shell")
const PRECACHE = [
  '/',
  '/index.html',
  '/style.css',
  '/style-float.css',
  '/scripts/main.js',
];

// ─── Install : précache le shell ─────────────────────────────────
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) =>
      cache.addAll(PRECACHE.filter(Boolean)).catch((err) => {
        // Ne bloque pas l'install si un asset manque (ex : offline.html pas encore créé)
        console.warn('[SW] Precache partiel :', err);
      }),
    ),
  );
  self.skipWaiting();
});

// ─── Activate : purge les vieux caches ───────────────────────────
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => k !== STATIC_CACHE && k !== RUNTIME_CACHE)
          .map((k) => caches.delete(k)),
      ),
    ),
  );
  self.clients.claim();
});

// ─── Fetch : stratégies ──────────────────────────────────────────
self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // 1. Ne jamais toucher aux autres origines (flagcdn, Google Fonts, ipapi, etc.)
  if (url.origin !== self.location.origin) return;

  // 2. Ne jamais cacher l'API (SSE, POST, données dynamiques)
  if (url.pathname.startsWith('/api/')) return;

  // 3. Ne jamais cacher les méthodes non-GET
  if (req.method !== 'GET') return;

  // 4. HTML : network-first (frais d'abord, fallback cache offline)
  const accept = req.headers.get('accept') || '';
  if (req.mode === 'navigate' || accept.includes('text/html')) {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(RUNTIME_CACHE).then((c) => c.put(req, copy));
          return res;
        })
        .catch(() => caches.match(req).then((r) => r || caches.match('/index.html'))),
    );
    return;
  }

  // 5. Assets statiques : stale-while-revalidate
  event.respondWith(
    caches.open(RUNTIME_CACHE).then(async (cache) => {
      const cached = await cache.match(req);
      const fetchPromise = fetch(req)
        .then((res) => {
          if (res.ok) cache.put(req, res.clone());
          return res;
        })
        .catch(() => cached);
      return cached || fetchPromise;
    }),
  );
});