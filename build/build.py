#!/usr/bin/env python3
"""Assemble the dashboard from build/parts + build/model.json.

Emits two artefacts from one source:
  dashboard/index.html     - standalone document (open locally, share as a file)
  dashboard/artifact.html  - body-only fragment for publishing as a Claude Artifact
"""
from __future__ import annotations

import json
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PARTS = ROOT / "build" / "parts"
MODEL = ROOT / "build" / "model.json"
OUT_DIR = ROOT / "dashboard"


def main() -> int:
    if "--extract" in sys.argv or not MODEL.exists():
        subprocess.run([sys.executable, str(ROOT / "build" / "extract.py")], check=True)

    head = (PARTS / "head.html").read_text()
    body = (PARTS / "body.html").read_text()
    app = (PARTS / "app.js").read_text()
    data = MODEL.read_text()

    # </script> inside the JSON payload would close the tag early.
    data = data.replace("</", "<\\/")
    # <!--EMBED--> ist der Platz, an dem die Verteilfassung window.__EMBED einsetzt
    script = f'<!--EMBED-->\n<script>\nconst MODEL = {data};\n{app}\n</script>'

    OUT_DIR.mkdir(exist_ok=True)
    standalone = (
        '<!doctype html>\n<html lang="de">\n<head>\n'
        '<meta charset="utf-8" />\n'
        '<meta name="viewport" content="width=device-width, initial-scale=1" />\n'
        f'{head}</head>\n<body>\n{body}\n{script}\n</body>\n</html>\n'
    )
    (OUT_DIR / "index.html").write_text(standalone)
    (OUT_DIR / "artifact.html").write_text(f"{head}{body}\n{script}\n")

    for f in ("index.html", "artifact.html"):
        p = OUT_DIR / f
        print(f"{p.relative_to(ROOT)}  {p.stat().st_size/1024:.0f} KB")
    nodes = json.loads(MODEL.read_text())["nodes"]
    print(f"model: {len(nodes)} processes, {sum(len(n['phases']) for n in nodes)} phase rows")
    return 0


if __name__ == "__main__":
    sys.exit(main())
