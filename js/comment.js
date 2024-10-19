/*
    Functions for sending comments.
*/
async function comment(contentHeader) {
    let likes_old = document.getElementById(contentHeader).textContent;
    document.getElementById(contentHeader).textContent = "Kommentar wird versendet...";
    let comment = document.getElementById(contentHeader + "CommentText").value;
    let name_ = getCookie("username", document.cookie);
    if (name_ != "NoNameGiven") {
        document.getElementById(contentHeader + "CommentText").value = "";
        let r_ = await fetch("https://lkunited.pythonanywhere.com/webResources/sendComment?contentHeader=" + contentHeader + "&username=" + name_ + "&code=" + getCookie("code", document.cookie) + "&comment=" + comment);
        let r_t = await r_.text();
        if (r_t == "") {
            formatComments(contentHeader);
        } else {
            if (r_t == "Authentification error.") {
                alert("Fehler beim Authentifizieren.");
            } else if (r_t == "Cooldown error.") {
                alert("Sie haben zu viele Kommentare zu diesem Beitrag gesendet.");
            }
        }
    } else {
        alert("Loggen Sie sich ein, um Kommentare zu senden.");
    }
    document.getElementById(contentHeader).textContent = likes_old;
}
async function formatComments(contentHeader) {
    let response_ = await fetch("https://lkunited.pythonanywhere.com/webResources/getComments?contentHeader=" + contentHeader);
    let response_text = await response_.text();
    let comments = response_text.split("#**#");
    let subst = "";
    for (let i = 0; i < comments.length; i++) {
        if (comments[i] != "") {
            let comments_ = comments[i].split("#*#");
            let author = comments_[0];
            let comment = comments_[1];
            subst += "<div class='commentText'><i>" + author + "</i> schrieb:</div><div class='commentOval'>" + comment + "</div>";
        }
    }
    document.getElementById(contentHeader + "Comments").innerHTML = subst;
}