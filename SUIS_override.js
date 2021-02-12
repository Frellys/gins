window.addEventListener('DOMContentLoaded', function () {
    // remove static width from tables
    document.querySelectorAll('div.content table').forEach(function (table) {
        table.style.width = 'auto';
    });
}, { once: true });