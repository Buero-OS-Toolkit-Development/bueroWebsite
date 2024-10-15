if (getCookie("username", document.cookie) == "") {
    setCookie("username", prompt("Nutzernamen eingeben:"), 7);
}
if (getCookie("code", document.cookie) == "") {
    setCookie("code", prompt("Bestätigungscode eingeben:"), 7)
}