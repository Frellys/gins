Settings = {
    bgTemplate: true
};

/**
 * UI consructor
 */
let UI = new function () {
    this.div = document.createElement('div');
    this.div.classList.add('UI');
};

/**
 * background template logo
 */
UI.bgTemplate = (Settings.bgTemplate) && new function () {
    this.div = document.createElement('div');
    this.div.classList.add('UI-bgTemplate');
    this.div.style.height = '100vh';
    this.div.style.width = '100vw';
    this.div.style.backgroundColor = 'pink';
    UI.div.appendChild(this.div);
};

/**
 * map container
 */
UI.map = new function () {
    this.div = document.createElement('div');
    this.div.id = 'map';
    this.div.classList.add('map-view');
    this.div.style.marginLeft = '3rem';
    UI.div.appendChild(this.div);
};

/**
 * compact line, with main controls
 * located at the edge of the screen
 */
UI.sidebar = new function () {
    this.div = document.createElement('div');
    this.div.classList.add('UI-sidebar');
    this.div.style.position = 'absolute';
    this.div.style.top = '0';
    this.div.style.left = '0';
    this.div.style.backgroundColor = '#323232';
    this.div.style.height = '100vh';
    this.div.style.width = '3rem';
    UI.div.appendChild(this.div);
};

UI.fader = new function () { };