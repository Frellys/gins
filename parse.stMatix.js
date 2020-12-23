{
    let dt = new Date();
    let ts =
        (dt.getFullYear().toString()) +
        ((dt.getMonth() + 1).toString().length < 2 ? '0' + (dt.getMonth() + 1).toString() : (dt.getMonth() + 1).toString()) +
        (dt.getDate().toString().length < 2 ? '0' + dt.getDate().toString() : dt.getDate().toString()) +
        (dt.getHours().toString().length < 2 ? '0' + dt.getHours().toString() : dt.getHours().toString()) +
        (dt.getMinutes().toString().length < 2 ? '0' + dt.getMinutes().toString() : dt.getMinutes().toString()) +
        (dt.getSeconds().toString().length < 2 ? '0' + dt.getSeconds().toString() : dt.getSeconds().toString());
    let csv = [];
    document.querySelectorAll('form[name="form1"] > font > table:first-child > tbody > tr').forEach(function (r) {
        let csvStr = [];
        for (let c = 1; c < r.children.length - 1; c++) {
            csvStr.push('"' + r.children[c].innerText.replace(/(\r\n|\n|\r)/gm, '') + '"');
        }
        csv.push(csvStr.join(','));
    });
    let csvFile = window.btoa(unescape(encodeURIComponent(csv.join('\n'))));
    let link = document.createElement('a');
    link.href = 'data:text/csv;base64,' + csvFile;
    link.download = ts + '.csv';
    link.click();
}

(function () {
    let dt = new Date();
    let ts =
        (dt.getFullYear().toString()) +
        ((dt.getMonth() + 1).toString().length < 2 ? '0' + (dt.getMonth() + 1).toString() : (dt.getMonth() + 1).toString()) +
        (dt.getDate().toString().length < 2 ? '0' + dt.getDate().toString() : dt.getDate().toString()) +
        (dt.getHours().toString().length < 2 ? '0' + dt.getHours().toString() : dt.getHours().toString()) +
        (dt.getMinutes().toString().length < 2 ? '0' + dt.getMinutes().toString() : dt.getMinutes().toString()) +
        (dt.getSeconds().toString().length < 2 ? '0' + dt.getSeconds().toString() : dt.getSeconds().toString());
    let csv = [];
    document.querySelectorAll('div#grid-devHistory > div.x-grid > div.x-grid-viewport > div.x-grid-body > table > tbody > tr').forEach(function (r) {
        csv.push(Array.from(r.querySelectorAll('td')).map(function (c) {
            return ('"' + c.innerText.replace(/(\r\n|\n|\r)/gm, '') + '"');
        }).join(','));
    });
    let csvFile = window.btoa(unescape(encodeURIComponent(csv.join('\n'))));
    let link = document.createElement('a');
    link.href = 'data:text/csv;base64,' + csvFile;
    link.download = ts + '.csv';
    link.click();
})();