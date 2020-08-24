window.addEventListener('load', function () {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let resp = JSON.parse(this.responseText);
            let asideRT = document.querySelector('aside.rt');
            let currencyBlock = document.createElement('div');
            currencyBlock.classList.add('banner', 'clearfix');
            currencyBlock.style.fontFamily = 'monospace';
            currencyBlock.style.fontSize = '1.25vmin';
            let usdInd;
            if (parseFloat(resp.Valute.USD.Value) > parseFloat(resp.Valute.USD.Previous)) usdInd = '&#8593;';
            if (parseFloat(resp.Valute.USD.Value) < parseFloat(resp.Valute.USD.Previous)) usdInd = '&#8595;';
            if (parseFloat(resp.Valute.USD.Value) == parseFloat(resp.Valute.USD.Previous)) usdInd = '=';
            let eurInd;
            if (parseFloat(resp.Valute.EUR.Value) > parseFloat(resp.Valute.EUR.Previous)) eurInd = '&#8593;';
            if (parseFloat(resp.Valute.EUR.Value) < parseFloat(resp.Valute.EUR.Previous)) eurInd = '&#8595;';
            if (parseFloat(resp.Valute.EUR.Value) == parseFloat(resp.Valute.EUR.Previous)) eurInd = '=';
            let gbpInd;
            if (parseFloat(resp.Valute.GBP.Value) > parseFloat(resp.Valute.GBP.Previous)) gbpInd = '&#8593;';
            if (parseFloat(resp.Valute.GBP.Value) < parseFloat(resp.Valute.GBP.Previous)) gbpInd = '&#8595;';
            if (parseFloat(resp.Valute.GBP.Value) == parseFloat(resp.Valute.GBP.Previous)) gbpInd = '=';
            // output
            currencyBlock.innerHTML = 'USD(&#36;): ' + usdInd + parseFloat(resp.Valute.USD.Value).toFixed(4) + ' (' + resp.Valute.USD.Previous + ')';
            currencyBlock.innerHTML += '<hr style="margin: 5px 0; border-top: 1px solid #949693;">';
            currencyBlock.innerHTML += 'EUR(&#8364;): ' + eurInd + parseFloat(resp.Valute.EUR.Value).toFixed(4) + ' (' + resp.Valute.EUR.Previous + ')';
            currencyBlock.innerHTML += '<hr style="margin: 5px 0; border-top: 1px solid #949693;">';
            currencyBlock.innerHTML += 'GBP(&#163;): ' + gbpInd + parseFloat(resp.Valute.GBP.Value).toFixed(4) + ' (' + resp.Valute.GBP.Previous + ')';
            // link
            currencyBlock.innerHTML += '<hr style="margin: 5px 0; border-top: 1px solid #949693;">';
            currencyBlock.innerHTML += '<a href="https://www.cbr.ru/" target="_blank" title="https://www.cbr.ru/" style="float: right;">cbr.ru</a>';
            // append
            asideRT.prepend(currencyBlock);
        }
    };
    xhttp.open('GET', 'https://www.cbr-xml-daily.ru/daily_json.js', true);
    xhttp.send();
}, false);