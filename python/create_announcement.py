from tkinter import *
from tkinter import font
import pyperclip
import pyautogui as py
from naturalsize import reverse

SCHABL = """<div class="oval">
                <font color="{}">
                    <h3>{}</h3>
                    <p>{}
                        {}
                    {}</p>
                </font>
                <div class="like" id="{}" style="">?</div><button onclick="setLike('{}')" type="button" class="likeButton">&#128151;</button>
                <div id="{}Comments"></div>
                <textarea id="{}CommentText" placeholder="Kommentieren..."></textarea><br />
                <input type="submit" class="login_button" value="Kommentar senden" onclick="comment('{}')" />
                <script>
                    getContent("{}");
                </script>
            </div>"""

def export():
    title = c.titel.get("1.0", END).rstrip()
    content = c.inhalt.get("1.0", END).rstrip().replace("\n", "<br/>\n"+24*" ")
    id_ = title.lower().replace(" ", "")
    styling1 = c.styling.replace(" ", "").replace("bold", "<b>").replace("italic", "<i>")
    styling2 = "<i><b>" if styling1 == "<b><i>" else styling1
    styling2 = styling2.replace("<", "</")
    if c.underline:
        styling1 += "<u>"
        styling2 = "</u>"+styling2
    if c.stroke:
        styling1 += "<s>"
        styling2 = "</s>"+styling2
    to_export = SCHABL.format(c.color, title, styling1, content, styling2, id_, id_, id_, id_, id_, id_)
    pyperclip.copy(to_export)
    py.alert((to_export if len(to_export) < 3000 else "Content too long")+"\n\nin die Zwischenablage kopiert.", "Kopiert")

def color_():
    c.color = c.colors[c.colors.index(c.color)+1 if c.color != c.colors[-1] else 0]
    c.colorB.config(background=c.color)

def style_():
    c.styling = c.stylings[c.stylings.index(c.styling)+1 if c.styling != c.stylings[-1] else 0]
    c.styleB.config(font=("Verdana", "10", c.styling))

def ul_():
    if c.stroke and c.underline:
        c.underline = False; c.stroke = False
    elif not c.stroke and not c.underline:
        c.underline = True
    elif c.underline and not c.stroke:
        c.underline = False; c.stroke = True
    elif not c.underline and c.stroke:
        c.underline = True
    newFont = font.Font(root, c.ulB.cget("font"))
    newFont.configure(underline=c.underline, overstrike=c.stroke)
    c.ulB.config(font=newFont)

def quit_():
    quit(code="Exit")

def reset():
    c.titel.delete("1.0", END)
    c.inhalt.delete("1.0", END)
    c.color = "black"
    c.colorB.config(background=c.color)

root = Tk()
root.title("BüroGuide ContentCreator")

c = Canvas(root, width=650, height=850)
c.configure(bg="light blue")
c.pack()

c.colors = ["black", "red", "blue", "green", "yellow", "gold", "magenta", "purple", "white"]
c.color = "black"

c.stylings = ["", "bold", "italic", "bold italic"]
c.styling = ""

c.underline = False
c.stroke = False

c.create_text(325, 60, text="  Büro Guide  \nContent Creator", font=("Verdana", "30", "bold"))
c.create_text(325, 840, text="Copyright LK 2024  -  Version 3.1.6", font=("Verdana", "10"))

c.create_text(20, 200, text="Titel:", font=("Verdana", "20"), anchor="w")
c.create_text(325, 270, text="Inhalt:", font=("Verdana", "25"))

c.inhalt = Text(root, wrap=WORD, font=("Verdana", "16"))
c.create_window(10, 250, height=480, width=630, window=c.inhalt, anchor="nw")
c.titel = Text(root, wrap="none", font=("Verdana", "18"))
c.create_window(180, 200, height=40, width=420, window=c.titel, anchor="w")

c.colorB = Button(master=root, command=color_, text="Farbe", background="black", relief="ridge", font=("Verdana", "10"))
c.create_window(25, 740, anchor="nw", window=c.colorB, height=30, width=100)
c.styleB = Button(master=root, command=style_, text="Stil", background="light blue", relief="ridge", font=("Verdana", "10"))
c.create_window(150, 740, anchor="nw", window=c.styleB, height=30, width=100)
c.ulB = Button(master=root, command=ul_, text="Strich", background="light blue", relief="ridge", font=("Verdana", "10"))
c.create_window(275, 740, anchor="nw", window=c.ulB, height=30, width=100)

c.create_window(25, 775, anchor="nw", window=Button(master=root, command=export, text="Exportieren", background="light blue", relief="ridge"), height=40, width=180)
c.create_window(235, 775, anchor="nw", window=Button(master=root, command=reset, text="Reset", background="light blue", relief="ridge"), height=40, width=180)
c.create_window(445, 775, anchor="nw", window=Button(master=root, command=quit_, text="Beenden", background="light blue", relief="ridge"), height=40, width=180)

root.mainloop()
