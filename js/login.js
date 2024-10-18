/*
    Script for login data.
*/
function usernameCheck() {
    if (getCookie("username", document.cookie) == "") {
        setCookie("username", "NoNameGiven", 7);
    } else {
        setCookie("username", getCookie("username", document.cookie), 7);
    }
    if (getCookie("code", document.cookie) == "") {
        setCookie("code", "NoCodeGiven", 7);
    } else {
        setCookie("code", getCookie("code", document.cookie), 7);
    }
}
function changeLogin() {
    let name = getCookie("username", document.cookie);
    let code = getCookie("code", document.cookie);
    if (name == "NoNameGiven") {
        name = "Testuser";
    }
    if (code == "NoCodeGiven") {
        code = "111111";
    }
    let cName = prompt("Nutzernamen eingeben:", name);
    let cCode = prompt("Geheimcode eingeben:", code);
    changeLoginBackground(cName, cCode);
}
function changeLoginBackground(name, code) {
    setCookie("username", name, 7);
    setCookie("code", code, 7);
}
function changeLoginButton() {
    changeLogin();
    document.getElementById("name__").textContent = getCookie("username", document.cookie);
    document.getElementById("code__").textContent = getCookie("code", document.cookie);
    document.getElementById("text__").textContent = "Einige Daten konnten eventuell noch nicht aktualisiert werden...";
}