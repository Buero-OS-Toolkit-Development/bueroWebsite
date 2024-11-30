/*
    Functions for sending and recieving comments.
*/
let cDict_ = [];

async function comment(contentHeader) {
    let likes_old = document.getElementById(contentHeader).textContent;
    document.getElementById(contentHeader).textContent = "Kommentar wird versendet...";
    let comment = document.getElementById(contentHeader + "CommentText").value;
    let name_ = getCookie("username", document.cookie);
    if (name_ != "NoNameGiven") {
        if (comment != "") {
            document.getElementById(contentHeader + "CommentText").value = "";
            let r_ = await fetch("https://lkunited.pythonanywhere.com/webResources/sendComment?contentHeader=" + contentHeader + "&username=" + name_ + "&code=" + getCookie("code", document.cookie) + "&comment=" + comment + "&time=" + getTimeString());
            let r_t = await r_.text();
            if (r_t == "") {
                formatComments(contentHeader);
            } else {
                alert("Kommentieren fehlgeschlagen:\n" + r_t);
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
    let comments_ = "";
    let author = "";
    let comment = "";
    let time = "";
    let timeText = "";
    let timeTextUnformat = "";
    let idString = "";
    let newIDN = cDict_.length - 1;
    for (let i = 0; i < comments.length; i++) {
        if (comments[i] != "") {
            comments_ = comments[i].split("#*#");
            author = comments_[0];
            comment = comments_[1];
            time = comments_[2];
            timeTextUnformat = getTimeDiffString(time);
            timeText = getTimeDiffString(time, true); 
            idString = contentHeader + "CommentTimeInfo" + i.toString();
            newIDN += 1;
            cDict_[newIDN] = idString + "#**#" + timeTextUnformat + "#**#" + timeText;
            subst += "<div class='commentText'><i>" + author + "</i> schrieb <i>" +
            "<button class='commentTimeButton' onclick='reformatComment("+newIDN.toString()+")'><div id='" + idString + "'>" + timeText + "</div></button></i>:</div><div class='commentOval'>" +
            comment.replace("\n", "<br/>") + "</div>";
        }
    }
    document.getElementById(contentHeader + "Comments").innerHTML = subst;
}
function reformatComment(id) {
    let dictC = cDict_[id].split("#**#");
    let id_ = dictC[0];
    let reText1 = dictC[1];
    let reText2 = dictC[2];
    let reText = "";
    if (document.getElementById(id_).textContent == reText1) {
        reText = reText2;
    } else {
        reText = reText1;
    }
    document.getElementById(id_).textContent = reText;
}