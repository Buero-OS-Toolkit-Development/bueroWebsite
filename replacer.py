path = "C:/Users/Leander/Documents/Python/verschlüsseln_gesamt/büro_webseite/index.html"
with open(path, "r", encoding="utf-8") as f:
    content_org = f.read()
HTML = {ord('ü'): '&uuml;',ord('Ü'): '&Uuml;',ord('ä'): '&auml;',ord('Ä'): '&Auml;',ord('ö'): '&ouml;',ord('Ö'): '&Ouml;',ord('ß') :'&szlig;'}
content = content_org.translate(HTML)
with open(path, "w") as f:
    f.write(content)
