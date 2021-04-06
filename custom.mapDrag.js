class Mouse {
    static buttons = [
        'LMB',
        'WHEEL',
        'RMB',
        'BROWSER_BACK',
        'BROWSER_FORWARD'
    ];
    static isPressed = {
        LMB: false,
        WMB: false,
        RMB: false
    };
    static pos = {
        x: 0,
        y: 0
    };
    static pressHandler = function (e) {
        Mouse.isPressed[['LMB', 'WMB', 'RMB'][e.button]] = (e.type == 'mousedown');
    };
};
document.addEventListener('contextmenu', function (e) { e.preventDefault(); });
window.addEventListener('mousemove', function (e) {
    if (Mouse.isPressed.RMB) {
        let cur_center = map.getPixelFromLonLat(map.getCenter());
        map.setCenter(map.getLonLatFromPixel({
            x: cur_center.x - (e.x - Mouse.pos.x),
            y: cur_center.y - (e.y - Mouse.pos.y)
        }));
    }
    Mouse.pos.x = e.x;
    Mouse.pos.y = e.y;
}, false);
window.addEventListener('mousedown', Mouse.pressHandler);
window.addEventListener('mouseup', Mouse.pressHandler);