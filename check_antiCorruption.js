// %systemroot%\system32\inetsrv\APPCMD list sites > c:\sites.txt
copy(`REPLACE`.split(/\r?\n/).filter(s => s.includes('state:Started')).map(function (line) {
    let link = line.split(' "')[1].split('"')[0];
    if (!link.includes(' ')) {
        link = 'http://' + link;
        console.log(link);
        return link;
    }
}));

// main
copy((Array.from(document.querySelectorAll('a[href*="antiCorruption"]')).filter(function (node) {
    return node.offsetParent !== null;
}).length != 0).toString() + ' ' + window.location.hostname);