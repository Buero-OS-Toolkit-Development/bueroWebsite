function renameMenuPoints() {
    let menuTitlesShort = ["🏠", "🛈", "🡇", "🔧", "📦", "🖼", "💻", "🔗", "☎"];
    let menuTitlesLong = ["Home", "Über", "Installation", "Features", "Pakete", "Bilder", "Entwickler", "Weblinks", "Kontakt"]
    if (getCookie("rearranged", document.cookie) == "true") {
        setCookie("rearranged", "false", 7);
        for (let i = 0; i < menuTitlesLong.length; i++) {
            document.getElementById("menu" + (i+1).toString()).textContent = menuTitlesLong[i];
        }
        document.getElementById("buttonSwitchMP").textContent = "Symbole";
    } else {
        setCookie("rearranged", "true", "7");
        for (let i = 0; i < menuTitlesShort.length; i++) {
            document.getElementById("menu" + (i+1).toString()).textContent = menuTitlesShort[i];
        }
        document.getElementById("buttonSwitchMP").textContent = "Texte";
    }
}