let mpState = 'mp0';
window.addEventListener('DOMContentLoaded', function () {
    // display container on first mousemove
    document.querySelector('#map_container').addEventListener('mousemove', function () {
        document.querySelector('#mp_wrap').style.display = 'block';
    }, { once: true });
    // set .select display onclick
    document.querySelector('#mp_wrap > .switch').addEventListener('click', function () {
        let sel = document.querySelector('#mp_wrap > .select');
        sel.style.display = (sel.style.display == 'block') ? 'none' : 'block';
    }, false);
    // set .select input change handlers
    document.querySelectorAll('#mp_wrap > .select > .row > input').forEach(function (inp) {
        inp.addEventListener('change', function (e) {
            mpState = e.target.id;
        }, false);
    });
}, { once: true });