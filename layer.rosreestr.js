window.addEventListener('DOMContentLoaded', function () {
    map.layers.forEach(function (l) {
        if (l.name == 'rosreestr_test') {
            l.events.register('loadend', l, function () {
                let xhr = new XMLHttpRequest();
                xhr.open('GET', '/Scripts/SAS/pkg/cnl.txt', true);
                xhr.onreadystatechange = function () {
                    if (this.readyState === 4 && this.status === 200) {
                        let res = JSON.parse(this.response);
                        let features = res.features;
                        features.forEach(function (f) {
                            //let linearRing = new OpenLayers.Geometry.LinearRing(f.geometry.coordinates[0][0].map(function (p) {
                            //    return new OpenLayers.Geometry.Point(p[0], p[1]).transform(new OpenLayers.Projection('EPSG:4326'), new OpenLayers.Projection('EPSG:900913'));
                            //}));
                            //let geometry = new OpenLayers.Geometry.Polygon([linearRing]);
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
                        });
                    }
                };
                xhr.send();
            });
        }
    });
}, false);