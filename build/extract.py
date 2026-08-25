#!/usr/bin/env python3
"""Extract the process portfolio model from Process_Portfolio_Timeline.xlsx.

Reads the latest snapshot sheet ("data Draft-april26") and turns the flat,
indentation-encoded MS-Project export into a nested process model that the
dashboard consumes as JSON.

Row layout in the source sheet:
  indent 0            -> process-group header ("Management Processes", ...)
  indent 3*level      -> the "Total" row of a process (rollup)
  indent 3*level + 3  -> the four phase rows of that process
"""
from __future__ import annotations

import datetime as dt
import json
import re
import sys
from pathlib import Path

import openpyxl

SRC = Path(__file__).resolve().parents[1] / "data" / "Process_Portfolio_Timeline.xlsx"
OUT = Path(__file__).resolve().parents[1] / "build" / "model.json"

DATA_SHEET = "data Draft-april26"
CALC_SHEET = "calc Draft-april26"

PHASES = ["Elaboration", "Implementation LIS", "Implementation LUS", "Implementation COT"]
GROUP_NAMES = {"MP": "Management Processes", "CP": "Core Processes", "SP": "Support Processes"}
GROUP_ORDER = {"MP": 1, "CP": 2, "SP": 3}


def norm(v):
    if v is None:
        return None
    s = str(v).strip()
    if s == "" or s.lower() in {"none", "nan"}:
        return None
    return s


def iso(v):
    if isinstance(v, dt.datetime):
        return v.date().isoformat()
    if isinstance(v, dt.date):
        return v.isoformat()
    return None


def num(v):
    if v is None:
        return None
    if isinstance(v, (int, float)):
        return float(v)
    s = str(v).strip().replace("%", "").replace(",", ".")
    try:
        return float(s)
    except ValueError:
        return None


def people(v):
    """Split the ';'-separated person columns into a clean list."""
    s = norm(v)
    if not s or s in {"?", "tbd", "n/a", "NV"}:
        return []
    out = []
    for part in s.split(";"):
        p = part.strip().rstrip("?").strip()
        if p and p.lower() not in {"?", "tbd", "n/a", "nv"}:
            out.append(p)
    return out


def short_name(person: str) -> str:
    """'Kunz Christina (LIS-MHP Management- und IT Beratung GmbH)' -> 'Kunz Christina (LIS-MHP)'."""
    m = re.match(r"^(.*?)\s*\(([^)]*)\)\s*$", person)
    if not m:
        return person
    name, org = m.group(1).strip(), m.group(2).strip()
    org = org.split(" ")[0].strip(" -")
    return f"{name} ({org})" if org else name


def phase_status(planned, actual):
    """Status of a single phase row, from the Planned/Actual pair."""
    a = (actual or "").lower()
    p = (planned or "").lower()
    if "delayed" in a:
        return "delayed"
    if "not planned" in a:
        return "notplanned"
    if "done" in a:
        return "done"
    if "in progress" in a:
        return "inprogress"
    if "done" in p:
        return "inprogress"          # planned to be done, no actual reported yet
    if p in {"scheduled"} or "implementation" in p or "elaboration" in p:
        return "scheduled"
    return "none"


