/* =============================================================================
   Rollout-Maps
   -----------------------------------------------------------------------------
   Ablauf: Datei in den Ordner rollout-maps/ legen, danach hier einen Eintrag
   ergänzen – oder bequemer über "Redaktion" > "Rollout-Maps" im Board.

   Felder
      href   Pfad relativ zu index.html, z. B. "rollout-maps/lis-2026.png"
      type   "image" (PNG, JPG, SVG, WEBP) | "pdf" | "page" (eigene HTML-Seite)
      title  Anzeigename
      date   "JJJJ-MM-TT"
      note   optionale Beschreibung
      tags   optionale Liste, z. B. ["LIS", "2026"]

   Beispiel:
      { href: "rollout-maps/lis-2026.png", type: "image", title: "Rollout LIS 2026",
        date: "2026-09-01", note: "Wellenplanung je Standort", tags: ["LIS"] }
   ========================================================================== */
window.BOARD_MAPS = [];
