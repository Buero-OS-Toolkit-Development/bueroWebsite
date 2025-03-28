/*
    This are functions for setting and reading cookies.
*/
function getCookie(cname, cookieObject) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(cookieObject);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
function setCookie(cname, cvalue, exdays) {
    if (getCookie(cname, document.cookie) != "") {
        document.cookie = cname+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;SameSite=None; Secure";
    }
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;SameSite=None; Secure";
}

function renewCookie(cname, exdays = 7) {
    setCookie(cname, getCookie(cname, document.cookie), exdays)
}