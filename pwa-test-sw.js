console.log('sww');
self.addEventListener('install', function (e) {
    console.log('evt-install');
    e.waitUntil(caches.open('gins').then(function (cache) {
        return cache.addAll([
            '/pwa-test-icon.png'
        ]);
    }));
});
self.addEventListener('fetch', function (e) {
    e.respondWith(caches.match(e.request).then((response) => {
        return response || fetch(e.request);
    }));
});