/* =============================================================================
   News des Management Boards
   -----------------------------------------------------------------------------
   Neue Meldung? Zwei Wege:

   A) Bequem: im Board oben rechts auf "Redaktion" klicken, Meldung schreiben,
      "content/news.js erzeugen" drücken und die heruntergeladene Datei hier
      im Ordner content/ ersetzen.

   B) Von Hand: einen Block { ... }, nach dem Muster unten, ganz oben in die
      Liste einfügen. Pflichtfelder sind date und title.

   Felder
      date      "JJJJ-MM-TT"
      title     Überschrift
      category  einer der Werte aus content/settings.js
      pinned    true = wird oben angeheftet
      author    optional
      body      Freitext. **fett**, *kursiv*, - Aufzählung, ## Zwischenüberschrift,
                [Linktext](anhaenge/datei.pdf) werden formatiert.
      links     optionale Liste { label, href }
   ========================================================================== */
window.BOARD_NEWS = [
  {
    date: "2026-08-25",
    title: "Portfolio-Dashboard ist online",
    category: "Meilenstein",
    pinned: true,
    author: "Christoph Schnurrenberger",
    body:
`Das Prozessportfolio aus der Projektplanung steht ab sofort als interaktives Dashboard im Reiter **Dashboard** zur Verfügung – mit allen Filtern, Kennzahlen, einer Timeline über alle vier Prozessebenen und einer Detailtabelle mit CSV-Export.

## Stand der Auswertung
- **124 Prozesse** über die drei Prozessgruppen Management, Core und Support
- **29 Prozesse verzögert**, das sind 23 % des Portfolios
- **30 Prozesse** haben die Elaboration abgeschlossen
- Datenstand ist der Planungsauszug **Draft April 2026**

Der Stichtag im Dashboard lässt sich frei setzen – damit lässt sich der Blick auf jeden gewünschten Berichtszeitpunkt einstellen.`,
    links: [
      { label: "Dashboard öffnen", href: "dashboard/index.html" },
      { label: "Quelldatei (Excel)", href: "data/Process_Portfolio_Timeline.xlsx" }
    ]
  },
  {
    date: "2026-08-25",
    title: "So funktioniert dieses Board",
    category: "Entscheidung",
    pinned: false,
    author: "Christoph Schnurrenberger",
    body:
`Das Board liegt vollständig in diesem OneDrive-Ordner und braucht keinen Server. Wer den Ordner synchronisiert hat, öffnet einfach die Datei \`index.html\` – alles Weitere läuft im Browser.

- **News** – dieser Reiter. Meldungen schreibst du über den Knopf *Redaktion* oben rechts.
- **Dashboard** – das Prozessportfolio, live gefiltert.
- **Rollout-Maps** – Karten und Ablaufpläne, sobald sie vorliegen.
- **Anhänge** – Dokumente aus dem Ordner \`anhaenge/\`.

Eine Schritt-für-Schritt-Anleitung liegt als \`ANLEITUNG.md\` im selben Ordner.`,
    links: []
  }
];
