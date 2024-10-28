/*
    The code for our Special.
*/
function randomNumber(max = 100, min = 0) {
    var r = Math.floor(Math.random() * max);
    while (r < min) {
        r = Math.floor(Math.random() * max);
    }
    return r;
}
function randomColors() {
    let cols = ["gold", "silver", "white", "black", "red", "yellow", "green", "blue", "pink", "purple"];
    let c1 = "";
    let c2 = "";
    while (c1 == c2) {
        c1 = cols[randomNumber(cols.length)];
        c2 = cols[randomNumber(cols.length)];
    }
    return [c1, c2];
}
function startKonfetti() {
    if (getCookie("username", document.cookie) != "NoNameGiven") {
        if (document.getElementById("time__").textContent == "10") {
            let fS = 0;
            let obj = "";
            let c = "";
            for (let i = 1; i < randomNumber(11, 3); i++) {
                obj = document.getElementById("k"+i.toString());
                obj.style.marginTop = randomNumber().toString() + "%";
                obj.style.marginBottom = randomNumber().toString() + "%";
                obj.style.marginLeft = randomNumber().toString() + "%";
                obj.style.marginRight = randomNumber().toString() + "%";
                fS = randomNumber(50, 20);
                obj.style.fontSize = fS.toString() + "px";
                obj.style.width = (2*fS).toString() + "px";
                obj.style.display = "inherit";
                c = randomColors();
                obj.style.background = "radial-gradient("+c[0]+", "+c[1]+")";
                setTimeout(reset, 10000, "k"+i.toString());
            }
            setTimeout(reduceTime, 1000);
        } else {
            alert("Sie haben bereits teilgenommen.");
            if (document.getElementById("time__").textContent == "0") {
                if (confirm("Wollen Sie diese Seite neu initialisieren?")) {
                    document.getElementById("time__").textContent = "10";
                    document.getElementById("score__").textContent = "0";
                    document.getElementById("successText__").textContent = "";
                    getHighscore();
                    for (let i=1; i < 11; i++) {
                        reset("k"+i.toString());
                    }
                }
            } else {
                alert("Ihr aktuelles Spiel besteht noch.")
            }
        }
    } else {
        alert("Loggen Sie sich ein, um teilzunehmen.")
    }
}
function reset_(id) {
    let scr = document.getElementById("score__").textContent;
    document.getElementById("score__").textContent = (Number(scr) + 1).toString();
    reset(id);
}
function reset(id) {
    let obj = document.getElementById(id);
    obj.style.display = "none";
}
function reduceTime() {
    time = Number(document.getElementById("time__").textContent);
    if (time > 1) {
        if (allUndisplayed()) {
            gameOver();
        } else {
            time -= 1;
            document.getElementById("time__").textContent = time.toString();
            setTimeout(reduceTime, 1000);
        }
    } else {
        gameOver();
    }
}
function gameOver() {
    document.getElementById("time__").textContent = "0";
    let score = document.getElementById("score__").textContent;
    let hscore = document.getElementById("highscore__").textContent;
    if (Number(score) > Number(hscore.split(" (")[0])) {
        document.getElementById("successText__").textContent = "Sie haben den Highscore geknackt! Super!";
        setHighscore(score);
        getHighscore();
    } else {
        document.getElementById("successText__").textContent = "Sie haben den Highscore leider nicht geknackt.";
    }
}
async function getHighscore() {
    if (getCookie("username", document.cookie) != "NoNameGiven") {
        let r = await fetch("https://lkunited.pythonanywhere.com/webResources/getHighscore");
        let rT = await r.text();
        document.getElementById("highscore__").textContent = rT;
    }
}
async function setHighscore(score) {
    let r = await fetch("https://lkunited.pythonanywhere.com/webResources/setHighscore?username=" + getCookie("username", document.cookie) + "&code=" + getCookie("code", document.cookie) + "&score=" + score);
    let rt = await r.text();
    if (rt != "") {
        alert("Ein Fehler ist aufgetreten:\n"+rt);
    }
}
function allUndisplayed() {
    let r = true;
    for (let i = 1; i < 11; i++) {
        if (document.getElementById("k"+i.toString()).style.display != "none") {
            if (document.getElementById("k"+i.toString()).style.display != "") {
                r = false;
                break;
            }
        }
    }
    return r;
}