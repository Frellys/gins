let rosreestr_layers = [
    { name: 'Земельные участки (гринфилд)', marker: '/Scripts/SAS/img/place-marker-64-red.png' },
    { name: 'Здания (браунфилд)', marker: '/Scripts/SAS/img/place-marker-64-gray.png' },
    { name: 'Индустриальные парки', marker: '/Scripts/SAS/img/place-marker-64-brown.png' },
    { name: 'Росреестр рекреация', marker: '/Scripts/SAS/img/place-marker-64-red.png' },
    // ours
    { name: 'Мостовые сооружения', marker: '/Scripts/SAS/img/place-marker-64-yellow.png' }
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
                    marker.events.register('click', marker, function (e) {
                        map.controls.find(c => c.displayClass === 'olControlSelectFeature').select(e.object.feature);
                    });
                    l.markers.addMarker(marker, icon);
                });
                l.markers.redraw();
            });
        }
    });
    // set toser
    let toser = map.layers.find(l => l.name === 'ТОСЭР');
    toser.markers = new OpenLayers.Layer.Markers('markers');
    map.addLayer(toser.markers);
    toser.markers.setZIndex(1001);
    toser.markers.setVisibility(true);
    toser.events.register('loadend', toser, function () {
        toser.features.forEach(function (f) {
            let g = f.geometry.components[0].components[0].components;
            let center = new function () {
                this.x = g.reduce(function (acc, cur) { return acc + cur.x; }, 0) / g.length;
                this.y = g.reduce(function (acc, cur) { return acc + cur.y; }, 0) / g.length;
            };
            let point = new OpenLayers.LonLat(center.x, center.y);
            let icon = new OpenLayers.Icon('/Scripts/SAS/img/place-marker-64-red.png', new OpenLayers.Size(24, 24), new OpenLayers.Pixel(-12, -12));
            let marker = new OpenLayers.Marker(point, icon);
            marker.feature = f;
            marker.events.register('click', marker, function (e) {
                map.controls.find(c => c.displayClass === 'olControlSelectFeature').select(e.object.feature);
            });
            toser.markers.addMarker(marker, icon);
        });
    });
}, false);
//rosreestr_layers.forEach(function (l) {
//    l.cna = [];
//    l.copyCNA = function () {
//        copy(this.cna.join('\n'));
//    };
//    let xhr = new XMLHttpRequest();
//    xhr.open('GET', `/Scripts/SAS/pkg/${l.name}.txt`, false);
//    xhr.onreadystatechange = function () {
//        let res = JSON.parse(this.response);
//        res.features.forEach(function (f) {
//            l.cna.push(`${f.properties.address.length}%sep%${f.properties.address}`);

//        });
//        console.log(res);
//    };
//    xhr.send();
//});