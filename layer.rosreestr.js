let rosreestr_layers = [
    { name: 'Земельные участки (гринфилд)', marker: '/Scripts/SAS/img/place-marker-64-red.png' },
    { name: 'Здания (браунфилд)', marker: '/Scripts/SAS/img/place-marker-64-gray.png' },
    { name: 'Индустриальные парки', marker: '/Scripts/SAS/img/place-marker-64-brown.png' },
    { name: 'Росреестр рекреация', marker: '/Scripts/SAS/img/place-marker-64-red.png' },
    //'Здания (браунфилд)',
    //'Индустриальные парки',
    //'Росреестр рекреация'
];
window.addEventListener('DOMContentLoaded', function () {
    map.layers.forEach(function (l) {
        if (rosreestr_layers.map(rl => rl.name).includes(l.name)) {
            l.markers = new OpenLayers.Layer.Markers('markers');
            map.addLayer(l.markers);
            l.markers.setZIndex(1001);
            l.markers.setVisibility(true);
            l.events.register('loadend', l, function () {
                let xhr = new XMLHttpRequest();
                xhr.open('GET', `/Scripts/SAS/pkg/${l.name}.txt`, true);
                xhr.onreadystatechange = function () {
                    if (this.readyState === 4 && this.status === 200) {
                        let res = JSON.parse(this.response);
                        let features = res.features;
                        features.forEach(function (f) {
                            let geometry = new OpenLayers.Geometry.MultiPolygon(f.geometry.coordinates.map(function (c) {
                                return new OpenLayers.Geometry.Polygon(c.map(function (a) {
                                    return new OpenLayers.Geometry.LinearRing(a.map(function (p) {
                                        return new OpenLayers.Geometry.Point(p[0], p[1]).transform(new OpenLayers.Projection('EPSG:4326'), new OpenLayers.Projection('EPSG:900913'));
                                    }));
                                }));
                            }));
                            let feature = new OpenLayers.Feature.Vector(geometry, null, clone(l.styleMap.styles.default.defaultStyle));
                            feature.props = f.properties;
                            l.addFeatures([feature]);
                            let point = new OpenLayers.LonLat(feature.props.center.x, feature.props.center.y).transform(new OpenLayers.Projection("EPSG:4326"), new OpenLayers.Projection("EPSG:900913"));
                            //let icon = new OpenLayers.Icon('/Scripts/SAS/img/place-marker-64.png', new OpenLayers.Size(24, 24), new OpenLayers.Pixel(-12, -12));
                            let icon = new OpenLayers.Icon(rosreestr_layers.find(rl => rl.name === l.name).marker, new OpenLayers.Size(24, 24), new OpenLayers.Pixel(-12, -12));
                            let marker = new OpenLayers.Marker(point, icon);
                            marker.feature = feature;
                            marker.events.register('click', marker, function (e) {
                                map.controls.find(c => c.displayClass === 'olControlSelectFeature').select(e.object.feature);
                            });
                            l.markers.addMarker(marker, icon);
                        });
                        l.markers.redraw();
                    }
                };
                xhr.send();
            });
        }
    });
}, false);
let rosreestr_outer = [
    'centerenergy_che.xml',
    'centerenergy_che_private.xml',
    'cp_che.xml'
];
rosreestr_outer.forEach(function (fName) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `/Scripts/SAS/pkg/${fName}`, true);
    xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let xml = new DOMParser().parseFromString(this.responseText, 'text/xml');
            console.log(xml);
            //console.log(xml.querySelectorAll(':scope > GeoObjectCollection > featureMembers > GeoObject'));
            //xml.querySelectorAll(':scope > GeoObjectCollection > featureMembers > GeoObject').forEach(function (o) { });
        }
    };
    xhr.send();
});