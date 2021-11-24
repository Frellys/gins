let mrsk_layers = [
    { name: 'centerenergy_che', marker: '/Scripts/SAS/img/filled-circle-100-red.png' },
    { name: 'centerenergy_che_private', marker: '/Scripts/SAS/img/filled-circle-100-yellow.png' },
    { name: 'cp_che', marker: '/Scripts/SAS/img/filled-circle-100-green.png' }
];
window.addEventListener('DOMContentLoaded', function () {
    map.layers.forEach(function (l) {
        if (mrsk_layers.map(m => m.name).includes(l.name)) {
            l.events.register('loadend', l, function () {
                let xhr = new XMLHttpRequest();
                xhr.open('GET', `/Scripts/SAS/pkg/${l.name}.xml`, true);
                xhr.onreadystatechange = function () {
                    if (this.readyState === 4 && this.status === 200) {
                        let xml = new DOMParser().parseFromString(this.responseText, 'text/xml');
                        xml.querySelectorAll(':scope > GeoObjectCollection > featureMembers > GeoObject').forEach(function (o) {
                            //l.addFeatures([point], null, clone(l.styleMap.styles.default.defaultStyle));
                            l.addFeatures([new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Point(0, 0))]);
                            let coords = o.querySelector(':scope > Point > pos').innerHTML.split(' ');
                            let point = new OpenLayers.LonLat(coords[0], coords[1]).transform(new OpenLayers.Projection("EPSG:4326"), new OpenLayers.Projection("EPSG:900913"));
                            let obj = l.features[l.features.length - 1];
                            obj.attributes.x = point.lon;
                            obj.attributes.y = point.lat;
                            obj.geometry.x = obj.attributes.x;
                            obj.geometry.y = obj.attributes.y;
                            obj.geometry.bounds.left = obj.geometry.x;
                            obj.geometry.bounds.right = obj.geometry.x;
                            obj.geometry.bounds.top = obj.geometry.y;
                            obj.geometry.bounds.bottom = obj.geometry.y;
                            if (!obj.style) obj.style = clone(l.styleMap.styles.default.defaultStyle);
                            obj.style.externalGraphic = mrsk_layers.find(mr => mr.name === l.name).marker;
                            obj.style.graphicHeight = screen.height * 1 / 100;
                        });
                        l.redraw();
                    }
                };
                xhr.send();
            });
        }
    });
}, { once: true });