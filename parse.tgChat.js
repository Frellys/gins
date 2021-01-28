(function () {
    let iis_sites = JSON.parse(jsonstr);
    let ret = [['Time', 'Link', 'Name', 'Status', 'Comment', 'ID', 'IsOurs'].join('\t')];
    document.querySelectorAll('div.message.default').forEach(function (message) {
        let ts = message.querySelector('div.body > div.pull_right').getAttribute('title');
        let text = message.querySelector('div.body > div.text');
        let link = new URL(text.querySelectorAll('a')[0].href).hostname;
        let name = Array.from(text.childNodes).filter(function (t) { return (t.nodeName == '#text' && t.data.includes('Название организации:')); })[0].data.split(': ').pop();
        let stat = text.querySelectorAll('a[href=""]')[0].innerText;
        let prim = ((stat == '#ВЫПОЛНЕНО') ? '' : Array.from(text.childNodes).filter(function (t) { return (t.nodeName == '#text'); }).map(function (t) { return t.data; }).join(' ').split('Прим')[1].split(': ')[1].split(' Инстр')[0]);
        let id = Array.from(text.querySelectorAll('a')).pop().innerText;
        let isOurs = iis_sites.includes(link).toString();
        ret.push([ts, link, name, stat, prim, id, isOurs].join('\t'));
    });
    copy(ret.join('\n'));
})();