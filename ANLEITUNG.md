# Management Board – Anleitung

Das Board ist eine Website, die **komplett aus diesem Ordner läuft**. Kein
Server, keine Installation, keine Rechte-Anfrage bei der IT. Wer den Ordner
über OneDrive synchronisiert hat, öffnet `index.html` per Doppelklick.

---

## 1. Board öffnen und verteilen

**Selbst öffnen** – im synchronisierten OneDrive-Ordner auf `index.html`
doppelklicken. Der Browser zeigt das Board.

**An andere weitergeben** – für alle, die nur lesen, ist die **Leseausgabe aus
Abschnitt 2** der richtige Weg: eine Datei, ein Link, kein Sync. Wer selbst
pflegen soll, braucht den Ordner. Dafür den ganzen Ordner in OneDrive freigeben.
Wichtig: Diese Empfänger müssen den Ordner **synchronisieren** (in OneDrive im Browser auf
*Verknüpfung zu meinen Dateien hinzufügen* bzw. *Synchronisieren*) und dann dort
`index.html` öffnen. Ein Klick auf die Datei direkt in der OneDrive-Weboberfläche
funktioniert nicht – SharePoint und OneDrive zeigen HTML-Dateien nicht an,
sondern laden sie herunter. Das ist eine Vorgabe von Microsoft und lässt sich
von hier aus nicht umgehen.

**Tipp für die Verteilung**: eine Verknüpfung auf `index.html` anlegen und diese
an die Taskleiste heften, dann ist das Board ein Klick entfernt.

---

## 2. Verteilen ohne Sync – die Leseausgabe

Der Ordnerbetrieb setzt voraus, dass jeder den OneDrive-Ordner synchronisiert.
Für Empfänger, die das Board nur ansehen sollen, ist das zu viel verlangt.
Dafür gibt es die **Verteilfassung**: das ganze Board – Meldungen, Roadmaps und
das komplette Dashboard – in einer einzigen HTML-Datei.

```bash
python3 build/bundle.py
```

Ergebnis: `verteilfassung/IT_Process_Board.html`, rund 500 KB. Diese eine Datei

- läuft per Doppelklick, ohne Ordner daneben,
- läuft als E-Mail- oder Teams-Anhang,
- läuft in der SharePoint- und OneDrive-Vorschau im Browser,
- braucht keinen Server und keine Installation.

Sie ist eine **Leseausgabe**: Der Knopf *Redaktion* fehlt, in der Fußzeile steht
der Stand. Gepflegt wird weiter im Ordner; nach Änderungen die Datei einfach neu
erzeugen und austauschen.

**Anhänge und Karten** liegen weiter als echte Dateien im Ordner und stecken
nicht mit in der Einzeldatei. Damit die Verweise trotzdem funktionieren, trage
die Adresse des Ordners im Browser ein – SharePoint zeigt PDFs, Office-Dateien
und Bilder ja anstandslos an, nur HTML nicht:

```bash
python3 build/bundle.py --base "https://….sharepoint.com/sites/…/Freigegebene%20Dokumente/Board"
```

Dieselbe Adresse lässt sich dauerhaft als `assetBaseUrl` in
`content/settings.js` hinterlegen. Ohne Adresse erscheinen die Anhänge nur als
Pfadangabe statt als toter Link.

### Wenn auch die Leseausgabe nicht aufgeht

Ob SharePoint und Teams eine HTML-Datei überhaupt **anzeigen** oder nur zum
Herunterladen anbieten, entscheidet eine Einstellung eures Tenants
(`BrowserFileHandling`). Steht sie auf *Strict* – in großen Unternehmen die
Regel – schickt SharePoint jede HTML-Datei als Download, egal wie sie gebaut
ist. Das lässt sich in der Datei nicht lösen.

Zwei Wege, die dann funktionieren:

**A – Der Bericht als PDF.** PDFs zeigen SharePoint und Teams zuverlässig direkt
im Browser an. Dashboard öffnen, **Drucken / PDF** klicken, im Druckdialog als
Ziel *Als PDF speichern* wählen, Format **A3 quer**, Hintergrundgrafiken
einschalten. Ergebnis: ein zwölfseitiger Bericht mit Kennzahlen, allen
Diagrammen, der Zeitachse und der vollständigen Tabelle – ohne Filter, dafür mit
einem Link, der bei jedem aufgeht. Ein fertiges Beispiel liegt als
`verteilfassung/IT_Process_Portfolio_Bericht.pdf` bei.

