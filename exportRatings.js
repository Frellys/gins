window.addEventListener('load', function () {
    // load exportWindow
    let xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', function () {
        if (this.readyState == 4 && this.status == 200) {
            // raw html
            let html = (new DOMParser()).parseFromString(this.responseText, 'text/html').querySelector('html');
            console.log(html);
            // create export style
            let exportStyle = html.querySelector('body > style');
            document.body.appendChild(exportStyle);
            console.log(exportStyle);
            // create export window
            let exportWindow = html.querySelector('body > div#exportWindow');
            exportWindow.style.display = 'none';
            document.body.appendChild(exportWindow);
            console.log(exportWindow);
            // create export script
            let exportScript = Function(html.querySelector('body > script').innerHTML);
            exportScript();
            console.log(exportScript);
            // create list element
            let li = document.createElement('li');
            document.querySelector('ul.settings-menu > li:nth-child(2) > ul').appendChild(li);
            let a = document.createElement('a');
            a.innerHTML = 'рейтинги';
            a.style.cursor = 'pointer';
            li.appendChild(a);
            a.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector('body > div#exportWindow').style.display = 'block';
            }, false);
        }
    }, false);
    xhr.open('GET', '/Scripts/SAS/exportRatingsWindow.html', true);
    xhr.send();
}, false);