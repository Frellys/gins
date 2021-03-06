﻿window.addEventListener('DOMContentLoaded', function () {
    // rewrite url
    if (window.location.search.includes('\'')) {
        window.location.search.replace('\'', '%27');
    }
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
    // remove grants list
    if (window.location.pathname.startsWith('/cms')) {
        if (document.querySelector('div.page > div#header > h5').innerText.split(', ').pop().split('!')[0] != 'devel') {
            document.querySelectorAll('a[href="/cms/Grants/List"]').forEach(function (a) { a.parentNode.remove(); });
        }
    }
    // leave grants list
    if (window.location.pathname == '/cms/Grants/List') {
        if (document.querySelector('div.page > div#header > h5').innerText.split(', ').pop().split('!')[0] != 'devel') {
            alert('Недостаточно прав');
            window.history.back();
        }
    }
}, { once: true });