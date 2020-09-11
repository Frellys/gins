{
    let sites = [];
    document.querySelectorAll('table')[0].querySelectorAll('tbody > tr:not(:first-child)').forEach(function (el) {
        sites.push({
            link: el.querySelectorAll('td')[0].querySelector('a').innerHTML,
            name: el.querySelectorAll('td')[1].innerHTML.replace(/  /g, ' ').replace(/&nbsp;/g, ''),
            dir: '',
            status: ''
        });
    });
    if (typeof console.table == 'function') {
        console.table(sites, ['link', 'name']);
        copy(sites);
        let size = '(' + parseInt(new Blob([JSON.stringify(sites)]).size / 1024) + ' KB' + ')';
        alert('sites ' + size + ' copied to clipboard');
    }
    else {
        console.log(sites);
    }
}