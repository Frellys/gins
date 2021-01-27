self.addEventListener('install', function (e) {
    console.log('sw-evt: install');
    console.log(e);
}, false);

self.addEventListener('fetch', function (e) {
    console.log(e);
}, false);

self.addEventListener('message', function (msg) {
    console.log(msg);
}, false);