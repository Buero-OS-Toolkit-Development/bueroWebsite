/*
    Script for setting likes.
*/
function setLike(contentHeader) {
    let name_ = getCookie("username", document.cookie);
    let code = getCookie("code", document.cookie);
    fetch("https://lkunited.pythonanywhere.com/webResources/alterLikes?username=" + name_ + "&code=" + code + "&contentHeader=" + contentHeader);
    checkLiked(contentHeader);
}