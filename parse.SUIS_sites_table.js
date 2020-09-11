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
    console.log(sites);
    copy(sites);
}