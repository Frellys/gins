// test me with:
// navigator.serviceWorker.register('Scripts/SAS/sw.js').then(() => { console.log('yeee'); });
self.addEventListener('install', function (e) {
    console.log('sw');
}, false);