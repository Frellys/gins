window.addEventListener('DOMContentLoaded', function () {
    // remove static width from tables
    document.querySelectorAll('div.content table').forEach(function (table) {
        table.style.width = 'auto';
    });
    // remove static size from images
    document.querySelectorAll('div.content img').forEach(function (img) {
        img.style.width = 'auto';
        img.style.height = 'auto';
    });
    // set horizontal bottom banners
    if (window.location.hostname == 'kurchatov74.ru') {
        document.querySelectorAll('div.page > div.cnt-wrp.bannersnet').forEach(function (wrap) {
            wrap.style.display = 'flex';
            wrap.style.gap = '1vmin';
            wrap.querySelectorAll('div.br > a > img').forEach(function (img) {
                img.style.maxWidth = 'unset';
            });
        });
    }
}, { once: true });