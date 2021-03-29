let layerObjectsNumFlag = false;
let layerObjects;
window.addEventListener('load', function () {
    let layers = map.layers.filter(function (layer) { return ('features' in layer); });
    layerObjects = Array.from(document.querySelectorAll('.layersDiv > .dataLayersDiv > label')).map(function (label) {
        let layer = layers.find(function (layer) { return layer.name == label.innerHTML.trim(); });
        if (layer) {
            return {
                name: label.innerHTML.trim(),
                table: layer.options.protocol.format.featureType,
                //layer: layer,
                label: label
            };
        }
    }).filter(Boolean);
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/Feature/getLayerObjectsNum', true);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.addEventListener('readystatechange', function () {
        if (this.readyState == 4 && this.status == 200) {
            layerObjectsNumFlag = true;
            let nums = this.responseText.split(',');
            layerObjects.forEach(function (req) {
                req.num = nums.shift();
                req.label.innerHTML = '&nbsp;' + req.name + '&nbsp;[' + req.num + ']';
                delete req.table;
                //delete req.layer;
                delete req.label;
            });
        }
    }, false);
    xhr.send(JSON.stringify({
        dbTables: layerObjects.map(function (el) { return el.table; })
    }));
}, { once: true });