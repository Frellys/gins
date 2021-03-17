window.addEventListener('load', function () {
    let layers = map.layers.filter(function (layer) { return ('features' in layer); });
    let request = Array.from(document.querySelectorAll('.layersDiv > .dataLayersDiv > label')).map(function (label) {
        let layer = layers.filter(function (layer) { return layer.name == label.innerHTML.trim(); })[0];
        if (layer) {
            return {
                name: label.innerHTML.trim(),
                table: layer.options.protocol.format.featureType,
                layer: layer,
                label: label
            };
        }
    }).filter(Boolean);
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/Feature/getLayerObjectsNum', true);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.addEventListener('readystatechange', function () {
        if (this.readyState == 4 && this.status == 200) {
            let nums = this.responseText.split(',');
            request.forEach(function (req) {
                req.label.innerHTML = '&nbsp;' + req.name + '&nbsp; [' + nums.shift() + ']';
            });
        }
    }, false);
    xhr.send(JSON.stringify({
        dbTables: request.map(function (el) { return el.table; })
    }));
}, { once: true });