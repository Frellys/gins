let rosreestr_layers = [
    'Земельные участки (гринфилд)',
    'Здания (браунфилд)',
    'Индустриальные парки',
    'Росреестр рекреация'
];
window.addEventListener('DOMContentLoaded', function () {
    map.layers.forEach(function (l) {
        if (rosreestr_layers.includes(l.name)) {
            l.markers = new OpenLayers.Layer.Markers('markers')
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
                                    }))
                                }));
                            }));
                            let feature = new OpenLayers.Feature.Vector(geometry, null, clone(l.styleMap.styles.default.defaultStyle));
                            feature.props = f.properties;
                            l.addFeatures([feature]);
                            let point = new OpenLayers.LonLat(feature.props.center.x, feature.props.center.y);
                            let icon = new OpenLayers.Icon('/Content/images/icons/map_icon_marker_gold.png', new OpenLayers.Size(21, 25), new OpenLayers.Pixel(0, 0));
                            l.markers.addMarker(new OpenLayers.Marker(point, icon), icon);
                        });
                        l.markers.redraw();
                    }
                };
                xhr.send();
            });
        }
        //if (l.name == 'Россреестр ЗУ для инвесткарт') {
        //    l.events.register('loadend', l, function () {
        //        let xhr = new XMLHttpRequest();
        //        xhr.open('GET', '/Scripts/SAS/pkg/cnl.txt', true);
        //        xhr.onreadystatechange = function () {
        //            if (this.readyState === 4 && this.status === 200) {
        //                let res = JSON.parse(this.response);
        //                let features = res.features;
        //                features.forEach(function (f) {
        //                    let geometry = new OpenLayers.Geometry.MultiPolygon(f.geometry.coordinates.map(function (c) {
        //                        return new OpenLayers.Geometry.Polygon(c.map(function (a) {
        //                            return new OpenLayers.Geometry.LinearRing(a.map(function (p) {
        //                                return new OpenLayers.Geometry.Point(p[0], p[1]).transform(new OpenLayers.Projection('EPSG:4326'), new OpenLayers.Projection('EPSG:900913'));
        //                            }))
        //                        }));
        //                    }));
        //                    let feature = new OpenLayers.Feature.Vector(geometry, null, clone(l.styleMap.styles.default.defaultStyle));
        //                    feature.props = f.properties;
        //                    l.addFeatures([feature]);
        //                });
        //            }
        //        };
        //        xhr.send();
        //    });
        //}
    });
    //document.querySelector('#map').addEventListener('click', function (e) {
    //    let p = map.getLonLatFromPixel({ x: e.x, y: e.y });
    //    let t = new OpenLayers.LonLat(p.lon, p.lat).transform(new OpenLayers.Projection('EPSG:900913'), new OpenLayers.Projection('EPSG:4326'));
    //    let xhr = new XMLHttpRequest();
    //    xhr.open('GET', 'https://pkk.rosreestr.ru/api/features/' + `1?text=${[t.lon, t.lat].join(' ')}&tolerance=1&limit=10`, true);
    //    xhr.onreadystatechange = function () {
    //        if (this.readyState === 4 && this.status === 200) {
    //            let ret = JSON.parse(this.response);
    //            if ('features' in ret) {
    //                alert(ret['features'][0].attrs.id);
    //            }
    //        }
    //    };
    //    xhr.send();
    //}, false);
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
        }
    };
    xhr.send();
});