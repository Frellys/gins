window.addEventListener('DOMContentLoaded', function () {
    const mp = document.querySelector('template.mp').content.cloneNode(true).querySelector(':scope > :first-child');
    mp.querySelectorAll(':scope > div').forEach(function (el) {
        mp[el.className] = el;
    });
    mp.parse = function (val) {
        const degrees = Math.floor(val);
        const minutesRaw = (val - degrees) * 60;
        const minutes = Math.floor(minutesRaw);
        const seconds = Math.floor((minutesRaw - minutes) * 6000) / 100.00;
        return [
            degrees,
            minutes,
            seconds
        ];
    };
    mp.convert = {
        0: function (val) {
            const [d, m, s] = mp.parse(val);
            return `${d.toString().padStart(4, ' ')}\u00B0${m.toString().padStart(2, '0')}\u0027${s.toFixed(2).padStart(5, '0')}\u0022`;
        },
        1: function (val) {
            const [d, m, s] = mp.parse(val);
            return `${d.toString().padStart(4, ' ')}\u00B0${(Math.round((m * 1.0 + s / 60.0) * 1000.0) / 1000.0).toFixed(3).padStart(6, '0')}\u0027`;
        },
        2: function (val) {
            return val.toFixed(10);
        }
    };
    mp.redraw = function (e) {
        const ll = map.getLonLatFromPixel(e).transform(new OpenLayers.Projection('EPSG:900913'), new OpenLayers.Projection('EPSG:4326'));
        Object.keys(ll).forEach(function (c) {
            mp[c].innerHTML = `${c}: ${mp.convert[mp.dataset.state](ll[c])}`;
        });
    };
    mp.addEventListener('dblclick', (e) => { e.stopPropagation(); }, false);
    mp.addEventListener('mousedown', (e) => { e.stopPropagation(); }, false);
    mp.addEventListener('click', function () {
        mp.dataset.state = (parseInt(mp.dataset.state) + 1) % 3;
        mp.redraw(Mouse.pos);
    }, false);
    map.div.addEventListener('mousemove', mp.redraw, false);
    map.viewPortDiv.appendChild(map.mp = mp);
    mp.redraw({ x: 0, y: 0 });
}, { once: true });