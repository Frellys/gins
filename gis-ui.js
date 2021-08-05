let gisUI = document.querySelector('.gis-ui');
gisUI.setAttribute('explorerIsVisible', false);
gisUI.setAttribute('riserIsVisible', false);
document.documentElement.style.setProperty('--gis-ui-explorer-width', '35vw');
document.documentElement.style.setProperty('--gis-ui-riser-height', '35vh');

window.addEventListener('keyup', function (e) {
    if (e.code == 'Escape') {
        gisUI.setAttribute('explorerIsVisible', (gisUI.getAttribute('explorerIsVisible') == 'false'));
        map.updateSize();
    }
    if (e.code == 'F2') {
        gisUI.setAttribute('riserIsVisible', (gisUI.getAttribute('riserIsVisible') == 'false'));
        map.updateSize();
    }
}, false);