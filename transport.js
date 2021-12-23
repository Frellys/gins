const accessibility_features = new Map();

if (transportLayer) {
    transport_links.accessibility.forEach(function (link) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `${window.location.protocol}//${link}`, true);
        xhr.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                let rows = this.response.split('\r\n').filter(Boolean).map(r => r.split('\t'));
                rows.shift();
                rows.forEach(([city, znak, features]) => accessibility_features.set(`${city}_${znak.toLowerCase()}`, features));
            }
        };
        xhr.send();
    });
}

const transport_filter_rule = function (tData) {
    if (!tData.Lat || !tData.Lng) {
        return false;
    }
    const mapId = (window.location.hostname === 'localhost') ? '156' : window.location.pathname.split('/').pop();
    switch (mapId) {
        case '156': {
            return !tData.ID && (new Date() - new Date(tData.DT) / (1000 * 60) > 3);
        }
        case '159': {
            return tData.Type && !!tData.ID && (new Date() - new Date(tData.DT) / (1000 * 60) > 7);
        }
        default: {
            return false;
        }
    }
};

const update_transport_layer = function () {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${window.location.origin}/GisTransport/GetLastPosition`, true);
    xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            transportLayer.removeAllFeatures();
            JSON.parse(this.response).filter(transport_filter_rule).forEach(update_transport_feature);
            transportLayer.redraw();
        }
    };
    xhr.send();
};

const update_transport_feature = function (tData) {
    tData.ID = tData.ID || `${tData.City}_${tData.Znak}`;
    const ts = transportLayer.features.find(f => f.data.ID === tData.ID) || create_transport_feature(tData);
    const p = new OpenLayers.LonLat(tData.Lng, tData.Lat).transform(new OpenLayers.Projection('EPSG:4326'), new OpenLayers.Projection('EPSG:900913'));
    ts.move(p);
};

const create_transport_feature = function (tData) {
    console.log(tData);
    const ts = new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Point(0, 0));
    transportLayer.addFeatures([ts]);
    ts.data = tData;
    ts.style = clone(transportLayer.styleMap.styles.default.defaultStyle);
    ts.style.label = tData.RouteNumber;
    ts.style.fontSize = screen.height / 100;
    ts.style.fontWeight = 300;
    ts.style.fontFamily = 'Arial';
    ts.style.labelXOffset = 0;
    ts.style.labelYOffset = 0;
    ts.style.labelOutlineColor = '#323232';
    ts.style.labelOutlineColor = (ts.data.Atributes) ? 'orange' : '#323232';
    return ts;
};