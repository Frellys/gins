// variables
let layerObjectsNumArr = [];
let layerObjectsNumFlag = false;
// main
window.addEventListener('load', function () {
    let types = [];
    map.layers.forEach(function (layer) {
        if (layer.protocol && layer.protocol.featureType) {
            types.push(layer.protocol.featureType);
            layerObjectsNumArr.push({
                name: layer.name,
                type: layer.protocol.featureType
            });
        }
    });
    let xhttp = new XMLHttpRequest();
    xhttp.open('POST', '/Feature/getLayerObjectsNum', true);
    xhttp.setRequestHeader('Content-type', 'application/json');
    xhttp.send(JSON.stringify({
        types: types.join(',')
    }));
    xhttp.addEventListener('readystatechange', function () {
        if (this.readyState == 4 && this.status == 200) {
            let num = this.responseText.split(',');
            layerObjectsNumArr.forEach(function (el, idx) {
                el.num = num[idx];
            });
            document.querySelectorAll('.dataLayersDiv label').forEach(function (label) {
                for (let j = 0; j < layerObjectsNumArr.length; j++) {
                    if (label.innerText == ' ' + layerObjectsNumArr[j].name) {
                        label.innerText = ' ' + layerObjectsNumArr[j].name + ' [' + layerObjectsNumArr[j].num + ']';
                        break;
                    }
                }
            });
            layerObjectsNumFlag = true;
        }
    }, false);
}, { once: true });
