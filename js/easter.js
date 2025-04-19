function accessEasterSpecial() {
    var x = Math.round(Math.random() * (9999 - 1000)) + 1000;
    alert("EasterEgg gefunden! Geben Sie sogleich die EasterEggPIN " + x + " ein!");
    setCookie("eePIN", x, 1);
    location.href = "https://leanderkafemann.github.io/bueroWebsite/easterSpecial";
}

function checkIntegrityES() {
    if (prompt("EasterEggPIN eingeben:") != getCookie("eePIN", document.cookie) && getCookie("eePIN", document.cookie) != "") {
        alert("Falsche PIN!");
        history.back();
    }
}