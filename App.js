let App = new function () {
    this.params = (window.location.search.length) ? Object.fromEntries(window.location.search.substring(1).split('&').map(p => p.split('='))) : {};
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
        /*
         * main html-node
         */
        this.node = false;
        /**
         * popup constructor
         * @param {object} param0 - head:text, body:html
         */
        this.create = function ({ head, body }) {
            if (App.popup.node) {
                App.popup.remove();
            }
            App.popup.node = App.templates.popup.cloneNode(true);
            App.popup.node.style.display = 'flex';
            if (head) {
                alert(head);
            }
            App.popup.node.querySelector('.b').innerHTML = body;
            App.popup.node.querySelector('.h').addEventListener('mousedown', function (e) {
                App.mouse.drag.node = App.popup.node;
                App.mouse.drag.bounds = App.popup.node.getBoundingClientRect();
                App.mouse.drag.delta.x = App.mouse.drag.bounds.x - e.x;
                App.mouse.drag.delta.y = App.mouse.drag.bounds.y - e.y;
            }, false);
            document.body.appendChild(App.popup.node);
        };
        /**
         * popup destructor
         */
        this.remove = function () {
            if (App.popup.node) {
                App.popup.node.remove();
                App.popup.node = false;
            }
        };
    };
    this.mouse = new function () {
        this.LMB_PRESSED = false;
        this.drag = new function () {
            this.node = false;
            this.bounds = false;
            this.delta = { x: 0, y: 0 };
        };
        this.pos = { x: 0, y: 0 };
        document.body.addEventListener('mousemove', function (e) {
            App.mouse.pos.x = e.x;
            App.mouse.pos.y = e.y;
            if (App.mouse.LMB_PRESSED) {
                if (App.mouse.drag.node) {
                    let np = new function () {
                        this.x = e.x + App.mouse.drag.delta.x;
                        this.y = e.y + App.mouse.drag.delta.y;
                        if (this.x < 0) {
                            this.x = 0;
                        }
                        if (this.x + App.mouse.drag.bounds.width > document.body.offsetWidth) {
                            this.x = document.body.offsetWidth - App.mouse.drag.bounds.width;
                        }
                        if (this.y < 0) {
                            this.y = 0;
                        }
                        if (this.y + App.mouse.drag.bounds.height > document.body.offsetHeight) {
                            this.y = document.body.offsetHeight - App.mouse.drag.bounds.height;
                        }
                    };
                    App.mouse.drag.node.style.top = `${np.y}px`;
                    App.mouse.drag.node.style.left = `${np.x}px`;
                }
            }
        }, false);
        document.body.addEventListener('mousedown', function (e) {
            if (App.mouse.LMB_PRESSED) {
                App.mouse.drag.start = { x: e.x, y: e.y };
            }
            App.mouse.LMB_PRESSED = true;
        }, false);
        this.reset = function () {
            App.mouse.LMB_PRESSED = false;
            App.mouse.drag.node = false;
            App.mouse.drag.bounds = false;
        };
        document.body.addEventListener('mouseup', this.reset, false);
        document.body.addEventListener('mouseleave', this.reset, false);
    };
    this.contextMenu = new function () {
        this.node = false;
        this.create = function (e) {
            e.preventDefault();
            if (App.contextMenu.node) {
                App.contextMenu.remove();
            }
            App.contextMenu.node = App.templates.contextMenu.cloneNode(true);
            App.contextMenu.node.style.display = 'flex';
            App.contextMenu.node.style.left = `${e.x}px`;
            App.contextMenu.node.style.top = `${e.y}px`;
            document.body.appendChild(App.contextMenu.node);
        };
        this.remove = function () {
            if (App.contextMenu.node) {
                App.contextMenu.node.remove();
                App.contextMenu.node = false;
            }
        };
    };
    this.additionalLayers = {};
    this.setRosreestr = function (points) {
        this.additionalLayers.rosreestr = new OpenLayers.Layer.Markers('Rosreestr');
        map.addLayer(this.additionalLayers.rosreestr);
        this.additionalLayers.rosreestr.redraw();
        let size = new OpenLayers.Size(21, 25);
        let offset = new OpenLayers.Pixel(-(size.w / 2), -size.h);
        let icon = new OpenLayers.Icon('http://localhost:7573/Content/images/icons/map_icon_illegal_car_parking.png', size, offset);
        points.forEach((p) => {
            let pt = new OpenLayers.LonLat(p[1], p[0]).transform(new OpenLayers.Projection("EPSG:900913"), map.getProjectionObject());
            this.additionalLayers.rosreestr.addMarker(new OpenLayers.Marker(pt, icon), icon);
        });
        this.additionalLayers.rosreestr.setZIndex(1001);
        this.additionalLayers.rosreestr.redraw();
    };
};
/*
 * set app
 */
window.addEventListener('DOMContentLoaded', function () {
    let action = new function () {
        this.zoom = (p) => map.zoomTo(p);
    };
    Object.keys(action).forEach(function (a) {
        if (a in App.params) {
            action[a](App.params[a]);
        }
    });
}, false);
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
/*
 * set contextmenu
 */
window.addEventListener('contextmenu', App.contextMenu.create, false);
window.addEventListener('mousedown', function (e) {
    if (App.contextMenu.node) {
        App.contextMenu.remove();
    }
}, false);