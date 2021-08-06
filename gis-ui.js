let gisUI = document.querySelector('.gis-ui');
gisUI.setAttribute('explorerIsVisible', false);
gisUI.setAttribute('riserIsVisible', false);
gisUI.setAttribute('stateAlternate', false);
document.documentElement.style.setProperty('--gis-ui-explorer-width', '25vw');
document.documentElement.style.setProperty('--gis-ui-riser-height', '35vh');
document.documentElement.style.setProperty('--gis-ui-resizer-thickness', '0.5rem');

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

window.addEventListener('keydown', handleAlternate, false);
window.addEventListener('keyup', handleAlternate, false);

function handleAlternate(e) {
    console.log(e);
    if (e.code == 'AltLeft') {
        e.preventDefault();
        switch (e.type) {
            case (gisUI.getAttribute('stateAlternate') == 'false' && 'keydown'): {
                gisUI.setAttribute('stateAlternate', true);
                console.log(true);
                break;
            };
            case (gisUI.getAttribute('stateAlternate') == 'true' && 'keyup'): {
                gisUI.setAttribute('stateAlternate', false);
                console.log(false);
                break;
            };
        };
    }
};

window.addEventListener('blur', function () {
    gisUI.setAttribute('stateAlternate', false);
}, false);