/**
 * mp states:
 * mp0 - DD°MM'SS.s
 * mp1 - DD.dddddd°
 * mp2 - DD°MM.mmm
 */
let mpState = 'mp0';
window.addEventListener('DOMContentLoaded', function () {
    // default styles
    document.querySelectorAll('#coords_display > div').forEach(function (div) {
        div.style.display = 'none';
    });
    // display container on first mousemove
    document.querySelector('#map_container').addEventListener('mousemove', function () {
        document.querySelector('#mp_wrap').style.display = 'block';
    }, { once: true });
    // set .select display onclick
    document.querySelector('#mp_wrap > .switch').addEventListener('click', function () {
        let sel = document.querySelector('#mp_wrap > .select');
        sel.style.display = (sel.style.display == 'block') ? 'none' : 'block';
    }, false);
    // set .select input change handlers
    document.querySelectorAll('#mp_wrap > .select > .row > input').forEach(function (inp) {
        inp.addEventListener('change', function (e) {
            mpState = e.target.id;
            // reformat current coords
            let mp = map.controls.find(function (el) { return el.displayClass == 'olControlMousePosition'; });
            if (mp) {
                let p = map.getLonLatFromPixel(mp.lastXy);
                let t = new OpenLayers.LonLat(p.lon, p.lat).transform(new OpenLayers.Projection('EPSG:900913'), new OpenLayers.Projection('EPSG:4326'));
                document.querySelector('#mp_wrap > .coords').innerHTML = mp.formatOutput(t);
            }
        }, false);
    });
}, { once: true });