**B – Ein Platz auf einem Webserver.** Die eigentliche Lösung. Der Ordner
braucht nichts weiter als einen statischen Webspace: ein Intranet-Verzeichnis,
einen IIS-Alias oder eine Azure Static Web App. Danach ist es eine normale
Adresse, alles funktioniert, niemand synchronisiert etwas. Die Anfrage an die IT
lautet: *„Wir brauchen einen statischen Webspace für einen Ordner mit HTML,
JavaScript und einer Excel-Datei. Kein Backend, keine Datenbank, keine
Anmeldung – nur ausliefern."*

---

## 3. Die Redaktion entsperren

Alles, was etwas anlegt oder ändert – News, Anhänge, Rollout-Maps, Roadmaps –
läuft ausschließlich über den Knopf **Redaktion** oben rechts. Er fragt nach
einem Passwort. Voreingestellt ist **123456**.

Nach dem Entsperren bleibt die Redaktion offen, bis du sie über **Sperren**
wieder schließt oder den Browser-Tab beendest. Ein Neuladen der Seite hebt die
Entsperrung nicht auf – praktisch, weil du nach dem Ersetzen einer Datei ja neu
lädst. Im gesperrten Zustand ist das Board reine Lesefassung: alle Reiter,
Diagramme, Roadmaps, PNG-Export und Drucken funktionieren, nur die
Bearbeitungsknöpfe sind nicht da.

**Passwort ändern**: Redaktion öffnen, unten auf *Passwort ändern* klicken, neues
Passwort eingeben. Es erscheint eine fertige Zeile – diese in
`content/settings.js` ersetzen und die Seite neu laden. In der Datei steht nur
der Abdruck (SHA-256) des Passworts, nie das Passwort selbst.

> **Was diese Sperre leistet – und was nicht.**
> Sie verhindert, dass jemand versehentlich etwas ändert. Sie ist **keine
> Zugriffskontrolle**: Das Passwort wird im Browser geprüft, und wer den Ordner
> öffnen kann, kann die Sperre umgehen.
> Verbindlich sind allein die **Freigaberechte des OneDrive-Ordners**. Wer dort
> nur Leserechte hat, kann `content/*.js` nicht ersetzen und deshalb auch nichts
> veröffentlichen – ganz unabhängig von der Sperre. Gib den Ordner also
> schreibend nur denen frei, die wirklich pflegen sollen.

---

## 4. News veröffentlichen

Der bequeme Weg, ganz ohne Dateien anzufassen:

1. Im Board oben rechts auf **Redaktion** klicken und das Passwort eingeben.
2. **+ Neu** drücken und die Meldung ausfüllen: Titel, Datum, Kategorie,
   optional Autor, Text und Verweise.
3. Unten auf **content/news.js erzeugen** klicken. Der Browser lädt die Datei
   `news.js` herunter (meist nach *Downloads*).
4. Diese Datei in den Ordner **`content/`** verschieben und die dort liegende
   `news.js` ersetzen.
5. Board neu laden (F5). Die Meldung ist für alle sichtbar, die den Ordner haben.

Solange Schritt 4 nicht erledigt ist, zeigt die Redaktion einen gelben Hinweis
*„Ungespeicherte Änderungen"*. Der Entwurf bleibt im Browser erhalten – auch nach
dem Schließen. Sobald die Datei im Ordner liegt, verschwindet der Hinweis von
selbst.

**Schneller, falls der Browser mitspielt**: Der Knopf **Direkt speichern** öffnet
den Datei-Dialog. Dort in den Ordner `content/` wechseln, `news.js` auswählen und
überschreiben – Schritt 3 und 4 in einem. Erscheint der Knopf nicht oder bricht
er ab, funktioniert der Download-Weg immer.

**Ganz ohne Board**: `content/news.js` lässt sich in jedem Texteditor öffnen. Ganz
oben in der Liste einen neuen Block nach dem Muster der vorhandenen einfügen,
speichern, Board neu laden.

