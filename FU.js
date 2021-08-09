const FU = new function () {
    return document.querySelector('.FU');
};

FU.header = new function () {
    return FU.querySelector('.FU-wrp > header');
};

FU.main = new function () {
    //return FU.querySelector('.FU-wrp > main');
    return FU.querySelector('.FU-wrp > div#main');
};

FU.main.layers = new function () {
    return FU.main.querySelector('.layers');
};
FU.main.layers.list = new function () {
    return FU.main.layers.querySelector('.mdc-list');
};
window.addEventListener('load', function () {
    console.log(map);
    map.layers.filter(l => l.displayInLayerSwitcher).forEach(function (layer, index) {
        let li = document.createElement('li');
        li.classList.add('mdc-list-item');
        if (!index) {
            li.setAttribute('tabindex', '0');
        }
        FU.main.layers.list.appendChild(li);
        let form = document.createElement('div');
        form.classList.add('mdc-form-field');
        li.appendChild(form);
        let checkbox = document.createElement('div');
        checkbox.classList.add('mdc-checkbox');
        checkbox.classList.add('mdc-checkbox--touch');
        form.appendChild(checkbox);
        let input = document.createElement('input');
        input.classList.add('mdc-checkbox__native-control');
        input.type = 'checkbox';
        input.id = `layer${layer.id.toString().split('_').pop()}`;
        //input.setAttribute('data-indeterminate', 'true');
        checkbox.appendChild(input);
        let bg = document.createElement('div');
        bg.classList.add('mdc-checkbox__background');
        checkbox.appendChild(bg);
        //let svg = document.createElement('svg');
        let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.classList.add('mdc-checkbox__checkmark');
        svg.setAttribute('viewbox', '0 0 24 24');
        bg.appendChild(svg);
        //let path = document.createElement('path');
        let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.classList.add('mdc-checkbox__checkmark-path');
        path.setAttribute('fill', 'none');
        //path.style.fill = 'none';
        path.setAttribute('d', 'M1.73,12.91 8.1,19.28 22.79,4.59');
        svg.appendChild(path);
        let mixedmark = document.createElement('div');
        mixedmark.classList.add('mdc-checkbox__mixedmark');
        bg.appendChild(mixedmark);
        let ripple = document.createElement('div');
        ripple.classList.add('mdc-checkbox__ripple');
        checkbox.appendChild(ripple);
        let label = document.createElement('label');
        label.setAttribute('for', input.id);
        label.innerHTML = layer.name;
        form.appendChild(label);
        //let text = document.createElement('span');
        //text.classList.add('mdc-list-item__text');
        //text.innerHTML = layer.name;
        //li.appendChild(text);
    });
}, false);

window.addEventListener('load', function () {
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100vh';
    document.body.style.width = '100vw';
    document.querySelector('#map-toolbar').remove();
    document.querySelector('#coords_display').style.display = 'none';
    // theme
    document.documentElement.style.setProperty('--mdc-theme-background', 'whitesmoke');
}, false);