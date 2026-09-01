#!/usr/bin/env python3
"""Erzeugt eine Verteilfassung: das ganze Board in einer einzigen HTML-Datei.

Warum: Aus einem OneDrive- oder SharePoint-Ordner heraus lässt sich das Board
nur öffnen, wenn der Ordner lokal synchronisiert ist - der Browser darf aus
einer Vorschau heraus keine Nachbardateien laden. Diese Fassung hat keine
Nachbardateien: Inhalte und Dashboard stecken in der Datei selbst. Sie läuft
per Link, als Mail-Anhang und in einer Vorschau.

Der Preis: Es ist eine Leseausgabe. Die Redaktion bleibt beim Ordner, weil eine
einzelne Datei sich nicht selbst zurückschreiben kann. Nach jeder Änderung neu
erzeugen.

    python3 build/bundle.py
    python3 build/bundle.py --base "https://…/Freigegebene%20Dokumente/Board"

--base überschreibt assetBaseUrl aus content/settings.js: die Adresse des
Ordners im Browser, damit Anhänge und Karten weiter erreichbar sind.
"""
from __future__ import annotations

import datetime as dt
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "verteilfassung"
OUT = OUT_DIR / "IT_Process_Board.html"
CONTENT = ["settings.js", "news.js", "maps.js", "attachments.js"]


def read(p: Path) -> str:
    return p.read_text(encoding="utf-8")


def js_string(text: str) -> str:
    """Als JS-Zeichenkette einbetten, ohne dass </script> die Seite beendet."""
    return json.dumps(text).replace("</", "<\\/")


def main() -> int:
    base = ""
    if "--base" in sys.argv:
        i = sys.argv.index("--base")
        if i + 1 < len(sys.argv):
            base = sys.argv[i + 1].strip()

    board = read(ROOT / "index.html")
    dash_path = ROOT / "dashboard" / "index.html"
    if not dash_path.exists():
        print("dashboard/index.html fehlt - erst 'python3 build/build.py' laufen lassen.")
        return 1
    dashboard = read(dash_path)

    missing = [f for f in CONTENT if not (ROOT / "content" / f).exists()]
    if missing:
        print("Es fehlen Inhaltsdateien:", ", ".join(missing))
        return 1
    content = "\n".join(read(ROOT / "content" / f) for f in CONTENT)

    if not base:
        m = re.search(r'assetBaseUrl:\s*"([^"]*)"', read(ROOT / "content" / "settings.js"))
        base = m.group(1) if m else ""

    built = dt.date.today().isoformat()
    inline = (
        "<script>\n"
        f"/* Inhalte aus content/ - erzeugt am {built} */\n"
        f"{content}\n"
        "window.BOARD_BUNDLE = {\n"
        f"  built: {json.dumps(built)},\n"
        f"  assetBase: {json.dumps(base)},\n"
        f"  dashboard: {js_string(dashboard)}\n"
        "};\n"
        "</script>"
    )

    # Der eingebettete Block tritt an die Stelle der vier <script src="content/…">.
    # Die Reihenfolge ist wesentlich: das Hauptskript liest die Inhalte beim Start.
    pattern = re.compile(r'<script src="content/[^"]+"></script>(\s*<script src="content/[^"]+"></script>)*')
    m = pattern.search(board)
    if not m:
        print("Die Einbindungen von content/*.js sind in index.html nicht auffindbar.")
        return 1
    board = board[:m.start()] + inline + board[m.end():]

    OUT_DIR.mkdir(exist_ok=True)
    OUT.write_text(board, encoding="utf-8")

    kb = OUT.stat().st_size / 1024
    print(f"{OUT.relative_to(ROOT)}  {kb:.0f} KB  (Stand {built})")
    print(f"Ordner-Adresse für Anhänge: {base or '– keine – Anhänge erscheinen als Pfadangabe'}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
