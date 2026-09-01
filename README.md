# IT Process Management Board

Ein Management-Board, das vollständig aus einem OneDrive-Ordner läuft – ohne
Server und ohne Installation. Einstieg ist `index.html`; die Pflegeanleitung für
News, Anhänge und Maps steht in [`ANLEITUNG.md`](ANLEITUNG.md).

| Reiter | Inhalt | Gepflegt über |
|---|---|---|
| News | Meldungen ans Management | `content/news.js` bzw. „Redaktion" im Board (passwortgeschützt) |
| Dashboard | das Portfolio-Cockpit (siehe unten) | `python3 build/build.py --extract` |
| Rollout-Maps | **Roadmaps im Board selbst bauen** (Spuren, Balken, Meilensteine, PNG-Export) sowie Karten als Bild, PDF oder HTML-Seite | Roadmap-Editor im Board bzw. `content/maps.js` + Ordner `rollout-maps/` |
| Anhänge | Dokumente aus dem Ordner | `content/attachments.js` + Ordner `anhaenge/` |

Anlegen und Ändern läuft ausschließlich über den Knopf **Redaktion** und ist mit
einem Passwort geschützt (voreingestellt `123456`, in `content/settings.js` als
SHA-256-Abdruck hinterlegt). Das ist ein Schutz gegen versehentliches Ändern,
keine Zugriffskontrolle – verbindlich sind die Freigaberechte des OneDrive-Ordners.

Inhalte liegen als JavaScript-Dateien in `content/` und nicht als JSON, weil ein
Browser aus einem lokalen Ordner (`file://`) keine JSON-Dateien nachladen darf –
`<script src>` dagegen schon. Die Redaktion im Board erzeugt diese Dateien
fertig zum Ersetzen; ein Entwurf bleibt so lange im Browser erhalten, bis die
erzeugte Datei im Ordner liegt, und räumt sich dann selbst auf.

---

# Portfolio-Dashboard

Management-Dashboard für das Corporate-IT-Prozessportfolio aus
`data/Process_Portfolio_Timeline.xlsx` — ein einzelnes, in sich geschlossenes
HTML-File mit allen Filtern, KPIs, Diagrammen, einer Portfolio-Timeline und
einer Detailtabelle.

## Zwei Betriebsarten

| | Ordner | Leseausgabe |
|---|---|---|
| Datei | `index.html` samt Ordnern | `verteilfassung/IT_Process_Board.html` |
| Voraussetzung | OneDrive-Ordner synchronisiert | keine – eine Datei genügt |
| Redaktion | ja, passwortgeschützt | nein, reine Leseansicht |
| Vorschau im Browser (SharePoint) | nein | ja |
| Erzeugen | – | `python3 build/bundle.py` |

Für Empfänger, die nur lesen, ist die Leseausgabe gedacht: eine Datei, per Link
oder Anhang, ohne Sync. Gepflegt wird im Ordner.

## Öffnen

```
dashboard/index.html      # im Browser öffnen - keine Installation, kein Server
```

Die Datei enthält die Daten bereits eingebettet und läuft offline (nur die
Web-Schrift wird online geladen, sonst greift der System-Font-Fallback).
`dashboard/artifact.html` ist dieselbe Seite als Fragment für die
Veröffentlichung als Claude Artifact.

## Was drin ist

**Filter** (wirken gemeinsam auf *alle* Kacheln, Diagramme, die Timeline und die Tabelle)

| Filter | Typ |
|---|---|
| Volltextsuche (Prozess, Pfad, Person, Initiative, Kommentar) | Text |
| Prozessgruppe (MP / CP / SP) | Mehrfachauswahl |
| Initiative | Mehrfachauswahl |
| L1-Prozess | Mehrfachauswahl |
| Ebene (L1–L4) | Mehrfachauswahl |
| Status | Mehrfachauswahl |
| Phase im Fokus (Elaboration, Impl. LIS / LUS / COT) | Mehrfachauswahl |
| Ist-Phase (Actual Phase) | Mehrfachauswahl |
| Plan-Phase (Planned phase) | Mehrfachauswahl |
| IT Process Initiative Lead | Mehrfachauswahl |
| IT Process Manager | Mehrfachauswahl |
| IT Process Consultant | Mehrfachauswahl |
| Zeitraum von–bis (Überschneidung) + Schnellauswahl | Datum |
| Stichtag (Referenzdatum für „überfällig" und „Termine in 90 Tagen") | Datum |
| Fortschritt von–bis | Bereich |
| Nur verzögert · Nur überfällig · Nur mit Termin · Ohne Termin einbeziehen | Schalter |

