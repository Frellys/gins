let reqFields;
window.addEventListener('DOMContentLoaded', function () {
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
            if (this.type != 'checkbox') {
                reqFields[this.id].isFilled = this.value ? true : false;
            }
            else {
                reqFields[this.id].isFilled = this.checked ? true : false;
            }
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
        Object.keys(reqFields).forEach(function (el, idx, arr) {
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
        Object.keys(reqFields).forEach(function (el, idx, arr) {
            subReq.innerHTML += '<div>' + reqFields[el].text + '</div>';
        });
        document.getElementById('addform').appendChild(subReq);
    }
}