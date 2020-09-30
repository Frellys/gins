function getBannerset() {
    let xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', function () {
        if (this.readyState == 4 && this.status == 200) {
        }
    }, false);
    xhr.open('GET', '', true);
    xhr.send();
}