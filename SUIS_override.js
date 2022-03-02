window.addEventListener('DOMContentLoaded', function () {
    // paging
    let allowed = ['class', 'href'];
    document.querySelectorAll('div.pager *').forEach(function (a) {
        Array.prototype.map.call(a.attributes, el => el.nodeName).filter(attr => allowed.includes(attr) == false).forEach(el => a.removeAttribute(el));
    });
    // remove static width from tables
    document.querySelectorAll('div.content table').forEach(function (table) {
        table.style.width = 'auto';
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
        window.localStorage.removeItem('notification');
    }
    if (false) {
        if (window.localStorage.getItem('notification') !== 'true') {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', 'https://mitis74.eps74.ru/override/notification.html', true);
            xhr.onreadystatechange = function () {
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
            };
            xhr.send();
        }
    }
}, { once: true });
// set IRRequest styles
let irrs = [
    'minsocpriem.gov74.ru',
    'old.gzhi.gov74.ru/'
];
if (irrs.some(u => u.includes(window.location.host.split('.').shift()))) {
    if (window.location.pathname === '/InternetReception') {
        const style = document.createElement('style');
        style.type = 'text/css';
        style.appendChild(document.createTextNode('aside, footer, header > nav, header > .options { display: none !important; }'));
        style.appendChild(document.createTextNode('.cnt-wrp.bannersnet { display: none; }'));
        document.head.appendChild(style);
    }
}
/*
 * IRRequest print styling
 */
if (window.location.host.includes('kurchatov74')) {
    if (window.location.pathname.startsWith('/cms/InternetReceptionRequest/Edit')) {
        window.onbeforeprint = window.onafterprint = function (e) {
            document.querySelector('#header').style.display = (e.type === 'beforeprint') ? 'none' : '';
            document.querySelectorAll('.action_submit, .action_cancel').forEach(b => b.style.display = (e.type === 'beforeprint') ? 'none' : '');
            document.querySelectorAll('table.gridform > tbody > tr').forEach(function (tr, trx) {
                if (trx < 9) {
                    let inp = tr.querySelector('td:last-child > *:last-child');
                    if (inp.tagName === 'DIV') {
                        inp.remove();
                        tr.querySelector('td:last-child > *:last-child').style.display = '';
                    }
                    else {
                        inp.style.display = 'none';
                        let cnt = document.createElement('div');
                        cnt.innerHTML = (inp.tagName === 'SELECT') ? inp.querySelector('option[selected="selected"]').innerHTML : inp.value;
                        tr.querySelector('td:last-child').appendChild(cnt);
                    }
                }
                else {
                    tr.style.display = (e.type === 'beforeprint') ? 'none' : '';
                }
            });
        };
    }
}

/*style for ombudsman174*/
window.addEventListener('DOMContentLoaded', function () {
    if (window.location.host.includes('ombudsman174.pravmin74.ru')) {
        document.querySelector('div.cnt-wrp > aside.rt > div.clearfix>div>img').style.height = 'auto';
    }
})

// gzhi
if (window.location.host === 'old.gzhi.gov74.ru') {
    if (window.location.pathname !== '/InternetReception') {
        window.location.pathname = '/InternetReception';
    }
    if (window.location.protocol !== 'http:') {
        window.location.protocol = 'http:';
    }
}

window.addEventListener('DOMContentLoaded', function () {
	//document.querySelectorAll('iframe[src*="https://pos.gosuslugi.ru/"]').forEach(w => w.remove());
}, { once: true });