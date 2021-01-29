window.addEventListener('DOMContentLoaded', function () {
    // fields
    let inpNameField = document.getElementById('LoginOrEmail');
    let inpPswdField = document.getElementById('Password');
    // wrap
    let warningWrap = document.createElement('div');
    warningWrap.id = 'warningWrap';
    warningWrap.style.display = 'none';
    warningWrap.flexDirection = 'row';
    warningWrap.style.alignItems = 'flex-end';
    warningWrap.style.width = 'fit-content';
    warningWrap.style.margin = '0 auto';
    document.getElementById('login-form-body').prepend(warningWrap);
    // image
    let warningImg = document.createElement('img');
    warningImg.src = location.origin + '/Scripts/SAS/img/SAS_warning.png';
    warningImg.style.height = '1em';
    warningWrap.appendChild(warningImg);
    // label
    let warningLabel = document.createElement('span');
    warningLabel.innerHTML = 'capslock enabled';
    warningLabel.style.color = 'whitesmoke';
    warningLabel.style.font = 'normal 1em monospace';
    warningWrap.appendChild(warningLabel);
    /**
     * Checks for CapsLock on input event
     * Sets 'display' property for warningWrap
     * @param {Event} e
     * @returns {void}
     */
    function checkModifierCapsState(e) {
        document.getElementById('warningWrap').style.display = e.getModifierState('CapsLock') ? 'flex' : 'none';
    }
    // set listeners
    inpNameField.addEventListener('keyup', checkModifierCapsState, false);
    inpPswdField.addEventListener('keyup', checkModifierCapsState, false);
}, { once: true });