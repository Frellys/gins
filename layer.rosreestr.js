let rosreestr_layers = [
    { name: 'Земельные участки (гринфилд)', marker: '/Scripts/SAS/img/place-marker-64-red.png' },
    { name: 'Здания (браунфилд)', marker: '/Scripts/SAS/img/place-marker-64-gray.png' },
    { name: 'Индустриальные парки', marker: '/Scripts/SAS/img/place-marker-64-brown.png' },
    { name: 'Росреестр рекреация', marker: '/Scripts/SAS/img/place-marker-64-red.png' },
    // ours
    { name: 'Мостовые сооружения', marker: '/Scripts/SAS/img/place-marker-64-yellow.png' },
    { name: 'ТОСЭР', marker: '/Scripts/SAS/img/place-marker-64-green.png' }
];
window.addEventListener('DOMContentLoaded', function () {
    map.layers.forEach(function (l) {
        if (rosreestr_layers.map(rl => rl.name).includes(l.name)) {
            l.markers = new OpenLayers.Layer.Markers('markers');
            map.addLayer(l.markers);
            l.markers.setZIndex(1001);
            l.markers.setVisibility(true);
            l.events.register('loadend', l, function () {
                l.features.forEach(function (feature) {
                    let g = feature.geometry.components[0].components[0].components;
                    let center = new function () {
                        this.x = g.reduce(function (acc, cur) { return acc + cur.x; }, 0) / g.length;
                        this.y = g.reduce(function (acc, cur) { return acc + cur.y; }, 0) / g.length;
                    };
                    let point = new OpenLayers.LonLat(center.x, center.y);
                    let icon = new OpenLayers.Icon(rosreestr_layers.find(rl => rl.name === l.name).marker, new OpenLayers.Size(24, 24), new OpenLayers.Pixel(-12, -12));
                    let marker = new OpenLayers.Marker(point, icon);
                    marker.feature = feature;
                    feature.marker = marker;
                    marker.events.register('click', marker, function (e) {
                        map.controls.find(c => c.displayClass === 'olControlSelectFeature').select(e.object.feature);
                    });
                    l.markers.addMarker(marker, icon);
                });
                l.markers.redraw();
            });
        }
    });
}, false);