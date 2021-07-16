window.addEventListener('load', function () {
    let query = window.location.search.replace('?', '').split('&').map(el => Object.fromEntries([el.split('=')])).find(q => 'enableLayers' in q);
    if (query) {
        query['enableLayers'].split(',').forEach(function (id) {
            for (let layer of map.layers) {
                if (layer.id == id) {
                    layer.visibility = true;
                    document.querySelector(`.dataLayersDiv > input[value="${layer.name}"]`).checked = true;
                    layer.redraw();
                    break;
                }
            }
        });
    }
}, false);

/**
 * constructs comma-separated query from enabled layers IDs
 * @returns {string}
 */
function getEnabledLayersQuery() {
    return '&enableLayers=' + Array.from(document.querySelectorAll('.dataLayersDiv > input:checked')).map(function (el) {
        let layer = map.layers.find(l => l.name == el.name);
        return layer[('protocol' in layer) ? 'protocol' : 'options'].Id;
    }).filter(Boolean).join(',');
}