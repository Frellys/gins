window.addEventListener('load', function () {
    let main = document.body.querySelector('main');
    let params = Object.fromEntries(window.location.search.slice(1).split('&').map(p => p.split('=')));
    let form = document.body.querySelector(`#${params['form']}`).content.cloneNode(true);
    main.appendChild(form);
}, false);