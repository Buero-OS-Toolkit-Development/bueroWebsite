function usernameCheck() {
    if (getCookie("username", document.cookie) == "") {
        setCookie("username", prompt("Nutzernamen eingeben:", "Testuser"), 7);
    }
    if (getCookie("code", document.cookie) == "") {
        setCookie("code", prompt("Bestaetigungscode eingeben:", "111111"), 7)
    }
}