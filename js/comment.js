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
        let r_ = await fetch("https://lkunited.pythonanywhere.com/webResources/sendComment?contentHeader=" + contentHeader + "&username=" + name_ + "&code=" + getCookie("code", document.cookie) + "&comment=" + comment + "&time=" + getTimeString());
        let r_t = await r_.text();
        if (r_t == "") {
            formatComments(contentHeader);
        } else {
            alert("Kommentieren fehlgeschlagen:\n" + r_t);
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
            let time = comments_[2];
            let timeText = "";
            let tD = getTimeDiff(getTimeString(), time);
            if (tD == 0) {
                timeText = "jetzt";
            } else if (tD < 60) {
                if (tD == 1) {
                    timeText = "vor einer Minute";
                } else {
                    timeText = "vor " + tD.toString() + " Minuten";
                }
            } else if (tD < 60 * 24) {
                let hrs = 0;
                while (tD >= 60) {
                    hrs += 1;
                    tD -= 60;
                }
                if (hrs == 1) {
                    timeText = "vor einer Stunde";
                } else {
                    timeText = "vor " + hrs.toString() + " Stunden";
                }
            } else if (tD < 60 * 24 * 7) {
                let days = 0;
                while (tD >= 60 * 24) {
                    days += 1;
                    tD -= 60 * 24;
                }
                if (days == 1) {
                    timeText = "vor einem Tag";
                } else {
                    timeText = "vor " + days.toString() + " Tagen";
                }
            } else {
                let time_ = time.split(", ");
                timeText = "am " + time_[0] + " um " + time_[1] + " Uhr";
            }
            subst += "<div class='commentText'><i>" + author + "</i> schrieb <i>" + timeText + "</i>:</div><div class='commentOval'>" + comment + "</div>";
        }
    }
    document.getElementById(contentHeader + "Comments").innerHTML = subst;
}