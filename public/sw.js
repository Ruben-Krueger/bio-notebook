self.addEventListener("install", (event) => {
  console.log("[ServiceWorker] Installed");
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("[ServiceWorker] Activated");
  return self.clients.claim();
});

// Optional: Handle background sync or periodic checks
self.addEventListener("message", (event) => {
  if (event.data.type === "CHECK_EXPERIMENTS") {
    // Forward message to main app
    self.clients.matchAll().then((clients) => {
      clients.forEach((client) => {
        client.postMessage({
          type: "EXPERIMENT_CHECK_RESULT",
          data: event.data.experiments,
        });
      });
    });
  }
});

// Optional: Handle fetch events for caching
self.addEventListener("fetch", (event) => {
  // You can intercept requests, provide offline fallback, etc.
});
