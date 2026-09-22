#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Schreibt den PORTFOLIO-Block in MSCITGovernanceProcessCockpit.html neu.

Quelle ist der Excel-Export des Prozessportfolios. Der Block im Cockpit ist
erzeugt, nicht von Hand gepflegt: nach einem neuen Export dieses Skript laufen
lassen, dann stimmt das Cockpit wieder mit der Quelle überein.

    python3 build/portfolio_import.py            # prüfen und ggf. schreiben
    python3 build/portfolio_import.py --check    # nur prüfen, nichts schreiben

Übernommen wird ausschließlich, was in der Quelle steht. Leere Felder bleiben
leer; das Cockpit zeigt sie als "To be assessed". Es wird nichts ergänzt.
"""
import csv, io, json, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC  = ROOT / "data" / "process_portfolio_2026-09-22.csv"
DST  = ROOT / "MSCITGovernanceProcessCockpit.html"

# Spalten des Exports in der Reihenfolge, in der sie im Cockpit landen.
COLS = ["Gruppe", "Initiative", "Status", "% fertig", "Start", "Ende", "Dauer (T)",
        "Elaboration", "Initiative Lead", "Process Manager", "Consultant",
        "Freigabe", "Kommentar"]

HEAD = (
'/* Prozessportfolio aus dem Excel-Export "Process Portfolio", Stand 2026-09-22.\n'
'   {n} Zeilen, unveraendert uebernommen. Reihenfolge ist Baumreihenfolge, daher\n'
'   steht jeder Elternprozess vor seinen Kindern.\n'
'   Spalten je Zeile:\n'
'   0 Name  1 Gruppe (MP/CP/SP)  2 Ebene  3 Elternindex (-1 = Wurzel)\n'
'   4 Initiative  5 Terminstatus  6 Fortschritt  7 Start  8 Ende  9 Dauer (T)\n'
'   10 Elaboration  11 Initiative Lead  12 Process Manager  13 Consultant\n'
'   14 Freigabedatum  15 Kommentar\n'
'   Leere Quellfelder bleiben leer und werden in der Oberflaeche zu\n'
'   "To be assessed"; es wird nichts ergaenzt. */\n'
)


def read_rows():
    lines = SRC.read_text(encoding="utf-8-sig").splitlines()
    if lines and lines[0].strip().lower().startswith("sep="):
        lines = lines[1:]
    rows = list(csv.DictReader(io.StringIO("\n".join(lines)), delimiter=";"))
    return [r for r in rows if (r.get("Prozess") or "").strip()]


def path_of(row):
    return tuple(x.strip() for x in row["Prozess"].split("›"))


def clean(v):
    v = (v or "").strip()
    return "" if v in ("", "n/a", "N/A", "-") else v


def build():
    rows = read_rows()
    rows.sort(key=path_of)                       # Eltern stehen vor ihren Kindern
    index = {path_of(r): i for i, r in enumerate(rows)}
    if len(index) != len(rows):
        raise SystemExit("Doppelter Prozesspfad in der Quelle.")

    out = []
    for r in rows:
        p = path_of(r)
        if len(p) != int(r["Ebene"]):
            raise SystemExit("Ebene passt nicht zur Pfadtiefe: %s" % (p,))
        if len(p) > 1 and p[:-1] not in index:
            raise SystemExit("Elternpfad fehlt als eigene Zeile: %s" % (p,))
        rec = [p[-1], r["Gruppe"].strip(), int(r["Ebene"]),
               index[p[:-1]] if len(p) > 1 else -1]
        rec += [clean(r[c]) for c in COLS[1:]]
        out.append(rec)

    body = ",\n".join(
        " [" + ",".join(str(v) if isinstance(v, int) else json.dumps(v, ensure_ascii=False)
                        for v in rec) + "]"
        for rec in out)
    return HEAD.format(n=len(out)) + "const PORTFOLIO = [\n" + body + "\n];\n"


def main():
    block = build()
    html = DST.read_text(encoding="utf-8")
    start = html.index("/* Prozessportfolio aus dem Excel-Export")
    end = html.index("\n];\n", start) + len("\n];\n")
    if html[start:end] == block:
        print("PORTFOLIO stimmt mit der Quelle überein (%d Zeilen)." % block.count("\n ["))
        return 0
    if "--check" in sys.argv:
        print("PORTFOLIO weicht von der Quelle ab.")
        return 1
    DST.write_text(html[:start] + block + html[end:], encoding="utf-8")
    print("PORTFOLIO neu geschrieben (%d Zeilen)." % block.count("\n ["))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
