/*
    Script for setting likes.
*/
async function setLike(contentHeader) {
    document.getElementById(contentHeader).textContent = "Likes werden geladen...";
    let name_ = getCookie("username", document.cookie);
    let code = getCookie("code", document.cookie);
    if (name_ != "NoNameGiven") {
        await fetch("https://lkunited.pythonanywhere.com/webResources/alterLikes?username=" + name_ + "&code=" + code + "&contentHeader=" + contentHeader);
        checkLiked(contentHeader);
    } else {
        alert("Sie müssen eingeloggt sein, um Beiträge liken zu können.")
    }
}