/**
 * UI consructor
 */
let UI = new function () {
    this.div = document.querySelector('.UI');
    this.activeSection = false;
    this.settings = {
        bgTemplate: true,
        transition: 'all 0.25s linear',
        style: {}
    };
    this.parts = [];
};

/**
 * background template logo
 */
UI.bgTemplate = (UI.settings.bgTemplate) && new function () {
    this.div = document.querySelector('.bgTemplate');
};

/**
 * map container
 */
UI.map = new function () {
    this.div = document.querySelector('#map');
};

/**
 * main controls wrapper
 */
UI.explorer = new function () {
    this.div = UI.div.querySelector('.explorer');
    this.div.setAttribute('data-visible', false);
    this.div.setAttribute('data-current', 'layers');
    this.div.style.width = '35rem';
    this.div.style.left = `calc(3rem - ${this.div.style.width})`;
    this.div.style.transition = UI.settings.transition;
    //window.addEventListener('keyup', function (e) {
    //    if (e.code == 'Escape') {
    //        if (UI.explorer.div.getAttribute('data-visible') == 'true') {
    //            UI.explorer.div.style.left = `calc(3rem - ${UI.explorer.div.style.width})`;
    //            UI.explorer.div.setAttribute('data-visible', false);
    //        }
    //        else {
    //            UI.explorer.div.style.left = '3rem';
    //            UI.explorer.div.setAttribute('data-visible', true);
    //        }
    //    }
    //}, false);
};

UI.explorer.layers = new function () {
    this.div = UI.explorer.div.querySelector('.layers');
    this.div.style.display = 'flex';
    this.h1 = this.div.querySelector('h1');
    this.searchField = this.div.querySelector('.searchField');
    this.list = this.div.querySelector('.list');

    window.addEventListener('DOMContentLoaded', function () {
        map.layers.forEach(function (layer) {
            if (layer.displayInLayerSwitcher) {
                let wrap = document.createElement('div');
                let checkbox = document.createElement('input');
                checkbox.id = `layer${layer.id.toString().split('_').pop()}`;
                checkbox.type = 'checkbox';
                checkbox.checked = layer.visibility;
                checkbox.layer = layer;
                checkbox.style.outline = 'none';
                checkbox.oninput = function (e) {
                    this.layer.setVisibility(this.checked);
                };
                wrap.appendChild(checkbox);
                let label = document.createElement('label');
                label.innerHTML = layer.name.trim();
                label.setAttribute('for', checkbox.id);
                wrap.appendChild(label);
                UI.explorer.layers.list.appendChild(wrap);
                // update
                layer.refToNewExplorer = wrap;
            }
        });
    }, false);
};

UI.explorer.share = new function () {
    this.div = UI.explorer.div.querySelector('.share');
    this.div.style.display = 'none';
    this.h1 = this.div.querySelector('h1');
    this.Update = function () {
        var zoom = map.zoom;
        var lon = map.center.lon;
        var lat = map.center.lat;
        UI.explorer.share.link.textarea.value = 'http://' + window.location.host + window.location.pathname + '?zoom=' + zoom + '&lon=' + lon + '&lat=' + lat + '&foreignRequest=false' + getEnabledLayersQuery();
        //UI.explorer.share.html.textarea.value = 'html';
        var zoom = map.zoom;
        var lon = map.center.lon;
        var lat = map.center.lat;
        var url = 'http://' + window.location.host + '/Map/ShowMap/' + modelId + '?zoom=' + zoom + '&lon=' + lon + '&lat=' + lat + '&foreignRequest=true';
        UI.explorer.share.html.textarea.value = '<iframe width="600" height="600"src="' + url + getEnabledLayersQuery() + '"></iframe>';
    };
};

UI.explorer.share.link = new function () {
    this.div = UI.explorer.share.div.querySelector('.link-wrap');
    this.h2 = this.div.querySelector('h2');
    this.textarea = this.div.querySelector('textarea');
    this.button = this.div.querySelector('button');
    this.button.onclick = function () {
        navigator.clipboard.writeText(UI.explorer.share.link.textarea.value);
    };
};

UI.explorer.share.html = new function () {
    this.div = UI.explorer.share.div.querySelector('.html-wrap');
    this.h2 = this.div.querySelector('h2');
    this.textarea = this.div.querySelector('textarea');
    this.button = this.div.querySelector('button');
    this.button.onclick = function () {
        navigator.clipboard.writeText(UI.explorer.share.html.textarea.value);
    };
};

UI.explorer.export = new function () {
    this.div = UI.explorer.div.querySelector('.export');
    this.div.style.display = 'none';
    this.h1 = this.div.querySelector('h1');
};

UI.explorer.settings = new function () {
    this.div = UI.explorer.div.querySelector('.settings');
    this.div.style.display = 'none';
};

/**
 * compact line, with main controls
 * located at the edge of the screen
 */
UI.sidebar = new function () {
    this.div = document.querySelector('.sidebar');
    this.menu = this.div.querySelector('#menu');
    this.menu.onclick = () => { window.location = window.location.origin; };
    this.layers = this.div.querySelector('#layers');
    this.share = this.div.querySelector('#share');
    this.export = this.div.querySelector('#export');
    this.settings = this.div.querySelector('#settings');
};

UI.sidebar.div.querySelectorAll('svg:not(#menu)').forEach(function (svg) {
    svg.onclick = function (e) {
        let cur = UI.explorer.div.getAttribute('data-current');
        console.log(this.id);
        if (this.id == cur) {
            if (UI.explorer.div.getAttribute('data-visible') == 'true') {
                UI.explorer.div.style.left = `calc(3rem - ${UI.explorer.div.style.width})`;
                UI.explorer.div.setAttribute('data-visible', false);
            }
            else {
                UI.explorer.div.style.left = '3rem';
                UI.explorer.div.setAttribute('data-visible', true);
            }
        }
        else {
            if (UI.explorer.div.getAttribute('data-visible') == 'true') {
                UI.explorer.div.querySelectorAll(':scope > div').forEach(function (div) {
                    div.style.display = (div.className == e.target.id) ? 'flex' : 'none';
                });
            }
            else {
                UI.explorer.div.style.left = '3rem';
                UI.explorer.div.setAttribute('data-visible', true);
            }
            UI.explorer.div.setAttribute('data-current', e.target.id);
        }
        if (this.id == 'share') {
            UI.explorer.share.Update();
        }
    };
});

UI.contextmenu = new function () {
};

window.addEventListener('contextmenu', function (e) {
    //e.preventDefault();
    console.log(e);
}, false);

window.addEventListener('load', function () {
    //document.body.style.overflow = 'hidden';
    document.body.style.height = '100vh';
    document.body.style.width = '100vw';
    document.querySelector('#map-toolbar').remove();
    document.querySelector('#coords_display').style.display = 'none';
}, false);