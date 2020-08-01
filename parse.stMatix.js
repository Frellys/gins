//let orig = 'first\nsecond';
//console.log(orig);
//let res = window.btoa(orig);
//console.log(res);
//let back = window.atob(res);
//console.log(back);
let csv = [];
let rows = document.querySelectorAll('form[name="form1"] > font > table:first-child > tbody > tr');
for (let r of rows) {
    let csvStr = [];
    for (let c = 1; c < r.children.length - 1; c++) {
        csvStr.push('"' + r.children[c].innerText + '"');
    }
    csv.push(csvStr.join(','));
    //console.log(r.children[1].innerText);
}
//csv.forEach(function (el, idx, arr) {
//    console.log(el);
//});
console.log(csv);