Jede Auswahl erscheint als Chip und lässt sich einzeln wieder entfernen.
Die Mehrfachauswahl-Listen zeigen je Option die Trefferzahl unter den übrigen
Filtern. Klicks auf Balken in „Status der Prozesse", „Status je Prozessgruppe",
„Roll-out-Trichter", „Fortschritt je Initiative" und „Portfolio je Process
Manager" setzen den passenden Filter direkt.

**Kennzahlen** — Prozesse im Filter · Ø Fortschritt · Verzögert · Überfällig ·
Elaboration fertig · In Implementierung · Termine in 90 Tagen

**Diagramme** — Statusverteilung · Status je Prozessgruppe · Roll-out-Trichter ·
Phasenauslastung im Zeitverlauf (Wochenraster, gerechnet aus der aktuellen
Filterauswahl) · Verzögerungs-Hotspots · Fortschritt je Initiative ·
Portfolio je Process Manager

**Timeline** — hierarchische Gantt-Ansicht über alle vier Ebenen, auf- und
zuklappbar, Quartals- oder Monatsraster, Sammelbalken für zugeklappte
Teilbäume, Stichtagslinie, verzögerte Phasen rot umrandet.

**Detailtabelle** — wahlweise je Prozess oder je Phase, sortierbar über jede
Spalte, CSV-Export der aktuellen Auswahl (UTF-8 mit BOM, `;`-getrennt, öffnet
direkt in Excel).

Dazu: Umschaltung Deutsch/Englisch, Hell/Dunkel/System, Druck- bzw.
PDF-Ausgabe.

## Datenherkunft und Ableitungen

Gelesen wird das jüngste Snapshot-Blatt **`data Draft-april26`** (623 Zeilen).
Die älteren Blätter (`Task_Table1`, `Task_Table_02_26`, … ) bleiben unberührt.

Der Export ist ein MS-Project-Auszug: die Hierarchie steckt in der Einrückung
der Spalte `Process` (3 Leerzeichen je Ebene). Je Prozess gibt es eine
`Total`-Zeile plus vier Phasenzeilen. Daraus entstehen **124 Prozesse**
(19 auf L1, 40 auf L2, 60 auf L3, 5 auf L4) mit je vier Phasen.

**Status je Phase** aus `Planned phase` / `Actual Phase`:

| Bedingung | Status |
|---|---|
| Actual enthält „Delayed" | Verzögert |
| Actual enthält „not planned" | Nicht geplant |
| Actual enthält „Done" | Abgeschlossen |
| Actual enthält „in progress" | In Arbeit |
| nur Planned „…Done" | In Arbeit (Plan erreicht, Ist offen) |
| Planned gesetzt (Scheduled / Phase) | Terminiert |
| sonst | Ohne Angabe |

**Status je Prozess** — Verzögerung hat Vorrang: sobald eine Phase verzögert
ist, gilt der Prozess als verzögert. Danach: 100 % bzw. alle Phasen fertig →
abgeschlossen; Fortschritt > 0 oder eine Phase in Arbeit → in Arbeit; ein
Starttermin vorhanden → terminiert; sonst nicht geplant.

**Überfällig** — spätestes Phasenende liegt vor dem Stichtag und der Prozess
ist nicht abgeschlossen. Der Stichtag ist frei einstellbar; Voreinstellung ist
das aktuelle Datum.

Zwei Hinweise zur Datenqualität, die im Dashboard sichtbar bleiben statt
stillschweigend korrigiert zu werden: 19 Prozesse tragen überhaupt keine
Termine (über „Ohne Termin einbeziehen" ein- und ausblendbar), und in den
Implementierungsphasen LUS/COT ist bislang kein Fortschritt erfasst.

## Neu bauen

Nach einer aktualisierten Excel-Datei:

```bash
pip install openpyxl
python3 build/extract.py     # Excel  -> build/model.json
python3 build/build.py       # Modell + build/parts/* -> dashboard/*.html
# oder in einem Schritt:
python3 build/build.py --extract
```

| Pfad | Inhalt |
|---|---|
| `data/Process_Portfolio_Timeline.xlsx` | Quelldatei |
| `build/extract.py` | Excel-Parser, erzeugt das Prozessmodell |
| `build/build.py` | setzt die Seite aus Teilen + Daten zusammen |
| `build/parts/head.html` | Design-Tokens und Stylesheet |
| `build/parts/body.html` | Seitenaufbau |
| `build/parts/app.js` | Filterlogik, Diagramme, Timeline, Tabelle |
| `build/model.json` | erzeugtes Datenmodell |
| `dashboard/index.html` | fertiges Dashboard |
| `index.html` | Management Board (Einstieg) |
| `build/bundle.py`, `verteilfassung/` | Leseausgabe als Einzeldatei und PDF-Bericht |
| `content/*.js` | Inhalte des Boards |
| `anhaenge/`, `rollout-maps/` | Dateien für Anhänge und Maps |
