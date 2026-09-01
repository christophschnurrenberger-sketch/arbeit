#!/usr/bin/env python3
"""Erzeugt die interaktive Arbeitsmappe für Excel im Browser.

Warum: SharePoint und Teams zeigen HTML-Dateien nicht als Seite an, Excel-
Dateien dagegen schon - interaktiv, mit den bestehenden Berechtigungen, ohne
Synchronisierung und ohne Download. Diese Mappe bildet das Cockpit mit
Auswahlfeldern statt Filterleisten nach.

Alle Kennzahlen und Diagramme sind Formeln, keine ausgerechneten Werte: die
Mappe rechnet sich neu, sobald jemand ein Auswahlfeld ändert.

    python3 build/excel.py
"""
from __future__ import annotations

import datetime as dt
import json
import sys
from pathlib import Path

from openpyxl import Workbook
from openpyxl.chart import BarChart, Reference, Series
from openpyxl.chart.marker import DataPoint
from openpyxl.chart.shapes import GraphicalProperties
from openpyxl.drawing.line import LineProperties
from openpyxl.formatting.rule import DataBarRule
from openpyxl.styles import Alignment, Border, Font, PatternFill, Protection, Side
from openpyxl.utils import get_column_letter
from openpyxl.worksheet.datavalidation import DataValidation
from openpyxl.worksheet.table import Table, TableStyleInfo

ROOT = Path(__file__).resolve().parents[1]
MODEL = ROOT / "build" / "model.json"
OUT = ROOT / "verteilfassung" / "IT_Process_Portfolio_Cockpit.xlsx"

# Farben wie im Board: Gelb als Signalfarbe, Anthrazit als Träger,
# Statusfarben aus dem geprüften Satz.
BRAND, INK, INK2, INK3 = "FFCC00", "16181A", "5A5F63", "8E9498"
PAPER, PAPER2, RULE = "FAFAF8", "F2F1EC", "DEDCD4"
ST_COLOR = {"Verzögert": "D03B3B", "In Arbeit": "2A78D6", "Terminiert": "8E9498",
            "Abgeschlossen": "0CA30C", "Nicht geplant": "C6C4BA"}
STATUS = list(ST_COLOR)
ST_MAP = {"delayed": "Verzögert", "inprogress": "In Arbeit", "scheduled": "Terminiert",
          "done": "Abgeschlossen", "notplanned": "Nicht geplant"}
EL_MAP = {"done": "Abgeschlossen", "inprogress": "In Arbeit", "delayed": "Verzögert",
          "scheduled": "Terminiert", "notplanned": "Nicht geplant", "none": "Ohne Angabe"}
GROUPS = {"MP": "Management", "CP": "Core", "SP": "Support"}
PHASES = ["Elaboration", "Implementation LIS", "Implementation LUS", "Implementation COT"]
ALL = "(Alle)"

F = lambda **kw: Font(name="Arial", **kw)
thin = Side(style="thin", color=RULE)


def shorten(p: str) -> str:
    if "(" not in p:
        return p
    name, _, org = p.partition("(")
    return f"{name.strip()} ({org.strip(') ').split()[0]})"


