from naturalsize import listToInt, special_starter

print("Booting replacer v4.0.0")
print("replacer is part of Leander Kafemanns project BueroWebKit.")

path = input("Pfad angeben: ") # or add own default path here
with open(path, "r", encoding="utf-8") as f:
    content_org = f.read()
invalid = ["ß", "ü", "ö", "Ö", "ü", "ä", "Ä", "b&uuml;", " />"]
print("Targets found: "+str(listToInt([content_org.count(i) for i in invalid])))

content = content_org.replace("ß", "&szlig;",).replace("ü", "&uuml;").replace("ö", "&ouml;").replace("Ü", "&Uuml;").replace("Ö", "&Ouml;").replace("ä", "&auml;").replace("Ä", "&Auml;").replace("b&uuml;", "bü").replace(" />", "/>")
with open(path, "w", encoding="utf-8") as f:
    f.write(content)
print("Targets successfully replaced.")

special_starter()