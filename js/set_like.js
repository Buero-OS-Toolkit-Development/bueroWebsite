/*
    Script for setting likes.
*/
async function setLike(contentHeader) {
    let name_ = getCookie("username", document.cookie);
    if (name_ != "NoNameGiven") {
        document.getElementById(contentHeader).textContent = "Likes werden geladen...";
        let code = getCookie("code", document.cookie);
        await fetch("https://lkunited.pythonanywhere.com/webResources/alterLikes?username=" + name_ + "&code=" + code + "&contentHeader=" + contentHeader);
        checkLiked(contentHeader);
    } else {
        alert("Sie müssen eingeloggt sein, um Beiträge liken zu können.");
    }
}