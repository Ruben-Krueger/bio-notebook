self.addEventListener("install", (event) => {
  console.log("[ServiceWorker] Installed");
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("[ServiceWorker] Activated");
  return self.clients.claim();
});

// Optionally, cache files or handle fetch events here.
self.addEventListener("fetch", (event) => {
  // You can intercept requests, provide offline fallback, etc.
});