def main() -> int:
    if not MODEL.exists():
        print("build/model.json fehlt - erst 'python3 build/build.py --extract' laufen lassen.")
        return 1
    m = json.loads(MODEL.read_text())
    nodes = m["nodes"]

    # Verzögerte zuerst: so zeigt die Trefferliste im Cockpit oben das Kritische.
    order = {s: i for i, s in enumerate(["delayed", "inprogress", "scheduled", "notplanned", "done"])}
    nodes = sorted(nodes, key=lambda n: (order.get(n["status"], 9), n["name"]))

    wb = Workbook()

    # ------------------------------------------------------------ Prozesse
    ws = wb.active
    ws.title = "Prozesse"
    head = ["Nr", "Prozess", "Pfad", "Gruppe", "Initiative", "L1-Prozess", "Ebene", "Status",
            "Fortschritt", "Start", "Ende", "Dauer (T)", "Elaboration", "Initiative Lead",
            "Process Manager", "Consultant", "Überfällig", "In Implementierung", "Treffer", "Rang"]
    ws.append(head)
    for i, n in enumerate(nodes, start=2):
        impl = 1 if any(p["status"] in ("done", "inprogress") or p["pct"] > 0 for p in n["phases"][1:]) else 0
        ws.append([
            i - 1, n["name"], n["path"], n["group"], n["initiative"], n["l1"], "L%d" % n["level"],
            ST_MAP.get(n["status"], n["status"]), n["pct"],
            dt.date.fromisoformat(n["spanStart"]) if n["spanStart"] else None,
            dt.date.fromisoformat(n["spanEnd"]) if n["spanEnd"] else None,
            n["duration"], EL_MAP.get(n["elabStatus"], "Ohne Angabe"),
            ", ".join(shorten(x) for x in n["lead"]) or "–",
            ", ".join(shorten(x) for x in n["manager"]) or "–",
            ", ".join(shorten(x) for x in n["consultant"]) or "–",
            None, impl, None, None,
        ])
    last = len(nodes) + 1

    for r in range(2, last + 1):
        # Überfällig: Endtermin vor dem Stichtag und nicht abgeschlossen
        ws[f"Q{r}"] = (f'=IF(AND(K{r}<>"",K{r}<Cockpit!$H$6,H{r}<>"Abgeschlossen"),1,0)')
        # Treffer: erfüllt die Zeile alle sechs Auswahlfelder?
        ws[f"S{r}"] = (
            f'=IF(AND(OR(Cockpit!$B$6="{ALL}",D{r}=Cockpit!$B$6),'
            f'OR(Cockpit!$C$6="{ALL}",E{r}=Cockpit!$C$6),'
            f'OR(Cockpit!$D$6="{ALL}",F{r}=Cockpit!$D$6),'
            f'OR(Cockpit!$E$6="{ALL}",G{r}=Cockpit!$E$6),'
            f'OR(Cockpit!$F$6="{ALL}",H{r}=Cockpit!$F$6),'
            f'OR(Cockpit!$G$6="{ALL}",O{r}=Cockpit!$G$6)),1,0)')
        # Laufende Nummer der Treffer - Grundlage der Liste im Cockpit
        ws[f"T{r}"] = f'=IF(S{r}=1,SUM($S$2:S{r}),"")'

    tbl = Table(displayName="tblProzesse", ref=f"A1:T{last}")
    tbl.tableStyleInfo = TableStyleInfo(name="TableStyleLight1", showRowStripes=True)
    ws.add_table(tbl)
    for c, w in zip("ABCDEFGHIJKLMNOPQRST",
                    [5, 40, 52, 8, 24, 30, 7, 15, 11, 11, 11, 10, 15, 24, 24, 30, 10, 16, 8, 7]):
        ws.column_dimensions[c].width = w
    for row in ws.iter_rows(min_row=1, max_row=last):
        for cell in row:
            cell.font = F(size=10, bold=(cell.row == 1), color=INK if cell.row == 1 else INK2)
    for r in range(2, last + 1):
        ws[f"I{r}"].number_format = "0 %"
        ws[f"J{r}"].number_format = ws[f"K{r}"].number_format = "DD.MM.YYYY"
    ws.conditional_formatting.add(
        f"I2:I{last}",
        DataBarRule(start_type="num", start_value=0, end_type="num", end_value=1, color="2A78D6"))
    ws.freeze_panes = "C2"

    # ------------------------------------------------------------ Phasen
    ph = wb.create_sheet("Phasen")
    ph.append(["Nr", "Prozess", "Gruppe", "Phase", "Status", "Start", "Ende", "Dauer (T)", "Treffer"])
    pr = 2
    for i, n in enumerate(nodes, start=1):
        for p in n["phases"]:
            ph.append([i, n["name"], n["group"], p["phase"], ST_MAP.get(p["status"], "Ohne Angabe"),
                       dt.date.fromisoformat(p["start"]) if p["start"] else None,
                       dt.date.fromisoformat(p["end"]) if p["end"] else None,
                       p["duration"], None])
            ph[f"I{pr}"] = f'=INDEX(Prozesse!$S$2:$S${last},MATCH(A{pr},Prozesse!$A$2:$A${last},0))'
            pr += 1
    plast = pr - 1
    ptbl = Table(displayName="tblPhasen", ref=f"A1:I{plast}")
    ptbl.tableStyleInfo = TableStyleInfo(name="TableStyleLight1", showRowStripes=True)
    ph.add_table(ptbl)
    for c, w in zip("ABCDEFGHI", [5, 40, 8, 20, 15, 11, 11, 10, 8]):
        ph.column_dimensions[c].width = w
    for row in ph.iter_rows(min_row=1, max_row=plast):
        for cell in row:
            cell.font = F(size=10, bold=(cell.row == 1), color=INK if cell.row == 1 else INK2)
    for r in range(2, plast + 1):
        ph[f"F{r}"].number_format = ph[f"G{r}"].number_format = "DD.MM.YYYY"
    ph.freeze_panes = "C2"

    P = f"Prozesse!$S$2:$S${last}"          # Trefferspalte
    G = lambda col: f"Prozesse!${col}$2:${col}${last}"
    PH = lambda col: f"Phasen!${col}$2:${col}${plast}"

    # ------------------------------------------------------------ Listen
    li = wb.create_sheet("Listen")
    li["A1"] = "Auswahllisten für die Felder im Cockpit"
    li["A1"].font = F(size=11, bold=True, color=INK)
    cols = {
        "A": [ALL] + sorted({n["group"] for n in nodes}),
        "B": [ALL] + sorted({n["initiative"] for n in nodes}),
        "C": [ALL] + sorted({n["l1"] for n in nodes}),
        "D": [ALL] + ["L1", "L2", "L3", "L4"],
        "E": [ALL] + STATUS,
        "F": [ALL] + sorted({shorten(x) for n in nodes for x in n["manager"]} | {"–"}),
    }
    titles = ["Prozessgruppe", "Initiative", "L1-Prozess", "Ebene", "Status", "Process Manager"]
    for (c, vals), title in zip(cols.items(), titles):
        li[f"{c}2"] = title
        li[f"{c}2"].font = F(size=10, bold=True, color=INK3)
        for i, v in enumerate(vals, start=3):
            li[f"{c}{i}"] = v
            li[f"{c}{i}"].font = F(size=10, color=INK2)
        li.column_dimensions[c].width = 30
    li.sheet_state = "hidden"

    # ------------------------------------------------------------ Auswertung
    av = wb.create_sheet("Auswertung")
    av["A1"] = "Auswertung – speist die Diagramme im Cockpit. Alle Werte sind Formeln über die Trefferspalte."
    av["A1"].font = F(size=10, italic=True, color=INK3)

    av["A3"], av["B3"] = "Status", "Anzahl"
    for i, st in enumerate(STATUS, start=4):
        av[f"A{i}"] = st
        av[f"B{i}"] = f'=SUMPRODUCT({P},--({G("H")}=$A{i}))'

    av["D3"] = "Prozessgruppe"
    for j, st in enumerate(STATUS):
        av.cell(row=3, column=5 + j, value=st)
    for i, (code, name) in enumerate(GROUPS.items(), start=4):
        av[f"C{i}"], av[f"D{i}"] = code, f"{code} · {name}"
        for j in range(len(STATUS)):
            col = get_column_letter(5 + j)
            av[f"{col}{i}"] = (f'=SUMPRODUCT({P},--({G("D")}=$C{i}),'
                               f'--({G("H")}={col}$3))')

    inits = sorted({n["initiative"] for n in nodes})
    av["A10"], av["B10"], av["C10"] = "Initiative", "Ø Fortschritt", "Prozesse"
    for i, name in enumerate(inits, start=11):
        av[f"A{i}"] = name
        av[f"B{i}"] = (f'=IFERROR(SUMPRODUCT({P},--({G("E")}=$A{i}),{G("I")})'
                       f'/SUMPRODUCT({P},--({G("E")}=$A{i})),0)')
        av[f"C{i}"] = f'=SUMPRODUCT({P},--({G("E")}=$A{i}))'
        av[f"B{i}"].number_format = "0 %"
    init_last = 10 + len(inits)

    hot = sorted({n["l1"] for n in nodes},
                 key=lambda l1: -sum(1 for n in nodes if n["l1"] == l1 and n["status"] == "delayed"))[:10]
    av["E10"], av["F10"] = "L1-Prozessbereich", "davon verzögert"
    for i, l1 in enumerate(hot, start=11):
        av[f"E{i}"] = l1
        av[f"F{i}"] = f'=SUMPRODUCT({P},--({G("F")}=$E{i}),--({G("H")}="Verzögert"))'

    av["A23"], av["B23"], av["C23"] = "Phase", "terminiert", "abgeschlossen"
    for i, phn in enumerate(PHASES, start=24):
        av[f"A{i}"] = phn
        av[f"B{i}"] = f'=SUMPRODUCT({PH("I")},--({PH("D")}=$A{i}),--({PH("F")}<>""))'
        av[f"C{i}"] = f'=SUMPRODUCT({PH("I")},--({PH("D")}=$A{i}),--({PH("E")}="Abgeschlossen"))'

    for row in av.iter_rows(min_row=3, max_row=28):
        for cell in row:
            if cell.value is not None:
                cell.font = F(size=10, color=INK2,
                              bold=cell.row in (3, 10, 23) or cell.column_letter in ("A", "D", "E"))
    for c, w in zip("ABCDEFGHI", [34, 14, 14, 22, 14, 14, 14, 14, 14]):
        av.column_dimensions[c].width = w
    av.sheet_state = "hidden"

    # ------------------------------------------------------------ Cockpit
    ck = wb.create_sheet("Cockpit", 0)
    ck.sheet_view.showGridLines = False
    ck["A1"] = "IT"
    ck["A1"].font = F(size=11, bold=True, color=INK)
    ck["A1"].fill = PatternFill("solid", fgColor=BRAND)
    ck["A1"].alignment = Alignment(horizontal="center", vertical="center")
    ck["B1"] = "IT Process Portfolio – Cockpit"
    ck["B1"].font = F(size=17, bold=True, color=INK)
    ck["B2"] = (f'Datenstand {m["snapshot"]} · Quelle: {m["source"]} · '
                f'Mappe erzeugt am {dt.date.today().strftime("%d.%m.%Y")}')
    ck["B2"].font = F(size=9, color=INK3)
    ck["B3"] = "Auswahlfelder ändern – Kennzahlen, Diagramme und Liste rechnen sofort neu."
    ck["B3"].font = F(size=9, italic=True, color=INK3)

    labels = ["Prozessgruppe", "Initiative", "L1-Prozess", "Ebene", "Status", "Process Manager", "Stichtag"]
    for j, lab in enumerate(labels):
        c = get_column_letter(2 + j)
        ck[f"{c}5"] = lab.upper()
        ck[f"{c}5"].font = F(size=8, bold=True, color=INK3)
        cell = ck[f"{c}6"]
        cell.font = F(size=11, color=INK)
        cell.fill = PatternFill("solid", fgColor="FFF6D6")
        cell.border = Border(bottom=Side(style="medium", color=BRAND), top=thin, left=thin, right=thin)
        cell.alignment = Alignment(horizontal="left", vertical="center")
        cell.protection = Protection(locked=False)
    for j, letter in enumerate("ABCDEF"):
        n_opts = len(cols[letter])
        dv = DataValidation(type="list", formula1=f"=Listen!${letter}$3:${letter}${2+n_opts}",
                            allow_blank=False, showDropDown=False)
        ck.add_data_validation(dv)
        target = f"{get_column_letter(2 + j)}6"
        ck[target] = ALL
        dv.add(ck[target])
    ck["H6"] = dt.date.today()
    ck["H6"].number_format = "DD.MM.YYYY"

    kpis = [
        ("PROZESSE IM FILTER", f"=SUM({P})", "#,##0"),
        ("Ø FORTSCHRITT", f'=IFERROR(SUMPRODUCT({P},{G("I")})/SUM({P}),0)', "0 %"),
        ("VERZÖGERT", f'=SUMPRODUCT({P},--({G("H")}="Verzögert"))', "#,##0"),
        ("ÜBERFÄLLIG", f'=SUMPRODUCT({P},{G("Q")})', "#,##0"),
        ("ELABORATION FERTIG", f'=SUMPRODUCT({P},--({G("M")}="Abgeschlossen"))', "#,##0"),
        ("IN IMPLEMENTIERUNG", f'=SUMPRODUCT({P},{G("R")})', "#,##0"),
        ("TERMINE IN 90 TAGEN",
         f'=SUMPRODUCT({PH("I")},--({PH("G")}>=$H$6),--({PH("G")}<=$H$6+90))', "#,##0"),
    ]
    for j, (lab, formula, fmt) in enumerate(kpis):
        c = get_column_letter(2 + j)
        ck[f"{c}8"] = lab
        ck[f"{c}8"].font = F(size=8, bold=True, color=INK3)
        ck[f"{c}9"] = formula
        ck[f"{c}9"].number_format = fmt
        ck[f"{c}9"].font = F(size=22, bold=True, color="D03B3B" if lab == "VERZÖGERT" else INK)
        ck[f"{c}10"] = None
        ck[f"{c}9"].border = Border(top=Side(style="medium", color=INK))

    ck["B58"] = "PROZESSE IM FILTER – VERZÖGERTE ZUERST, ERSTE 15"
    ck["B58"].font = F(size=8, bold=True, color=INK3)
    for j, h in enumerate(["Prozess", "Gruppe", "Status", "% fertig", "Ende", "Process Manager"]):
        c = get_column_letter(2 + j)
        ck[f"{c}59"] = h
        ck[f"{c}59"].font = F(size=9, bold=True, color=INK)
        ck[f"{c}59"].border = Border(bottom=Side(style="medium", color=INK))
    for k in range(15):
        r = 60 + k
        idx = f'MATCH({k+1},Prozesse!$T$2:$T${last},0)'
        for j, col in enumerate("BDHIKO"):
            c = get_column_letter(2 + j)
            ck[f"{c}{r}"] = f'=IFERROR(INDEX({G(col)},{idx}),"")'
            ck[f"{c}{r}"].font = F(size=10, color=INK2)
            ck[f"{c}{r}"].border = Border(bottom=thin)
        ck[f"E{r}"].number_format = "0 %"
        ck[f"F{r}"].number_format = "DD.MM.YYYY"

    def bar(title, cat_ref, val_refs, anchor, colors, stacked=False, height=7.2, width=11):
        ch = BarChart()
        ch.type, ch.style = "col", 2
        ch.title = title
        ch.height, ch.width = height, width
        if stacked:
            ch.grouping, ch.overlap = "stacked", 100
        cats = Reference(av, **cat_ref)
        for ref, colour in zip(val_refs, colors):
            ser = Series(Reference(av, **ref), title_from_data=True)
            ser.graphicalProperties = GraphicalProperties(solidFill=colour)
            ser.graphicalProperties.line = LineProperties(noFill=True)
            ch.series.append(ser)
        ch.set_categories(cats)
        ch.y_axis.majorGridlines.spPr = GraphicalProperties(ln=LineProperties(solidFill="EAE8E0"))
        ch.x_axis.delete = ch.y_axis.delete = False
        ck.add_chart(ch, anchor)
        return ch

    c1 = bar("Status der Prozesse",
             dict(min_col=1, min_row=4, max_row=8),
             [dict(min_col=2, min_row=3, max_row=8)], "B12", ["2A78D6"])
    for i, st in enumerate(STATUS):                      # jede Säule in ihrer Statusfarbe
        pt = DataPoint(idx=i)
        pt.graphicalProperties = GraphicalProperties(solidFill=ST_COLOR[st])
        pt.graphicalProperties.line = LineProperties(noFill=True)
        c1.series[0].data_points.append(pt)
    c1.legend = None

    bar("Status je Prozessgruppe",
        dict(min_col=4, min_row=4, max_row=6),
        [dict(min_col=5 + j, min_row=3, max_row=6) for j in range(len(STATUS))],
        "F12", [ST_COLOR[s] for s in STATUS], stacked=True)

    b3 = bar("Ø Fortschritt je Initiative",
             dict(min_col=1, min_row=11, max_row=init_last),
             [dict(min_col=2, min_row=10, max_row=init_last)], "B27", ["2A78D6"])
    b3.legend = None
    b3.y_axis.numFmt = "0 %"

    b4 = bar("Verzögerte Prozesse je L1-Bereich",
             dict(min_col=5, min_row=11, max_row=20),
             [dict(min_col=6, min_row=10, max_row=20)], "F27", ["D03B3B"])
    b4.legend = None

    bar("Roll-out-Trichter: terminiert und abgeschlossen",
        dict(min_col=1, min_row=24, max_row=27),
        [dict(min_col=2, min_row=23, max_row=27), dict(min_col=3, min_row=23, max_row=27)],
        "B42", ["BFBDB2", "1C5CAB"])

    ck.column_dimensions["A"].width = 5
    for j in range(7):
        ck.column_dimensions[get_column_letter(2 + j)].width = 21
    ck.row_dimensions[1].height = 24
    ck.row_dimensions[9].height = 30
    ck.freeze_panes = "A7"
    # Nur die Auswahlfelder bleiben beschreibbar - Daten und Formeln sind gesperrt.
    ck.protection.sheet = True
    ck.protection.password = "cockpit"
    ck.protection.selectLockedCells = False

    # ------------------------------------------------------------ Hinweise
    hi = wb.create_sheet("Hinweise")
    hi.sheet_view.showGridLines = False
    rows = [
        ("IT Process Portfolio – Cockpit", 15, True, INK),
        ("", 10, False, INK2),
        ("Bedienung", 12, True, INK),
        ("Im Blatt Cockpit die gelb hinterlegten Auswahlfelder ändern. Kennzahlen, Diagramme und", 10, False, INK2),
        ("die Trefferliste rechnen sofort neu. Alle übrigen Zellen sind gesperrt, damit nichts", 10, False, INK2),
        ("versehentlich überschrieben wird; ein Kennwort wird dafür nicht benötigt.", 10, False, INK2),
        ("Die Blätter Prozesse und Phasen tragen echte Excel-Tabellen: dort lässt sich zusätzlich", 10, False, INK2),
        ("über die Spaltenköpfe filtern und sortieren.", 10, False, INK2),
        ("", 10, False, INK2),
        ("Gemeinsames Arbeiten", 12, True, INK),
        ("Die Auswahlfelder sind Zellen der Mappe. Ändert sie jemand, sehen alle anderen dieselbe", 10, False, INK2),
        ("Auswahl. Wer für sich allein filtern möchte, nutzt in Excel für das Web auf den Blättern", 10, False, INK2),
        ("Prozesse oder Phasen die Blattansicht (Ansicht > Blattansicht > Neu).", 10, False, INK2),
        ("", 10, False, INK2),
        ("Wie der Status entsteht", 12, True, INK),
        ("Verzögert  – mindestens eine Phase trägt in der Projektplanung die Ist-Phase \"Delayed\".", 10, False, INK2),
        ("             Verzögerung hat Vorrang vor allen anderen Zuständen.", 10, False, INK2),
        ("Abgeschlossen – 100 % Arbeitsfortschritt oder alle vier Phasen fertig.", 10, False, INK2),
        ("In Arbeit  – Fortschritt über 0 % oder eine Phase in Bearbeitung.", 10, False, INK2),
        ("Terminiert – Termine vorhanden, aber noch keine Bearbeitung.", 10, False, INK2),
        ("Nicht geplant – weder Termine noch Status.", 10, False, INK2),
        ("", 10, False, INK2),
        ("Überfällig  – der späteste Phasentermin liegt vor dem Stichtag und der Prozess ist nicht", 10, False, INK2),
        ("              abgeschlossen. Der Stichtag ist das siebte Auswahlfeld und frei setzbar.", 10, False, INK2),
        ("", 10, False, INK2),
        ("Herkunft der Daten", 12, True, INK),
        (f"Quelle: {m['source']}, Blatt \"{m['sheet']}\" ({m['snapshot']}).", 10, False, INK2),
        ("Die Hierarchie steckt dort in der Einrückung der Spalte Process; je Prozess gibt es eine", 10, False, INK2),
        ("Summenzeile und vier Phasenzeilen. Daraus entstehen 124 Prozesse über vier Ebenen.", 10, False, INK2),
        ("19 Prozesse tragen keine Termine, in den Phasen LUS und COT ist bislang kein Fortschritt", 10, False, INK2),
        ("erfasst – beides ist so aus der Planung übernommen und nicht geglättet.", 10, False, INK2),
        ("", 10, False, INK2),
        ("Neu erzeugen nach einer aktualisierten Planung: python3 build/excel.py", 10, False, INK3),
    ]
    for i, (text, size, bold, colour) in enumerate(rows, start=2):
        hi[f"B{i}"] = text
        hi[f"B{i}"].font = F(size=size, bold=bold, color=colour)
    hi.column_dimensions["A"].width = 4
    hi.column_dimensions["B"].width = 110

    print(f"Prozesse: {last-1} Zeilen · Phasen: {plast-1} Zeilen · Initiativen: {len(inits)}")
    wb.save(OUT)
    print(f"{OUT.relative_to(ROOT)}  {OUT.stat().st_size/1024:.0f} KB")
    print("Hinweis: Excel rechnet die Mappe beim Öffnen selbst durch - die frisch")
    print("erzeugte Datei trägt noch keine zwischengespeicherten Ergebnisse.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
