/* =============================================================================
   Grundeinstellungen des Management Boards
   -----------------------------------------------------------------------------
   Diese Datei darf gefahrlos in jedem Texteditor bearbeitet werden.
   Nach dem Speichern die Seite im Browser neu laden (F5).
   ========================================================================== */
window.BOARD_SETTINGS = {
  title:    "IT Process Management Board",
  subtitle: "Corporate IT – Prozessportfolio",
  owner:    "Christoph Schnurrenberger (LIS-LIN)",
  contact:  "christophschnurrenberger@googlemail.com",

  /* Pfad zum Dashboard, relativ zu dieser index.html */
  dashboardFile: "dashboard/index.html",

  /* Startsprache der Oberfläche: "de" oder "en" */
  lang: "de",

  /* Nur für die Verteilfassung (build/bundle.py): Adresse des Ordners im
     Browser, z. B. die SharePoint-Bibliothek. Anhänge und Karten werden dann
     von dort geöffnet, statt ins Leere zu zeigen. Beispiel:
     "https://liebherr.sharepoint.com/sites/…/Freigegebene%20Dokumente/Board"
     Leer lassen, wenn es keine solche Adresse gibt – die Pfade erscheinen dann
     nur als Text. Für den normalen Ordnerbetrieb ist das Feld ohne Wirkung. */
  assetBaseUrl: "",

  /* Kategorien für News – Reihenfolge bestimmt die Farbe (1–5) */
  newsCategories: ["Meilenstein", "Entscheidung", "Rollout", "Termin", "Achtung"],

  /* ---------------------------------------------------------------------
     Schutz der Redaktion
     Hinterlegt ist der SHA-256-Abdruck des Passworts, nicht das Passwort
     selbst. Zum Ändern im Board auf "Redaktion" > "Passwort ändern" – dort
     wird die neue Zeile erzeugt, die hier einzusetzen ist.
     Ein leerer Wert ("") schaltet den Schutz ganz ab.

     Wichtig: Das ist ein Schutz gegen versehentliches Ändern, keine
     Zugriffskontrolle. Wer den Ordner öffnen kann, kann die Sperre umgehen.
     Verbindlich sind allein die Freigaberechte des OneDrive-Ordners: Wer dort
     nur Leserechte hat, kann content/*.js nicht ersetzen und damit nichts
     veröffentlichen.
     --------------------------------------------------------------------- */
  editorPasswordHash: "sha256:8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92"
};
