from tkinter import *
import pyperclip
import pyautogui as py

SCHABL = """<div class="oval">
                <font color="{}">
                    <h3>{}</h3>
                    <p>
                        {}
                    </p>
                </font>
                <div class="like" id="{}" style="">?</div><button onclick="setLike('{}')" type="button" class="likeButton">&#128151;</button>
                <script>
                    checkLiked("{}");
                </script>
            </div>"""

def export():
    title = c.titel.get("1.0", END).rstrip()
    content = c.inhalt.get("1.0", END).rstrip().replace("\n", "<br/>\n"+24*" ")
    id_ = title.lower().replace(" ", "")
    to_export = SCHABL.format(c.color, title, content, id_, id_, id_)
    pyperclip.copy(to_export)
    py.alert((to_export if len(to_export) < 1000 else "Content too long")+"\n\nin die Zwischenablage kopiert.", "Kopiert")

def color_():
    c.color = c.colors[c.colors.index(c.color)+1 if c.color != c.colors[-1] else 0]
    c.colorB.config(background=c.color)

def quit_():
    quit(code="Exit")

root = Tk()
root.title("BüroGuide ContentCreator")

c = Canvas(root, width=650, height=850)
c.configure(bg="light blue")
c.pack()

c.colors = ["black", "red", "blue", "green", "yellow", "gold", "magenta", "light blue", "purple"]
c.color = "black"

c.create_text(325, 60, text="  Buero Guide  \nContent Creator", font=("Verdana", "30", "bold"))
c.create_text(325, 840, text="Copyright LK 2024  -  Version 2.0.0", font=("Verdana", "10"))

c.create_text(20, 200, text="Titel:", font=("Verdana", "20"), anchor="w")
c.create_text(325, 270, text="Inhalt:", font=("Verdana", "25"))

c.inhalt = Text(root, wrap=WORD, font=("Verdana", "16"))
c.create_window(10, 250, height=480, width=630, window=c.inhalt, anchor="nw")
c.titel = Text(root, wrap="none", font=("Verdana", "18"))
c.create_window(180, 200, height=40, width=420, window=c.titel, anchor="w")

c.colorB = Button(master=root, command=color_, text="Farbe", background="black", relief="ridge")
c.create_window(25, 740, anchor="nw", window=c.colorB, height=30, width=100)

c.create_window(25, 775, anchor="nw", window=Button(master=root, command=export, text="Exportieren", background="light blue", relief="ridge"), height=40, width=275)
c.create_window(350, 775, anchor="nw", window=Button(master=root, command=quit_, text="Beenden", background="light blue", relief="ridge"), height=40, width=275)

root.mainloop()
