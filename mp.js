let mpStates = [
    'DD MM SS s',
    'DD dddddd',
    'DD MM mmm'
];
window.addEventListener('DOMContentLoaded', function () {
    // display container on first mousemove
    document.querySelector('div#map_container').addEventListener('mousemove', function () {
        document.getElementById('mp').style.display = 'block';
    }, { once: true });
    // switch mpStates when container is clicked
    document.querySelector('div#mp').addEventListener('click', function () {
        mpStates.push(mpStates.shift());
    }, false);
}, { once: true });