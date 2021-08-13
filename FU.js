const FU = new function () {
    let obj = document.querySelector('.FU');
    obj.data = {
        isVisible: true
    };
    obj.switchState = function () {
        if (FU.data.isVisible) {
            FU.wrap.style.height = 'auto';
            FU.wrap.main.style.display = 'none';
        }
        else {
            FU.wrap.style.height = '100vh';
            FU.wrap.main.style.display = 'flex';
        }
        FU.data.isVisible = !FU.data.isVisible;
    };
    return obj;
    //return document.querySelector('.FU');
};
FU.map = new function () { return FU.querySelector(':scope > #map'); };
FU.wrap = new function () { return FU.querySelector(':scope > .FU-wrp'); };
FU.wrap.header = new function () { return FU.wrap.querySelector(':scope > header'); };
FU.wrap.main = new function () { return FU.wrap.querySelector(':scope > main'); };
FU.wrap.main.nav = new function () { return FU.wrap.main.querySelector(':scope > nav'); };
FU.wrap.main.content = new function () { return FU.wrap.main.querySelector(':scope > .FU-cnt'); };
FU.wrap.main.content.search = new function () { return FU.wrap.main.content.querySelector(':scope > .search'); };
FU.wrap.main.content.layers = new function () { return FU.wrap.main.content.querySelector(':scope > .layers'); };
window.addEventListener('load', function () {
    //let template = document.querySelector('#FU-layer-template').content.cloneNode(true);
    map.layers.forEach(function (layer, idx) {
        if (layer.displayInLayerSwitcher) {
            let template = document.querySelector('#FU-layer-template').content.cloneNode(true);
            let input = template.querySelector('input');
            input.id += layer.id.split('_').pop();
            input.checked = layer.getVisibility();
            input.oninput = function () {
                console.log(this.id);
            };
            let label = template.querySelector('label');
            label.setAttribute('for', input.id);
            label.innerHTML = layer.name;
            FU.wrap.main.content.layers.appendChild(template);
        }
    });
}, false);
window.addEventListener('keyup', function (e) {
    if (e.key === 'Escape') { FU.switchState(); }
}, false);
FU.wrap.header.querySelector(':scope > svg#menu').addEventListener('click', function () {
    FU.switchState();
}, false);
console.log(FU);