if (window.location.origin === 'https://crm.onf.ru') {
    (new MutationObserver(function (ml, observer) {
        let span = document.querySelector('#editClaim > div:first-child > div:first-child > div:first-child > span:nth-child(2) > span:nth-child(2)');
        if (span) {
            let isTaken = span.innerHTML.startsWith('Взять');
            if (!isTaken) {
                let linkWraps = document.querySelectorAll('#toPrint > div:nth-child(5) > div > div > div:nth-child(3) > div');
                let hasLinks = linkWraps[0].querySelector(':scope > a');
                if (hasLinks) {
                    let id = window.location.pathname.split('/').pop();
                    let links = Array.from(linkWraps).map(function (w) {
                        let a = w.querySelector(':scope > a');
                        a.download = (id + '_' + w.getAttribute('title'));
                        return a;
                    });
                    links.forEach(l => l.click());
                    observer.disconnect();
                    //span.click();
                }
                // close here
            }
            else {
                observer.disconnect();
                span.click();
                window.location.reload();
            }
        }
    })).observe(document.body, { attributes: true, childList: true, subtree: true });
}