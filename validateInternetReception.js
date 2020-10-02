let reqFields;
window.addEventListener('DOMContentLoaded', function () {
    reqFields = {
        'Title': { text: '- ���������� ��������� �.�.�.' },
        'Email': { text: '- ���������� ��������� E-mail' },
        'Text': { text: '- ���������� ��������� ����� ���������'},
        'Agree': { text: '- ���������� ����������� �� ��������� ������������ ������' },
        'CaptchaInput': { text: '- ���������� ��������� �����' }
    };
    setSubmitTo('disabled');
    updateSubmitRequirements();
    Object.keys(reqFields).forEach(function (el, idx, arr) {
        reqFields[el] = {
            id: el,
            text: reqFields[el].text,
            isFilled: false
        }
        document.getElementById(el).addEventListener('input', function () {
            if (this.type != 'checkbox') {
                if (this.value) {
                    reqFields[this.id].isFilled = true;
                    updateSubmitRequirements();
                }
                else {
                    reqFields[this.id].isFilled = false;
                    updateSubmitRequirements();
                }
            }
            else {
                if (this.checked) {
                    reqFields[this.id].isFilled = true;
                    updateSubmitRequirements();
                }
                else {
                    reqFields[this.id].isFilled = false;
                    updateSubmitRequirements();
                }
            }
        }, false);
    });
    console.log(reqFields);
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