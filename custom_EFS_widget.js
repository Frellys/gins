window.addEventListener('load', async function () {
    let IDs = {
        'uszn10.eps74.ru': 219663,
        'solnechnoe.eps74.ru': 219750
    };
    let site_id = IDs[window.location.hostname].toString();
    function load_URL_as_text(url) {
        return new Promise(function (resolve, reject) {
            let xhr = new XMLHttpRequest();
            xhr.addEventListener('readystatechange', function () {
                if (this.readyState == 4 && this.status == 200) resolve(this.responseText);
            }, false);
            xhr.open('GET', url, true);
            xhr.send();
        });
    }
    let headScript = document.createElement('script');
    headScript.innerHTML = await load_URL_as_text('https://pos.gosuslugi.ru/bin/script.min.js');
    document.head.appendChild(headScript);
    let doc = (new DOMParser()).parseFromString(await load_URL_as_text('https://raw.githubusercontent.com/Frellys/gins/master/custom_EFS_widget.html'), 'text/html');
    let side = document.querySelector('div.main > div.r-sbr');
    let block = document.createElement('div');
    block.className = 'block';
    side.prepend(block);
    let link = document.createElement('style');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.innerHTML = doc.querySelector('body > style').innerHTML;
    document.head.appendChild(link);
    let banner = document.createElement('div');
    banner.innerHTML = doc.querySelector('body > div').innerHTML;
    block.appendChild(banner);
    let bodyScript = document.createElement('script');
    bodyScript.innerHTML = doc.querySelector('body > script').innerHTML.replace('site_id', site_id);
    document.body.appendChild(bodyScript);
}, { once: true });