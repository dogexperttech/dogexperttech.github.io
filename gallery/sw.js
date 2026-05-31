const CACHE = "gallery-cache-v5";

self.addEventListener("install", (e) => {
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (e) => {
  const url = e.request.url;

  // images cache
  if (url.includes("/assets/")) {
    e.respondWith(cacheFirst(e.request));
    return;
  }

  e.respondWith(fetch(e.request));
});

async function cacheFirst(req) {
  const cache = await caches.open(CACHE);

  const cached = await cache.match(req);
  if (cached) return cached;

  const res = await fetch(req);

  cache.put(req, res.clone());
  return res;
}