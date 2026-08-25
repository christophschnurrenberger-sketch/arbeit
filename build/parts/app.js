/* ================================================================== i18n */
const T = {
  de: {
    title:"IT Process Portfolio Cockpit", snapshot:"Datenstand", processes:"Prozesse",
    theme:"Ansicht", csv:"CSV Export", print:"Drucken / PDF",
    "f.search":"Suche", "f.searchPh":"Prozess, Person, Initiative …",
    "f.period":"Zeitraum (Überschneidung)", "f.presets":"Schnellauswahl", "f.asof":"Stichtag",
    "f.progress":"Fortschritt", "f.quick":"Fokus", "f.reset":"Filter zurücksetzen",
    "f.source":"Quelle", "f.note":"Alle Kennzahlen, Diagramme und die Timeline reagieren auf dieselbe Filterauswahl.",
    "p.all":"Gesamt","p.q":"Lfd. Quartal","p.90":"Nächste 90 T","p.year":"Lfd. Jahr",
    "t.delayed":"Nur verzögert","t.overdue":"Nur überfällig","t.dated":"Nur mit Termin","t.undated":"Ohne Termin einbeziehen",
    "s.overview":"Portfolio-Überblick","s.timeline":"Portfolio-Timeline","s.detail":"Detailtabelle",
    "c.status":"Status der Prozesse","c.statusSub":"Verzögerung hat Vorrang vor allen anderen Zuständen",
    "c.group":"Status je Prozessgruppe","c.groupSub":"Anteile je Management-, Kern- und Support-Prozessen",
    "c.funnel":"Roll-out-Trichter","c.funnelSub":"Prozesse je Phase: terminiert · abgeschlossen",
    "c.load":"Phasenauslastung im Zeitverlauf","c.loadSub":"Anzahl gleichzeitig laufender Prozesse je Phase (Wochenraster)",
    "c.hot":"Verzögerungs-Hotspots","c.hotSub":"L1-Prozessbereiche mit den meisten verzögerten Phasen",
    "c.init":"Fortschritt je Initiative","c.initSub":"Ø Arbeitsfortschritt, Balkenbreite = Anzahl Prozesse",
    "c.owner":"Portfolio je Process Manager","c.ownerSub":"Verantwortungsumfang und Verzögerungsquote",
    "c.clickHint":"klicken = filtern",
    "g.expand":"Alle aufklappen","g.collapse":"Auf L1 reduzieren","g.month":"Monate","g.quarter":"Quartale",
    "g.process":"Prozess","g.done":"% fertig",
    "d.byProcess":"Je Prozess","d.byPhase":"Je Phase",
    k:{group:"Prozessgruppe",initiative:"Initiative",l1:"L1-Prozess",level:"Ebene",status:"Status",
       phase:"Phase im Fokus",actual:"Ist-Phase",planned:"Plan-Phase",lead:"Initiative Lead",
       manager:"Process Manager",consultant:"Consultant"},
    all:"Alle", none:"keine", sel:"ausgewählt", selectAll:"Alle wählen", clear:"Leeren", searchOpt:"filtern …",
    st:{done:"Abgeschlossen",inprogress:"In Arbeit",delayed:"Verzögert",scheduled:"Terminiert",notplanned:"Nicht geplant",none:"Ohne Angabe"},
    kpi:{count:"Prozesse im Filter",of:"von",avg:"Ø Fortschritt",delayed:"Verzögert",
         overdue:"Überfällig",overdueSub:"Endtermin vor Stichtag, nicht fertig",
         elab:"Elaboration fertig",impl:"In Implementierung",due:"Termine in 90 Tagen", avgSub:"Mittelwert über",
         share:"Anteil",dueSub:"Phasenenden ab Stichtag"},
    tbl:{process:"Prozess",group:"Gruppe",level:"Ebene",initiative:"Initiative",status:"Status",
         pct:"% fertig",start:"Start",end:"Ende",dur:"Dauer (T)",elab:"Elaboration",lead:"Initiative Lead",
         manager:"Process Manager",consultant:"Consultant",approval:"Freigabe",comment:"Kommentar",
         phase:"Phase",planned:"Plan-Phase",actual:"Ist-Phase"},
    rows:"Zeilen", processesShown:"Prozesse sichtbar", ofTotal:"von", noData:"Keine Daten für diese Filterauswahl.",
    today:"Stichtag", weekOf:"Woche ab", running:"laufend", scheduledN:"terminiert", doneN:"abgeschlossen",
    delayedPhases:"verzögerte Phasen", processesN:"Prozesse", rollup:"Sammelbalken (Teilprozesse)",
    delayedMark:"verzögert", noDates:"ohne Termin", legendPhase:"Phasen", avgDone:"Ø fertig",
    gShown:"sichtbare Zeilen", scope:"aktive Auswahl"
  },
  en: {
    title:"IT Process Portfolio Cockpit", snapshot:"Data as of", processes:"processes",
    theme:"Theme", csv:"CSV export", print:"Print / PDF",
    "f.search":"Search", "f.searchPh":"Process, person, initiative …",
    "f.period":"Period (overlap)", "f.presets":"Quick range", "f.asof":"Reference date",
    "f.progress":"Progress", "f.quick":"Focus", "f.reset":"Reset filters",
    "f.source":"Source", "f.note":"Every KPI, chart and the timeline respond to the same filter selection.",
    "p.all":"All time","p.q":"This quarter","p.90":"Next 90 days","p.year":"This year",
    "t.delayed":"Delayed only","t.overdue":"Overdue only","t.dated":"Scheduled only","t.undated":"Include undated",
    "s.overview":"Portfolio overview","s.timeline":"Portfolio timeline","s.detail":"Detail table",
    "c.status":"Process status","c.statusSub":"Delay outranks every other state",
    "c.group":"Status by process group","c.groupSub":"Split across management, core and support processes",
    "c.funnel":"Roll-out funnel","c.funnelSub":"Processes per phase: scheduled · completed",
    "c.load":"Phase load over time","c.loadSub":"Processes running in parallel per phase (weekly buckets)",
    "c.hot":"Delay hotspots","c.hotSub":"L1 process areas with the most delayed phases",
    "c.init":"Progress by initiative","c.initSub":"Avg. work done, bar width = number of processes",
    "c.owner":"Portfolio by process manager","c.ownerSub":"Scope of responsibility and delay rate",
    "c.clickHint":"click to filter",
    "g.expand":"Expand all","g.collapse":"Collapse to L1","g.month":"Months","g.quarter":"Quarters",
    "g.process":"Process","g.done":"% done",
    "d.byProcess":"By process","d.byPhase":"By phase",
    k:{group:"Process group",initiative:"Initiative",l1:"L1 process",level:"Level",status:"Status",
       phase:"Phase in focus",actual:"Actual phase",planned:"Planned phase",lead:"Initiative lead",
       manager:"Process manager",consultant:"Consultant"},
    all:"All", none:"none", sel:"selected", selectAll:"Select all", clear:"Clear", searchOpt:"filter …",
    st:{done:"Completed",inprogress:"In progress",delayed:"Delayed",scheduled:"Scheduled",notplanned:"Not planned",none:"No status"},
    kpi:{count:"Processes in filter",of:"of",avg:"Avg. progress",delayed:"Delayed",
         overdue:"Overdue",overdueSub:"End date before reference date, not done",
         elab:"Elaboration done",impl:"In implementation",due:"Due in 90 days", avgSub:"mean across",
         share:"share",dueSub:"phase ends from reference date"},
    tbl:{process:"Process",group:"Group",level:"Level",initiative:"Initiative",status:"Status",
         pct:"% done",start:"Start",end:"End",dur:"Days",elab:"Elaboration",lead:"Initiative lead",
         manager:"Process manager",consultant:"Consultant",approval:"Approved",comment:"Comment",
         phase:"Phase",planned:"Planned phase",actual:"Actual phase"},
    rows:"rows", processesShown:"processes visible", ofTotal:"of", noData:"No data for this filter selection.",
    today:"Reference date", weekOf:"Week of", running:"running", scheduledN:"scheduled", doneN:"completed",
    delayedPhases:"delayed phases", processesN:"processes", rollup:"Roll-up bar (sub-processes)",
    delayedMark:"delayed", noDates:"no dates", legendPhase:"Phases", avgDone:"avg done",
    gShown:"visible rows", scope:"active selection"
  }
};
let LANG = "de";
const deep = (o,k) => k.split(".").reduce((x,p)=>(x||{})[p], o);
const t = k => {
  for (const d of [T[LANG], T.de]) { if (!d) continue;
    if (Object.prototype.hasOwnProperty.call(d,k)) return d[k];
    const v = deep(d,k); if (v !== undefined) return v; }
  return k;
};

