(function () {
    // test
    let dt = new Date();
    let ts =
        (dt.getFullYear().toString()) +
        (dt.getMonth().toString().length < 2 ? '0' + dt.getMonth().toString() : dt.getMonth().toString()) +
        (dt.getDate().toString().length < 2 ? '0' + dt.getDate().toString() : dt.getDate().toString()) +
        (dt.getHours().toString().length < 2 ? '0' + dt.getHours().toString() : dt.getHours().toString()) +
        (dt.getMinutes().toString().length < 2 ? '0' + dt.getMinutes().toString() : dt.getMinutes().toString()) +
        (dt.getSeconds().toString().length < 2 ? '0' + dt.getSeconds().toString() : dt.getSeconds().toString());
    let csv = [];
    let rows = document.querySelectorAll('form[name="form1"] > font > table:first-child > tbody > tr');
    for (let r of rows) {
        let csvStr = [];
        for (let c = 1; c < r.children.length - 1; c++) {
            csvStr.push('"' + r.children[c].innerText.replace(/(\r\n|\n|\r)/gm, '') + '"');
        }
        csv.push(csvStr.join(','));
    }
    let csvFile = window.btoa(unescape(encodeURIComponent(csv.join('\n'))));
    let link = document.createElement('a');
    link.href = 'data:text/csv;base64,' + csvFile;
    link.download = ts + '.csv';
    link.click();
})();