### Formatierungen im Meldungstext

| Schreibweise | Ergebnis |
|---|---|
| `**Text**` | **fett** |
| `*Text*` | *kursiv* |
| `## Text` | Zwischenüberschrift |
| `- Text` | Aufzählungspunkt |
| `[Protokoll](anhaenge/protokoll.pdf)` | Link auf eine Datei im Ordner |
| `` `Text` `` | technische Schreibweise |
| Leerzeile | neuer Absatz |

Kategorien werden in `content/settings.js` gepflegt und bestimmen die Farbe.

---

## 5. Anhänge ergänzen

1. Die Datei in den Ordner **`anhaenge/`** legen.
2. Im Board **Redaktion** entsperren, auf **Anhänge** wechseln, **Dateien wählen** drücken und die
   Datei auswählen – Pfad, Titel und Datum werden vorausgefüllt. Kategorie und
   Beschreibung ergänzen.
3. **content/attachments.js erzeugen** und die Datei wie bei den News nach
   `content/` legen.

Der Browser darf Dateien nicht selbst in den Ordner kopieren – Schritt 1 bleibt
Handarbeit. Verlinken lässt sich alles, was im Ordner liegt, auch Dateien aus
`data/` oder eine Internet-Adresse (`https://…`).

---

## 6. Roadmaps direkt im Board bauen

**Redaktion** entsperren, auf **Rollout-Maps** wechseln und **Neu** drücken. Es
öffnet sich ein Editor mit einer Vorschau, die sich sofort mitverändert. (Ist
noch keine Map vorhanden, führt auch der Knopf im Leerzustand des Reiters
dorthin – sobald die Redaktion offen ist.)

**Aufbau**

1. Oben **Titel**, **Von**, **Bis** setzen und das **Raster** wählen –
   Quartale für den Jahresblick, Monate für die Feinplanung.
2. Links **Spuren** anlegen: eine je Gesellschaft, Standort oder Workstream.
   Der Name lässt sich direkt in der Liste überschreiben, die Pfeile
   verschieben eine Spur nach oben oder unten.
3. Mit **+** an der Spur einen Eintrag anlegen – oder **im Diagramm an die
   gewünschte Stelle doppelklicken**, dann entsteht der Eintrag gleich dort.
4. Rechts den gewählten Eintrag beschreiben: Titel, Zeitraum, Status,
   Fortschritt. Ein Häkchen bei **Meilenstein** macht daraus eine Raute mit
   einem einzigen Datum.

**Mit der Maus arbeiten**

| Geste | Wirkung |
|---|---|
| Balken in der Mitte ziehen | verschiebt den ganzen Eintrag |
| Balken an einer Kante ziehen | ändert Anfang oder Ende |
| Auf einen Balken klicken | wählt ihn rechts im Formular aus |
| Doppelklick auf freie Fläche | legt dort einen neuen Eintrag an |

**Einfärben nach** entscheidet, ob die Balken den Status zeigen (geplant,
läuft, erledigt, Risiko) oder die Spur. Spurenfarben gibt es bis sechs Spuren;
darüber färbt das Board wieder nach Status, weil sich mehr Farben nicht mehr
zuverlässig unterscheiden lassen.

**Fertig?** Unten **content/maps.js erzeugen** drücken und die Datei wie bei
den News in den Ordner `content/` legen. Erst dann sehen die anderen die
Roadmap.

**Für Präsentationen** liefert **Als PNG** ein Bild in doppelter Auflösung zum
Einfügen in Folien, **Drucken** eine saubere Seite ohne Bedienelemente.

Ein Klick auf eine Roadmap-Kachel öffnet sie zunächst nur zum **Ansehen** –
zum Ändern dort auf *Roadmap bearbeiten*.

---

## 7. Fertige Karten als Datei verknüpfen

Für Karten, die woanders entstanden sind: Datei in den Ordner
**`rollout-maps/`** legen und über **Redaktion → Rollout-Maps** eintragen.
Unterstützt werden:

| Typ | Formate | Darstellung im Board |
|---|---|---|
| `image` | PNG, JPG, SVG, WEBP | Vorschaubild in der Kachel, Vollbild beim Klick |
| `pdf` | PDF | Öffnet im eingebauten PDF-Betrachter |
| `page` | HTML | Eigene interaktive Seite, eingebettet |

