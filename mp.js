window.addEventListener('DOMContentLoaded', function () {
    const mp = document.querySelector('template.mp').content.cloneNode(true).querySelector(':scope > :first-child');
    mp.converse = {
        '0': function (val) {
            return val.toFixed(10);
        },
        '1': function (val) {
            let degrees = Math.floor(val);
            let minutesRaw = (val - degrees) * 60;
            let minutes = Math.floor(minutesRaw);
            let seconds = Math.floor((minutesRaw - minutes) * 6000) / 100.00;
            return (degrees.toString().padStart(4, ' ') + '\u00B0' + (Math.round((minutes * 1.0 + seconds / 60.0) * 1000.0) / 1000.0).toFixed(3).padStart(6, '0') + '\u0027');
        },
        '2': function (val) {
            let degrees = Math.floor(val);
            let minutesRaw = (val - degrees) * 60;
            let minutes = Math.floor(minutesRaw);
            let seconds = Math.floor((minutesRaw - minutes) * 6000) / 100.00;
            return (degrees.toString().padStart(4, ' ') + '\u00B0' + minutes.toString().padStart(2, '0') + '\u0027' + seconds.toFixed(2).padStart(5, '0') + '\u0022');
        }
    };
    mp.setState = function (state) {
        this.dataset.state = state;
    };
    mp.addEventListener('dblclick', (e) => { e.stopPropagation(); }, false);
    mp.addEventListener('mousedown', (e) => { e.stopPropagation(); }, false);
    map.viewPortDiv.appendChild(map.mp = mp);
    //map.div.addEventListener('mousemove', function (e) {
    //    const ll = map.getLonLatFromPixel(e).transform(new OpenLayers.Projection('EPSG:900913'), new OpenLayers.Projection('EPSG:4326'));
    //    Object.keys(ll).forEach(function (c) {
    //        mp.querySelector(`.${c}`).innerHTML = `${c}: ${mp.converse[mp.dataset.state](ll[c])}`;
    //    });
    //}, false);
    mp.redraw = function (e) {
        const ll = map.getLonLatFromPixel(e).transform(new OpenLayers.Projection('EPSG:900913'), new OpenLayers.Projection('EPSG:4326'));
        Object.keys(ll).forEach(function (c) {
            mp.querySelector(`.${c}`).innerHTML = `${c}: ${mp.converse[mp.dataset.state](ll[c])}`;
        });
    };
    mp.addEventListener('click', function () {
        mp.dataset.state = (parseInt(mp.dataset.state) + 1) % 3;
        mp.redraw(Mouse.pos);
    }, false);
    map.div.addEventListener('mousemove', mp.redraw, false);
    // menu
    //const menu_mp = new MDCMenu(document.querySelector('.menu-mp'));
    //menu_mp.setAnchorCorner(mdc.menuSurface.Corner.BOTTOM_START);
    //menu_mp.root.addEventListener('mouseleave', function () {
    //    menu_mp.open = false;
    //}, false);
    //mp.addEventListener('mouseup', function () {
    //    menu_mp.open = !menu_mp.open;
    //}, false);
}, { once: true });