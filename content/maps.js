/* =============================================================================
   Rollout-Maps und Roadmaps
   -----------------------------------------------------------------------------
   Zwei Arten von Einträgen:

   1) ROADMAP - im Board selbst gebaut.
      Im Reiter "Rollout-Maps" auf "Roadmap erstellen" klicken, Spuren und
      Einträge anlegen, dann "content/maps.js erzeugen" und die Datei hier
      ersetzen. Balken lassen sich im Diagramm direkt ziehen.

   2) DATEI - eine fertige Karte aus dem Ordner rollout-maps/.
      Datei dort ablegen, danach über "Map ergänzen" eintragen.

   Felder einer Datei-Karte
      href   Pfad relativ zu index.html, z. B. "rollout-maps/lis-2026.png"
      type   "image" (PNG, JPG, SVG, WEBP) | "pdf" | "page" (eigene HTML-Seite)
      title  Anzeigename
      date   "JJJJ-MM-TT"
      note   optionale Beschreibung
      tags   optionale Liste, z. B. ["LIS", "2026"]

   Eine Roadmap trägt zusätzlich type:"roadmap" und ein Feld roadmap mit
   start, end, scale ("quarter"|"month"), colorBy ("status"|"lane") und lanes.
   ========================================================================== */
window.BOARD_MAPS = [];
