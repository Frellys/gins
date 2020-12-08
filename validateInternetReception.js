let reqFields;
window.addEventListener('DOMContentLoaded', function () {
    document.querySelector('form#addform').setAttribute('autocomplete', 'off');
    reqFields = {
        'Title': { text: '- Необходимо заполнить Ф.И.О.' },
        'Email': { text: '- Необходимо заполнить E-mail' },
        'Text': { text: '- Необходимо заполнить текст обращения'},
        'Agree': { text: '- Необходимо согласиться на обработку персональных данных' },
        'CaptchaInput': { text: '- Необходимо заполнить капчу' }
    };
    setSubmitTo('disabled');
    updateSubmitRequirements();
    Object.keys(reqFields).forEach(function (el) {
        reqFields[el] = {
            id: el,
            text: reqFields[el].text,
            isFilled: false
        }
        document.getElementById(el).addEventListener('input', function () {
            reqFields[this.id].isFilled = !!(this[(this.type == 'checkbox') ? 'checked' : 'value']);
            updateSubmitRequirements();
        }, false);
    });
    let ext = [
        '.doc',
        '.docx',
        '.gif',
        '.jpg',
        '.jpeg',
        '.odp',
        '.ods',
        '.odt',
        '.pdf',
        '.png',
        '.pps',
        '.ppsx',
        '.ppt',
        '.pptx',
        '.rar',
        '.rtf',
        '.tif',
        '.txt',
        '.xls',
        '.xlsx',
        '.zip'
    ];
    document.querySelector('input#Attach_filebox').setAttribute('accept', ext.join(','));
    document.querySelector('input#Attach_filebox').removeAttribute('multiple');
    document.querySelector('input#Attach_filebox').addEventListener('input', function (e) {
        if (e.target.files[0].type == '') {
            this.value = '';
        }
    }, false);
}, { once: true });

function setSubmitTo(str) {
    let submit = document.querySelector('#addform input.submit');
    switch (str) {
        case 'enabled': {
            submit.removeAttribute('disabled');
            submit.style.opacity = '';
            break;
        }
        case 'disabled': {
            submit.setAttribute('disabled', 'true');
            submit.style.opacity = '0.5';
            break;
        }
        default: {
            break;
        }
    }
}

function updateSubmitRequirements() {
    if (document.getElementById('submitRequirements')) {
        let subReq = document.getElementById('submitRequirements');
        let cnt = '';
        Object.keys(reqFields).forEach(function (el) {
            if (!reqFields[el].isFilled) {
                cnt += '<div>' + reqFields[el].text + '</div>';
            }
        });
        if (cnt != '') {
            setSubmitTo('disabled');
            subReq.innerHTML = cnt;
        }
        else {
            setSubmitTo('enabled');
            subReq.innerHTML = '';
        }
    }
    else {
        let subReq = document.createElement('div');
        subReq.id = 'submitRequirements';
        subReq.innerText = '';
        Object.keys(reqFields).forEach(function (el) {
            subReq.innerHTML += '<div>' + reqFields[el].text + '</div>';
        });
        document.getElementById('addform').appendChild(subReq);
    }
}