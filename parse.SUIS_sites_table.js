let sites = [];
document.querySelectorAll('table')[0].querySelectorAll('tbody > tr').forEach(function (el, idx) {
    if (idx != 0) {
        sites.push({
            link: el.querySelectorAll('td')[0].querySelector('a').innerHTML,
            name: el.querySelectorAll('td')[1].innerHTML,
            dir: '',
            status: ''
        });
    }
});
console.log(sites);