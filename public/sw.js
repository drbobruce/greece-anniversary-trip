// Greece 30 — minimal offline support.
//
// Strategy: network-first, cache-as-you-go. Every page/asset you've opened
// once while online gets cached and stays available offline after that —
// there's no fixed "precache everything" list, since Next.js build files
// are content-hashed and unknown ahead of time. In practice this means:
// open Today, Trip, Hotels, Travel, and Places once before you go, and
// they'll all still work with no signal.
//
// Live features (geolocation-based "Right Now" recommendations) run
// entirely from data already bundled into the page's JS, so once that
// page's assets are cached, Right Now keeps working offline too — only
// the GPS fix itself needs the device, never the network.

const CACHE_NAME = "greece-30-v1";

const OFFLINE_HTML = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Offline — Greece 30</title>
<style>
  body { margin: 0; min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #fbf7f0; color: #2b2620; font-family: -apple-system, system-ui, sans-serif; text-align: center; padding: 24px; }
  .card { max-width: 360px; }
  h1 { font-size: 1.25rem; margin-bottom: 8px; }
  p { color: #6b6154; line-height: 1.5; }
</style>
</head>
<body>
  <div class="card">
    <div style="font-size:2.5rem;margin-bottom:12px;">🕊️</div>
    <h1>You're offline</h1>
    <p>This page hasn't been loaded yet, so it's not saved for offline use. Open it once while you have signal and it'll be available here after that.</p>
  </div>
</body>
</html>`;

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Only handle GET requests on our own origin — everything else (analytics,
  // cross-origin map/image links, etc.) passes straight through untouched.
  if (request.method !== "GET" || new URL(request.url).origin !== self.location.origin) {
    return;
  }

  event.respondWith(
    fetch(request)
      .then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        return response;
      })
      .catch(async () => {
        const cached = await caches.match(request);
        if (cached) return cached;
        if (request.mode === "navigate") {
          return new Response(OFFLINE_HTML, {
            headers: { "Content-Type": "text/html" },
          });
        }
        return Response.error();
      })
  );
});
