let mpStates = [
    'DD MM SS s',
    'DD dddddd',
    'DD MM mmm'
];
window.addEventListener('DOMContentLoaded', function () {
    document.querySelector('div#mp').addEventListener('click', function () {
        mpStates.push(mpStates.shift());
    }, false);
}, { once: true });