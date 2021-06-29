﻿window.addEventListener('DOMContentLoaded', function () {
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
    // notification
    if (window.localStorage.getItem('notification') !== 'true') {
        let xhr = new XMLHttpRequest();
        xhr.addEventListener('readystatechange', function () {
            if (this.readyState == 4 && this.status == 200) {
                let notification = new DOMParser().parseFromString(this.responseText, 'text/html').querySelector('.maintenance-wrap');
                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                document.body.prepend(notification);
                window.old_overflow = document.documentElement.style.overflow;
                document.documentElement.style.overflow = 'hidden';
                document.querySelector('.maintenance-agree').addEventListener('click', function () {
                    document.documentElement.style.overflow = window.old_overflow;
                    document.querySelector('.maintenance-wrap').remove();
                    window.localStorage.setItem('notification', 'true');
                }, false);
            }
        }, false);
        xhr.open('GET', 'https://mitis74.eps74.ru/override/notification.html', true);
        xhr.send();
    }
}, { once: true });