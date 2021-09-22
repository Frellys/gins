window.addEventListener('load', function () {
    if (window.location.pathname === '/') {
        window.location.pathname = '/Home';
    }
    if (window.location.search === '') {
        window.location.search = '?form=ombudsman';
    }
    let main = document.body.querySelector('main');
    let params = Object.fromEntries(window.location.search.slice(1).split('&').map(p => p.split('=')));
    let form = document.body.querySelector(`#${params['form']}`).content.cloneNode(true);
    main.appendChild(form);
    document.body.querySelector('#submit').addEventListener('click', function () {
        if (this.classList.contains('disabled')) {
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    console.log(this.response);
                }
            };
            xhr.open('POST', '/Home/SendMail', true);
            xhr.send();
        }
    }, false);
}, false);