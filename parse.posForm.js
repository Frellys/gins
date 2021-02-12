setTimeout(function () {
    // ID, DATE, F, I, O, EMAIL, REG, FIO_VACC, SNILS, OMS, BIRTH, PHONE, POL
    let cnt = document.querySelector('#root').querySelector('div.scrollbar-container');
    let greyHeaders = Array.from(cnt.querySelectorAll('div')).filter(function (el) {
        return (el.className.toString().includes('greyHeader'));
    });
    if (greyHeaders[0].querySelectorAll('div')[16].innerText == 'Запись в лист ожидания') {
        let txt = greyHeaders[greyHeaders.length - 1].querySelectorAll('div')[4].innerHTML.replace(/\n/g, ' ').replace(/\s\s/g, ' ');
        let id = window.location.href.toString().split('/').pop();
        let date = greyHeaders[0].querySelectorAll('div')[24].innerHTML;
        let f = greyHeaders[1].querySelectorAll('div')[4].innerHTML;
        let i = greyHeaders[1].querySelectorAll('div')[6].innerHTML;
        let o = greyHeaders[1].querySelectorAll('div')[8].innerHTML;
        let email = txt.split('Адрес электронной почты:')[1].split('Контактный номер телефона:')[0].trim();
        let reg = greyHeaders[greyHeaders.length - 1].querySelectorAll('div')[6].innerHTML;
        let fio_vacc = txt.split('COVID-19 ')[1].split(' СНИЛС:')[0];
        let snils = txt.split('СНИЛС:')[1].split('Полис ОМС:')[0].trim();
        let oms = txt.split('Полис ОМС:')[1].split('Дата рождения:')[0].trim().replace(/(Серия полиса ОМС:)/g, 'Серия:');
        let birth = txt.split('Дата рождения:')[1].split('Адрес электронной почты:')[0].trim();
        let phone = txt.split('Контактный номер телефона:')[1].split('Для прохождения вакцинации в Субъект РФ:')[0].trim();
        let pol = txt.split('Для прохождения вакцинации в Субъект РФ:').pop().trim().replace(/( Медицинская организация: )/g, '\t');
        let ret = [id, date, f, i, o, email, reg, fio_vacc, snils, oms, birth, phone, pol].join('\t');
        localStorage.setItem(window.location.href, ret);
    }
    window.close();
}, 5000);