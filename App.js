let App = new function () {
    this.params = (window.location.search.length) ? Object.fromEntries(window.location.search.substring(1).split('&').map(p => p.split('='))) : false;
    this.templates = Object.fromEntries(Array.from(document.querySelectorAll('templates > *')).map(function (t) {
        return [t.className, t.content.querySelector(':scope > *:first-child')];
    }));
    this.menu = new function () {
        this.selectors = document.body.querySelectorAll('#select > div');
        this.sections = document.body.querySelectorAll('#section > div');
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
            let lnode = App.templates.layer.cloneNode(true);
            let input = lnode.querySelector('input[type="checkbox"]');
            input.value = ldx;
            if (layer.getVisibility()) {
                input.setAttribute('checked', true);
            }
            input.addEventListener('change', function () {
                map.layers[this.value].setVisibility(this.checked);
            }, false);
            lnode.querySelector('.title').innerHTML = layer.name;
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