Das Feld **Typ** kann auf *auto* bleiben – es wird an der Dateiendung erkannt.
Über **Schlagworte** (z. B. `LIS`, `2026`) entstehen automatisch Filterknöpfe.

---

## 8. Dashboard aktualisieren

Das Dashboard im gleichnamigen Reiter wird aus `dashboard/index.html` geladen.
Kommt eine neue Excel-Version:

```bash
# einmalig
pip install openpyxl

# nach jeder neuen Excel-Datei
python3 build/build.py --extract
```

Vorher die neue Datei als `data/Process_Portfolio_Timeline.xlsx` ablegen.
Details stehen in `README.md`.

---

## 9. Was wo liegt

| Ordner / Datei | Inhalt |
|---|---|
| `index.html` | **Das Board – hier starten** |
| `content/settings.js` | Titel, Untertitel, Verantwortlicher, Kategorien |
| `content/news.js` | die Meldungen |
| `content/attachments.js` | die Liste der Anhänge |
| `content/maps.js` | die Liste der Rollout-Maps |
| `anhaenge/` | die Dokumente selbst |
| `rollout-maps/` | die Karten selbst |
| `dashboard/index.html` | das Portfolio-Dashboard |
| `verteilfassung/` | die Leseausgabe als Einzeldatei |
| `build/bundle.py` | erzeugt die Leseausgabe |
| `data/`, `build/` | Quelldatei und Erzeugung des Dashboards |

Die Ordner `data/` und `build/` werden nur zum Neubauen des Dashboards
gebraucht. Wer einen aufgeräumten Ordner verteilen möchte, kann sie weglassen –
`dashboard/index.html` enthält seine Daten bereits.

---

## 10. Wenn etwas nicht klappt

**Das Board zeigt keine News, obwohl die Datei ersetzt wurde.**
Der Browser hält die alte Fassung im Zwischenspeicher. Mit `Strg` + `F5` neu
laden.

**Nach dem Ersetzen erscheint die Meldung doppelt.**
Dann liegt im Browser noch der alte Entwurf. In der Redaktion auf *Änderungen
verwerfen* klicken – die Datei im Ordner ist maßgeblich.

**„Diese Ansicht kann das Board nicht ausführen" oder „Some content didn't load".**
Die Seite wurde aus der SharePoint- oder OneDrive-Vorschau im Browser geöffnet.
Dort läuft sie in einem abgeschotteten Rahmen, in dem die Dateien aus dem Ordner
nicht nachgeladen werden können – das lässt sich von hier aus nicht umgehen.
Entweder den Ordner synchronisieren und `index.html` im Datei-Explorer öffnen –
oder, besser für Empfänger, die **Leseausgabe** aus Abschnitt 2 verteilen, die
genau für diesen Fall gebaut ist.

**Der Knopf zum Anlegen fehlt.**
Dann ist die Redaktion gesperrt. Oben rechts auf *Redaktion* klicken und das
Passwort eingeben.

**Passwort vergessen.**
In `content/settings.js` die Zeile `editorPasswordHash: "..."` auf `""` setzen –
dann ist die Sperre aus. Danach im Board ein neues Passwort setzen.

**Der Reiter Dashboard bleibt leer.**
Prüfen, ob `dashboard/index.html` im Ordner liegt. Sonst über *In eigenem Tab
öffnen* prüfen, ob die Datei für sich funktioniert.

**Eine Roadmap ist nach dem Neuladen wieder weg.**
Dann wurde `content/maps.js` noch nicht ersetzt. Der Entwurf liegt weiter im
Browser – Editor öffnen, *content/maps.js erzeugen*, Datei in `content/` legen.

**Eine Meldung sieht seltsam formatiert aus.**
Meist ein fehlendes Sternchen-Paar. In der Redaktion nachsehen und
`content/news.js` neu erzeugen.

**Umlaute erscheinen als Fragezeichen.**
Die Datei wurde von einem Editor ohne UTF-8 gespeichert. In Notepad++ oder
VS Code als *UTF-8* speichern; die vom Board erzeugten Dateien sind immer UTF-8.
