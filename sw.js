self.addEventListener('install', function (e) {
    console.log('sw-evt: install');
    console.log(e);
    e.waitUntil(caches.open('v1').then(function (cache) {
        return cache.addAll([
            '/favicon.ico',
            '/Content/images/logo.png',
            '/Content/images/mapchel.png',
            '/Scripts/SAS/checkCapsLock.js',
            '/Scripts/SAS/img/SAS_warning.png'
        ]);
    }));
}, false);

self.addEventListener('fetch', function (e) {
    console.log(e);
    e.respondWith(
        caches.match(e.request).then((response) => {
            return response || fetch(e.request);
        })
    );
}, false);

self.addEventListener('message', function (msg) {
    console.log(msg);
}, false);