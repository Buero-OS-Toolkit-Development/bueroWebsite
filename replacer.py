path = "C:/Users/Leander/Documents/Python/verschlüsseln_gesamt/büro_webseite/index.html"
with open(path, "r", encoding="utf-8") as f:
    content_org = f.read()
content = content_org.replace("ß", "&szlig;",).replace("ü", "&uuml;").replace("ö", "&ouml;")
with open(path, "w", encoding="utf-8") as f:
    f.write(content)
