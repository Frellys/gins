(function () {
    let ts = (function (dt) {
        return [
            dt.getFullYear(),
            (dt.getMonth() + 1),
            dt.getDate(),
            dt.getHours(),
            dt.getSeconds()
        ].map((el) => el.toString().padStart(2, '0')).join('');
    })(new Date());
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
})();

(function () {
    let ts = (function (dt) {
        return [
            dt.getFullYear(),
            (dt.getMonth() + 1),
            dt.getDate(),
            dt.getHours(),
            dt.getSeconds()
        ].map((el) => el.toString().padStart(2, '0')).join('');
    })(new Date());
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