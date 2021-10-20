let App = new function () {
    this.params = (window.location.search.length) ? Object.fromEntries(window.location.search.substring(1).split('&').map(p => p.split('='))) : false;
    this.templates = Object.fromEntries(Array.from(document.querySelectorAll('templates > *')).map(function (t) {
        return [t.className, t.content.querySelector(':scope > *:first-child')];
    }));
    this.menu = new function () {
        this.selectors = document.body.querySelectorAll('#select > div');
        this.sections = document.body.querySelectorAll('#section > div');
    };
    this.countLayerObjects = function (l) {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', '/Feature/countLayerObjects', true);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                l.lnode.querySelector('.counter').innerHTML = `[${this.response}]`;
            }
        };
        xhr.send(JSON.stringify({
            lname: l.options.protocol.format.featureType
        }));
    };
    this.popup = new function () {
        this.node = false;
        this.create = function ({ head, body }) {
            this.node = App.templates.popup.cloneNode(true);
            this.node.style.display = 'flex';
            if (head) {
            }
            this.node.querySelector('.b').innerHTML = body;
            document.body.appendChild(this.node);
        };
        this.remove = function () {
            this.node.remove();
            this.node = false;
        };
    };
};
/*
 * selectors
 */
window.addEventListener('DOMContentLoaded', function () {
    App.menu.selectors.forEach(function (sel) {
        sel.addEventListener('click', function () {
            App.menu.selectors.forEach(s => s.dataset.selected = false);
            this.dataset.selected = true;
            App.menu.sections.forEach(s => s.style.display = 'none');
            document.body.querySelector(`#section > div#${this.dataset.sel}`).style.display = 'block';
        }, false);
    });
}, { once: true });
/*
 * set layers
 */
window.addEventListener('DOMContentLoaded', function () {
    let layers = document.querySelector('#layers');
    map.layers.forEach(function (layer, ldx) {
        if (layer.displayInLayerSwitcher) {
            let lnode = layer.lnode = App.templates.layer.cloneNode(true);
            let input = lnode.querySelector('input[type="checkbox"]');
            input.value = ldx;
            if (layer.getVisibility()) {
                input.setAttribute('checked', true);
            }
            input.addEventListener('change', function () {
                map.layers[this.value].setVisibility(this.checked);
            }, false);
            let icon = lnode.querySelector('.icon');
            if (layer.protocol) {
                icon.src = layer.protocol.ICON_PATH;
            }
            else {
                icon.remove();
            }
            lnode.querySelector('.title').innerHTML = layer.name;
            if (layer.options.protocol) {
                App.countLayerObjects(layer);
            }
            else {
                layer.lnode.querySelector('.counter').remove();
            }
            layers.appendChild(lnode);
        }
    });
}, { once: true });
/*
 * set mapGroups
 */
window.addEventListener('DOMContentLoaded', function () {
    let maps = document.querySelector('#maps');
    App.model.MapCategory.push(App.model.MapCategory.shift());
    App.model.MapCategory.forEach(function (mcat) {
        let cat = App.templates.mapGroup.cloneNode(true);
        cat.querySelector('.mg-label').innerHTML = mcat.Name;
        let cnt = cat.querySelector('.mg-cnt');
        App.model.Maps.filter(m => m.MapCategoriesId === mcat.Id).forEach(function (map) {
            let a = document.createElement('a');
            a.href = `/Map/${map.Id}`;
            a.innerHTML = map.Name;
            cnt.appendChild(a);
        });
        maps.appendChild(cat);
    });
}, { once: true });