/* ================================================================== utils */
const $ = s => document.querySelector(s);
const el = (tag, attrs, kids) => {
  const n = document.createElement(tag);
  if (attrs) for (const [k,v] of Object.entries(attrs)) {
    if (v === null || v === undefined || v === false) continue;
    if (k === "class") n.className = v;
    else if (k === "text") n.textContent = v;
    else if (k === "html") n.innerHTML = v;
    else if (k.startsWith("on")) n.addEventListener(k.slice(2), v);
    else n.setAttribute(k, v === true ? "" : v);
  }
  if (kids) for (const c of [].concat(kids)) if (c) n.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
  return n;
};
const NS = "http://www.w3.org/2000/svg";
const sv = (tag, attrs, kids) => {
  const n = document.createElementNS(NS, tag);
  if (attrs) for (const [k,v] of Object.entries(attrs)) {
    if (v === null || v === undefined || v === false) continue;
    if (k === "text") n.textContent = v;
    else if (k.startsWith("on")) n.addEventListener(k.slice(2), v);
    else n.setAttribute(k, v);
  }
  if (kids) for (const c of [].concat(kids)) if (c) n.appendChild(c);
  return n;
};
const D = iso => iso ? new Date(iso + "T00:00:00") : null;
const isoOf = d => d.toISOString().slice(0,10);
const DAY = 864e5;
const addDays = (d,n) => new Date(d.getTime() + n*DAY);
const fmtD = iso => { if (!iso) return "–"; const d = D(iso);
  return LANG === "de" ? d.toLocaleDateString("de-DE",{day:"2-digit",month:"2-digit",year:"numeric"})
                       : d.toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"}); };
const fmtMon = d => d.toLocaleDateString(LANG === "de" ? "de-DE" : "en-GB", {month:"short"});
const pctS = v => Math.round(v*100) + " %";
const nf = n => n.toLocaleString(LANG === "de" ? "de-DE" : "en-GB");

const STATUSES = ["delayed","inprogress","scheduled","done","notplanned"];
const ST_COLOR = {delayed:"var(--st-delay)",inprogress:"var(--st-prog)",scheduled:"var(--st-sched)",done:"var(--st-done)",notplanned:"var(--st-none)",none:"var(--st-none)"};
const ST_ICON  = {delayed:"▲",inprogress:"◐",scheduled:"○",done:"✓",notplanned:"–",none:"–"};
const PH_COLOR = ["var(--ph1)","var(--ph2)","var(--ph3)","var(--ph4)"];
const PHASES = MODEL.phases;
const PH_SHORT = {"Elaboration":"Elaboration","Implementation LIS":"Impl. LIS","Implementation LUS":"Impl. LUS","Implementation COT":"Impl. COT"};

/* ================================================================== data prep */
const NODES = MODEL.nodes;
const BY_ID = new Map(NODES.map(n => [n.id, n]));
NODES.forEach(n => {
  n.blob = [n.name, n.path, n.initiative, n.l1, n.group, n.groupName, n.comment || "",
            ...n.lead, ...n.manager, ...n.consultant,
            ...n.phases.map(p => (p.actual||"") + " " + (p.planned||""))].join(" ").toLowerCase();
  n.ancestors = [];
  let p = n.parent; while (p !== null && p !== undefined) { n.ancestors.push(p); p = BY_ID.get(p).parent; }
  n.actuals  = [...new Set(n.phases.map(p=>p.actual).filter(Boolean))];
  n.planneds = [...new Set(n.phases.map(p=>p.planned).filter(Boolean))];
});
const ALL_START = NODES.map(n=>n.spanStart).filter(Boolean).sort()[0] || "2025-01-01";
const ALL_END   = NODES.map(n=>n.spanEnd).filter(Boolean).sort().slice(-1)[0] || "2027-12-31";

/* ================================================================== state */
const S = {
  q:"", group:new Set(), initiative:new Set(), l1:new Set(), level:new Set(), status:new Set(),
  phase:new Set(), actual:new Set(), planned:new Set(), lead:new Set(), manager:new Set(), consultant:new Set(),
  from:"", to:"", asOf:isoOf(new Date()), pMin:0, pMax:100,
  onlyDelayed:false, onlyOverdue:false, onlyDated:false, inclUndated:true,
  expanded:new Set(), gScale:"q", rowMode:"proc", sortKey:"path", sortDir:1
};

/* ================================================================== facets */
const FACETS = [
  {key:"group",      host:"#ms-group",      opts:()=>uniq(n=>[n.group]).map(v=>({v,label:v+" · "+(MODEL.groupNames[v]||v)}))},
  {key:"initiative", host:"#ms-initiative", opts:()=>uniq(n=>[n.initiative]).map(v=>({v,label:v}))},
  {key:"l1",         host:"#ms-l1",         opts:()=>uniq(n=>[n.l1]).map(v=>({v,label:v}))},
  {key:"level",      host:"#ms-level",      opts:()=>uniq(n=>["L"+n.level]).map(v=>({v,label:v}))},
  {key:"status",     host:"#ms-status",     opts:()=>STATUSES.map(v=>({v,label:t("st."+v)}))},
  {key:"phase",      host:"#ms-phase",      opts:()=>PHASES.map(v=>({v,label:PH_SHORT[v]||v}))},
  {key:"actual",     host:"#ms-actual",     opts:()=>uniq(n=>n.actuals).map(v=>({v,label:v}))},
  {key:"planned",    host:"#ms-planned",    opts:()=>uniq(n=>n.planneds).map(v=>({v,label:v}))},
  {key:"lead",       host:"#ms-lead",       opts:()=>uniq(n=>n.lead).map(v=>({v,label:v}))},
  {key:"manager",    host:"#ms-manager",    opts:()=>uniq(n=>n.manager).map(v=>({v,label:v}))},
  {key:"consultant", host:"#ms-consultant", opts:()=>uniq(n=>n.consultant).map(v=>({v,label:v}))}
];
function uniq(fn){ const s = new Set(); NODES.forEach(n => fn(n).forEach(v => v && s.add(v))); return [...s].sort((a,b)=>a.localeCompare(b)); }
function facetCounts(key, getter){
  const base = filterNodes({skip:key});
  const m = new Map();
  base.forEach(n => getter(n).forEach(v => v && m.set(v, (m.get(v)||0)+1)));
  return m;
}
const GETTER = {
  group:n=>[n.group], initiative:n=>[n.initiative], l1:n=>[n.l1], level:n=>["L"+n.level],
  status:n=>[n.status], phase:n=>n.phases.filter(p=>p.start||p.status!=="none").map(p=>p.phase),
  actual:n=>n.actuals, planned:n=>n.planneds, lead:n=>n.lead, manager:n=>n.manager, consultant:n=>n.consultant
};

/* ================================================================== filtering */
function overlaps(n){
  const from = S.from, to = S.to;
  if (!from && !to) return true;
  if (!n.spanStart && !n.spanEnd) return S.inclUndated;
  const s = n.spanStart || n.spanEnd, e = n.spanEnd || n.spanStart;
  if (from && e < from) return false;
  if (to && s > to) return false;
  return true;
}
function filterNodes(o){
  const skip = (o && o.skip) || null;
  const q = S.q.trim().toLowerCase();
  return NODES.filter(n => {
    if (q && !n.blob.includes(q)) return false;
    if (skip !== "group"      && S.group.size      && !S.group.has(n.group)) return false;
    if (skip !== "initiative" && S.initiative.size && !S.initiative.has(n.initiative)) return false;
    if (skip !== "l1"         && S.l1.size         && !S.l1.has(n.l1)) return false;
    if (skip !== "level"      && S.level.size      && !S.level.has("L"+n.level)) return false;
    if (skip !== "status"     && S.status.size     && !S.status.has(n.status)) return false;
    if (skip !== "phase"      && S.phase.size      && !GETTER.phase(n).some(p=>S.phase.has(p))) return false;
    if (skip !== "actual"     && S.actual.size     && !n.actuals.some(v=>S.actual.has(v))) return false;
    if (skip !== "planned"    && S.planned.size    && !n.planneds.some(v=>S.planned.has(v))) return false;
    if (skip !== "lead"       && S.lead.size       && !n.lead.some(v=>S.lead.has(v))) return false;
    if (skip !== "manager"    && S.manager.size    && !n.manager.some(v=>S.manager.has(v))) return false;
    if (skip !== "consultant" && S.consultant.size && !n.consultant.some(v=>S.consultant.has(v))) return false;
    const p = Math.round(n.pct*100);
    if (p < S.pMin || p > S.pMax) return false;
    if (!overlaps(n)) return false;
    if (S.onlyDelayed && n.status !== "delayed") return false;
    if (S.onlyDated && !n.spanStart && !n.spanEnd) return false;
    if (!S.inclUndated && !n.spanStart && !n.spanEnd) return false;
    if (S.onlyOverdue && !isOverdue(n)) return false;
    return true;
  });
}
const isOverdue = n => !!n.spanEnd && n.spanEnd < S.asOf && n.status !== "done";
/* phases of a node that are in scope of the phase filter */
const scopedPhases = n => S.phase.size ? n.phases.filter(p => S.phase.has(p.phase)) : n.phases;

/* ================================================================== tooltip */
const TIP = $("#tip");
let tipOn = false;
function tipShow(ev, frag){ TIP.replaceChildren(frag); TIP.classList.add("on"); tipOn = true; tipMove(ev); }
function tipMove(ev){
  if (!tipOn) return;
  const r = TIP.getBoundingClientRect();
  let x = ev.clientX + 14, y = ev.clientY + 16;
  if (x + r.width > innerWidth - 8) x = ev.clientX - r.width - 14;
  if (y + r.height > innerHeight - 8) y = ev.clientY - r.height - 16;
  TIP.style.left = Math.max(8,x) + "px"; TIP.style.top = Math.max(8,y) + "px";
}
function tipHide(){ TIP.classList.remove("on"); tipOn = false; }
function tipBody(title, rows, meta){
  const f = document.createDocumentFragment();
  f.appendChild(el("div",{class:"t",text:title}));
  (rows||[]).forEach(r => f.appendChild(el("div",{class:"r"},[
    el("i",{class:"k"+(r.sq?" sq":""),style:"background:"+(r.color||"var(--muted)")}),
    el("span",{class:"n",text:r.name}), el("span",{class:"v",text:r.value})
  ])));
  if (meta) f.appendChild(el("div",{class:"meta",text:meta}));
  return f;
}
addEventListener("pointermove", e => { if (tipOn) tipMove(e); }, {passive:true});

/* ================================================================== multiselect */
const MS = {};
function buildMS(f){
  const host = $(f.host);
  host.replaceChildren();
  const lab = el("span",{class:"flabel",text:t("k."+f.key)});
  const btn = el("button",{type:"button",class:"ms-btn","aria-haspopup":"listbox","aria-expanded":"false"},[
    el("span",{class:"cap",text:t("all")}), el("span",{class:"cnt",text:"0",style:"display:none"}),
    el("span",{class:"chev",text:"▾"})
  ]);
  const search = el("input",{class:"msearch",type:"search",placeholder:t("searchOpt"),"aria-label":t("k."+f.key)});
  const list = el("div",{class:"ms-list",role:"listbox"});
  const foot = el("div",{class:"ms-foot"},[
    el("button",{type:"button",class:"linkbtn",text:t("selectAll"),onclick:()=>{ MS[f.key].visible.forEach(v=>S[f.key].add(v)); render(); }}),
    el("button",{type:"button",class:"linkbtn",text:t("clear"),onclick:()=>{ S[f.key].clear(); render(); }})
  ]);
  const pop = el("div",{class:"ms-pop"},[search,list,foot]);
  const wrap = el("div",{class:"ms"},[btn,pop]);
  host.append(lab, wrap);
  btn.addEventListener("click", e => {
    e.stopPropagation();
    const open = wrap.classList.contains("open");
    document.querySelectorAll(".ms.open").forEach(m => m.classList.remove("open"));
    if (!open) { wrap.classList.add("open"); btn.setAttribute("aria-expanded","true"); search.focus(); }
    else btn.setAttribute("aria-expanded","false");
  });
  pop.addEventListener("click", e => e.stopPropagation());
  search.addEventListener("input", () => paintMS(f.key));
  MS[f.key] = {f, wrap, btn, search, list, visible:[]};
}
function paintMS(key){
  const m = MS[key], f = m.f;
  const counts = facetCounts(key, GETTER[key]);
  const q = m.search.value.trim().toLowerCase();
  const opts = f.opts().filter(o => !q || o.label.toLowerCase().includes(q));
  m.visible = opts.map(o => o.v);
  m.list.replaceChildren(...opts.map(o => {
    const cb = el("input",{type:"checkbox"});
    cb.checked = S[key].has(o.v);
    cb.addEventListener("change", () => { cb.checked ? S[key].add(o.v) : S[key].delete(o.v); render(); });
    const row = el("label",{class:"ms-opt"},[cb, el("span",{class:"n",text:o.label}), el("span",{class:"c",text:String(counts.get(o.v)||0)})]);
    if (!counts.get(o.v)) row.style.opacity = ".5";
    return row;
  }));
  const n = S[key].size;
  const cap = m.btn.querySelector(".cap"), cnt = m.btn.querySelector(".cnt");
  cnt.style.display = n ? "" : "none"; cnt.textContent = String(n);
  cap.textContent = n === 0 ? t("all")
    : n === 1 ? (f.opts().find(o => o.v === [...S[key]][0])||{label:[...S[key]][0]}).label
    : n + " " + t("sel");
}
addEventListener("click", () => document.querySelectorAll(".ms.open").forEach(m => {
  m.classList.remove("open"); m.querySelector(".ms-btn").setAttribute("aria-expanded","false");
}));

/* ================================================================== chips */
function renderChips(){
  const box = $("#chips"); box.replaceChildren();
  const add = (k, label, onX) => box.appendChild(el("span",{class:"chip"},[
    el("span",{class:"k",text:k+":"}), el("b",{text:label}),
    el("button",{type:"button","aria-label":"remove",text:"×",onclick:onX})
  ]));
  if (S.q) add(t("f.search"), S.q, () => { S.q=""; $("#q").value=""; render(); });
  FACETS.forEach(f => S[f.key].forEach(v => {
    const o = f.opts().find(x => x.v === v);
    add(t("k."+f.key), o ? o.label : v, () => { S[f.key].delete(v); render(); });
  }));
  if (S.from || S.to) add(t("f.period"), (S.from?fmtD(S.from):"…")+" – "+(S.to?fmtD(S.to):"…"),
    () => { S.from=""; S.to=""; $("#dFrom").value=""; $("#dTo").value=""; render(); });
  if (S.pMin>0 || S.pMax<100) add(t("f.progress"), S.pMin+" – "+S.pMax+" %",
    () => { S.pMin=0; S.pMax=100; $("#pMin").value=0; $("#pMax").value=100; render(); });
  [["onlyDelayed","t.delayed"],["onlyOverdue","t.overdue"],["onlyDated","t.dated"]].forEach(([k,lk]) => {
    if (S[k]) add(t("f.quick"), t(lk), () => { S[k]=false; render(); });
  });
  if (!S.inclUndated) add(t("f.quick"), t("t.undated")+" ✕", () => { S.inclUndated=true; render(); });
  box.classList.toggle("empty", box.childElementCount === 0);
}

/* ================================================================== kpis */
function renderKPIs(rows){
  const total = NODES.length, n = rows.length;
  const avg = n ? rows.reduce((a,r)=>a+r.pct,0)/n : 0;
  const del = rows.filter(r=>r.status==="delayed").length;
  const ovd = rows.filter(isOverdue).length;
  const elab = rows.filter(r=>r.elabStatus==="done").length;
  const impl = rows.filter(r=>r.phases.slice(1).some(p=>["done","inprogress"].includes(p.status)||p.pct>0)).length;
  const horizon = isoOf(addDays(D(S.asOf), 90));
  let due = 0; rows.forEach(r => scopedPhases(r).forEach(p => { if (p.end && p.end >= S.asOf && p.end <= horizon) due++; }));
  const share = v => n ? Math.round(v/n*100)+" %" : "0 %";

  const tile = (o) => el("div",{class:"kpi"},[
    el("i",{class:"stripe",style:"background:"+(o.color||"var(--accent)")}),
    el("span",{class:"lab",text:o.lab}),
    el("span",{class:"val tnum",text:o.val}),
    o.meter !== undefined ? el("span",{class:"meter"},[el("i",{style:"width:"+Math.round(o.meter*100)+"%;background:"+(o.color||"var(--accent)")})]) : null,
    el("span",{class:"sub",text:o.sub})
  ]);
  $("#kpis").replaceChildren(
    tile({lab:t("kpi.count"), val:nf(n), sub:t("kpi.of")+" "+nf(total), color:"var(--accent)", meter:n/total}),
    tile({lab:t("kpi.avg"), val:pctS(avg), sub:t("kpi.avgSub")+" "+nf(n)+" "+t("processesN"), color:"var(--st-prog)", meter:avg}),
    tile({lab:t("st.delayed"), val:nf(del), sub:ST_ICON.delayed+" "+share(del)+" "+t("kpi.share"), color:"var(--st-delay)", meter:n?del/n:0}),
    tile({lab:t("kpi.overdue"), val:nf(ovd), sub:t("kpi.overdueSub"), color:"var(--warn)", meter:n?ovd/n:0}),
    tile({lab:t("kpi.elab"), val:nf(elab), sub:ST_ICON.done+" "+share(elab)+" "+t("kpi.share"), color:"var(--st-done)", meter:n?elab/n:0}),
    tile({lab:t("kpi.impl"), val:nf(impl), sub:ST_ICON.inprogress+" "+share(impl)+" "+t("kpi.share"), color:"var(--ph2)", meter:n?impl/n:0}),
    tile({lab:t("kpi.due"), val:nf(due), sub:t("kpi.dueSub")+" "+fmtD(S.asOf), color:"var(--ph4)"})
  );
}

/* ================================================================== chart primitives */
function hostW(sel, fallback){ const w = $(sel).clientWidth; return w > 60 ? w : fallback; }

/* horizontal bars, optional stacked segments */
function hBars(sel, rows, o){
  o = o || {};
  const host = $(sel); host.replaceChildren();
  if (!rows.length) { host.appendChild(el("div",{class:"empty-note",text:t("noData")})); return; }
  const W = hostW(sel, 380), labW = o.labW || Math.min(160, Math.max(90, W*0.34)), valW = o.valW || 52;
  const rowH = o.rowH || 26, gap = 6, plotW = Math.max(40, W - labW - valW);
  const H = rows.length * (rowH + gap);
  const max = o.max || Math.max(1, ...rows.map(r => r.segs ? r.segs.reduce((a,s)=>a+s.value,0) : r.value));
  const g = sv("svg",{class:"chart",width:W,height:H,viewBox:`0 0 ${W} ${H}`,role:"img"});
  rows.forEach((r,i) => {
    const y = i*(rowH+gap);
    g.appendChild(sv("text",{class:"catlab",x:0,y:y+rowH/2+4,text:r.label}));
    const segs = r.segs || [{value:r.value,color:r.color||"var(--ph1)",name:r.label}];
    let x = labW;
    segs.forEach(s => {
      const w = Math.max(0, s.value/max*plotW);
      if (w > 0.4){
        const rect = sv("rect",{class:"mark",x:x,y:y+3,width:Math.max(2,w-2),height:rowH-6,rx:4,fill:s.color,
          style:o.onClick?"cursor:pointer":""});
        rect.addEventListener("pointerenter", e => tipShow(e, tipBody(r.tipTitle||r.label,
          (r.segs?segs:[]).map(ss=>({name:ss.name,value:nf(ss.value)+(o.unit||""),color:ss.color,sq:true}))
            .concat(r.segs?[]:[{name:o.valueName||"",value:(o.fmt?o.fmt(r.value):nf(r.value)),color:s.color,sq:true}]),
          r.meta)));
        rect.addEventListener("pointerleave", tipHide);
        if (o.onClick) rect.addEventListener("click", () => o.onClick(r, s));
        g.appendChild(rect);
        if (s.label && w > 30) g.appendChild(sv("text",{class:"barlab",x:x+6,y:y+rowH/2+4,fill:s.labelColor||"#fff",text:s.label}));
      }
      x += w;
    });
    g.appendChild(sv("text",{class:"barlab",x:W-2,y:y+rowH/2+4,"text-anchor":"end",text:o.fmt?o.fmt(r.value,r):nf(r.value)}));
  });
  host.appendChild(g);
}

/* ================================================================== charts */
function chartStatus(rows){
  const counts = {}; STATUSES.forEach(s => counts[s]=0);
  rows.forEach(r => counts[r.status] = (counts[r.status]||0)+1);
  const total = rows.length || 1;
  hBars("#chStatus", STATUSES.map(s => ({
    key:s, label: ST_ICON[s]+"  "+t("st."+s), value: counts[s], color: ST_COLOR[s],
    tipTitle: t("st."+s), meta: Math.round(counts[s]/total*100)+" % "+t("kpi.share")
  })), {
    fmt:(v)=>nf(v)+"  ("+Math.round(v/total*100)+" %)", valW:78, rowH:26,
    valueName:t("processesN"),
    onClick:(r)=>{ S.status.has(r.key) ? S.status.delete(r.key) : S.status.add(r.key); render(); }
  });
}

function chartGroup(rows){
  const groups = ["MP","CP","SP"].filter(gk => rows.some(r=>r.group===gk));
  hBars("#chGroup", groups.map(gk => {
    const sub = rows.filter(r => r.group === gk);
    return {
      key:gk, label: gk, value: sub.length, tipTitle: gk+" · "+(MODEL.groupNames[gk]||gk),
      meta: nf(sub.length)+" "+t("processesN"),
      segs: STATUSES.map(s => ({name:t("st."+s), value: sub.filter(r=>r.status===s).length, color:ST_COLOR[s],
                                label: sub.filter(r=>r.status===s).length || "",
                                labelColor: (s==="notplanned"||s==="scheduled") ? "var(--ink)" : "#fff", key:s}))
                    .filter(s => s.value > 0)
    };
  }), {rowH:30, labW:44, valW:46,
       onClick:(r,s)=>{ S.group.clear(); S.group.add(r.key); if (s.key){ S.status.clear(); S.status.add(s.key);} render(); }});
  const lg = $("#lgStatus"); lg.replaceChildren(...STATUSES.map(s =>
    el("span",{},[el("i",{style:"background:"+ST_COLOR[s]}), el("span",{text:ST_ICON[s]+" "+t("st."+s)})])));
}

function chartFunnel(rows){
  const host = $("#chFunnel"); host.replaceChildren();
  const W = hostW("#chFunnel",380), labW = 96, valW = 66, plotW = Math.max(40, W-labW-valW);
  const rowH = 30, gap = 8, H = PHASES.length*(rowH+gap);
  const ramp = ["var(--or4)","var(--or3)","var(--or2)","var(--or1)"];
  const stats = PHASES.map((ph,i) => {
    const rel = rows.map(r => r.phases[i]);
    return {ph, i, planned: rel.filter(p => p.start || p.status !== "none").length,
            done: rel.filter(p => p.status === "done").length,
            delayed: rel.filter(p => p.status === "delayed").length};
  });
  const max = Math.max(1, ...stats.map(s => s.planned));
  const g = sv("svg",{class:"chart",width:W,height:H,viewBox:`0 0 ${W} ${H}`});
  stats.forEach((s,i) => {
    const y = i*(rowH+gap), wAll = s.planned/max*plotW, wDone = s.done/max*plotW;
    g.appendChild(sv("text",{class:"catlab",x:0,y:y+rowH/2+4,text:PH_SHORT[s.ph]||s.ph}));
    g.appendChild(sv("rect",{x:labW,y:y+6,width:Math.max(2,wAll),height:rowH-12,rx:4,fill:"var(--surface-3)"}));
    if (wDone > 1) g.appendChild(sv("rect",{class:"mark",x:labW,y:y+6,width:Math.max(2,wDone-2),height:rowH-12,rx:4,fill:ramp[i]}));
    const hit = sv("rect",{class:"hit",x:labW,y:y,width:Math.max(4,wAll),height:rowH,style:"cursor:pointer"});
    hit.addEventListener("pointerenter", e => tipShow(e, tipBody(s.ph, [
      {name:t("scheduledN"), value:nf(s.planned), color:"var(--muted)", sq:true},
      {name:t("doneN"), value:nf(s.done), color:ramp[i], sq:true},
      {name:t("st.delayed"), value:nf(s.delayed), color:"var(--st-delay)", sq:true}
    ])));
    hit.addEventListener("pointerleave", tipHide);
    hit.addEventListener("click", () => { S.phase.has(s.ph) ? S.phase.delete(s.ph) : S.phase.add(s.ph); render(); });
    g.appendChild(hit);
    g.appendChild(sv("text",{class:"barlab",x:W-2,y:y+rowH/2+4,"text-anchor":"end",text:nf(s.done)+" / "+nf(s.planned)}));
  });
  host.appendChild(g);
}

function chartHot(rows){
  const m = new Map();
  rows.forEach(r => { const d = scopedPhases(r).filter(p=>p.status==="delayed").length;
    if (d) m.set(r.l1, (m.get(r.l1)||0)+d); });
  const top = [...m.entries()].sort((a,b)=>b[1]-a[1]).slice(0,8);
  hBars("#chHot", top.map(([k,v]) => ({key:k, label:k.length>26?k.slice(0,25)+"…":k, value:v, color:"var(--st-delay)",
    tipTitle:k, meta:t("delayedPhases")})), {
    valueName:t("delayedPhases"), rowH:24, valW:40,
    onClick:(r)=>{ S.l1.clear(); S.l1.add(r.key); render(); }
  });
}

function chartInit(rows){
  const m = new Map();
  rows.forEach(r => { const a = m.get(r.initiative) || {n:0, sum:0, del:0}; a.n++; a.sum += r.pct;
    if (r.status==="delayed") a.del++; m.set(r.initiative, a); });
  const list = [...m.entries()].sort((a,b)=> (b[1].sum/b[1].n) - (a[1].sum/a[1].n));
  hBars("#chInit", list.map(([k,a]) => ({
    key:k, label:k.length>30?k.slice(0,29)+"…":k, value:Math.round(a.sum/a.n*100), color:"var(--ph1)",
    tipTitle:k, meta:nf(a.n)+" "+t("processesN")+" · "+nf(a.del)+" "+t("st.delayed").toLowerCase()
  })), {max:100, fmt:v=>v+" %", rowH:24, valW:44, valueName:t("avgDone"),
        onClick:(r)=>{ S.initiative.has(r.key)?S.initiative.delete(r.key):S.initiative.add(r.key); render(); }});
}

function chartOwner(rows){
  const m = new Map();
  rows.forEach(r => (r.manager.length?r.manager:["–"]).forEach(p => {
    const a = m.get(p) || {n:0, del:0}; a.n++; if (r.status==="delayed") a.del++; m.set(p,a); }));
  const list = [...m.entries()].sort((a,b)=>b[1].n-a[1].n).slice(0,9);
  hBars("#chOwner", list.map(([k,a]) => ({
    key:k, label:k.replace(/\s*\(.*\)$/,"").slice(0,19), value:a.n, tipTitle:k,
    meta:Math.round(a.del/a.n*100)+" % "+t("st.delayed").toLowerCase(),
    segs:[{name:t("st.delayed"),value:a.del,color:"var(--st-delay)"},
          {name:t("processesN"),value:a.n-a.del,color:"var(--ph1)"}].filter(s=>s.value>0)
  })), {rowH:24, labW:142, valW:34,
        onClick:(r)=>{ S.manager.has(r.key)?S.manager.delete(r.key):S.manager.add(r.key); render(); }});
}

/* ================================================================== phase load over time */
function mondayOf(d){ const x = new Date(d); const wd = (x.getDay()+6)%7; return addDays(x,-wd); }
function chartLoad(rows){
  const host = $("#chLoad"); host.replaceChildren();
  const from = S.from || ALL_START, to = S.to || ALL_END;
  let start = mondayOf(D(from)), end = D(to);
  if (end < start) end = addDays(start, 7);
  const weeks = [];
  for (let d = start; d <= end && weeks.length < 220; d = addDays(d,7)) weeks.push(new Date(d));
  const series = PHASES.map((ph,i) => weeks.map(w => {
    const wi = isoOf(w), we = isoOf(addDays(w,6));
    let c = 0;
    rows.forEach(r => { if (S.phase.size && !S.phase.has(ph)) return;
      const p = r.phases[i]; if (p.start && p.end && p.start <= we && p.end >= wi) c++; });
    return c;
  }));
  const stackMax = Math.max(1, ...weeks.map((_,w) => series.reduce((a,s)=>a+s[w],0)));
  const W = hostW("#chLoad", 700), H = 232, m = {l:34,r:10,t:10,b:26};
  const pw = W-m.l-m.r, ph = H-m.t-m.b;
  const x = i => m.l + (weeks.length<2?pw/2:i/(weeks.length-1)*pw);
  const y = v => m.t + ph - v/stackMax*ph;
  const g = sv("svg",{class:"chart",width:W,height:H,viewBox:`0 0 ${W} ${H}`});

  const ticksY = 4;
  for (let i=0;i<=ticksY;i++){ const v = Math.round(stackMax*i/ticksY);
    g.appendChild(sv("line",{class:"gridline",x1:m.l,x2:W-m.r,y1:y(v),y2:y(v)}));
    g.appendChild(sv("text",{class:"tick",x:m.l-6,y:y(v)+3.5,"text-anchor":"end",text:String(v)})); }

  const cum = weeks.map(()=>0);
  const bands = [];
  series.forEach((s,i) => {
    const top = s.map((v,w)=>cum[w]+v);
    const pts = [];
    for (let w=0;w<weeks.length;w++) pts.push(`${x(w).toFixed(1)},${y(top[w]).toFixed(1)}`);
    for (let w=weeks.length-1;w>=0;w--) pts.push(`${x(w).toFixed(1)},${y(cum[w]).toFixed(1)}`);
    if (s.some(v=>v>0)) g.appendChild(sv("polygon",{class:"mark",points:pts.join(" "),fill:PH_COLOR[i],"fill-opacity":".82"}));
    bands.push(top.slice());
    for (let w=0;w<weeks.length;w++) cum[w] = top[w];
  });
  bands.forEach((top,i) => { if (!series[i].some(v=>v>0)) return;
    g.appendChild(sv("polyline",{points:top.map((v,w)=>`${x(w).toFixed(1)},${y(v).toFixed(1)}`).join(" "),
      fill:"none",stroke:"var(--surface)","stroke-width":2,"stroke-linejoin":"round"}));
    g.appendChild(sv("polyline",{points:top.map((v,w)=>`${x(w).toFixed(1)},${y(v).toFixed(1)}`).join(" "),
      fill:"none",stroke:PH_COLOR[i],"stroke-width":1.4,"stroke-linejoin":"round"}));
  });

  let lastM = -1;
  weeks.forEach((w,i) => { if (w.getMonth() !== lastM && w.getDate() <= 7){ lastM = w.getMonth();
    if (w.getMonth()%3 === 0){
      g.appendChild(sv("line",{class:"gridline",x1:x(i),x2:x(i),y1:m.t,y2:m.t+ph}));
      g.appendChild(sv("text",{class:"tick",x:x(i),y:H-8,"text-anchor":"middle",
        text:(LANG==="de"?"Q":"Q")+(Math.floor(w.getMonth()/3)+1)+" "+String(w.getFullYear()).slice(2)}));
    }}});
  g.appendChild(sv("line",{class:"axisline",x1:m.l,x2:W-m.r,y1:m.t+ph,y2:m.t+ph}));

  const aoi = weeks.findIndex(w => isoOf(w) >= S.asOf);
  if (aoi >= 0){
    g.appendChild(sv("line",{x1:x(aoi),x2:x(aoi),y1:m.t-2,y2:m.t+ph,stroke:"var(--today)","stroke-width":2}));
    g.appendChild(sv("text",{x:x(aoi)+4,y:m.t+8,style:"font-size:10px;font-weight:600;fill:var(--today)",text:t("today")}));
  }
  const hair = sv("line",{x1:0,x2:0,y1:m.t,y2:m.t+ph,stroke:"var(--axis)","stroke-width":1,opacity:0});
  g.appendChild(hair);
  const over = sv("rect",{x:m.l,y:m.t,width:pw,height:ph,fill:"transparent",style:"cursor:crosshair"});
  over.addEventListener("pointermove", e => {
    const bb = g.getBoundingClientRect();
    const rel = (e.clientX - bb.left - m.l)/pw*(weeks.length-1);
    const i = Math.max(0, Math.min(weeks.length-1, Math.round(rel)));
    hair.setAttribute("x1",x(i)); hair.setAttribute("x2",x(i)); hair.setAttribute("opacity",1);
    tipShow(e, tipBody(t("weekOf")+" "+fmtD(isoOf(weeks[i])),
      PHASES.map((p,k)=>({name:PH_SHORT[p]||p, value:nf(series[k][i]), color:PH_COLOR[k]}))
        .concat([{name:"Σ "+t("running"), value:nf(series.reduce((a,s)=>a+s[i],0)), color:"var(--muted)"}]) ));
  });
  over.addEventListener("pointerleave", () => { hair.setAttribute("opacity",0); tipHide(); });
  g.appendChild(over);
  host.appendChild(g);
  $("#loadHint").textContent = fmtD(isoOf(weeks[0])) + " – " + fmtD(isoOf(weeks[weeks.length-1]));
  $("#lgPhase").replaceChildren(...PHASES.map((p,i) =>
    el("span",{},[el("i",{style:"background:"+PH_COLOR[i]}), el("span",{text:PH_SHORT[p]||p})])));
}

/* ================================================================== gantt */
function ganttDomain(rows){
  let s = S.from || null, e = S.to || null;
  if (!s || !e){
    const st = rows.map(r=>r.spanStart).filter(Boolean).sort();
    const en = rows.map(r=>r.spanEnd).filter(Boolean).sort();
    s = s || st[0] || ALL_START; e = e || en[en.length-1] || ALL_END;
  }
  if (S.asOf < s) s = S.asOf; if (S.asOf > e) e = S.asOf;
  return [addDays(D(s),-14), addDays(D(e),14)];
}
function renderGantt(rows){
  const matched = new Set(rows.map(r=>r.id));
  const vis = new Set();
  rows.forEach(r => { vis.add(r.id); r.ancestors.forEach(a=>vis.add(a)); });
  const filtered = rows.length !== NODES.length;
  const exp = new Set(S.expanded);
  if (filtered) rows.forEach(r => r.ancestors.forEach(a => exp.add(a)));

  const order = [];
  const walk = (n, depth) => {
    if (!vis.has(n.id)) return;
    const kids = n.children.map(i=>BY_ID.get(i)).filter(k=>vis.has(k.id));
    order.push({n, depth, kids:kids.length, open:exp.has(n.id), on:matched.has(n.id)});
    if (kids.length && exp.has(n.id)) kids.forEach(k => walk(k, depth+1));
  };
  NODES.filter(n => n.parent === null || n.parent === undefined).forEach(r => walk(r,0));

  const [d0,d1] = ganttDomain(rows);
  const days = Math.max(30, Math.round((d1-d0)/DAY));
  const avail = Math.max(320, ($("#gBarsScroll").clientWidth || 900) - 4);
  const ppd = S.gScale === "m" ? Math.max(2.6, avail/days) : Math.max(0.55, Math.min(4, avail/days));
  const paneW = Math.round(days*ppd) + 64;
  const xOf = iso => (D(iso) - d0)/DAY*ppd;

  /* axis */
  const axis = $("#gAxis"); axis.replaceChildren(); axis.style.width = paneW+"px"; axis.style.height = "46px";
  axis.className = "g-pane" + (S.gScale === "q" ? " g-axis-q" : "");
  const cur = new Date(d0.getFullYear(), d0.getMonth(), 1);
  while (cur <= d1){
    const left = (cur - d0)/DAY*ppd;
    const isQ = cur.getMonth()%3 === 0;
    if (left >= -1){
      if (S.gScale === "m" || isQ){
        axis.appendChild(el("div",{class:"g-tick",style:`left:${left}px`}));
        if (S.gScale === "m") axis.appendChild(el("div",{class:"g-ticklab",style:`left:${left}px`,text:fmtMon(cur)}));
      }
      if (isQ) axis.appendChild(el("div",{class:"g-qlab",style:`left:${left}px`,
        text:"Q"+(Math.floor(cur.getMonth()/3)+1)+" "+cur.getFullYear()}));
    }
    cur.setMonth(cur.getMonth()+1);
  }
  const ax = xOf(S.asOf);
  axis.appendChild(el("div",{class:"g-todaylab",style:`left:${ax}px`,text:fmtD(S.asOf)}));

  /* rows */
  const labs = $("#gLabels"), bars = $("#gBars");
  labs.replaceChildren(); bars.replaceChildren();
  bars.style.width = paneW+"px"; bars.style.height = (order.length*30)+"px";
  const cur2 = new Date(d0.getFullYear(), d0.getMonth(), 1);
  while (cur2 <= d1){
    const left = (cur2 - d0)/DAY*ppd;
    if (left >= 0 && (S.gScale === "m" || cur2.getMonth()%3 === 0))
      bars.appendChild(el("div",{class:"g-tick",style:`left:${left}px`}));
    cur2.setMonth(cur2.getMonth()+1);
  }

  order.forEach((o,ri) => {
    const n = o.n;
    const tw = o.kids
      ? el("button",{type:"button",class:"tw",text:o.open?"−":"+","aria-label":n.name,
          onclick:()=>{ if (S.expanded.has(n.id)) S.expanded.delete(n.id); else S.expanded.add(n.id);
                        if (filtered) { /* keep auto-expansion in sync */ }
                        render(); }})
      : el("span",{class:"tw blank"});
    const row = el("div",{class:"g-row"+(ri%2?" alt":"")+(o.on?"":" ctx")+(n.level===1?" lvl1":""),
      style:`padding-left:${12+o.depth*13}px`},[
      tw,
      el("span",{class:"gtag "+n.group,text:n.group}),
      el("span",{class:"nm",text:n.name,title:n.path}),
      el("span",{class:"lv",text:"L"+n.level}),
      el("span",{class:"pc tnum",text:Math.round(n.pct*100)+"%"})
    ]);
    labs.appendChild(row);

    const track = el("div",{class:"g-track"+(ri%2?" alt":"")});
    if (o.kids && !o.open && n.spanStart && n.spanEnd){
      const x0 = xOf(n.spanStart), w = Math.max(3, xOf(n.spanEnd)-x0);
      track.appendChild(el("div",{class:"bar roll",style:`left:${x0}px;width:${w}px`,title:t("rollup")}));
    }
    n.phases.forEach((p,i) => {
      if (S.phase.size && !S.phase.has(p.phase)) return;
      if (!p.start || !p.end) return;
      const x0 = xOf(p.start), w = Math.max(4, xOf(p.end)-x0);
      const b = el("div",{class:"bar"+(p.status==="delayed"?" delayed":""),
        style:`left:${x0}px;width:${w}px;background:${PH_COLOR[i]};opacity:${o.on?1:.4}`});
      b.addEventListener("pointerenter", e => tipShow(e, tipBody(n.name+" · "+(PH_SHORT[p.phase]||p.phase), [
        {name:t("tbl.start"), value:fmtD(p.start), color:PH_COLOR[i], sq:true},
        {name:t("tbl.end"), value:fmtD(p.end), color:PH_COLOR[i], sq:true},
        {name:t("tbl.dur"), value:p.duration!=null?nf(p.duration):"–", color:"var(--muted)", sq:true},
        {name:t("tbl.status"), value:ST_ICON[p.status]+" "+t("st."+p.status), color:ST_COLOR[p.status], sq:true}
      ], [p.planned?t("tbl.planned")+": "+p.planned:null, p.actual?t("tbl.actual")+": "+p.actual:null]
         .filter(Boolean).join("  ·  ") || n.path)));
      b.addEventListener("pointerleave", tipHide);
      track.appendChild(b);
    });
    bars.appendChild(track);
  });
  bars.appendChild(el("div",{class:"g-today",style:`left:${ax}px`}));

  $("#ganttNote").textContent = nf(order.length)+" "+t("gShown");
  $("#gFoot").replaceChildren(
    ...PHASES.map((p,i)=>el("span",{},[el("i",{style:"background:"+PH_COLOR[i]}),document.createTextNode(" "+(PH_SHORT[p]||p))])),
    el("span",{},[el("i",{style:"background:var(--st-sched);opacity:.45;height:5px"}),document.createTextNode(" "+t("rollup"))]),
    el("span",{},[el("i",{style:"background:var(--ph1);box-shadow:0 2px 0 1.5px var(--st-delay)"}),document.createTextNode(" "+t("delayedMark"))]),
    el("span",{},[el("i",{style:"background:var(--today);width:3px"}),document.createTextNode(" "+t("today")+" "+fmtD(S.asOf))])
  );
}

/* ================================================================== table */
const COLS_PROC = () => [
  {k:"path", h:t("tbl.process"), cls:"nm", v:n=>n.name, cell:n=>el("td",{class:"nm"},[
      el("span",{text:n.name}), el("span",{class:"p",text:n.path})]) },
  {k:"group", h:t("tbl.group"), v:n=>n.group, cell:n=>el("td",{},[el("span",{class:"gtag "+n.group,text:n.group})])},
  {k:"level", h:t("tbl.level"), v:n=>n.level, cell:n=>el("td",{class:"num",text:"L"+n.level})},
  {k:"initiative", h:t("tbl.initiative"), v:n=>n.initiative, cell:n=>el("td",{text:n.initiative})},
  {k:"status", h:t("tbl.status"), v:n=>STATUSES.indexOf(n.status), cell:n=>el("td",{},[pill(n.status)])},
  {k:"pct", h:t("tbl.pct"), v:n=>n.pct, cell:n=>el("td",{class:"num"},[el("span",{class:"mini"},[
      el("span",{class:"track"},[el("i",{style:"width:"+Math.round(n.pct*100)+"%"})]),
      el("span",{text:Math.round(n.pct*100)+"%"})])])},
  {k:"start", h:t("tbl.start"), v:n=>n.spanStart||"", cell:n=>el("td",{class:"num",text:fmtD(n.spanStart)})},
  {k:"end", h:t("tbl.end"), v:n=>n.spanEnd||"", cell:n=>el("td",{class:"num"},[
      el("span",{text:fmtD(n.spanEnd), style:isOverdue(n)?"color:var(--st-delay);font-weight:600":""})])},
  {k:"dur", h:t("tbl.dur"), v:n=>n.duration||0, cell:n=>el("td",{class:"num",text:n.duration!=null?nf(n.duration):"–"})},
  {k:"elab", h:t("tbl.elab"), v:n=>STATUSES.indexOf(n.elabStatus), cell:n=>el("td",{},[pill(n.elabStatus)])},
  {k:"lead", h:t("tbl.lead"), v:n=>n.lead.join(", "), cell:n=>el("td",{text:n.lead.join(", ")||"–"})},
  {k:"manager", h:t("tbl.manager"), v:n=>n.manager.join(", "), cell:n=>el("td",{text:n.manager.join(", ")||"–"})},
  {k:"consultant", h:t("tbl.consultant"), v:n=>n.consultant.join(", "), cell:n=>el("td",{text:n.consultant.join(", ")||"–"})},
  {k:"approval", h:t("tbl.approval"), v:n=>n.approval||"", cell:n=>el("td",{class:"num",text:n.approval?fmtD(n.approval):"–"})},
  {k:"comment", h:t("tbl.comment"), v:n=>n.comment||"", cell:n=>el("td",{text:n.comment||"–"})}
];
const COLS_PHASE = () => [
  {k:"path", h:t("tbl.process"), v:r=>r.n.name, cell:r=>el("td",{class:"nm"},[
      el("span",{text:r.n.name}), el("span",{class:"p",text:r.n.path})])},
  {k:"group", h:t("tbl.group"), v:r=>r.n.group, cell:r=>el("td",{},[el("span",{class:"gtag "+r.n.group,text:r.n.group})])},
  {k:"phase", h:t("tbl.phase"), v:r=>r.i, cell:r=>el("td",{},[el("span",{class:"pill none",style:"background:transparent;color:"+PH_COLOR[r.i]},[
      el("span",{class:"ic",text:"■"}), el("span",{text:PH_SHORT[r.p.phase]||r.p.phase})])])},
  {k:"status", h:t("tbl.status"), v:r=>STATUSES.indexOf(r.p.status), cell:r=>el("td",{},[pill(r.p.status)])},
  {k:"planned", h:t("tbl.planned"), v:r=>r.p.planned||"", cell:r=>el("td",{text:r.p.planned||"–"})},
  {k:"actual", h:t("tbl.actual"), v:r=>r.p.actual||"", cell:r=>el("td",{text:r.p.actual||"–"})},
  {k:"start", h:t("tbl.start"), v:r=>r.p.start||"", cell:r=>el("td",{class:"num",text:fmtD(r.p.start)})},
  {k:"end", h:t("tbl.end"), v:r=>r.p.end||"", cell:r=>el("td",{class:"num",text:fmtD(r.p.end)})},
  {k:"dur", h:t("tbl.dur"), v:r=>r.p.duration||0, cell:r=>el("td",{class:"num",text:r.p.duration!=null?nf(r.p.duration):"–"})},
  {k:"pct", h:t("tbl.pct"), v:r=>r.p.pct, cell:r=>el("td",{class:"num",text:Math.round(r.p.pct*100)+"%"})},
  {k:"initiative", h:t("tbl.initiative"), v:r=>r.n.initiative, cell:r=>el("td",{text:r.n.initiative})},
  {k:"lead", h:t("tbl.lead"), v:r=>r.p.lead.join(", "), cell:r=>el("td",{text:r.p.lead.join(", ")||"–"})},
  {k:"manager", h:t("tbl.manager"), v:r=>r.p.manager.join(", "), cell:r=>el("td",{text:r.p.manager.join(", ")||"–"})},
  {k:"consultant", h:t("tbl.consultant"), v:r=>r.p.consultant.join(", "), cell:r=>el("td",{text:r.p.consultant.join(", ")||"–"})}
];
const pill = s => el("span",{class:"pill "+s},[el("span",{class:"ic",text:ST_ICON[s]}), el("span",{text:t("st."+s)})]);

let TABLE_ROWS = [], TABLE_COLS = [];
function renderTable(rows){
  const phaseMode = S.rowMode === "phase";
  TABLE_COLS = phaseMode ? COLS_PHASE() : COLS_PROC();
  let data = phaseMode
    ? rows.flatMap(n => scopedPhases(n).map(p => ({n, p, i: PHASES.indexOf(p.phase)})))
    : rows.slice();
  const col = TABLE_COLS.find(c => c.k === S.sortKey) || TABLE_COLS[0];
  data.sort((a,b) => {
    const va = col.v(a), vb = col.v(b);
    if (typeof va === "number" && typeof vb === "number") return (va-vb)*S.sortDir;
    return String(va).localeCompare(String(vb), LANG) * S.sortDir;
  });
  TABLE_ROWS = data;
  $("#tblHead").replaceChildren(el("tr",{}, TABLE_COLS.map(c => {
    const th = el("th",{text:c.h, onclick:()=>{ if (S.sortKey===c.k) S.sortDir*=-1; else { S.sortKey=c.k; S.sortDir=1; } render(); }});
    if (S.sortKey === c.k) th.setAttribute("aria-sort", S.sortDir>0?"ascending":"descending");
    th.appendChild(el("span",{class:"ar",text:S.sortKey===c.k ? (S.sortDir>0?"▲":"▼") : "↕"}));
    return th;
  })));
  const body = $("#tblBody"); body.replaceChildren();
  if (!data.length){ body.appendChild(el("tr",{},[el("td",{colspan:TABLE_COLS.length,class:"empty-note",text:t("noData")})])); }
  data.slice(0,600).forEach(d => body.appendChild(el("tr",{}, TABLE_COLS.map(c => c.cell(d)))));
  $("#tblCount").textContent = nf(data.length)+" "+t("rows")+(data.length>600?" · 1–600":"");
  $("#tblNote").textContent = nf(rows.length)+" "+t("processesShown")+" "+t("ofTotal")+" "+nf(NODES.length);
}
function exportCSV(){
  const rows = TABLE_ROWS, cols = TABLE_COLS;
  const esc = v => { const s = String(v ?? "").replace(/"/g,'""'); return /[";\n]/.test(s) ? '"'+s+'"' : s; };
  const lines = ["sep=;", cols.map(c=>esc(c.h)).join(";")];
  rows.forEach(d => lines.push(cols.map(c => {
    const raw = c.v(d);
    if (c.k === "path") return esc((d.n||d).path);
    if (c.k === "pct") return esc(Math.round((typeof raw === "number" ? raw : 0)*100)+"%");
    if (["start","end","approval"].includes(c.k)) return esc(raw || "");
    if (c.k === "phase") return esc((d.p||{}).phase || "");
    if (c.k === "status") return esc(t("st."+((d.p||d).status)));
    if (c.k === "elab") return esc(t("st."+d.elabStatus));
    return esc(raw);
  }).join(";")));
  const blob = new Blob(["﻿"+lines.join("\r\n")], {type:"text/csv;charset=utf-8"});
  const a = el("a",{href:URL.createObjectURL(blob), download:"process_portfolio_"+S.asOf+".csv"});
  document.body.appendChild(a); a.click(); a.remove();
}

/* ================================================================== render */
let raf = 0;
function render(){
  cancelAnimationFrame(raf);
  raf = requestAnimationFrame(() => {
    const rows = filterNodes();
    FACETS.forEach(f => paintMS(f.key));
    renderChips();
    renderKPIs(rows);
    chartStatus(rows); chartGroup(rows); chartFunnel(rows);
    chartLoad(rows); chartHot(rows); chartInit(rows); chartOwner(rows);
    renderGantt(rows);
    renderTable(rows);
    document.querySelectorAll(".card").forEach(c => {
      const h = c.querySelector("h2"), s = c.querySelector("svg");
      if (h && s){ s.setAttribute("role","img"); s.setAttribute("aria-label", h.textContent); }
    });
    $("#scopeNote").textContent = nf(rows.length)+" "+t("ofTotal")+" "+nf(NODES.length)+" "+t("processes");
  });
}

/* ================================================================== i18n / theme */
function applyLang(){
  document.documentElement.lang = LANG;
  document.querySelectorAll("[data-i18n]").forEach(n => n.textContent = t(n.dataset.i18n));
  document.querySelectorAll("[data-i18n-ph]").forEach(n => n.placeholder = t(n.dataset.i18nPh));
  $("#langDe").setAttribute("aria-pressed", LANG==="de"); $("#langEn").setAttribute("aria-pressed", LANG==="en");
  FACETS.forEach(buildMS);
  $("#snapLabel").textContent = MODEL.snapshot;
  $("#nodeTotal").textContent = nf(NODES.length);
  $("#srcFile").textContent = MODEL.source; $("#srcSheet").textContent = MODEL.sheet;
  $("#genLabel").textContent = "Build " + MODEL.generated;
  render();
}
let themeMode = "system";
function applyTheme(){
  const r = document.documentElement;
  if (themeMode === "system") r.removeAttribute("data-theme"); else r.setAttribute("data-theme", themeMode);
  $("#themeIc").textContent = themeMode === "dark" ? "●" : themeMode === "light" ? "○" : "◐";
  $("#themeBtn").setAttribute("aria-pressed", themeMode !== "system");
}

/* ================================================================== wiring */
function on(sel, ev, fn){ const n = $(sel); if (n) n.addEventListener(ev, fn); }
function setPreset(p){
  const now = D(S.asOf);
  if (p === "all"){ S.from=""; S.to=""; }
  if (p === "q"){ const q = Math.floor(now.getMonth()/3);
    S.from = isoOf(new Date(now.getFullYear(), q*3, 1)); S.to = isoOf(new Date(now.getFullYear(), q*3+3, 0)); }
  if (p === "90"){ S.from = S.asOf; S.to = isoOf(addDays(now,90)); }
  if (p === "year"){ S.from = isoOf(new Date(now.getFullYear(),0,1)); S.to = isoOf(new Date(now.getFullYear(),11,31)); }
  $("#dFrom").value = S.from; $("#dTo").value = S.to;
  document.querySelectorAll("[data-preset]").forEach(b => b.setAttribute("aria-pressed", b.dataset.preset === p));
  render();
}
function init(){
  /* Vom Management Board eingebettet: ?theme=dark&lang=en übernimmt dessen Ansicht. */
  const qs = new URLSearchParams(location.search);
  if (["dark","light","system"].includes(qs.get("theme"))) themeMode = qs.get("theme");
  if (["de","en"].includes(qs.get("lang"))) LANG = qs.get("lang");
  $("#asOf").value = S.asOf;
  applyTheme();
  on("#q","input", e => { S.q = e.target.value; render(); });
  on("#dFrom","change", e => { S.from = e.target.value; render(); });
  on("#dTo","change", e => { S.to = e.target.value; render(); });
  on("#asOf","change", e => { S.asOf = e.target.value || isoOf(new Date()); render(); });
  const pv = () => { if (S.pMin > S.pMax) [S.pMin,S.pMax] = [S.pMax,S.pMin];
    $("#pVal").textContent = S.pMin+" – "+S.pMax+" %"; };
  on("#pMin","input", e => { S.pMin = +e.target.value; pv(); render(); });
  on("#pMax","input", e => { S.pMax = +e.target.value; pv(); render(); });
  document.querySelectorAll("[data-preset]").forEach(b => b.addEventListener("click", () => setPreset(b.dataset.preset)));
  const tg = (sel,key) => on(sel,"click", e => { const b = e.currentTarget; S[key] = !S[key];
    b.setAttribute("aria-pressed", S[key]); render(); });
  tg("#tDelayed","onlyDelayed"); tg("#tOverdue","onlyOverdue"); tg("#tDated","onlyDated");
  on("#tUndated","click", e => { S.inclUndated = !S.inclUndated;
    e.currentTarget.setAttribute("aria-pressed", S.inclUndated); render(); });
  on("#resetBtn","click", () => {
    S.q = ""; $("#q").value = "";
    FACETS.forEach(f => S[f.key].clear());
    S.from = ""; S.to = ""; $("#dFrom").value = ""; $("#dTo").value = "";
    S.pMin = 0; S.pMax = 100; $("#pMin").value = 0; $("#pMax").value = 100; pv();
    S.onlyDelayed = S.onlyOverdue = S.onlyDated = false; S.inclUndated = true;
    ["#tDelayed","#tOverdue","#tDated"].forEach(s => $(s).setAttribute("aria-pressed","false"));
    $("#tUndated").setAttribute("aria-pressed","true");
    document.querySelectorAll("[data-preset]").forEach(b => b.setAttribute("aria-pressed","false"));
    render();
  });
  on("#gExpand","click", () => { NODES.forEach(n => { if (n.children.length) S.expanded.add(n.id); }); render(); });
  on("#gCollapse","click", () => { S.expanded.clear(); render(); });
  on("#gScaleM","click", () => { S.gScale = "m"; $("#gScaleM").setAttribute("aria-pressed","true");
    $("#gScaleQ").setAttribute("aria-pressed","false"); render(); });
  on("#gScaleQ","click", () => { S.gScale = "q"; $("#gScaleQ").setAttribute("aria-pressed","true");
    $("#gScaleM").setAttribute("aria-pressed","false"); render(); });
  on("#rowProc","click", () => { S.rowMode = "proc"; S.sortKey = "path"; $("#rowProc").setAttribute("aria-pressed","true");
    $("#rowPhase").setAttribute("aria-pressed","false"); render(); });
  on("#rowPhase","click", () => { S.rowMode = "phase"; S.sortKey = "path"; $("#rowPhase").setAttribute("aria-pressed","true");
    $("#rowProc").setAttribute("aria-pressed","false"); render(); });
  on("#csvBtn","click", exportCSV); on("#csvBtn2","click", exportCSV);
  on("#printBtn","click", () => window.print());
  on("#langDe","click", () => { LANG = "de"; applyLang(); });
  on("#langEn","click", () => { LANG = "en"; applyLang(); });
  on("#themeBtn","click", () => { themeMode = themeMode === "system" ? "dark" : themeMode === "dark" ? "light" : "system";
    applyTheme(); render(); });

  const a = $("#gAxisScroll"), b = $("#gBarsScroll");
  let lock = false;
  const sync = (src,dst) => src.addEventListener("scroll", () => { if (lock) return; lock = true; dst.scrollLeft = src.scrollLeft; lock = false; }, {passive:true});
  sync(a,b); sync(b,a);
  const top = document.querySelector(".top");
  const setTopH = () => document.documentElement.style.setProperty("--topH", top.offsetHeight+"px");
  setTopH();
  let rt; addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(() => { setTopH(); render(); }, 180); });
  applyLang();
}
init();
