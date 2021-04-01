// get min document width to resize
let mapMenuWidth;
let mapSelectWidth;
window.addEventListener('DOMContentLoaded', function () {
    mapMenuWidth = document.querySelector('#map-menu').offsetWidth;
    mapSelectWidth = document.querySelector('#MapSelect').offsetWidth;
}, { once: true });
// flag to (not)execute changes
let isMapMenuSmall = Boolean(document.documentElement.clientWidth <= (mapMenuWidth + mapSelectWidth));
// execute on load/resize
window.addEventListener('DOMContentLoaded', resize_mapMenu, { once: true });
window.addEventListener('resize', resize_mapMenu, false);
/**
 * #map-menu resize handler
 * @returns {void}
 */
function resize_mapMenu() {
    if (document.documentElement.clientWidth <= (mapMenuWidth + mapSelectWidth)) {
        if (isMapMenuSmall == false) {
            Array.from(document.querySelectorAll('#map-menu > ul > li > a')).forEach(function (a) {
                [a.innerHTML, a['title']] = a.innerHTML.toString('').split('&nbsp;');
            });
            isMapMenuSmall = true;
        }
    }
    else {
        if (isMapMenuSmall == true) {
            Array.from(document.querySelectorAll('#map-menu > ul > li > a')).forEach(function (a) {
                a.innerHTML += ('&nbsp;' + a['title']);
                a.removeAttribute('title');
            });
            isMapMenuSmall = false;
        }
    }
}