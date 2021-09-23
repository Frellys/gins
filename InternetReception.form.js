window.addEventListener('load', function () {
    if (window.location.pathname === '/') {
        window.location.pathname = '/Home';
    }
    if (window.location.search.includes('form=') === false) {
        window.location.search = '?form=ombudsman';
    }
    let main = document.body.querySelector('main');
    let params = Object.fromEntries(window.location.search.slice(1).split('&').map(p => p.split('=')));
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let doc = new DOMParser().parseFromString(this.response, 'text/html');
            main.appendChild(doc.body.querySelector('form'));
            document.body.querySelector('#submit').addEventListener('click', sendMail, false);
        }
    };
    xhr.open('GET', `/form/${params['form']}.html`, true);
    xhr.send();
}, false);