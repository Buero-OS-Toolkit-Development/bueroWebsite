function renameMenuPointsAgent(menuTitlesShort, menuTitlesLong, cookieTitle="rearranged") {    
    if (getCookie(cookieTitle, document.cookie) == "true") {
        setCookie(cookieTitle, "false", 7);
        for (let i = 0; i < menuTitlesLong.length; i++) {
            document.getElementById("menu" + (i+1).toString()).textContent = menuTitlesLong[i];
        }
        document.getElementById("buttonSwitchMP").textContent = "Symbole";
    } else {
        setCookie(cookieTitle, "true", "7");
        for (let i = 0; i < menuTitlesShort.length; i++) {
            document.getElementById("menu" + (i+1).toString()).textContent = menuTitlesShort[i];
        }
        document.getElementById("buttonSwitchMP").textContent = "Texte";
    }
}

function renameMenuPoints() {
    let menuTitlesShort = ["🏠", "🛈", "🡇", "🔧", "📦", "🖼", "💻", "🔗", "☎"];
    let menuTitlesLong = ["Home", "Über", "Installation", "Features", "Pakete", "Bilder", "Entwickler", "Weblinks", "Kontakt"];
    renameMenuPointsAgent(menuTitlesShort, menuTitlesLong);
}