let enableBaseLayers = function () {
    if (window.location.pathname == '/Map/48') {
        layersList.filter((el) => { return el.protocol && [2249, 2250, 2251].includes(el.protocol.id); }).forEach((el) => { el.setVisibility(true); });
    }
};