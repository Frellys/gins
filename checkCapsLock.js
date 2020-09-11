// FIELD
let inpPswdField = document.getElementById('Password');
// IMG
let warningImg = document.createElement('img');
warningImg.src = location.origin + '/Scripts/SAS/img/SAS_warning.png';
warningImg.style.height = document.getElementById('Password').offsetHeight + 'px';
warningImg.style.verticalAlign = 'text-bottom';
// WARNING LABEL
let warningLabel = document.createElement('div');
warningLabel.id = 'warningCL';
warningLabel.style.position = 'absolute';
warningLabel.style.textAlign = 'center';
warningLabel.style.color = 'white';
warningLabel.style.font = 'normal 1.6vmin Georgia';
warningLabel.style.backgroundColor = 'rgba(50, 50, 50, 0.9)';
// CHECK IF CAPSLOCK ENABLED ON PASSWORD FIELD
inpPswdField.addEventListener('keyup', function (e) {
    if (e.getModifierState('CapsLock')) {
        if (!document.getElementById('warningCL')) {
            warningLabel.style.top = inpPswdField.getBoundingClientRect().top + inpPswdField.offsetHeight + 'px';
            warningLabel.style.left = inpPswdField.getBoundingClientRect().left + 'px';
            warningLabel.style.width = inpPswdField.offsetWidth + 'px';
            warningLabel.innerText = 'CapsLock';
            // assign
            warningLabel.prepend(warningImg);
            document.body.appendChild(warningLabel);
        }
    }
    else {
        if (document.getElementById('warningCL')) document.getElementById('warningCL').remove();
    }
}, false);