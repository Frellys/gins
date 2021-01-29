if ('serviceWorker' in navigator) {
    if (!navigator.serviceWorker.controller) {
        navigator.serviceWorker.register('sw.js').then(function () {
            console.log('page: register register succeeded');
        });
        navigator.serviceWorker.ready.then(function (swr) {
            swr.active.postMessage('msg to newly registered sw');
        });
    }
    else {
        navigator.serviceWorker.controller.postMessage('regular msg');
    }
}