if (typeof window.orientation == 'undefined') {
    window.addEventListener('load', function () {
        // BASE STYLES
        document.body.style.scrollBehavior = 'smooth';
        // NAV BUTTON
        let navBtn = document.createElement('div');
        navBtn.id = 'navBtn';
        // position
        navBtn.style.position = 'fixed';
        navBtn.style.right = '1vmin';
        navBtn.style.bottom = '1vmin';
        // style
        navBtn.style.width = 'fit-content';
        navBtn.style.height = 'fit-content';
        navBtn.style.padding = '0.5vmin 1vmin';
        navBtn.style.border = '0.25vmin solid #323232';
        navBtn.style.backgroundColor = 'transparent';
        navBtn.style.cursor = 'pointer';
        navBtn.addEventListener('mouseenter', function () {
            this.style.backgroundColor = 'wheat';
        }, false);
        navBtn.addEventListener('mouseleave', function () {
            this.style.backgroundColor = 'transparent';
        }, false);
        // text
        navBtn.style.fontFamily = 'monospace';
        navBtn.style.fontWeight = 'bold';
        navBtn.style.fontSize = '2vmin';
        navBtn.style.color = '#323232';
        if (window.scrollY == 0) {
            document.body.navBtnState = 'toBottom';
            navBtn.innerHTML = '&#8595;&nbsp;&nbsp;&#1074;&#1085;&#1080;&#1079;';
        }
        else {
            document.body.navBtnState = 'toTop';
            navBtn.innerHTML = '&#8593;&nbsp;&#1074;&#1074;&#1077;&#1088;&#1093;';
        }
        // click event
        navBtn.addEventListener('click', function () {
            if (document.body.navBtnState == 'toBottom') {
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            }
            else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }, false);
        // append
        document.body.appendChild(navBtn);
        // SCROLL LISTENER
        window.addEventListener('scroll', function (ev) {
            if (window.scrollY == 0) {
                document.body.navBtnState = 'toBottom';
                navBtn.innerHTML = '&#8595;&nbsp;&nbsp;&#1074;&#1085;&#1080;&#1079;';
            }
            else {
                document.body.navBtnState = 'toTop';
                navBtn.innerHTML = '&#8593;&nbsp;&#1074;&#1074;&#1077;&#1088;&#1093;';
            }
        }, false);
    }, { once: true });
}