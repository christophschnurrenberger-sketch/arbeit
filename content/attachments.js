/* =============================================================================
   Anhänge des Management Boards
   -----------------------------------------------------------------------------
   Ablauf: Datei in den Ordner anhaenge/ legen, danach hier einen Eintrag
   ergänzen – oder bequemer über "Redaktion" > "Anhänge" im Board.

   Felder
      href      Pfad relativ zu index.html, z. B. "anhaenge/protokoll.pdf"
      title     Anzeigename
      category  freie Gruppierung, z. B. "Protokolle", "Berichte", "Vorlagen"
      date      "JJJJ-MM-TT"
      note      optionale Beschreibung in einem Satz
   ========================================================================== */
window.BOARD_ATTACHMENTS = [
  {
    href: "data/Process_Portfolio_Timeline.xlsx",
    title: "Process Portfolio Timeline (Quelldatei)",
    category: "Datenbasis",
    date: "2026-08-25",
    note: "Projektauszug, aus dem das Dashboard erzeugt wird. Blatt \"data Draft-april26\"."
  },
  {
    href: "ANLEITUNG.md",
    title: "Anleitung: News pflegen, Anhänge und Maps ergänzen",
    category: "Vorlagen",
    date: "2026-08-25",
    note: "Kurzanleitung für die Pflege dieses Boards ohne Programmierkenntnisse."
  }
];
