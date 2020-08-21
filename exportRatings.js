window.addEventListener('load', function () {
    // vars
    let dt = new Date();
    // create list element
    let li = document.createElement('li');
    document.querySelector('ul.settings-menu > li:nth-child(2) > ul').appendChild(li);
    let a = document.createElement('a');
    a.innerHTML = 'рейтинги';
    a.style.cursor = 'pointer';
    li.appendChild(a);
    a.addEventListener('click', function (e) {
        e.preventDefault();
        let exportWindow = document.createElement('div');
        exportWindow.id = 'exportWindow';
        document.body.appendChild(exportWindow);
        // close button
        let closeBtn = document.createElement('a');
        closeBtn.id = 'closeBtn';
        closeBtn.innerHTML = 'закрыть';
        exportWindow.appendChild(closeBtn);
        closeBtn.addEventListener('click', function () {
            e.preventDefault();
            document.querySelector('div#exportWindow').remove();
        }, { once: true });
        // header
        let header = document.createElement('h1');
        header.innerHTML = 'экспорт рейтингов';
        exportWindow.appendChild(header);
        // from
        let fromWrap = document.createElement('div');
        exportWindow.appendChild(fromWrap);
        let labelFrom = document.createElement('label');
        labelFrom.htmlFor = 'inpFrom';
        labelFrom.innerHTML = 'с: ';
        fromWrap.appendChild(labelFrom);
        let inpFrom = document.createElement('input');
        inpFrom.id = 'inpFrom';
        inpFrom.type = 'date';
        fromWrap.appendChild(inpFrom);
        // to
        let toWtap = document.createElement('div');
        exportWindow.appendChild(toWtap);
        let labelTo = document.createElement('label');
        labelTo.htmlFor = 'inpTo';
        labelTo.innerHTML = 'по: ';
        toWtap.appendChild(labelTo);
        let inpTo = document.createElement('input');
        inpTo.id = 'inpTo';
        inpTo.type = 'date';
        toWtap.appendChild(inpTo);
        inpTo.value =
            dt.getFullYear() + '-' +
            ((dt.getMonth() + 1).toString().length < 2 ? '0' + (dt.getMonth() + 1) : (dt.getMonth() + 1)) + '-' +
            (dt.getDate().toString().length < 2 ? '0' + dt.getDate() : dt.getDate());
        // export
        let exportBtn = document.createElement('button');
        exportBtn.innerHTML = 'экспорт';
        exportWindow.appendChild(exportBtn);
    }, false);
}, false);