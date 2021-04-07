class Mouse {
    static isPressed = {
        LMB: false,
        WHEEL: false,
        RMB: false
    };
    static pos = {
        x: 0,
        y: 0
    };
    static pressHandler = function (e) {
        Mouse.isPressed[['LMB', 'WHEEL', 'RMB'][e.button]] = (e.type == 'mousedown');
    };
};
document.addEventListener('mousemove', function (e) {
    if (e.ctrlKey) {
        if (document.activeElement == document.body) {
            let cur_center = map.getPixelFromLonLat(map.getCenter());
            map.setCenter(map.getLonLatFromPixel({
                x: cur_center.x - (e.x - Mouse.pos.x),
                y: cur_center.y - (e.y - Mouse.pos.y)
            }));
        }
    }
    Mouse.pos.x = e.x;
    Mouse.pos.y = e.y;
}, false);
document.addEventListener('mousedown', Mouse.pressHandler, false);
document.addEventListener('mouseup', Mouse.pressHandler, false);