def main() -> int:
    wb = openpyxl.load_workbook(SRC, data_only=True)
    ws = wb[DATA_SHEET]
    rows = list(ws.iter_rows(values_only=True))
    hdr = [norm(h) for h in rows[0]]
    I = {h: i for i, h in enumerate(hdr) if h}

    def cell(r, name):
        i = I.get(name)
        return r[i] if i is not None and i < len(r) else None

    nodes: list[dict] = []
    stack: list[tuple[int, int]] = []          # (indent, node index)
    cur: dict | None = None
    skipped = 0

    for r in rows[1:]:
        raw = cell(r, "Process")
        if raw is None or str(raw).strip() == "":
            skipped += 1
            continue
        text = str(raw)
        indent = len(text) - len(text.lstrip())
        name = text.strip()
        phase = norm(cell(r, "Phase"))
        lvl_raw = norm(cell(r, "Process level"))
        level = int(lvl_raw[1:]) if lvl_raw and re.fullmatch(r"L\d", lvl_raw) else None

        if indent == 0:                        # process-group header row
            skipped += 1
            continue

        is_total = phase in (None, "Total")
        # A phase row sits 3 columns deeper than its Total row; when a Total row is
        # missing its "Phase" value we still recognise it by the indent stack.
        if not is_total and cur is not None and indent <= cur["indent"]:
            is_total = True

        if is_total:
            if level is None:
                level = max(1, indent // 3)
            node = {
                "id": len(nodes),
                "name": name,
                "indent": indent,
                "level": level,
                "group": norm(cell(r, "Process Group")) or "MP",
                "initiative": norm(cell(r, "Initiative")) or "n/a",
                "l1": norm(cell(r, "Associated Process on L1")) or name,
                "pct": num(cell(r, "% Work done")) or 0.0,
                "lead": people(cell(r, "IT Process Initiative Lead")),
                "manager": people(cell(r, "IT Process Manager")),
                "consultant": people(cell(r, "IT Process Consultant")),
                "approval": iso(cell(r, "Process Approval Date")),
                "comment": norm(cell(r, "Comment")),
                "start": iso(cell(r, "Start")),
                "end": iso(cell(r, "End")),
                "duration": num(cell(r, "Duration in days")),
                "phases": [],
                "parent": None,
                "children": [],
            }
            while stack and stack[-1][0] >= indent:
                stack.pop()
            if stack:
                parent = nodes[stack[-1][1]]
                node["parent"] = parent["id"]
                parent["children"].append(node["id"])
            stack.append((indent, node["id"]))
            nodes.append(node)
            cur = node
            continue

        if cur is None:
            skipped += 1
            continue

        planned, actual = norm(cell(r, "Planned phase")), norm(cell(r, "Actual Phase"))
        # Two source rows carry a stray number in "Planned phase" - drop those.
        if planned and re.fullmatch(r"\d+(\.\d+)?", planned):
            planned = None
        cur["phases"].append({
            "phase": phase,
            "start": iso(cell(r, "Start")),
            "end": iso(cell(r, "End")),
            "duration": num(cell(r, "Duration in days")),
            "pct": num(cell(r, "% Work done")) or 0.0,
            "planned": planned,
            "actual": actual,
            "status": phase_status(planned, actual),
            "lead": people(cell(r, "IT Process Initiative Lead")),
            "manager": people(cell(r, "IT Process Manager")),
            "consultant": people(cell(r, "IT Process Consultant")),
        })

    # ---- derive per-node rollups -------------------------------------------------
    for n in nodes:
        by_phase = {p["phase"]: p for p in n["phases"]}
        n["phases"] = [by_phase.get(ph, {"phase": ph, "start": None, "end": None,
                                         "duration": None, "pct": 0.0, "planned": None,
                                         "actual": None, "status": "none",
                                         "lead": [], "manager": [], "consultant": []})
                       for ph in PHASES]
        for p in n["phases"]:
            for role in ("lead", "manager", "consultant"):
                if not p[role]:
                    p[role] = n[role]

        starts = [d for d in [n["start"]] + [p["start"] for p in n["phases"]] if d]
        ends = [d for d in [n["end"]] + [p["end"] for p in n["phases"]] if d]
        n["spanStart"] = min(starts) if starts else None
        n["spanEnd"] = max(ends) if ends else None

        st = [p["status"] for p in n["phases"]]
        if "delayed" in st:
            n["status"] = "delayed"
        elif n["pct"] >= 1 or (st.count("done") == 4):
            n["status"] = "done"
        elif n["pct"] > 0 or "inprogress" in st:
            n["status"] = "inprogress"
        elif "scheduled" in st or n["spanStart"]:
            n["status"] = "scheduled"
        else:
            n["status"] = "notplanned"

        n["delayedPhases"] = st.count("delayed")
        n["elabStatus"] = n["phases"][0]["status"]
        n["elabPct"] = n["phases"][0]["pct"]
        n["implPct"] = max(p["pct"] for p in n["phases"][1:])
        n["groupName"] = GROUP_NAMES.get(n["group"], n["group"])
        n["groupOrder"] = GROUP_ORDER.get(n["group"], 9)
        n["path"] = n["name"]

    by_id = {n["id"]: n for n in nodes}
    for n in nodes:
        parts, p = [n["name"]], n["parent"]
        while p is not None:
            parts.append(by_id[p]["name"])
            p = by_id[p]["parent"]
        n["path"] = " › ".join(reversed(parts))
        n["descendants"] = 0
    for n in nodes:                                   # descendant counts
        p = n["parent"]
        while p is not None:
            by_id[p]["descendants"] += 1
            p = by_id[p]["parent"]

    # ---- reference daily phase load from the workbook's own calc sheet -----------
    calc = []
    if CALC_SHEET in wb.sheetnames:
        cs = wb[CALC_SHEET]
        crows = list(cs.iter_rows(values_only=True))
        chdr = [norm(h) for h in crows[0]]
        for r in crows[1:]:
            d = iso(r[0])
            if not d:
                continue
            calc.append({"date": d, **{chdr[i]: (num(r[i]) or 0) for i in range(1, len(chdr)) if chdr[i]}})

    model = {
        "generated": dt.datetime.now(dt.timezone.utc).strftime("%Y-%m-%d %H:%M UTC"),
        "source": SRC.name,
        "sheet": DATA_SHEET,
        "snapshot": "Draft April 2026",
        "phases": PHASES,
        "groupNames": GROUP_NAMES,
        "nodes": nodes,
        "calc": calc,
    }
    OUT.write_text(json.dumps(model, ensure_ascii=False, separators=(",", ":")))

    # ---- console summary ---------------------------------------------------------
    from collections import Counter
    print(f"nodes={len(nodes)} skipped_rows={skipped} calc_days={len(calc)}")
    print("levels :", dict(sorted(Counter(n['level'] for n in nodes).items())))
    print("groups :", dict(Counter(n['group'] for n in nodes)))
    print("status :", dict(Counter(n['status'] for n in nodes)))
    print("roots  :", [n['name'] for n in nodes if n['parent'] is None][:25])
    print(f"written {OUT} ({OUT.stat().st_size/1024:.0f} KB)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
