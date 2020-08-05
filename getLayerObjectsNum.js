// variables
let layerObjectsNumArr = [];
let layerObjectsNumFlag = false;
// main
window.addEventListener('load', async function () {
    let types = [];
    for (let i = 0; i < map.layers.length; i++) {
        if (map.layers[i].protocol && map.layers[i].protocol.featureType) {
            types.push(map.layers[i].protocol.featureType);
            layerObjectsNumArr.push({
                name: map.layers[i].name,
                type: map.layers[i].protocol.featureType
            });
        }
    }
    let xhttp = new XMLHttpRequest();
    xhttp.open('POST', window.location.origin + '/Feature/getLayerObjectsNum', true);
    xhttp.setRequestHeader('Content-type', 'application/json; charset=windows-1251');
    xhttp.send(JSON.stringify({
        types: types.join(',')
    }));
    xhttp.onreadystatechange = async function () {
        if (this.readyState == 4 && this.status == 200) {
            let num = this.responseText.split(',');
            for (let i = 0; i < layerObjectsNumArr.length; i++) {
                layerObjectsNumArr[i].num = num[i];
            }
            let labels = document.querySelectorAll('.dataLayersDiv label');
            for (let i = 0; i < labels.length; i++) {
                for (let j = 0; j < layerObjectsNumArr.length; j++) {
                    if (labels[i].innerText == ' ' + layerObjectsNumArr[j].name) {
                        labels[i].innerText = ' ' + layerObjectsNumArr[j].name + ' [' + layerObjectsNumArr[j].num + ']';
                        break;
                    }
                }
            }
            layerObjectsNumFlag = true;
        }
    };
}, { once: true });