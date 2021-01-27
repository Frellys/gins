if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('Scripts/SAS/sw.js').then(() => {
        console.log('page: register register succeeded');
    });
    navigator.serviceWorker.controller.postMessage({
        prop: 'val'
    });
}