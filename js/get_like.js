/*
    This is a script to get the like-count of a content.
*/
async function getLikes(contentHeader) {
    let response_ = await fetch("https://lkunited.pythonanywhere.com/webResources/getLikes?contentHeader=" + contentHeader);
    let response_text = await response_.text()
    return response_text;
}
async function formatLikes(contentHeader) {
    let response_ = await getLikes(contentHeader);
    document.getElementById(contentHeader).textContent = "Likes: " + response_;
}
async function checkLiked(contentHeader) {
    let name_ = getCookie("username", document.cookie)
    let response_ = await fetch("https://lkunited.pythonanywhere.com/webResources/checkLiked?username=" + name_ + "&contentHeader=" + contentHeader)
    let response_text = await response_.text()
    if (response_text == "True") {
        document.getElementById(contentHeader).style = "color: red;";
    } else {
        document.getElementById(contentHeader).style = "color: darkgrey;";
    }
    formatLikes(contentHeader)
}