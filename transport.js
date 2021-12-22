const accessibility_features = new Map();

window.addEventListener('DOMContentLoaded', function () {
    if (transportLayer) {
        transport_links.accessibility.forEach(function (link) {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', `${window.location.protocol}//${link}`, true);
            xhr.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    let rows = this.response.split('\r\n').filter(Boolean).map(r => r.split('\t'));
                    rows.shift();
                    rows.forEach(([city, znak, features]) => accessibility_features.set(`${city}_${znak}`, features));
                }
            };
            xhr.send();
        });
    }
}, { once: true });

const update_transport_layer = function () {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${window.location.origin}/GisTransport/GetLastPosition`, true);
    xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            JSON.parse(this.response).forEach(update_transport_feature);
        }
    };
    xhr.send();
};

const update_transport_feature = function (fData) {
    console.log(fData);
};

const create_transport_feature = function (tData) {
    const [type, route, lon, lat, speed, azimuth, gosNomer, timestamp, city] = tData;
    const id = `${city}_${gosNomer}`;
};