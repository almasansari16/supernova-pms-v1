import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  LayoutDashboard, RefreshCw, ClipboardList, Barcode, Package, Boxes, ScanLine,
  Printer, FileBarChart, ScrollText, Settings as SettingsIcon, Users as UsersIcon,
  Bell, Search, ChevronDown, ChevronRight, ChevronLeft, LogOut, Check, X, Plus,
  Download, FileSpreadsheet, FileText, Filter, Play, CircleCheck, TriangleAlert,
  Factory, Clock, User, Cpu, Layers, Link2, ShieldCheck, Activity, Trash2,
  ArrowRight, Zap, Database, Wifi, WifiOff, Eye, MoveRight, Info, PanelLeftClose,
  PanelLeftOpen, CircleDot, Lock, Mail, Sparkles, Gauge, TrendingUp, Pencil
} from "lucide-react";
import {
  ResponsiveContainer, AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip as RTooltip, RadialBarChart, RadialBar,
  PieChart, Pie, Cell, Legend
} from "recharts";

/* ==========================================================================
   SuperNova · Product Serialization Management System
   Pharmaceutical Manufacturing · SAP S/4HANA integrated (mock)
   Designed & Developed by ERManager Consulting Services
   ========================================================================== */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap');

.sn *, .sn *::before, .sn *::after { box-sizing: border-box; }
.sn {
  --ink:#140A38; --ink-2:#251463; --nova:#3A22A8; --nova-2:#5236D6; --nova-soft:#EFEBFC;
  --teal:#12A5B8; --teal-soft:#E4F7F9; --brand:#1E0D63;
  --spark:#F5A623; --spark-soft:#FEF4E2; --mint:#0E9F6E; --mint-soft:#E6F7F0;
  --rose:#E02D3C; --rose-soft:#FDECEE; --violet:#6D3BEF; --violet-soft:#F0EAFE;
  --slate:#5A6B85; --slate-2:#8494AC; --mist:#F4F6FB; --line:#E4E9F2; --line-2:#EFF2F8;
  --white:#fff;
  --r-s:8px; --r-m:12px; --r-l:16px; --r-xl:22px;
  --sh-1:0 1px 2px rgba(10,23,48,.05), 0 1px 3px rgba(10,23,48,.04);
  --sh-2:0 2px 6px rgba(10,23,48,.06), 0 10px 24px -12px rgba(10,23,48,.14);
  --sh-3:0 24px 60px -20px rgba(10,23,48,.28);
  font-family:'Inter',system-ui,-apple-system,'Segoe UI',sans-serif;
  color:var(--ink); background:var(--mist); font-size:14px; line-height:1.5;
  -webkit-font-smoothing:antialiased;
}
.sn h1,.sn h2,.sn h3,.sn h4 { font-family:'Sora',Inter,sans-serif; margin:0; letter-spacing:-.02em; font-weight:600; }
.sn button { font-family:inherit; cursor:pointer; }
.sn .mono { font-family:'JetBrains Mono',ui-monospace,monospace; font-variant-numeric:tabular-nums; }
.sn ::-webkit-scrollbar { width:9px; height:9px; }
.sn ::-webkit-scrollbar-thumb { background:#C9D3E3; border-radius:8px; }
.sn ::-webkit-scrollbar-track { background:transparent; }
.sn :focus-visible { outline:2px solid var(--nova); outline-offset:2px; border-radius:4px; }

/* ---------- shell ---------- */
.shell { display:flex; min-height:640px; height:100%; }
.side {
  width:250px; flex:0 0 250px; background:linear-gradient(178deg,#140A38 0%,#22105C 58%,#160B3C 100%);
  color:#C9D6EC; display:flex; flex-direction:column; position:relative; overflow:hidden;
  transition:flex-basis .26s cubic-bezier(.4,0,.2,1), width .26s cubic-bezier(.4,0,.2,1);
}
.side.collapsed { width:74px; flex:0 0 74px; }
.side::before {
  content:''; position:absolute; top:-90px; left:-60px; width:280px; height:280px;
  background:radial-gradient(circle,rgba(82,54,214,.46),transparent 66%); pointer-events:none;
}
.side::after {
  content:''; position:absolute; bottom:-40px; right:-70px; width:220px; height:220px;
  background:radial-gradient(circle,rgba(18,165,184,.22),transparent 68%); pointer-events:none;
}
.brandbox { padding:20px 18px 16px; display:flex; align-items:center; gap:11px; position:relative; z-index:1; }
.navwrap { flex:1; overflow-y:auto; padding:6px 10px 14px; position:relative; z-index:1; }
.navlabel { font-size:10px; letter-spacing:.13em; text-transform:uppercase; color:#5D7099; padding:14px 12px 7px; font-weight:600; }
.navitem {
  display:flex; align-items:center; gap:11px; width:100%; border:0; background:transparent;
  color:#AFC0DC; padding:9px 12px; border-radius:10px; font-size:13.5px; font-weight:500;
  text-align:left; transition:background .16s,color .16s; position:relative; white-space:nowrap;
}
.navitem:hover { background:rgba(255,255,255,.06); color:#fff; }
.navitem.on { background:linear-gradient(90deg,rgba(82,54,214,.40),rgba(82,54,214,.10)); color:#fff; }
.navitem.on::before { content:''; position:absolute; left:0; top:8px; bottom:8px; width:3px; background:var(--teal); border-radius:0 3px 3px 0; }
.navitem .cnt { margin-left:auto; font-size:10.5px; background:rgba(255,255,255,.12); padding:2px 7px; border-radius:20px; font-weight:600; }
.sidefoot { padding:12px 14px 16px; border-top:1px solid rgba(255,255,255,.08); position:relative; z-index:1; }

.main { flex:1; min-width:0; display:flex; flex-direction:column; }
.topbar {
  height:62px; flex:0 0 62px; background:rgba(255,255,255,.82); backdrop-filter:blur(14px) saturate(180%);
  border-bottom:1px solid var(--line); display:flex; align-items:center; gap:12px; padding:0 20px;
  position:sticky; top:0; z-index:40;
}
.searchbox {
  display:flex; align-items:center; gap:9px; background:var(--mist); border:1px solid var(--line);
  border-radius:10px; padding:8px 12px; width:300px; max-width:34vw; transition:border-color .16s, box-shadow .16s;
}
.searchbox:focus-within { border-color:var(--nova-2); box-shadow:0 0 0 3px rgba(58,34,168,.12); background:#fff; }
.searchbox input { border:0; outline:0; background:transparent; font-family:inherit; font-size:13px; width:100%; color:var(--ink); }
.iconbtn {
  width:36px; height:36px; border-radius:10px; border:1px solid var(--line); background:#fff;
  display:grid; place-items:center; color:var(--slate); position:relative; transition:all .16s;
}
.iconbtn:hover { color:var(--nova); border-color:#CEC4F1; background:var(--nova-soft); }
.dot { position:absolute; top:6px; right:6px; width:8px; height:8px; border-radius:50%; background:var(--rose); border:2px solid #fff; }
.content { flex:1; overflow-y:auto; padding:22px 24px 8px; }
.appfoot {
  padding:14px 24px 18px; border-top:1px solid var(--line-2); display:flex; flex-wrap:wrap; gap:10px;
  align-items:center; justify-content:space-between; color:var(--slate-2); font-size:11.5px;
}

/* ---------- primitives ---------- */
.crumbs { display:flex; align-items:center; gap:7px; color:var(--slate-2); font-size:11.5px; font-weight:500; margin-bottom:7px; }
.pghead { display:flex; flex-wrap:wrap; align-items:flex-end; justify-content:space-between; gap:14px; margin-bottom:20px; }
.pghead h1 { font-size:23px; }
.pgsub { color:var(--slate); font-size:13px; margin-top:5px; max-width:70ch; }

.card { background:#fff; border:1px solid var(--line); border-radius:var(--r-l); box-shadow:var(--sh-1); }
.card.pad { padding:18px; }
.cardhead { padding:15px 18px; border-bottom:1px solid var(--line-2); display:flex; align-items:center; justify-content:space-between; gap:12px; }
.cardhead h3 { font-size:14.5px; }
.cardhead .sub { font-size:11.5px; color:var(--slate-2); margin-top:2px; font-weight:400; font-family:Inter; }

.grid { display:grid; gap:14px; }
.g-kpi { grid-template-columns:repeat(auto-fit,minmax(196px,1fr)); }
.g-2 { grid-template-columns:repeat(auto-fit,minmax(320px,1fr)); }
.g-3 { grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); }

.kpi { background:#fff; border:1px solid var(--line); border-radius:var(--r-l); padding:16px; box-shadow:var(--sh-1); position:relative; overflow:hidden; transition:transform .18s, box-shadow .18s; }
.kpi:hover { transform:translateY(-2px); box-shadow:var(--sh-2); }
.kpi .ic { width:34px; height:34px; border-radius:10px; display:grid; place-items:center; margin-bottom:12px; }
.kpi .lbl { font-size:11px; text-transform:uppercase; letter-spacing:.08em; color:var(--slate-2); font-weight:600; }
.kpi .val { font-family:'Sora'; font-size:26px; font-weight:600; letter-spacing:-.03em; margin-top:3px; }
.kpi .delta { font-size:11.5px; margin-top:7px; display:flex; align-items:center; gap:5px; color:var(--slate); }
.kpi .spark { position:absolute; right:-10px; bottom:-6px; opacity:.10; }

.btn {
  display:inline-flex; align-items:center; gap:7px; border-radius:10px; padding:9px 14px; font-size:13px;
  font-weight:600; border:1px solid transparent; transition:all .16s; white-space:nowrap;
}
.btn:active { transform:translateY(1px); }
.btn-p { background:linear-gradient(180deg,var(--nova-2),var(--nova)); color:#fff; box-shadow:0 1px 2px rgba(58,34,168,.35), 0 6px 16px -8px rgba(58,34,168,.6); }
.btn-p:hover { filter:brightness(1.06); }
.btn-g { background:#fff; border-color:var(--line); color:var(--ink-2); box-shadow:var(--sh-1); }
.btn-g:hover { border-color:#CEC4F1; background:var(--nova-soft); color:var(--nova); }
.btn-d { background:#fff; border-color:#F6CFD3; color:var(--rose); }
.btn-d:hover { background:var(--rose-soft); }
.btn-s { background:var(--ink); color:#fff; }
.btn-s:hover { background:var(--ink-2); }
.btn:disabled { opacity:.45; cursor:not-allowed; }
.btn-sm { padding:6px 10px; font-size:12px; border-radius:8px; }

.chip { display:inline-flex; align-items:center; gap:5px; font-size:11px; font-weight:600; padding:3.5px 9px; border-radius:20px; letter-spacing:.01em; }
.c-ok { background:var(--mint-soft); color:#08744F; }
.c-warn { background:var(--spark-soft); color:#96620A; }
.c-err { background:var(--rose-soft); color:#B01B28; }
.c-info { background:var(--nova-soft); color:#33208F; }
.c-vio { background:var(--violet-soft); color:#4B21B8; }
.c-mut { background:var(--line-2); color:var(--slate); }

.tblwrap { overflow-x:auto; }
table.tbl { width:100%; border-collapse:collapse; font-size:13px; }
.tbl thead th {
  text-align:left; font-size:10.5px; letter-spacing:.08em; text-transform:uppercase; color:var(--slate-2);
  font-weight:600; padding:11px 14px; background:var(--mist); border-bottom:1px solid var(--line);
  white-space:nowrap; position:sticky; top:0;
}
.tbl tbody td { padding:11px 14px; border-bottom:1px solid var(--line-2); white-space:nowrap; }
.tbl tbody tr:hover { background:#FAFBFE; }
.tbl tbody tr:last-child td { border-bottom:0; }
.tbl .num { font-family:'JetBrains Mono'; font-variant-numeric:tabular-nums; font-size:12.5px; }

.field { display:block; }
.field .lb { display:block; font-size:11.5px; font-weight:600; color:var(--slate); margin-bottom:6px; }
.field .lb .req { color:var(--rose); }
.inp {
  width:100%; border:1px solid var(--line); border-radius:10px; padding:9px 11px; font-family:inherit;
  font-size:13px; color:var(--ink); background:#fff; outline:0; transition:border-color .16s, box-shadow .16s;
}
.inp:focus { border-color:var(--nova-2); box-shadow:0 0 0 3px rgba(58,34,168,.12); }
.inp:disabled, .inp.ro { background:#F8FAFD; color:var(--ink-2); }
.hint { font-size:11px; color:var(--slate-2); margin-top:5px; }

.sapfield { border:1px solid var(--line); border-radius:12px; padding:11px 13px; background:linear-gradient(180deg,#FBFCFF,#F7F9FE); position:relative; }
.sapfield .k { font-size:10.5px; text-transform:uppercase; letter-spacing:.07em; color:var(--slate-2); font-weight:600; display:flex; align-items:center; gap:5px; }
.sapfield .v { font-family:'JetBrains Mono'; font-size:13px; font-weight:500; margin-top:5px; color:var(--ink); }

.empty { text-align:center; padding:44px 20px; }
.empty .eic { width:56px; height:56px; border-radius:16px; background:var(--mist); display:grid; place-items:center; margin:0 auto 14px; color:var(--slate-2); }
.empty h4 { font-size:15px; margin-bottom:5px; }
.empty p { color:var(--slate); font-size:12.5px; max-width:38ch; margin:0 auto 16px; }

.sk { background:linear-gradient(90deg,#EDF1F7 25%,#F6F8FC 50%,#EDF1F7 75%); background-size:200% 100%; animation:shim 1.3s infinite; border-radius:6px; }
@keyframes shim { 0%{background-position:200% 0} 100%{background-position:-200% 0} }

.fade { animation:fade .34s cubic-bezier(.2,.7,.3,1) both; }
@keyframes fade { from{opacity:0; transform:translateY(9px)} to{opacity:1; transform:none} }
.rise > * { animation:fade .4s cubic-bezier(.2,.7,.3,1) both; }
.rise > *:nth-child(2){animation-delay:.05s} .rise > *:nth-child(3){animation-delay:.1s}
.rise > *:nth-child(4){animation-delay:.15s} .rise > *:nth-child(5){animation-delay:.2s}
.rise > *:nth-child(6){animation-delay:.25s} .rise > *:nth-child(7){animation-delay:.3s}
@media (prefers-reduced-motion:reduce){ .sn *{animation:none!important; transition:none!important} }

/* ---------- notifications ---------- */
.pop {
  position:absolute; top:52px; right:0; width:352px; background:#fff; border:1px solid var(--line);
  border-radius:var(--r-l); box-shadow:var(--sh-3); z-index:60; overflow:hidden;
}
.notif { display:flex; gap:11px; padding:12px 14px; border-bottom:1px solid var(--line-2); }
.notif:hover { background:#FAFBFE; }
.notif .ni { width:30px; height:30px; border-radius:9px; display:grid; place-items:center; flex:0 0 30px; }
.notif .nt { font-size:12.8px; font-weight:600; }
.notif .nd { font-size:11.5px; color:var(--slate); margin-top:2px; }
.notif .nw { font-size:10.5px; color:var(--slate-2); margin-top:4px; }

.toasts { position:fixed; bottom:20px; right:20px; z-index:200; display:flex; flex-direction:column; gap:9px; }
.toast {
  display:flex; align-items:center; gap:10px; background:var(--ink); color:#fff; padding:11px 15px;
  border-radius:12px; box-shadow:var(--sh-3); font-size:13px; font-weight:500; animation:tin .3s both;
  max-width:340px;
}
@keyframes tin { from{opacity:0; transform:translateX(24px)} to{opacity:1; transform:none} }

/* ---------- stepper ---------- */
.stepper { display:flex; align-items:flex-start; gap:0; overflow-x:auto; padding:4px 0; }
.step { display:flex; align-items:flex-start; gap:0; flex:1; min-width:130px; }
.step .body { text-align:center; flex:1; padding:0 6px; }
.step .bub {
  width:34px; height:34px; border-radius:50%; display:grid; place-items:center; margin:0 auto 8px;
  border:2px solid var(--line); background:#fff; color:var(--slate-2); font-weight:700; font-size:13px;
  font-family:'JetBrains Mono'; transition:all .24s;
}
.step.on .bub { border-color:var(--nova); background:var(--nova); color:#fff; box-shadow:0 0 0 5px rgba(58,34,168,.15); }
.step.done .bub { border-color:var(--mint); background:var(--mint); color:#fff; }
.step .st { font-size:12px; font-weight:600; color:var(--slate-2); }
.step.on .st, .step.done .st { color:var(--ink); }
.step .sd { font-size:10.5px; color:var(--slate-2); margin-top:2px; }
.step .bar { height:2px; background:var(--line); flex:1; margin-top:17px; min-width:14px; }
.step.done .bar { background:var(--mint); }

/* ---------- serial ladder (signature) ---------- */
.ladder { display:flex; flex-direction:column; gap:5px; }
.lrow {
  display:flex; align-items:center; gap:11px; padding:8px 12px; border-radius:10px; background:#FBFCFF;
  border:1px solid var(--line-2); animation:fade .3s both;
}
.lrow .sq { font-size:10.5px; color:var(--slate-2); width:34px; font-family:'JetBrains Mono'; }
.serial { font-family:'JetBrains Mono'; font-size:15px; font-weight:600; letter-spacing:.02em; }
.serial .pfx { color:var(--nova); }
.serial .mid { color:var(--teal); }
.serial .seq { color:var(--ink); }
.serial .pad { color:#B9C4D6; }

/* ---------- tree ---------- */
.tree { font-size:13px; }
.tnode { border-radius:12px; }
.tparent {
  display:flex; align-items:center; gap:11px; padding:12px 14px; border:1px solid var(--line);
  border-radius:12px; background:linear-gradient(180deg,#FFF,#F9FBFF); cursor:pointer; transition:all .16s;
}
.tparent:hover { border-color:#CEC4F1; box-shadow:var(--sh-1); }
.tkids { margin:8px 0 4px 22px; padding-left:20px; border-left:2px dashed #CFDAEC; display:flex; flex-direction:column; gap:6px; }
.tkid { display:flex; align-items:center; gap:10px; padding:8px 12px; border:1px solid var(--line-2); border-radius:10px; background:#fff; position:relative; }
.tkid::before { content:''; position:absolute; left:-20px; top:50%; width:18px; height:2px; background:#CFDAEC; }

/* ---------- labels ---------- */
.label-sheet {
  background:#fff; border:1px solid #D7DEEA; border-radius:8px; padding:16px; width:100%;
  box-shadow:var(--sh-2); position:relative;
}
.label-sheet.carton { border-width:2px; border-color:#1E0D63; }
.lbl-rule { border-top:1px solid #DCE3EE; margin:9px 0; }
.lbl-k { font-size:8.5px; text-transform:uppercase; letter-spacing:.09em; color:#6B7C97; font-weight:700; }
.lbl-v { font-size:12px; font-weight:600; font-family:'JetBrains Mono'; color:#1E0D63; }
.perf { border-top:2px dashed #C6D0E0; margin:12px 0; }

/* ---------- scanner ---------- */
.scanzone {
  border:2px dashed #CEC4F1; border-radius:var(--r-l); background:linear-gradient(180deg,#F7FAFF,#EEF3FF);
  padding:30px 22px; text-align:center; position:relative; overflow:hidden;
}
.scanline { position:absolute; left:0; right:0; height:2px; background:linear-gradient(90deg,transparent,var(--nova),transparent); animation:scan 2.1s linear infinite; }
@keyframes scan { 0%{top:0} 100%{top:100%} }

/* ---------- login ---------- */
.login { min-height:100%; display:grid; grid-template-columns:1.05fr .95fr; background:var(--ink); }
.login-art { position:relative; overflow:hidden; padding:44px; display:flex; flex-direction:column; justify-content:space-between; color:#D6E1F2; }
.login-art::before { content:''; position:absolute; inset:0; background:
  radial-gradient(900px 480px at 12% 10%, rgba(82,54,214,.46), transparent 60%),
  radial-gradient(620px 420px at 88% 88%, rgba(18,165,184,.20), transparent 62%); }
.gridlines { position:absolute; inset:0; opacity:.30;
  background-image:linear-gradient(rgba(255,255,255,.055) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.055) 1px,transparent 1px);
  background-size:46px 46px; mask-image:radial-gradient(circle at 30% 40%,#000,transparent 78%); }
.login-form { background:var(--mist); display:grid; place-items:center; padding:34px 30px; }
.login-card { width:100%; max-width:392px; background:rgba(255,255,255,.86); backdrop-filter:blur(18px) saturate(180%);
  border:1px solid rgba(255,255,255,.9); border-radius:var(--r-xl); padding:30px; box-shadow:var(--sh-3); }
.glass { background:rgba(255,255,255,.07); border:1px solid rgba(255,255,255,.14); backdrop-filter:blur(10px); border-radius:14px; padding:14px 16px; }
@media (max-width:900px){ .login { grid-template-columns:1fr; } .login-art { display:none; } }
@media (max-width:820px){ .side { position:absolute; z-index:80; height:100%; box-shadow:var(--sh-3); } .searchbox{ display:none; } .content{ padding:16px 14px 8px; } }
`;

/* ==========================================================================
   MOCK DATA  (in production these come from SAP S/4HANA + the serialization DB)
   ========================================================================== */

const PRODUCTS = [
  { pid:"1004", material:"FG-AMX-500", name:"Amoxicillin 500mg Capsules", gtin:"08964000110045",
    batch:"AMX-2607-A", mfg:"2026-07-04", exp:"2028-07-03", form:"Capsule · 2x10 Blister",
    pkgOrder:"PKG-1004-0231", prodOrder:"PO-1004-8842", plant:"1100 · Karachi Plant", sloc:"FG01 · Finished Goods" },
  { pid:"1005", material:"FG-PCM-650", name:"Paracetamol 650mg Tablets", gtin:"08964000110052",
    batch:"PCM-2607-C", mfg:"2026-07-11", exp:"2029-07-10", form:"Tablet · 2x10 Blister",
    pkgOrder:"PKG-1005-0198", prodOrder:"PO-1005-8907", plant:"1100 · Karachi Plant", sloc:"FG01 · Finished Goods" },
  { pid:"1006", material:"FG-CEF-1G", name:"Ceftriaxone 1g Injection", gtin:"08964000110069",
    batch:"CEF-2606-B", mfg:"2026-06-22", exp:"2028-06-21", form:"Vial · 1x1 + WFI",
    pkgOrder:"PKG-1006-0154", prodOrder:"PO-1006-8790", plant:"1200 · Lahore Plant", sloc:"FG02 · Cold Chain" },
  { pid:"1007", material:"FG-OMP-20", name:"Omeprazole 20mg Capsules", gtin:"08964000110076",
    batch:"OMP-2607-D", mfg:"2026-07-18", exp:"2028-07-17", form:"Capsule · 3x10 Blister",
    pkgOrder:"PKG-1007-0102", prodOrder:"PO-1007-8955", plant:"1100 · Karachi Plant", sloc:"FG01 · Finished Goods" },
  { pid:"1008", material:"FG-AZI-250", name:"Azithromycin 250mg Tablets", gtin:"08964000110083",
    batch:"AZI-2607-A", mfg:"2026-07-21", exp:"2028-07-20", form:"Tablet · 1x6 Blister",
    pkgOrder:"PKG-1008-0087", prodOrder:"PO-1008-8971", plant:"1200 · Lahore Plant", sloc:"FG01 · Finished Goods" },
];

// running sequence per product — each product keeps an independent counter
const SEED_SEQ = { "1004": 4820, "1005": 2650, "1006": 1180, "1007": 940, "1008": 610 };
const SEED_CARTON = { "1004": 482, "1005": 133, "1006": 118, "1007": 47, "1008": 61 };

const LINES = ["LINE-01 · Blister Pack A","LINE-02 · Blister Pack B","LINE-03 · Bottle Fill","LINE-04 · Vial Aseptic"];
const MACHINES = ["Uhlmann B1240","Marchesini MB440","IMA C80 Cartoner","Bausch+Ströbel KSF"];
const SHIFTS = ["A · 06:00–14:00","B · 14:00–22:00","C · 22:00–06:00"];
const OPERATORS = ["Faisal Karim","Ayesha Noor","Bilal Sheikh","Hina Raza","Usman Tariq"];
const CARTON_SIZES = [10, 20, 50, 100];

const dailyProduction = [
  { d:"Jul 24", units:11420, cartons:212, rejects:38 },
  { d:"Jul 25", units:13980, cartons:265, rejects:22 },
  { d:"Jul 26", units:9240,  cartons:176, rejects:51 },
  { d:"Jul 27", units:15610, cartons:298, rejects:19 },
  { d:"Jul 28", units:14270, cartons:271, rejects:27 },
  { d:"Jul 29", units:16840, cartons:322, rejects:14 },
  { d:"Jul 30", units:12480, cartons:238, rejects:23 },
];
const pkgTrend = [
  { h:"06", a:640, b:0 }, { h:"08", a:1480, b:0 }, { h:"10", a:2210, b:120 },
  { h:"12", a:1760, b:980 }, { h:"14", a:2380, b:1640 }, { h:"16", a:2140, b:2010 },
  { h:"18", a:1180, b:2260 }, { h:"20", a:420, b:1840 },
];
const topProducts = [
  { name:"Amoxicillin 500mg", pid:"1004", v:4820, fill:"#3A22A8" },
  { name:"Paracetamol 650mg", pid:"1005", v:2650, fill:"#5236D6" },
  { name:"Ceftriaxone 1g",    pid:"1006", v:1180, fill:"#6D3BEF" },
  { name:"Omeprazole 20mg",   pid:"1007", v:940,  fill:"#12A5B8" },
  { name:"Azithromycin 250mg",pid:"1008", v:610,  fill:"#0E9F6E" },
];
const PROD_ORDERS = [
  { po:"PO-1004-8842", pid:"1004", qty:15000, done:12480, line:"LINE-01 · Blister Pack A", status:"In Progress", start:"2026-07-30 06:10" },
  { po:"PO-1005-8907", pid:"1005", qty:20000, done:20000, line:"LINE-02 · Blister Pack B", status:"Completed", start:"2026-07-29 06:05" },
  { po:"PO-1006-8790", pid:"1006", qty:6000,  done:1180,  line:"LINE-04 · Vial Aseptic",   status:"In Progress", start:"2026-07-30 07:40" },
  { po:"PO-1007-8955", pid:"1007", qty:12000, done:0,     line:"LINE-03 · Bottle Fill",    status:"Released", start:"—" },
  { po:"PO-1008-8971", pid:"1008", qty:8000,  done:610,   line:"LINE-02 · Blister Pack B", status:"On Hold", start:"2026-07-30 09:15" },
];
const AUDIT = [
  { t:"2026-07-30 11:42:08", u:"Faisal Karim", r:"Operator", ev:"Label Print", obj:"1004500000482", d:"Master carton label printed · Zebra ZT411 (LINE-01)", sev:"info" },
  { t:"2026-07-30 11:41:52", u:"System", r:"Service", ev:"Carton Creation", obj:"1004500000482", d:"Aggregated 20 unit packs into master carton", sev:"ok" },
  { t:"2026-07-30 11:38:14", u:"Faisal Karim", r:"Operator", ev:"Serialization", obj:"PKG-1004-0231", d:"Generated 20 unit serials · 1004000004801–1004000004820", sev:"ok" },
  { t:"2026-07-30 11:30:02", u:"System", r:"Service", ev:"SAP Sync", obj:"PKG-1004-0231", d:"S/4HANA pull successful · 10 fields · 412 ms", sev:"ok" },
  { t:"2026-07-30 11:12:47", u:"Ayesha Noor", r:"QA", ev:"Barcode Scan", obj:"1004000004795", d:"Verification scan passed · GS1 DataMatrix decoded", sev:"ok" },
  { t:"2026-07-30 10:58:31", u:"Bilal Sheikh", r:"Supervisor", ev:"Reprinting", obj:"1005000002641", d:"Reprint approved · reason: print head streak", sev:"warn" },
  { t:"2026-07-30 10:40:19", u:"System", r:"Service", ev:"Duplicate Serial Warning", obj:"1006000001174", d:"Scan repeated within 4 s — treated as duplicate read, not committed", sev:"warn" },
  { t:"2026-07-30 09:15:00", u:"Bilal Sheikh", r:"Supervisor", ev:"Production Hold", obj:"PO-1008-8971", d:"Line stopped · foil splice change", sev:"err" },
  { t:"2026-07-30 06:02:11", u:"Faisal Karim", r:"Operator", ev:"User Login", obj:"session-8841", d:"Signed in from Workstation LINE-01-HMI", sev:"info" },
];
const USERS = [
  { n:"Nabeel Ahmed", e:"nabeel@supernova.pk", r:"Admin", lines:"All lines", last:"2026-07-30 11:44", st:"Active" },
  { n:"Bilal Sheikh", e:"bilal@supernova.pk", r:"Supervisor", lines:"LINE-01, LINE-02", last:"2026-07-30 10:58", st:"Active" },
  { n:"Faisal Karim", e:"faisal@supernova.pk", r:"Operator", lines:"LINE-01", last:"2026-07-30 11:42", st:"Active" },
  { n:"Ayesha Noor", e:"ayesha@supernova.pk", r:"QA", lines:"All lines", last:"2026-07-30 11:12", st:"Active" },
  { n:"Usman Tariq", e:"usman@supernova.pk", r:"Warehouse", lines:"Dispatch dock", last:"2026-07-29 17:30", st:"Active" },
  { n:"Hina Raza", e:"hina@supernova.pk", r:"Operator", lines:"LINE-03", last:"2026-07-22 14:02", st:"Suspended" },
];
const ROLE_MATRIX = [
  { cap:"View dashboard",        Admin:1, Supervisor:1, Operator:1, QA:1, Warehouse:1 },
  { cap:"Pull SAP master data",  Admin:1, Supervisor:1, Operator:1, QA:0, Warehouse:0 },
  { cap:"Generate unit serials", Admin:1, Supervisor:1, Operator:1, QA:0, Warehouse:0 },
  { cap:"Create master carton",  Admin:1, Supervisor:1, Operator:1, QA:0, Warehouse:1 },
  { cap:"Print labels",          Admin:1, Supervisor:1, Operator:1, QA:0, Warehouse:1 },
  { cap:"Approve reprint",       Admin:1, Supervisor:1, Operator:0, QA:1, Warehouse:0 },
  { cap:"Reject / quarantine",   Admin:1, Supervisor:1, Operator:0, QA:1, Warehouse:0 },
  { cap:"Edit serial rules",     Admin:1, Supervisor:0, Operator:0, QA:0, Warehouse:0 },
  { cap:"Export audit trail",    Admin:1, Supervisor:1, Operator:0, QA:1, Warehouse:0 },
];
const NOTIFS = [
  { ic:Database, tone:"c-ok",   t:"SAP sync successful",     d:"10 master-data fields refreshed for PKG-1004-0231", w:"2 min ago" },
  { ic:Barcode,  tone:"c-info", t:"Batch generated",          d:"20 unit serials created on LINE-01", w:"6 min ago" },
  { ic:Boxes,    tone:"c-vio",  t:"Master carton closed",     d:"1004500000482 · 20 unit packs aggregated", w:"8 min ago" },
  { ic:Printer,  tone:"c-ok",   t:"Label printed",            d:"Carton label sent to Zebra ZT411", w:"9 min ago" },
  { ic:WifiOff,  tone:"c-err",  t:"Printer offline",          d:"Zebra ZT230 (LINE-03) not responding", w:"31 min ago" },
  { ic:TriangleAlert, tone:"c-warn", t:"Duplicate serial warning", d:"1006000001174 read twice in 4 s", w:"1 hr ago" },
  { ic:ScanLine, tone:"c-info", t:"Scanner connected",        d:"Zebra DS8178 paired to LINE-01 HMI", w:"5 hr ago" },
];
const REPORTS = [
  { id:"serialization", ic:Barcode,      t:"Serialization Report", d:"Every serial generated in a period, with product, batch, line and operator." },
  { id:"batch",         ic:Layers,       t:"Batch Report",         d:"Batch-wise serialization totals, carton counts and yield against order quantity." },
  { id:"expired",       ic:Clock,        t:"Expired Products",     d:"Serials whose batch expiry has passed or falls inside the alert window." },
  { id:"production",    ic:Factory,      t:"Production Report",    d:"Daily and shift-wise output per line with rejection rate." },
  { id:"carton",        ic:Boxes,        t:"Carton Report",        d:"Master cartons with pack size, contained serials and dispatch status." },
  { id:"operator",      ic:Gauge,        t:"Operator Performance", d:"Units per operator per shift, reprints raised and rejection share." },
  { id:"audit",         ic:ShieldCheck,  t:"Audit Report",         d:"Full 21 CFR Part 11 style activity trail for a selected date range." },
];

/* ==========================================================================
   SERIAL LOGIC
   Unit pack   : <ProductID><9-digit sequence>      1004 000000001  -> 1004000000001
   Master carton: <ProductID>5<8-digit sequence>    1004 5 00000001 -> 1004500000001
   Every product keeps its own independent counter.
   ========================================================================== */
const unitSerial   = (pid, seq) => `${pid}${String(seq).padStart(9, "0")}`;
const cartonSerial = (pid, seq) => `${pid}5${String(seq).padStart(8, "0")}`;

/* Split a serial for the coloured display: prefix | marker | sequence */
function SerialText({ value, pid, carton = false, size = 15 }) {
  if (!value) return null;
  const p = pid || value.slice(0, 4);
  const rest = value.slice(p.length);
  const marker = carton ? rest.slice(0, 1) : "";
  const seq = carton ? rest.slice(1) : rest;
  const firstSig = seq.search(/[1-9]/);
  const pad = firstSig < 0 ? seq : seq.slice(0, firstSig);
  const sig = firstSig < 0 ? "" : seq.slice(firstSig);
  return (
    <span className="serial" style={{ fontSize:size }}>
      <span className="pfx">{p}</span>
      {marker && <span className="mid">{marker}</span>}
      <span className="pad">{pad}</span>
      <span className="seq">{sig}</span>
    </span>
  );
}

/* ==========================================================================
   BARCODE / DATAMATRIX PREVIEW RENDERERS
   Visual previews for the demo. Swap in bwip-js (GS1-128 + GS1 DataMatrix)
   for scannable production output — same props, same footprint.
   ========================================================================== */
function hash32(s) { let h = 2166136261; for (let i=0;i<s.length;i++){ h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }

function Barcode1D({ value = "", height = 54, showText = true }) {
  const bars = useMemo(() => {
    let h = hash32(value || "0"), out = [];
    const guard = [3,1,1,1,2,1];                       // start guard
    guard.forEach((w,i) => out.push({ w, on:i%2===0 }));
    for (let i=0;i<(value.length||8)*6;i++) {
      h = (h * 1103515245 + 12345) >>> 0;
      out.push({ w: 1 + (h >>> 8) % 4, on: i % 2 === 0 });
    }
    [2,3,3,1,1,1,2].forEach((w,i) => out.push({ w, on:i%2===0 })); // stop guard
    return out;
  }, [value]);
  const total = bars.reduce((a,b)=>a+b.w,0);
  let x = 0;
  return (
    <div style={{ width:"100%" }}>
      <svg viewBox={`0 0 ${total} ${height}`} width="100%" height={height} preserveAspectRatio="none" role="img" aria-label={`Barcode ${value}`}>
        <rect width={total} height={height} fill="#fff" />
        {bars.map((b,i) => { const r = b.on ? <rect key={i} x={x} y="0" width={b.w} height={height} fill="#1E0D63" /> : null; x += b.w; return r; })}
      </svg>
      {showText && <div className="mono" style={{ textAlign:"center", fontSize:11, letterSpacing:".22em", marginTop:4, fontWeight:600 }}>{value}</div>}
    </div>
  );
}

function DataMatrix({ value = "", size = 108 }) {
  const n = 22;
  const cells = useMemo(() => {
    const g = Array.from({ length:n }, () => Array(n).fill(0));
    for (let i=0;i<n;i++) { g[n-1][i] = 1; g[i][0] = 1; }                 // solid finder L
    for (let i=0;i<n;i+=2) { g[0][i] = 1; g[i][n-1] = 1; }                // timing pattern
    let h = hash32(value || "0");
    for (let r=1;r<n-1;r++) for (let c=1;c<n-1;c++) {
      h = (h * 1103515245 + 12345) >>> 0;
      g[r][c] = ((h >>> 12) & 3) === 0 || ((h >>> 17) & 5) === 1 ? 1 : 0;
    }
    return g;
  }, [value]);
  const s = size / (n + 2);
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={`GS1 DataMatrix ${value}`}>
      <rect width={size} height={size} fill="#fff" />
      {cells.map((row,r) => row.map((v,c) => v ? <rect key={`${r}-${c}`} x={(c+1)*s} y={(r+1)*s} width={s} height={s} fill="#1E0D63" /> : null))}
    </svg>
  );
}

/* ==========================================================================
   BRAND MARKS
   SuperNova: vector-traced from the supplied artwork — 11 letter contours and
   3 planet/ring contours, so it stays sharp at any size and in print.
   Wordmark navy #1E0D63 on light, reversed to white on the dark sidebar.
   Ring gradient sampled from the original: #044F93 -> #45E3DC.
   ERManager: rebuilt as live type (the supplied file was 195px and soft).
   ========================================================================== */
const SN_W = "M30 132.8C16.5 130.6 4.8 125.7 1.7 120.9C-1.4 116.3 -0 109.9 4.5 107.6C7.4 106.1 8.9 106.4 14.2 109.3C23.6 114.3 32.6 116.2 45.2 115.9C55.9 115.6 59.5 114.5 63.7 110.6C70.4 104.2 69.1 94.6 61.1 90.5C57.3 88.6 54.4 87.9 40.6 85C23.7 81.4 18.5 79.6 12.2 74.8C4.7 69.2 1.7 61.7 2.1 50.1C2.3 45 2.6 43.7 3.9 40.2C8 29.8 17.5 22.2 30.8 18.7C37.3 16.9 53 16.6 59.9 18.2C71.1 20.6 81 25.7 83.3 30C84.4 32.2 84.2 36.5 82.9 38.5C79.8 43.1 76.7 43.3 69 39.6C53.6 32.1 33.4 32.9 26.1 41.3C21 47.1 21.2 56.1 26.6 60.7C29.5 63.2 33.9 64.6 48.5 67.8C62.5 70.8 67.4 72.2 72.5 74.8C83.3 80.2 88.5 88.2 88.5 99.5C88.5 115.4 78.3 127.1 60.2 131.8C54.1 133.5 37.4 134 30 132.8ZM140.8 132.7C122.7 129.4 111.8 119.4 107.1 102.2L105.8 97.2L105.6 60.8L105.5 24.2L106.6 22C109.7 15.8 120.9 15.5 124.6 21.5C125.7 23.2 125.8 23.3 126 58.2C126.3 92 126.3 93.4 127.4 97.1C130.7 109.1 138.3 115 151.2 115.8C165.8 116.7 175.4 110.3 179.3 97.2C180.1 94.5 180.2 90.8 180.5 59C180.7 27 180.8 23.6 181.6 22.2C185.2 15.6 196.6 15.5 199.9 22L201 24.2L201 58.2C201 78.1 200.8 93.7 200.5 95.8C197.7 115.3 187.7 127.2 170.2 131.8C163.9 133.5 147.5 134 140.8 132.7ZM231.2 132.8C228.7 131.8 226.2 129.1 225.5 126.6C225.1 125.2 225 109.2 225.1 74.6L225.2 24.7L226.6 22.7C229.2 18.7 228.8 18.8 254.8 18.6C278.9 18.4 283.7 18.7 290 20.6C301.5 24.1 309.4 32.3 312.3 43.8C313.5 48.6 313.5 59.4 312.3 64.2C309.2 76.3 300.8 84.6 288.2 88.1C284.6 89.1 282.8 89.2 265 89.5L245.8 89.8L245.5 108.5C245.2 127.9 245.2 128.2 243.1 130.7C241 133.1 235 134.2 231.2 132.8ZM432.2 132.8C429.5 131.8 427.2 129 426.5 125.9C425.6 121.6 425.8 28.3 426.8 25.1C427.6 22.2 430 19.8 432.9 19C435.9 18.2 479.1 18.3 485 19.2C499.3 21.4 508.9 28.8 512.8 40.7C514.6 46 514.8 57.8 513.3 62.8C510.2 73 502.9 80.4 492.6 83.7C491.2 84.2 490 84.7 490 84.8C490 84.9 491.1 85.5 492.4 86.2C497.1 88.6 500.1 92.6 508.2 107.7C516 122.2 516.9 124.6 516 127.9C514.2 134.6 502.7 135.4 497.6 129.2C496.8 128.2 492.1 120.1 487.3 111.1C482.4 102.1 477.7 93.8 476.8 92.7C473.2 87.8 470.4 87 457.1 86.6L447 86.4L447 105.3C447 126.8 446.8 128.2 443.8 130.9C440.9 133.4 436.3 134.2 432.2 132.8ZM542.2 132.8C539.6 131.8 537.7 129.4 537 126.3C536.6 124.5 536.5 108.7 536.6 73.8C536.7 27.7 536.8 23.6 537.6 22.2C539.7 18.3 543.7 16.6 548.2 17.5C552 18.3 552.3 18.6 584.5 60.4L612.8 97.1L613 60.4C613.2 24.1 613.3 23.7 614.3 21.7C617.9 15 629.9 16 631.9 23.3C632.3 24.6 632.5 37.5 632.5 63.7L632.5 102.2L629.1 106.2C620.7 116.2 618.2 120.7 617.7 127.2L617.4 131.6L615.9 130.2C615.1 129.4 601.3 111.7 585.3 90.9L556.2 53.1L556 90.2C555.7 130.3 555.8 128.7 553.1 131.2C550.7 133.3 545.9 134 542.2 132.8ZM856.1 132.8C851.2 131.2 851.3 131.3 838.8 103.4C833.8 92.1 826.3 75.4 822.3 66.3L815 49.9L818.7 45.9C822.1 42.3 828.1 34.4 828.6 32.9C828.8 32.5 829 32.4 829.1 32.5C829.3 32.6 835.8 47.6 843.6 65.8C851.5 83.9 858.5 100.2 859.3 101.9C860 103.6 860.8 104.9 861 104.6C861.2 104.4 869.2 85.9 878.8 63.5C894.9 25.8 896.4 22.6 898.5 20.4C904.9 13.8 916.3 18 915.3 26.5C915.1 28.1 910.7 38.6 901.8 58.5C894.5 74.9 884.6 97.1 879.8 107.9C875 118.7 870.5 128.4 869.7 129.3C867.1 132.8 860.9 134.4 856.1 132.8ZM917.8 132.8C913.9 131.4 912.2 128.7 912.6 124.5C912.9 122.2 916.6 113.5 934.2 74.5C958.2 21.5 957.6 22.8 959.4 20.8C963.9 16 972.5 16.2 976.9 21.2C979 23.6 977 19.4 1001.8 74C1025.8 127 1025.4 125.9 1022.9 129.5C1020.8 132.5 1019.4 133.3 1015.3 133.2C1008.2 133.2 1006.7 131.6 1000.2 116.5L995.8 106L968 106L940.2 106L937.3 113.1C932.5 124.6 930.7 128.2 928.8 130.3C926.1 133.3 922 134.3 917.8 132.8ZM335.7 131.1C333.3 129.9 331.2 127.6 330.5 125.1C329.8 122.4 329.8 27.9 330.6 25.3C331.3 22.7 334.2 19.8 336.8 19.1C338.1 18.7 348.6 18.5 369.8 18.5C399.4 18.5 400.8 18.6 402.9 19.5C408.2 21.9 408.3 31.3 403.1 34C401.1 35 400.3 35 375.5 35L350 35L350 50.5L350 66L374.1 66.1C400.9 66.3 400.2 66.2 402.3 69.7C403.6 71.8 403.6 77.2 402.3 79.2C400.1 82.6 400.9 82.5 374.1 82.5L350 82.5L350 99L350 115.5L375.9 115.6L401.8 115.8L403.6 116.9C408.4 119.9 408 128.5 403 131.1C400.3 132.5 338.8 132.4 335.7 131.1ZM988.4 88.9C986.1 83.1 968.2 41.5 968 41.5C967.6 41.5 948 88 948 88.9C948 89.4 952.6 89.5 968.3 89.5C984.3 89.5 988.6 89.4 988.4 88.9ZM282.1 71.6C289.6 68.6 293.1 63 293.1 54C293.1 44.7 289.2 38.9 281 36.2C278.5 35.4 276.5 35.2 262 35.2L245.8 35.2L245.6 54.2L245.5 73.1L262.4 72.9C278.6 72.7 279.4 72.7 282.1 71.6ZM476.6 71C487.7 69.7 493.5 64.6 494.3 55.2C495.2 44.9 490.4 38.1 480.4 35.8C478 35.2 473.7 35 462.1 35L447 35L447 53.2L447 71.5L459.6 71.5C466.6 71.5 474.2 71.3 476.6 71Z";
const SN_RING = "M715.8 146.2C702.3 144.1 689.8 138.9 680.8 131.4L678.4 129.4L672.6 131.2C644.2 140 623.2 140.7 618.3 133.2C616.7 130.9 617.6 123.7 619.8 119.2C624.7 109.7 637.1 96.2 650.6 85.7L654.4 82.8L654.7 75C656.1 36.5 686.2 7.3 724.2 7.3C739 7.3 751.6 11.1 763.5 19.2C765.7 20.8 767.8 22 768.1 22C768.4 22 770.8 21.3 773.4 20.5C791.7 14.6 809.5 11.7 818.7 13C841.1 16.1 833.2 36.4 798.9 64L793.8 68.2L793.9 75.5C794.6 109 772.2 137.4 739 145.1C734.8 146 719.6 146.8 715.8 146.2ZM654.6 117.8C681.6 113.7 732.6 90.1 769 64.8C803.1 41.1 812.5 24.3 791 25.7C787 25.9 775.8 28.1 775.2 28.7C775 28.8 776 30.1 777.3 31.6C779.6 34.3 784.3 40.9 784.8 42.2C785.1 43 777.5 48.9 767.5 55.5L761.3 59.6L759.9 56.8C757.8 53 753.6 48 750.1 45.2C727.4 27.2 694.6 36.9 685.4 64.5C683.9 68.9 683.8 69.7 683.8 76.5C683.8 84.7 684.4 87.8 687.3 94C688.2 96 688.8 97.9 688.6 98.1C687.3 99.4 662.6 108.8 662 108.2C661.3 107.4 658.1 99.3 657 95.5C656.5 93.5 655.9 91.8 655.8 91.7C655.7 91.5 653 94 649.8 97C633.5 112.7 635.3 120.7 654.6 117.8ZM733.1 116.8C743.5 114.6 753.9 107 759.4 97.7C761.2 94.6 763 90.6 763 89.5C763 89.2 760.2 90.7 756.7 92.8C747 98.6 732.8 106.2 722.1 111.3C712.6 115.8 712.5 115.9 714.1 116.4C718 117.6 728.1 117.8 733.1 116.8Z";
const SN_RATIO = 1024 / 152.5;

function SNSvg({ height = 28, dark = false, ringOnly = false, title = "SuperNova" }) {
  const vb = ringOnly ? "614 -33.5 220 220" : "0 0 1024 152.5";
  const w = ringOnly ? height : Math.round(height * SN_RATIO);
  return (
    <svg height={height} width={w} viewBox={vb} role="img" aria-label={title}
         style={{ display:"block", overflow:"visible" }}>
      <defs>
        <linearGradient id="snRing" gradientUnits="userSpaceOnUse" x1="620" y1="146" x2="830" y2="8">
          <stop offset="0%" stopColor="#044F93" /><stop offset="34%" stopColor="#1585AE" />
          <stop offset="66%" stopColor="#33B8CC" /><stop offset="100%" stopColor="#45E3DC" />
        </linearGradient>
      </defs>
      {!ringOnly && <path d={SN_W} fill={dark ? "#FFFFFF" : "#1E0D63"} fillRule="evenodd" />}
      <path d={SN_RING} fill="url(#snRing)" fillRule="evenodd" />
    </svg>
  );
}

/* Compact square glyph — the ringed planet alone. Used where space is tight. */
function SuperNovaMark({ size = 30 }) { return <SNSvg height={size} ringOnly />; }

function SuperNovaLogo({ dark = false, compact = false, height }) {
  return <SNSvg height={height || (compact ? 19 : 28)} dark={dark} />;
}

/* ERManager Consulting Services — brand colours from the supplied artwork */
function ERMLogo({ light = false, size = 1 }) {
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:1, lineHeight:1 }}>
      <div style={{ fontFamily:"Inter,Helvetica,Arial,sans-serif", fontWeight:800,
                    fontSize:14 * size, letterSpacing:"-.025em", whiteSpace:"nowrap" }}>
        <span style={{ color:"#E2191A" }}>ERM</span>
        <span style={{ color: light ? "#E4EAF6" : "#1C295E" }}>anager</span>
      </div>
      <div style={{ fontFamily:"Inter,Helvetica,Arial,sans-serif", fontWeight:500,
                    fontSize:6.6 * size, letterSpacing:".19em", textTransform:"uppercase",
                    color: light ? "rgba(228,234,246,.62)" : "#6B7A96", whiteSpace:"nowrap" }}>
        Consulting Services
      </div>
    </div>
  );
}

/* ==========================================================================
   PRIMITIVES
   ========================================================================== */
const Card = ({ children, className = "", style, ...rest }) => <div className={`card ${className}`} style={style} {...rest}>{children}</div>;

const CardHead = ({ title, sub, right, icon: Ic }) => (
  <div className="cardhead">
    <div style={{ display:"flex", gap:11, alignItems:"center", minWidth:0 }}>
      {Ic && <div style={{ width:30, height:30, borderRadius:9, background:"var(--nova-soft)", color:"var(--nova)", display:"grid", placeItems:"center", flex:"0 0 30px" }}><Ic size={15} /></div>}
      <div style={{ minWidth:0 }}><h3>{title}</h3>{sub && <div className="sub">{sub}</div>}</div>
    </div>
    {right}
  </div>
);

const Btn = ({ kind = "g", icon: Ic, children, sm, ...p }) => (
  <button className={`btn btn-${kind}${sm ? " btn-sm" : ""}`} {...p}>{Ic && <Ic size={sm ? 13 : 15} />}{children}</button>
);

const Chip = ({ tone = "c-mut", icon: Ic, children }) => (
  <span className={`chip ${tone}`}>{Ic && <Ic size={11} />}{children}</span>
);

const STATUS_TONE = {
  "Serialized":"c-ok", "Printed":"c-info", "Aggregated":"c-vio", "Pending":"c-mut", "Rejected":"c-err",
  "In Progress":"c-info", "Completed":"c-ok", "Released":"c-mut", "On Hold":"c-warn",
  "Active":"c-ok", "Suspended":"c-err", "Open":"c-warn", "Closed":"c-ok", "Dispatched":"c-vio",
};
const St = ({ v }) => <Chip tone={STATUS_TONE[v] || "c-mut"}>{v}</Chip>;

const Field = ({ label, hint, req, children }) => (
  <label className="field">
    <span className="lb">{label}{req && <span className="req"> *</span>}</span>
    {children}
    {hint && <span className="hint">{hint}</span>}
  </label>
);

const Input = (p) => <input className="inp" {...p} />;
const Select = ({ options = [], ...p }) => (
  <select className="inp" {...p}>{options.map(o => <option key={o} value={o}>{o}</option>)}</select>
);

const KPI = ({ label, value, delta, icon: Ic, tone = "nova", trend }) => {
  const tones = {
    nova:  ["var(--nova-soft)","var(--nova)"], mint:["var(--mint-soft)","var(--mint)"],
    spark: ["var(--spark-soft)","#B47509"],    rose:["var(--rose-soft)","var(--rose)"],
    violet:["var(--violet-soft)","var(--violet)"],
  }[tone];
  return (
    <div className="kpi">
      <div className="ic" style={{ background:tones[0], color:tones[1] }}><Ic size={17} /></div>
      <div className="lbl">{label}</div>
      <div className="val">{value}</div>
      {delta && <div className="delta">{trend !== false && <TrendingUp size={12} color="var(--mint)" />}{delta}</div>}
      <Ic className="spark" size={78} />
    </div>
  );
};

const Empty = ({ icon: Ic = Boxes, title, body, action }) => (
  <div className="empty">
    <div className="eic"><Ic size={24} /></div>
    <h4>{title}</h4><p>{body}</p>{action}
  </div>
);

const Skeleton = ({ rows = 5 }) => (
  <div style={{ padding:16, display:"flex", flexDirection:"column", gap:11 }}>
    {Array.from({ length:rows }).map((_, i) => (
      <div key={i} style={{ display:"flex", gap:12, alignItems:"center" }}>
        <div className="sk" style={{ width:34, height:34, borderRadius:10 }} />
        <div className="sk" style={{ height:11, flex:1 }} />
        <div className="sk" style={{ height:11, width:"18%" }} />
        <div className="sk" style={{ height:22, width:78, borderRadius:20 }} />
      </div>
    ))}
  </div>
);

const PageHead = ({ crumbs = [], title, sub, actions }) => (
  <div className="fade">
    <div className="crumbs">
      {crumbs.map((c, i) => <React.Fragment key={c}>{i > 0 && <ChevronRight size={11} />}<span style={{ color: i === crumbs.length-1 ? "var(--slate)" : undefined }}>{c}</span></React.Fragment>)}
    </div>
    <div className="pghead">
      <div><h1>{title}</h1>{sub && <div className="pgsub">{sub}</div>}</div>
      {actions && <div style={{ display:"flex", gap:9, flexWrap:"wrap" }}>{actions}</div>}
    </div>
  </div>
);

const Stepper = ({ steps, current }) => (
  <div className="stepper">
    {steps.map((s, i) => (
      <div key={s.t} className={`step ${i === current ? "on" : ""} ${i < current ? "done" : ""}`}>
        <div className="body">
          <div className="bub">{i < current ? <Check size={16} /> : i + 1}</div>
          <div className="st">{s.t}</div><div className="sd">{s.d}</div>
        </div>
        {i < steps.length - 1 && <div className="bar" />}
      </div>
    ))}
  </div>
);

const SapField = ({ k, v, mono = true }) => (
  <div className="sapfield">
    <div className="k"><Database size={10} color="var(--nova)" />{k}</div>
    <div className="v" style={mono ? undefined : { fontFamily:"Inter", fontWeight:600 }}>{v}</div>
  </div>
);

const chartAxis = { tick:{ fontSize:11, fill:"#8494AC", fontFamily:"Inter" }, axisLine:{ stroke:"#E4E9F2" }, tickLine:false };
const tipStyle = {
  contentStyle:{ borderRadius:12, border:"1px solid #E4E9F2", boxShadow:"0 14px 34px -14px rgba(10,23,48,.3)", fontSize:12, fontFamily:"Inter" },
  labelStyle:{ fontWeight:700, color:"#0A1730", marginBottom:4 },
};
const nf = (n) => n.toLocaleString("en-US");

/* ==========================================================================
   LOGIN
   ========================================================================== */
function Login({ onIn }) {
  const [u, setU] = useState("faisal@supernova.pk");
  const [p, setP] = useState("demo1234");
  const [role, setRole] = useState("Operator");
  const [busy, setBusy] = useState(false);
  const go = () => { setBusy(true); setTimeout(() => onIn(role), 620); };

  return (
    <div className="sn" style={{ height:"100%" }}>
      <style>{CSS}</style>
      <div className="login">
        <div className="login-art">
          <div className="gridlines" />
          <div style={{ position:"relative" }}>
            <SuperNovaLogo dark />
            <div style={{ marginTop:52, maxWidth:"30ch" }}>
              <div style={{ fontSize:11, letterSpacing:".16em", textTransform:"uppercase", color:"#45E3DC", fontWeight:700 }}>Pharmaceutical Serialization</div>
              <h1 style={{ color:"#fff", fontSize:38, lineHeight:1.12, marginTop:14 }}>Every pack gets an identity.</h1>
              <p style={{ color:"#A9BCDA", fontSize:14, marginTop:14, maxWidth:"38ch" }}>
                Serialize unit packs, aggregate them into master cartons, and hand a verified parent–child trail to your supply chain — with master data pulled straight from SAP S/4HANA.
              </p>
            </div>
            <div style={{ display:"flex", gap:12, marginTop:30, flexWrap:"wrap" }}>
              {[["GS1","DataMatrix & GTIN-14"],["S/4HANA","Live master data"],["Part 11","Full audit trail"]].map(([a,b]) => (
                <div key={a} className="glass" style={{ minWidth:132 }}>
                  <div style={{ fontFamily:"Sora", fontWeight:600, fontSize:15, color:"#fff" }}>{a}</div>
                  <div style={{ fontSize:11, color:"#9FB4D6", marginTop:3 }}>{b}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ position:"relative", display:"flex", justifyContent:"space-between", alignItems:"center", gap:12, flexWrap:"wrap" }}>
            <ERMLogo light />
            <div style={{ fontSize:11, color:"#7E93B8" }}>Demonstration build · v1.0</div>
          </div>
        </div>

        <div className="login-form">
          <div className="login-card fade">
            <div style={{ display:"flex", justifyContent:"center", marginBottom:20 }}><SuperNovaLogo /></div>
            <h2 style={{ fontSize:19, textAlign:"center" }}>Sign in to continue</h2>
            <p style={{ textAlign:"center", color:"var(--slate)", fontSize:12.5, marginTop:6, marginBottom:22 }}>
              Product Serialization Management System
            </p>

            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              <Field label="Username">
                <div style={{ position:"relative" }}>
                  <Mail size={14} style={{ position:"absolute", left:11, top:11, color:"var(--slate-2)" }} />
                  <input className="inp" style={{ paddingLeft:33 }} value={u} onChange={e => setU(e.target.value)} />
                </div>
              </Field>
              <Field label="Password">
                <div style={{ position:"relative" }}>
                  <Lock size={14} style={{ position:"absolute", left:11, top:11, color:"var(--slate-2)" }} />
                  <input className="inp" style={{ paddingLeft:33 }} type="password" value={p} onChange={e => setP(e.target.value)} />
                </div>
              </Field>
              <Field label="Sign in as" hint="Demo control — each role sees a different dashboard and menu.">
                <Select options={["Admin","Supervisor","Operator","QA","Warehouse"]} value={role} onChange={e => setRole(e.target.value)} />
              </Field>

              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", fontSize:12.5 }}>
                <label style={{ display:"flex", gap:7, alignItems:"center", color:"var(--slate)" }}>
                  <input type="checkbox" defaultChecked /> Remember me
                </label>
                <a href="#" onClick={e => e.preventDefault()} style={{ color:"var(--nova)", fontWeight:600, textDecoration:"none" }}>Forgot password?</a>
              </div>

              <Btn kind="p" icon={busy ? RefreshCw : ArrowRight} onClick={go} disabled={busy}
                   style={{ justifyContent:"center", padding:"11px 14px", marginTop:4 }}>
                {busy ? "Signing in…" : "Sign in"}
              </Btn>
            </div>

            <div style={{ borderTop:"1px solid var(--line-2)", marginTop:22, paddingTop:15, textAlign:"center" }}>
              <div style={{ fontSize:10.5, color:"var(--slate-2)", marginBottom:7 }}>Designed &amp; Developed by</div>
              <div style={{ display:"flex", justifyContent:"center" }}><ERMLogo /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   DASHBOARD
   ========================================================================== */
function Dashboard({ role, go, toast }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => { const t = setTimeout(() => setLoading(false), 520); return () => clearTimeout(t); }, []);

  const kpis = {
    Operator: [
      { label:"My units this shift", value:"1,842", delta:"92% of shift target", icon:Barcode, tone:"nova" },
      { label:"Cartons closed",      value:"92",    delta:"Last: 1004500000482", icon:Boxes, tone:"violet", trend:false },
      { label:"Rejected packs",      value:"6",     delta:"0.3% of output", icon:TriangleAlert, tone:"rose", trend:false },
      { label:"Running line",        value:"LINE-01", delta:"Uhlmann B1240 · Shift A", icon:Factory, tone:"mint", trend:false },
    ],
    QA: [
      { label:"Verification scans",  value:"418",  delta:"All decoded successfully", icon:ScanLine, tone:"nova" },
      { label:"Reprints pending",    value:"2",    delta:"Awaiting QA approval", icon:Printer, tone:"spark", trend:false },
      { label:"Quarantined packs",   value:"23",   delta:"3 batches affected", icon:ShieldCheck, tone:"rose", trend:false },
      { label:"Batches released",    value:"7",    delta:"This week", icon:CircleCheck, tone:"mint" },
    ],
    Warehouse: [
      { label:"Cartons at dock",     value:"148",  delta:"Ready for dispatch", icon:Boxes, tone:"violet", trend:false },
      { label:"Dispatched today",    value:"96",   delta:"4 shipments", icon:MoveRight, tone:"nova" },
      { label:"Aggregation errors",  value:"1",    delta:"Carton 1005500000131", icon:TriangleAlert, tone:"rose", trend:false },
      { label:"Scan verifications",  value:"244",  delta:"Dock inbound + outbound", icon:ScanLine, tone:"mint" },
    ],
  };
  const adminKpis = [
    { label:"Today's production", value:"12,480", delta:"+8.4% vs yesterday", icon:Factory, tone:"nova" },
    { label:"Serialized units",   value:"93,840", delta:"+6.1% this week", icon:Barcode, tone:"violet" },
    { label:"Serialized cartons", value:"1,782",  delta:"+112 today", icon:Boxes, tone:"mint" },
    { label:"Packaging orders",   value:"5",      delta:"2 in progress · 1 on hold", icon:ClipboardList, tone:"spark", trend:false },
    { label:"Rejected packs",     value:"23",     delta:"0.18% rejection rate", icon:TriangleAlert, tone:"rose", trend:false },
    { label:"Running lines",      value:"3 / 4",  delta:"LINE-03 idle", icon:Cpu, tone:"nova", trend:false },
  ];
  const cards = kpis[role] || adminKpis;

  return (
    <div>
      <PageHead
        crumbs={["Home","Dashboard"]}
        title={`Good morning, ${role === "Operator" ? "Faisal" : role === "QA" ? "Ayesha" : "Nabeel"}`}
        sub={`Signed in as ${role} · Karachi Plant 1100 · Thursday, 30 July 2026`}
        actions={<>
          <Btn kind="g" icon={RefreshCw} onClick={() => toast("Dashboard refreshed")}>Refresh</Btn>
          <Btn kind="p" icon={Play} onClick={() => go("packaging")}>Start packaging run</Btn>
        </>}
      />

      <div className="grid g-kpi rise" style={{ marginBottom:14 }}>
        {cards.map(k => <KPI key={k.label} {...k} />)}
        <div className="kpi" style={{ background:"linear-gradient(150deg,#180C42,#2B1673)", borderColor:"#2B1673", color:"#fff" }}>
          <div className="ic" style={{ background:"rgba(255,255,255,.12)", color:"#7FF3C1" }}><Database size={17} /></div>
          <div className="lbl" style={{ color:"#8FA6C9" }}>SAP S/4HANA sync</div>
          <div className="val" style={{ fontSize:19, color:"#fff", marginTop:5 }}>Connected</div>
          <div style={{ fontSize:11.5, color:"#9FB4D6", marginTop:7, display:"flex", alignItems:"center", gap:6 }}>
            <span style={{ width:7, height:7, borderRadius:"50%", background:"#22C58B", boxShadow:"0 0 0 3px rgba(34,197,139,.22)" }} />
            Last pull 11:30:02 · 412 ms
          </div>
        </div>
      </div>

      <div className="grid" style={{ gridTemplateColumns:"minmax(0,1.55fr) minmax(0,1fr)", marginBottom:14 }}>
        <Card>
          <CardHead title="Daily production" sub="Unit packs serialised vs cartons closed · last 7 days" icon={Activity}
            right={<div style={{ display:"flex", gap:14, fontSize:11.5, color:"var(--slate)" }}>
              <span style={{ display:"flex", gap:6, alignItems:"center" }}><i style={{ width:9, height:9, borderRadius:3, background:"#5236D6" }} />Units</span>
              <span style={{ display:"flex", gap:6, alignItems:"center" }}><i style={{ width:9, height:9, borderRadius:3, background:"#6D3BEF" }} />Cartons</span>
            </div>} />
          <div style={{ padding:"14px 10px 6px", height:262 }}>
            {loading ? <div className="sk" style={{ height:"100%", margin:"0 8px" }} /> : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dailyProduction} margin={{ top:6, right:12, left:0, bottom:0 }}>
                  <defs>
                    <linearGradient id="gU" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#5236D6" stopOpacity=".28" /><stop offset="100%" stopColor="#5236D6" stopOpacity="0" /></linearGradient>
                    <linearGradient id="gC" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#6D3BEF" stopOpacity=".22" /><stop offset="100%" stopColor="#6D3BEF" stopOpacity="0" /></linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 4" stroke="#EFF2F8" vertical={false} />
                  <XAxis dataKey="d" {...chartAxis} />
                  <YAxis yAxisId="l" {...chartAxis} width={44} />
                  <YAxis yAxisId="r" orientation="right" {...chartAxis} width={36} />
                  <RTooltip {...tipStyle} />
                  <Area yAxisId="l" type="monotone" dataKey="units" stroke="#5236D6" strokeWidth={2.4} fill="url(#gU)" name="Units" />
                  <Area yAxisId="r" type="monotone" dataKey="cartons" stroke="#6D3BEF" strokeWidth={2.2} fill="url(#gC)" name="Cartons" />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </Card>

        <Card>
          <CardHead title="Serialization progress" sub="Against released order quantity" icon={Gauge} />
          <div style={{ padding:"6px 10px 0", height:198 }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart innerRadius="52%" outerRadius="100%" data={[
                { n:"1004", v:83, fill:"#3A22A8" }, { n:"1005", v:100, fill:"#0E9F6E" },
                { n:"1006", v:20, fill:"#6D3BEF" }, { n:"1008", v:8, fill:"#12A5B8" },
              ]} startAngle={90} endAngle={-270}>
                <RadialBar dataKey="v" cornerRadius={8} background={{ fill:"#F1F4FA" }} />
                <RTooltip {...tipStyle} formatter={(v,_n,p) => [`${v}% complete`, `Product ${p.payload.n}`]} />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
          <div style={{ padding:"4px 18px 16px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
            {[["1004","83%","#3A22A8"],["1005","100%","#0E9F6E"],["1006","20%","#6D3BEF"],["1008","8%","#12A5B8"]].map(([n,v,c]) => (
              <div key={n} style={{ display:"flex", alignItems:"center", gap:7, fontSize:12 }}>
                <i style={{ width:9, height:9, borderRadius:3, background:c }} />
                <span className="mono">{n}</span><span style={{ marginLeft:"auto", fontWeight:600 }}>{v}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid" style={{ gridTemplateColumns:"minmax(0,1fr) minmax(0,1fr) minmax(0,1.15fr)" }}>
        <Card>
          <CardHead title="Packaging trend" sub="Units per hour, two active lines" icon={TrendingUp} />
          <div style={{ padding:"14px 8px 10px", height:214 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={pkgTrend} margin={{ top:4, right:8, left:0, bottom:0 }} barGap={3}>
                <CartesianGrid strokeDasharray="3 4" stroke="#EFF2F8" vertical={false} />
                <XAxis dataKey="h" {...chartAxis} /><YAxis {...chartAxis} width={38} />
                <RTooltip {...tipStyle} />
                <Bar dataKey="a" name="LINE-01" fill="#3A22A8" radius={[4,4,0,0]} maxBarSize={13} />
                <Bar dataKey="b" name="LINE-02" fill="#A796EE" radius={[4,4,0,0]} maxBarSize={13} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <CardHead title="Top products" sub="Serialized units, month to date" icon={Layers} />
          <div style={{ padding:"14px 14px 10px", display:"flex", flexDirection:"column", gap:13 }}>
            {topProducts.map(p => (
              <div key={p.pid}>
                <div style={{ display:"flex", justifyContent:"space-between", fontSize:12.5, marginBottom:5 }}>
                  <span style={{ fontWeight:600 }}>{p.name}</span>
                  <span className="mono" style={{ color:"var(--slate)" }}>{nf(p.v)}</span>
                </div>
                <div style={{ height:7, background:"#F1F4FA", borderRadius:20, overflow:"hidden" }}>
                  <div style={{ width:`${(p.v/4820)*100}%`, height:"100%", background:p.fill, borderRadius:20, transition:"width .8s cubic-bezier(.2,.7,.3,1)" }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHead title="Recent activities" sub="Live audit stream" icon={ScrollText}
            right={<Btn kind="g" sm icon={Eye} onClick={() => go("audit")}>Full log</Btn>} />
          {loading ? <Skeleton rows={4} /> : (
            <div style={{ maxHeight:236, overflowY:"auto" }}>
              {AUDIT.slice(0,6).map((a,i) => (
                <div key={i} className="notif">
                  <div className={`ni chip ${a.sev==="ok"?"c-ok":a.sev==="warn"?"c-warn":a.sev==="err"?"c-err":"c-info"}`} style={{ borderRadius:9 }}>
                    <CircleDot size={13} />
                  </div>
                  <div style={{ minWidth:0 }}>
                    <div className="nt">{a.ev}</div>
                    <div className="nd" style={{ whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{a.d}</div>
                    <div className="nw">{a.t.slice(11)} · {a.u}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

/* ==========================================================================
   SEED  — pre-existing serialization records so screens are never empty
   ========================================================================== */
function buildSeed() {
  const serials = [], cartons = [], nextSeq = {}, nextCseq = {};
  const ts = (h, m) => `2026-07-30 ${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}`;
  PRODUCTS.forEach((p, pi) => {
    const nCart = [4,3,2,1,1][pi];
    const size  = [20,50,20,10,10][pi];
    let seq = SEED_SEQ[p.pid] - nCart * size + 1;
    let cs  = SEED_CARTON[p.pid] - nCart + 1;
    for (let c = 0; c < nCart; c++) {
      const cid = cartonSerial(p.pid, cs + c);
      const kids = [];
      for (let k = 0; k < size; k++) {
        const s = unitSerial(p.pid, seq++);
        const rec = {
          serial:s, pid:p.pid, status: c === nCart-1 && k > size-3 ? "Rejected" : "Aggregated",
          line: LINES[pi % LINES.length], machine: MACHINES[pi % MACHINES.length],
          operator: OPERATORS[(pi + c) % OPERATORS.length], ts: ts(6 + c, 12 + k % 40), carton: cid,
        };
        serials.push(rec); kids.push(s);
      }
      cartons.push({ id:cid, pid:p.pid, size, serials:kids, ts:ts(6 + c, 55),
                     status: c === 0 ? "Dispatched" : "Closed", printed:true });
    }
    // a few loose, not-yet-aggregated packs
    for (let k = 0; k < 3; k++) {
      serials.push({ serial:unitSerial(p.pid, seq++), pid:p.pid, status: k === 0 ? "Printed" : "Serialized",
        line:LINES[pi % LINES.length], machine:MACHINES[pi % MACHINES.length],
        operator:OPERATORS[pi % OPERATORS.length], ts:ts(11, 20 + k), carton:null });
    }
    // counters continue from where the seed stopped — no serial is ever reissued
    nextSeq[p.pid] = seq;
    nextCseq[p.pid] = cs + nCart;
  });
  return { serials: serials.reverse(), cartons: cartons.reverse(), seq: nextSeq, cseq: nextCseq };
}
const prodByPid = (pid) => PRODUCTS.find(p => p.pid === pid) || PRODUCTS[0];

/* ==========================================================================
   SAP S/4HANA SYNC
   ========================================================================== */
function SapSync({ db, toast }) {
  const [pid, setPid] = useState(db.pid);
  const [syncing, setSyncing] = useState(false);
  const [lastSync, setLastSync] = useState("2026-07-30 11:30:02");
  const [ms, setMs] = useState(412);
  const p = prodByPid(pid);

  const pull = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      const now = new Date();
      setLastSync(`2026-07-30 ${String(now.getHours()).padStart(2,"0")}:${String(now.getMinutes()).padStart(2,"0")}:${String(now.getSeconds()).padStart(2,"0")}`);
      setMs(280 + Math.floor(Math.random() * 340));
      db.setPid(pid);
      toast(`Master data pulled from S/4HANA for ${p.material}`);
    }, 900);
  };

  const FIELDS = [
    ["Material Code", p.material], ["Product Name", p.name], ["Batch Number", p.batch],
    ["Manufacturing Date", p.mfg], ["Expiry Date", p.exp], ["GTIN Number", p.gtin],
    ["Packaging Order", p.pkgOrder], ["Production Order", p.prodOrder],
    ["Plant", p.plant], ["Storage Location", p.sloc],
  ];

  return (
    <div>
      <PageHead crumbs={["Home","SAP Sync"]} title="SAP S/4HANA master data"
        sub="These ten fields are read-only in this application — they are owned by SAP and pulled on demand. Nothing here can be typed over."
        actions={<>
          <Btn kind="g" icon={SettingsIcon}>Connection settings</Btn>
          <Btn kind="p" icon={RefreshCw} onClick={pull} disabled={syncing}>{syncing ? "Pulling…" : "Refresh from SAP"}</Btn>
        </>} />

      <div className="grid" style={{ gridTemplateColumns:"minmax(0,1fr) 300px", marginBottom:14 }}>
        <Card>
          <CardHead title="Interface status" icon={Database} sub="RFC destination S4H_PRD · IDoc + OData dual channel" />
          <div style={{ padding:18, display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))", gap:14 }}>
            {[
              ["Connection", syncing ? "Handshaking…" : "Connected", syncing ? "c-warn" : "c-ok", syncing ? RefreshCw : Wifi],
              ["Last successful pull", lastSync, "c-info", Clock],
              ["Round trip", `${ms} ms`, "c-ok", Zap],
              ["Fields mapped", "10 of 10", "c-ok", Link2],
            ].map(([k,v,tone,Ic]) => (
              <div key={k}>
                <div className="lbl" style={{ fontSize:10.5, textTransform:"uppercase", letterSpacing:".08em", color:"var(--slate-2)", fontWeight:600 }}>{k}</div>
                <div style={{ marginTop:7 }}><Chip tone={tone} icon={Ic}>{v}</Chip></div>
              </div>
            ))}
          </div>
        </Card>
        <Card className="pad">
          <div style={{ fontSize:11.5, fontWeight:600, color:"var(--slate)", marginBottom:8 }}>Select packaging order</div>
          <Select value={pid} onChange={e => setPid(e.target.value)}
                  options={PRODUCTS.map(x => x.pid)} />
          <div style={{ marginTop:10, fontSize:12, color:"var(--slate)" }}>{p.name}</div>
          <div className="hint" style={{ marginTop:12 }}>Product ID drives the serial prefix. Order {p.pkgOrder} maps to product ID {pid}.</div>
          <div style={{ marginTop:14, padding:12, background:"var(--nova-soft)", borderRadius:10 }}>
            <div style={{ fontSize:10.5, textTransform:"uppercase", letterSpacing:".08em", color:"#1739A0", fontWeight:700 }}>Next unit serial</div>
            <div style={{ marginTop:6 }}><SerialText value={unitSerial(pid, db.seq[pid])} pid={pid} size={16} /></div>
          </div>
        </Card>
      </div>

      <Card>
        <CardHead title="Fields received from SAP" icon={Database}
          sub={syncing ? "Reading…" : `Payload timestamp ${lastSync}`}
          right={<Chip tone="c-mut" icon={Lock}>Read-only</Chip>} />
        <div style={{ padding:18 }}>
          {syncing ? (
            <div className="grid g-3">{Array.from({length:10}).map((_,i) => <div key={i} className="sk" style={{ height:62, borderRadius:12 }} />)}</div>
          ) : (
            <div className="grid g-3 rise">{FIELDS.map(([k,v]) => <SapField key={k} k={k} v={v} mono={!["Product Name","Plant","Storage Location"].includes(k)} />)}</div>
          )}
        </div>
      </Card>
    </div>
  );
}

/* ==========================================================================
   PRODUCTION ORDERS
   ========================================================================== */
function ProductionOrders({ db, go, toast }) {
  const [q, setQ] = useState("");
  const rows = PROD_ORDERS.filter(r => (r.po + prodByPid(r.pid).name + r.line + r.status).toLowerCase().includes(q.toLowerCase()));
  return (
    <div>
      <PageHead crumbs={["Home","Production Orders"]} title="Production orders"
        sub="Released orders arriving from SAP S/4HANA. Pick one to open the packaging run — the serial prefix follows its product ID."
        actions={<><Btn kind="g" icon={Download}>Export</Btn><Btn kind="p" icon={RefreshCw} onClick={() => toast("Order list refreshed from SAP")}>Refresh from SAP</Btn></>} />

      <div className="grid g-kpi" style={{ marginBottom:14 }}>
        <KPI label="Released" value="5" delta="Across 2 plants" icon={ClipboardList} tone="nova" trend={false} />
        <KPI label="In progress" value="2" delta="LINE-01, LINE-04" icon={Play} tone="mint" trend={false} />
        <KPI label="On hold" value="1" delta="Foil splice change" icon={TriangleAlert} tone="spark" trend={false} />
        <KPI label="Completed today" value="1" delta="PO-1005-8907" icon={CircleCheck} tone="violet" trend={false} />
      </div>

      <Card>
        <CardHead title="Order list" icon={Factory}
          right={<div className="searchbox" style={{ width:230 }}><Search size={14} color="var(--slate-2)" /><input placeholder="Search orders" value={q} onChange={e => setQ(e.target.value)} /></div>} />
        <div className="tblwrap">
          <table className="tbl">
            <thead><tr>{["Production order","Product","Material","Order qty","Serialized","Progress","Line","Status","Started","Actions"].map(h => <th key={h}>{h}</th>)}</tr></thead>
            <tbody>
              {rows.map(r => {
                const p = prodByPid(r.pid); const pct = Math.round(r.done / r.qty * 100);
                return (
                  <tr key={r.po}>
                    <td className="num" style={{ fontWeight:600 }}>{r.po}</td>
                    <td><div style={{ fontWeight:600 }}>{p.name}</div><div style={{ fontSize:11, color:"var(--slate-2)" }} className="mono">ID {r.pid} · {p.batch}</div></td>
                    <td className="num">{p.material}</td>
                    <td className="num">{nf(r.qty)}</td>
                    <td className="num">{nf(r.done)}</td>
                    <td style={{ minWidth:120 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                        <div style={{ flex:1, height:6, background:"#F1F4FA", borderRadius:20, overflow:"hidden" }}>
                          <div style={{ width:`${pct}%`, height:"100%", background: pct===100 ? "var(--mint)" : "var(--nova)", borderRadius:20 }} />
                        </div>
                        <span className="mono" style={{ fontSize:11.5, color:"var(--slate)" }}>{pct}%</span>
                      </div>
                    </td>
                    <td style={{ fontSize:12 }}>{r.line}</td>
                    <td><St v={r.status} /></td>
                    <td className="num" style={{ color:"var(--slate)" }}>{r.start}</td>
                    <td>
                      <Btn kind="g" sm icon={ArrowRight} onClick={() => { db.setPid(r.pid); go("packaging"); }}>Open run</Btn>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {!rows.length && <Empty icon={ClipboardList} title="No orders match that search" body="Clear the search box, or refresh the order list from SAP to pull newly released orders." action={<Btn kind="g" icon={X} onClick={() => setQ("")}>Clear search</Btn>} />}
      </Card>
    </div>
  );
}

/* ==========================================================================
   SERIALIZATION
   ========================================================================== */
function Serialization({ db, toast, go }) {
  const [q, setQ] = useState("");
  const [fPid, setFPid] = useState("All products");
  const [fSt, setFSt] = useState("All statuses");
  const [page, setPage] = useState(1);
  const [bulkOpen, setBulkOpen] = useState(false);
  const [bulkQty, setBulkQty] = useState(20);
  const [busy, setBusy] = useState(false);
  const per = 8;

  const rows = useMemo(() => db.serials.filter(r => {
    const p = prodByPid(r.pid);
    const hay = `${r.serial} ${p.name} ${p.batch} ${p.gtin} ${r.line} ${r.operator} ${r.status}`.toLowerCase();
    return hay.includes(q.toLowerCase())
      && (fPid === "All products" || r.pid === fPid)
      && (fSt === "All statuses" || r.status === fSt);
  }), [db.serials, q, fPid, fSt]);

  const pages = Math.max(1, Math.ceil(rows.length / per));
  const view = rows.slice((page-1)*per, page*per);
  useEffect(() => setPage(1), [q, fPid, fSt]);

  const generate = () => {
    setBusy(true);
    setTimeout(() => {
      db.generate(db.pid, Number(bulkQty));
      setBusy(false); setBulkOpen(false);
      toast(`${bulkQty} unit serials generated for product ${db.pid}`);
    }, 720);
  };

  const p = prodByPid(db.pid);
  const nextSeq = db.seq[db.pid];

  return (
    <div>
      <PageHead crumbs={["Home","Serialization"]} title="Unit pack serialization"
        sub="One unique serial per saleable unit pack. The number is built from the product ID, so every product runs its own sequence and the two can never collide."
        actions={<>
          <Btn kind="g" icon={Printer} onClick={() => go("labels")}>Print labels</Btn>
          <Btn kind="g" icon={FileSpreadsheet} onClick={() => toast("Serialization_2026-07-30.xlsx downloaded")}>Excel</Btn>
          <Btn kind="g" icon={FileText} onClick={() => toast("Serialization_2026-07-30.pdf downloaded")}>PDF</Btn>
          <Btn kind="p" icon={Plus} onClick={() => setBulkOpen(true)}>Bulk generate</Btn>
        </>} />

      {/* --- signature: the serial rule, shown as a working ladder --- */}
      <div className="grid" style={{ gridTemplateColumns:"minmax(0,1fr) minmax(0,1.25fr)", marginBottom:14 }}>
        <Card>
          <CardHead title="How the number is built" icon={Barcode} sub="Product ID + 9-digit running sequence" />
          <div style={{ padding:18 }}>
            <div style={{ display:"flex", gap:9, marginBottom:14, flexWrap:"wrap" }}>
              {PRODUCTS.map(x => (
                <button key={x.pid} onClick={() => db.setPid(x.pid)}
                  className={`btn btn-sm ${db.pid === x.pid ? "btn-s" : "btn-g"}`}>
                  <span className="mono">{x.pid}</span>
                </button>
              ))}
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:11, padding:"13px 15px", background:"var(--mist)", borderRadius:12, marginBottom:14 }}>
              <div>
                <div style={{ fontSize:10.5, textTransform:"uppercase", letterSpacing:".08em", color:"var(--nova)", fontWeight:700 }}>Prefix</div>
                <div className="serial" style={{ fontSize:22 }}><span className="pfx">{db.pid}</span></div>
              </div>
              <Plus size={15} color="var(--slate-2)" />
              <div>
                <div style={{ fontSize:10.5, textTransform:"uppercase", letterSpacing:".08em", color:"var(--slate-2)", fontWeight:700 }}>Sequence (9)</div>
                <div className="serial" style={{ fontSize:22 }}><span className="pad">{String(nextSeq).padStart(9,"0").replace(/[1-9]\d*$/,"")}</span><span className="seq">{String(nextSeq)}</span></div>
              </div>
              <ArrowRight size={16} color="var(--slate-2)" style={{ marginLeft:"auto" }} />
              <div>
                <div style={{ fontSize:10.5, textTransform:"uppercase", letterSpacing:".08em", color:"var(--slate-2)", fontWeight:700 }}>Next serial</div>
                <SerialText value={unitSerial(db.pid, nextSeq)} pid={db.pid} size={22} />
              </div>
            </div>
            <div className="ladder">
              {[0,1,2,3].map(i => (
                <div key={i} className="lrow" style={{ animationDelay:`${i*0.05}s` }}>
                  <span className="sq">#{nextSeq + i}</span>
                  <SerialText value={unitSerial(db.pid, nextSeq + i)} pid={db.pid} />
                  <span style={{ marginLeft:"auto" }}><Chip tone="c-mut">Queued</Chip></span>
                </div>
              ))}
            </div>
            <div className="hint" style={{ marginTop:12 }}>
              Product {db.pid} is at {nf(nextSeq - 1)} packs. Switching to another product picks up that product's own counter — sequences never share a pool.
            </div>
          </div>
        </Card>

        <Card>
          <CardHead title="Run context" icon={ClipboardList}
            sub="SAP fields are locked; the rest is captured on the line"
            right={<Btn kind="g" sm icon={RefreshCw} onClick={() => go("sap")}>SAP data</Btn>} />
          <div style={{ padding:18 }}>
            <div className="grid" style={{ gridTemplateColumns:"repeat(auto-fit,minmax(148px,1fr))", marginBottom:16 }}>
              <SapField k="Product name" v={p.name} mono={false} />
              <SapField k="GTIN" v={p.gtin} />
              <SapField k="Batch" v={p.batch} />
              <SapField k="Expiry" v={p.exp} />
            </div>
            <div className="grid" style={{ gridTemplateColumns:"repeat(auto-fit,minmax(148px,1fr))" }}>
              <Field label="Operator name"><Select options={OPERATORS} value={db.ctx.operator} onChange={e => db.setCtx({ ...db.ctx, operator:e.target.value })} /></Field>
              <Field label="Production line" hint="Internal record only — never printed on a label.">
                <Select options={LINES} value={db.ctx.line} onChange={e => db.setCtx({ ...db.ctx, line:e.target.value })} />
              </Field>
              <Field label="Shift"><Select options={SHIFTS} value={db.ctx.shift} onChange={e => db.setCtx({ ...db.ctx, shift:e.target.value })} /></Field>
              <Field label="Packaging machine"><Select options={MACHINES} value={db.ctx.machine} onChange={e => db.setCtx({ ...db.ctx, machine:e.target.value })} /></Field>
              <Field label="Packaging start"><Input type="time" value={db.ctx.start} onChange={e => db.setCtx({ ...db.ctx, start:e.target.value })} /></Field>
              <Field label="Packaging end"><Input type="time" value={db.ctx.end} onChange={e => db.setCtx({ ...db.ctx, end:e.target.value })} /></Field>
            </div>
            <div style={{ marginTop:14 }}>
              <Field label="Remarks"><Input placeholder="Anything the next shift should know" value={db.ctx.remarks} onChange={e => db.setCtx({ ...db.ctx, remarks:e.target.value })} /></Field>
            </div>
          </div>
        </Card>
      </div>

      {/* --- the register --- */}
      <Card>
        <CardHead title="Serial register" icon={Barcode} sub={`${nf(rows.length)} of ${nf(db.serials.length)} serials`}
          right={
            <div style={{ display:"flex", gap:9, flexWrap:"wrap", alignItems:"center" }}>
              <div className="searchbox" style={{ width:210 }}>
                <Search size={14} color="var(--slate-2)" />
                <input placeholder="Serial, batch, operator…" value={q} onChange={e => setQ(e.target.value)} />
              </div>
              <select className="inp" style={{ width:"auto", padding:"7px 10px", fontSize:12.5 }} value={fPid} onChange={e => setFPid(e.target.value)}>
                {["All products", ...PRODUCTS.map(x => x.pid)].map(o => <option key={o}>{o}</option>)}
              </select>
              <select className="inp" style={{ width:"auto", padding:"7px 10px", fontSize:12.5 }} value={fSt} onChange={e => setFSt(e.target.value)}>
                {["All statuses","Serialized","Printed","Aggregated","Rejected"].map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
          } />
        <div className="tblwrap">
          <table className="tbl">
            <thead><tr>{["Serial number","Product","Batch","GTIN","Manufacturing","Expiry","Status","Packaging line","Generated","Operator","Actions"].map(h => <th key={h}>{h}</th>)}</tr></thead>
            <tbody>
              {view.map(r => {
                const pp = prodByPid(r.pid);
                return (
                  <tr key={r.serial}>
                    <td><SerialText value={r.serial} pid={r.pid} size={13.5} /></td>
                    <td><div style={{ fontWeight:600, fontSize:12.5 }}>{pp.name}</div><div className="mono" style={{ fontSize:11, color:"var(--slate-2)" }}>ID {r.pid}</div></td>
                    <td className="num">{pp.batch}</td>
                    <td className="num">{pp.gtin}</td>
                    <td className="num">{pp.mfg}</td>
                    <td className="num">{pp.exp}</td>
                    <td><St v={r.status} /></td>
                    <td style={{ fontSize:12 }}>{r.line}</td>
                    <td className="num" style={{ color:"var(--slate)" }}>{r.ts}</td>
                    <td style={{ fontSize:12 }}>{r.operator}</td>
                    <td>
                      <div style={{ display:"flex", gap:6 }}>
                        <button className="iconbtn" style={{ width:29, height:29 }} title="View label" onClick={() => { db.setLabelSerial(r.serial); go("labels"); }}><Eye size={13} /></button>
                        <button className="iconbtn" style={{ width:29, height:29 }} title="Reprint" onClick={() => toast(`Reprint request raised for ${r.serial} — awaiting QA approval`)}><Printer size={13} /></button>
                        <button className="iconbtn" style={{ width:29, height:29 }} title="Regenerate" onClick={() => { db.generate(r.pid, 1); toast(`New serial issued for product ${r.pid}`); }}><RefreshCw size={13} /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {!rows.length && <Empty icon={Barcode} title="Nothing serialized under these filters"
          body="Widen the filters, or generate a batch of unit serials for the selected packaging order."
          action={<Btn kind="p" icon={Plus} onClick={() => setBulkOpen(true)}>Bulk generate</Btn>} />}
        {!!rows.length && (
          <div style={{ padding:"12px 18px", borderTop:"1px solid var(--line-2)", display:"flex", alignItems:"center", justifyContent:"space-between", gap:12, flexWrap:"wrap" }}>
            <div style={{ fontSize:12, color:"var(--slate)" }}>
              Showing {(page-1)*per + 1}–{Math.min(page*per, rows.length)} of {nf(rows.length)}
            </div>
            <div style={{ display:"flex", gap:6, alignItems:"center" }}>
              <Btn kind="g" sm icon={ChevronLeft} onClick={() => setPage(p2 => Math.max(1, p2-1))} disabled={page===1}>Prev</Btn>
              {Array.from({ length:Math.min(5, pages) }).map((_, i) => {
                const n = i + 1;
                return <button key={n} onClick={() => setPage(n)} className={`btn btn-sm ${page===n?"btn-s":"btn-g"}`} style={{ minWidth:32, justifyContent:"center" }}>{n}</button>;
              })}
              {pages > 5 && <span style={{ color:"var(--slate-2)", fontSize:12 }}>… {pages}</span>}
              <Btn kind="g" sm onClick={() => setPage(p2 => Math.min(pages, p2+1))} disabled={page===pages}>Next<ChevronRight size={13} /></Btn>
            </div>
          </div>
        )}
      </Card>

      {bulkOpen && (
        <div style={{ position:"fixed", inset:0, background:"rgba(10,23,48,.42)", backdropFilter:"blur(3px)", display:"grid", placeItems:"center", zIndex:150, padding:20 }} onClick={() => setBulkOpen(false)}>
          <Card className="fade" style={{ width:430, maxWidth:"100%", boxShadow:"var(--sh-3)" }} onClick={e => e.stopPropagation()}>
            <CardHead title="Bulk generate unit serials" icon={Plus} sub={`Product ${db.pid} · ${p.name}`}
              right={<button className="iconbtn" style={{ width:30, height:30 }} onClick={() => setBulkOpen(false)}><X size={14} /></button>} />
            <div style={{ padding:18 }}>
              <Field label="How many unit packs" req hint={`Serials ${unitSerial(db.pid, nextSeq)} to ${unitSerial(db.pid, nextSeq + Number(bulkQty||1) - 1)} will be issued.`}>
                <Input type="number" min="1" max="500" value={bulkQty} onChange={e => setBulkQty(e.target.value)} />
              </Field>
              <div style={{ display:"flex", gap:8, marginTop:12, flexWrap:"wrap" }}>
                {[10,20,50,100].map(n => <button key={n} className={`btn btn-sm ${Number(bulkQty)===n?"btn-s":"btn-g"}`} onClick={() => setBulkQty(n)}>{n}</button>)}
              </div>
              <div style={{ marginTop:16, padding:12, background:"var(--spark-soft)", borderRadius:10, display:"flex", gap:9, fontSize:12, color:"#96620A" }}>
                <Info size={15} style={{ flex:"0 0 15px", marginTop:1 }} />
                Serials are committed the moment they are issued. Cancelling a run leaves gaps in the sequence — that is intentional and auditable.
              </div>
              <div style={{ display:"flex", gap:9, marginTop:18, justifyContent:"flex-end" }}>
                <Btn kind="g" onClick={() => setBulkOpen(false)}>Cancel</Btn>
                <Btn kind="p" icon={busy ? RefreshCw : Check} onClick={generate} disabled={busy}>{busy ? "Generating…" : `Generate ${bulkQty} serials`}</Btn>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

/* ==========================================================================
   PACKAGING  — the guided run
   ========================================================================== */
const PKG_STEPS = [
  { t:"Select product", d:"Packaging order" },
  { t:"Fetch SAP data", d:"S/4HANA pull" },
  { t:"Unit serials",   d:"Generate & verify" },
  { t:"Master carton",  d:"Aggregate packs" },
  { t:"Print labels",   d:"Unit + carton" },
  { t:"Complete",       d:"Close the run" },
];

function Packaging({ db, toast, go }) {
  const [step, setStep] = useState(0);
  const [busy, setBusy] = useState(false);
  const [qty, setQty] = useState(20);
  const [cartonSize, setCartonSize] = useState(20);
  const [issued, setIssued] = useState([]);
  const [carton, setCarton] = useState(null);
  const p = prodByPid(db.pid);
  const nextSeq = db.seq[db.pid];

  const run = (fn, ms = 780) => { setBusy(true); setTimeout(() => { fn(); setBusy(false); }, ms); };

  const doSerials = () => run(() => {
    const made = db.generate(db.pid, Number(qty));
    setIssued(made); setStep(3);
    toast(`${made.length} unit serials issued`);
  });
  const doCarton = () => run(() => {
    const c = db.aggregate(db.pid, issued.slice(0, Number(cartonSize)).map(s => s.serial), Number(cartonSize));
    setCarton(c); setStep(4);
    toast(`Master carton ${c.id} closed with ${c.serials.length} packs`);
  });

  return (
    <div>
      <PageHead crumbs={["Home","Packaging"]} title="Packaging run"
        sub="Six steps from a released order to a closed, labelled master carton. Each step writes to the audit trail before the next one unlocks."
        actions={<>
          {step > 0 && <Btn kind="g" icon={ChevronLeft} onClick={() => setStep(s => s-1)}>Back</Btn>}
          <Btn kind="g" icon={X} onClick={() => { setStep(0); setIssued([]); setCarton(null); }}>Reset run</Btn>
        </>} />

      <Card className="pad" style={{ marginBottom:14 }}><Stepper steps={PKG_STEPS} current={step} /></Card>

      {/* STEP 1 */}
      {step === 0 && (
        <Card className="fade">
          <CardHead title="Step 1 · Select the packaging order" icon={ClipboardList} sub="The product ID on the order becomes the serial prefix" />
          <div style={{ padding:18 }}>
            <div className="grid g-3">
              {PRODUCTS.map(x => (
                <button key={x.pid} onClick={() => db.setPid(x.pid)} style={{ textAlign:"left", border:0, background:"transparent", padding:0 }}>
                  <div className="card pad" style={{ borderColor: db.pid===x.pid ? "var(--nova)" : undefined, boxShadow: db.pid===x.pid ? "0 0 0 3px rgba(30,79,216,.12)" : undefined, transition:"all .16s" }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:8 }}>
                      <div className="mono" style={{ fontSize:12, color:"var(--nova)", fontWeight:700 }}>ID {x.pid}</div>
                      {db.pid===x.pid && <Chip tone="c-info" icon={Check}>Selected</Chip>}
                    </div>
                    <div style={{ fontWeight:600, fontSize:13.5, marginTop:8 }}>{x.name}</div>
                    <div style={{ fontSize:11.5, color:"var(--slate)", marginTop:4 }}>{x.form}</div>
                    <div className="mono" style={{ fontSize:11, color:"var(--slate-2)", marginTop:9 }}>{x.pkgOrder} · {x.batch}</div>
                  </div>
                </button>
              ))}
            </div>
            <div style={{ display:"flex", justifyContent:"flex-end", marginTop:18 }}>
              <Btn kind="p" icon={ArrowRight} onClick={() => setStep(1)}>Continue with {db.pid}</Btn>
            </div>
          </div>
        </Card>
      )}

      {/* STEP 2 */}
      {step === 1 && (
        <Card className="fade">
          <CardHead title="Step 2 · Fetch master data from SAP S/4HANA" icon={Database}
            sub="Ten fields, read-only" right={<Chip tone={busy ? "c-warn" : "c-ok"} icon={busy ? RefreshCw : Wifi}>{busy ? "Pulling" : "Connected"}</Chip>} />
          <div style={{ padding:18 }}>
            {busy ? <div className="grid g-3">{Array.from({length:10}).map((_,i) => <div key={i} className="sk" style={{ height:62, borderRadius:12 }} />)}</div> : (
              <div className="grid g-3 rise">
                <SapField k="Material code" v={p.material} /><SapField k="Product name" v={p.name} mono={false} />
                <SapField k="Batch number" v={p.batch} /><SapField k="Manufacturing date" v={p.mfg} />
                <SapField k="Expiry date" v={p.exp} /><SapField k="GTIN number" v={p.gtin} />
                <SapField k="Packaging order" v={p.pkgOrder} /><SapField k="Production order" v={p.prodOrder} />
                <SapField k="Plant" v={p.plant} mono={false} /><SapField k="Storage location" v={p.sloc} mono={false} />
              </div>
            )}
            <div style={{ borderTop:"1px solid var(--line-2)", marginTop:18, paddingTop:18 }}>
              <div style={{ fontSize:12.5, fontWeight:600, marginBottom:12 }}>Captured on the line</div>
              <div className="grid" style={{ gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))" }}>
                <Field label="Operator name" req><Select options={OPERATORS} value={db.ctx.operator} onChange={e => db.setCtx({ ...db.ctx, operator:e.target.value })} /></Field>
                <Field label="Production line" req hint="Internal only — excluded from labels."><Select options={LINES} value={db.ctx.line} onChange={e => db.setCtx({ ...db.ctx, line:e.target.value })} /></Field>
                <Field label="Shift" req><Select options={SHIFTS} value={db.ctx.shift} onChange={e => db.setCtx({ ...db.ctx, shift:e.target.value })} /></Field>
                <Field label="Packaging machine" req><Select options={MACHINES} value={db.ctx.machine} onChange={e => db.setCtx({ ...db.ctx, machine:e.target.value })} /></Field>
                <Field label="Packaging start" req><Input type="time" value={db.ctx.start} onChange={e => db.setCtx({ ...db.ctx, start:e.target.value })} /></Field>
                <Field label="Packaging end"><Input type="time" value={db.ctx.end} onChange={e => db.setCtx({ ...db.ctx, end:e.target.value })} /></Field>
              </div>
              <div style={{ marginTop:14 }}><Field label="Remarks"><Input placeholder="Optional" value={db.ctx.remarks} onChange={e => db.setCtx({ ...db.ctx, remarks:e.target.value })} /></Field></div>
            </div>
            <div style={{ display:"flex", justifyContent:"space-between", gap:9, marginTop:18, flexWrap:"wrap" }}>
              <Btn kind="g" icon={RefreshCw} onClick={() => run(() => toast("Master data refreshed"))} disabled={busy}>Re-pull from SAP</Btn>
              <Btn kind="p" icon={ArrowRight} onClick={() => setStep(2)} disabled={busy}>Continue to serialization</Btn>
            </div>
          </div>
        </Card>
      )}

      {/* STEP 3 */}
      {step === 2 && (
        <div className="grid fade" style={{ gridTemplateColumns:"minmax(0,1fr) minmax(0,1.1fr)" }}>
          <Card>
            <CardHead title="Step 3 · Generate unit serials" icon={Barcode} sub={`Product ${db.pid} · next sequence #${nextSeq}`} />
            <div style={{ padding:18 }}>
              <Field label="Unit packs in this run" req hint={`Issues ${unitSerial(db.pid, nextSeq)} through ${unitSerial(db.pid, nextSeq + Number(qty||1) - 1)}.`}>
                <Input type="number" min="1" max="500" value={qty} onChange={e => setQty(e.target.value)} />
              </Field>
              <div style={{ display:"flex", gap:8, marginTop:12, flexWrap:"wrap" }}>
                {[10,20,50,100].map(n => <button key={n} className={`btn btn-sm ${Number(qty)===n?"btn-s":"btn-g"}`} onClick={() => setQty(n)}>{n} packs</button>)}
              </div>
              <div style={{ marginTop:18, padding:14, background:"var(--mist)", borderRadius:12 }}>
                <div style={{ fontSize:10.5, textTransform:"uppercase", letterSpacing:".08em", color:"var(--slate-2)", fontWeight:700, marginBottom:9 }}>Preview</div>
                <div className="ladder">
                  {[0,1,2].map(i => (
                    <div key={i} className="lrow">
                      <span className="sq">#{nextSeq+i}</span>
                      <SerialText value={unitSerial(db.pid, nextSeq+i)} pid={db.pid} />
                    </div>
                  ))}
                  <div style={{ textAlign:"center", color:"var(--slate-2)", fontSize:16, letterSpacing:".3em" }}>⋮</div>
                  <div className="lrow">
                    <span className="sq">#{nextSeq + Number(qty||1) - 1}</span>
                    <SerialText value={unitSerial(db.pid, nextSeq + Number(qty||1) - 1)} pid={db.pid} />
                  </div>
                </div>
              </div>
              <div style={{ display:"flex", justifyContent:"flex-end", marginTop:18 }}>
                <Btn kind="p" icon={busy ? RefreshCw : Zap} onClick={doSerials} disabled={busy}>{busy ? "Issuing…" : `Generate ${qty} serials`}</Btn>
              </div>
            </div>
          </Card>
          <Card>
            <CardHead title="Serial format" icon={Info} sub="Why this scheme survives an audit" />
            <div style={{ padding:18, fontSize:13, color:"var(--slate)", lineHeight:1.65 }}>
              <div style={{ display:"flex", gap:11, alignItems:"center", padding:"12px 14px", background:"var(--nova-soft)", borderRadius:12, marginBottom:14 }}>
                <SerialText value={unitSerial(db.pid, nextSeq)} pid={db.pid} size={21} />
              </div>
              {[
                ["Digits 1–4", `Product ID ${db.pid}. Fixed for the life of the material.`, "var(--nova)"],
                ["Digits 5–13", "Nine-digit running sequence, zero padded. One billion packs per product before the space is exhausted.", "var(--ink)"],
                ["Independence", "Product 1005 starts again at 1005000000001. Two products can never produce the same number.", "var(--violet)"],
                ["Commitment", "A serial is written to the register before it reaches a printer, so a print failure can never silently reuse a number.", "var(--mint)"],
              ].map(([k,v,c]) => (
                <div key={k} style={{ display:"flex", gap:11, marginBottom:13 }}>
                  <div style={{ width:4, borderRadius:4, background:c, flex:"0 0 4px" }} />
                  <div><div style={{ fontWeight:600, color:"var(--ink)", fontSize:12.5 }}>{k}</div><div style={{ fontSize:12.5 }}>{v}</div></div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* STEP 4 */}
      {step === 3 && (
        <div className="grid fade" style={{ gridTemplateColumns:"minmax(0,.95fr) minmax(0,1.05fr)" }}>
          <Card>
            <CardHead title="Step 4 · Build the master carton" icon={Boxes} sub={`${issued.length} unit packs available to aggregate`} />
            <div style={{ padding:18 }}>
              <Field label="Unit packs per carton" req>
                <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                  {CARTON_SIZES.map(n => (
                    <button key={n} onClick={() => setCartonSize(n)} className={`btn ${cartonSize===n?"btn-s":"btn-g"}`} style={{ flex:"1 0 auto", justifyContent:"center" }}>{n}</button>
                  ))}
                </div>
              </Field>
              <div className="hint" style={{ marginTop:8 }}>
                {cartonSize > issued.length
                  ? `Only ${issued.length} packs were issued in this run — the carton will close short.`
                  : `${cartonSize} of ${issued.length} packs go into this carton; the remainder stay loose for the next one.`}
              </div>
              <div style={{ marginTop:18, padding:14, background:"linear-gradient(150deg,#180C42,#2B1673)", borderRadius:12, color:"#fff" }}>
                <div style={{ fontSize:10.5, textTransform:"uppercase", letterSpacing:".08em", color:"#8FA6C9", fontWeight:700 }}>Carton number to be issued</div>
                <div className="serial" style={{ fontSize:23, marginTop:7 }}>
                  <span style={{ color:"#A796EE" }}>{db.pid}</span><span style={{ color:"#45E3DC" }}>5</span>
                  <span style={{ color:"#6A5AA8" }}>{String(db.cseq[db.pid]).padStart(8,"0").replace(/[1-9]\d*$/,"")}</span>
                  <span style={{ color:"#fff" }}>{db.cseq[db.pid]}</span>
                </div>
                <div style={{ fontSize:11.5, color:"#9FB4D6", marginTop:9 }}>
                  Product ID · carton marker <span className="mono" style={{ color:"#45E3DC" }}>5</span> · 8-digit carton sequence. The marker is what tells a scanner it is holding a parent, not a unit.
                </div>
              </div>
              <div style={{ display:"flex", justifyContent:"flex-end", marginTop:18 }}>
                <Btn kind="p" icon={busy ? RefreshCw : Boxes} onClick={doCarton} disabled={busy}>{busy ? "Aggregating…" : "Close carton"}</Btn>
              </div>
            </div>
          </Card>
          <Card>
            <CardHead title="Packs waiting to be aggregated" icon={Barcode} sub={`${issued.length} issued in this run`} />
            <div style={{ maxHeight:330, overflowY:"auto", padding:"12px 18px" }}>
              <div className="ladder">
                {issued.map((s, i) => (
                  <div key={s.serial} className="lrow">
                    <span className="sq">{i+1}</span>
                    <SerialText value={s.serial} pid={s.pid} size={13.5} />
                    <span style={{ marginLeft:"auto" }}>
                      {i < cartonSize ? <Chip tone="c-info" icon={ArrowRight}>To carton</Chip> : <Chip tone="c-mut">Loose</Chip>}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* STEP 5 */}
      {step === 4 && carton && (
        <div className="fade">
          <div className="grid" style={{ gridTemplateColumns:"minmax(0,1fr) minmax(0,1fr)", marginBottom:14 }}>
            <Card><CardHead title="Unit pack label" icon={Printer} sub="One per saleable pack" />
              <div style={{ padding:18 }}><UnitLabel serial={issued[0]?.serial} p={p} /></div>
            </Card>
            <Card><CardHead title="Master carton label" icon={Boxes} sub="One per closed carton" />
              <div style={{ padding:18 }}><CartonLabel carton={carton} p={p} /></div>
            </Card>
          </div>
          <Card className="pad" style={{ display:"flex", gap:10, justifyContent:"space-between", alignItems:"center", flexWrap:"wrap" }}>
            <div style={{ fontSize:12.5, color:"var(--slate)" }}>
              Sent to <strong style={{ color:"var(--ink)" }}>Zebra ZT411 (LINE-01)</strong> · {issued.length} unit labels + 1 carton label
            </div>
            <div style={{ display:"flex", gap:9 }}>
              <Btn kind="g" icon={Eye} onClick={() => go("labels")}>Open print centre</Btn>
              <Btn kind="p" icon={Printer} onClick={() => { toast(`${issued.length + 1} labels sent to printer`); setStep(5); }}>Print all labels</Btn>
            </div>
          </Card>
        </div>
      )}

      {/* STEP 6 */}
      {step === 5 && carton && (
        <Card className="fade">
          <div style={{ padding:"34px 24px", textAlign:"center" }}>
            <div style={{ width:62, height:62, borderRadius:20, background:"var(--mint-soft)", color:"var(--mint)", display:"grid", placeItems:"center", margin:"0 auto 16px" }}><CircleCheck size={30} /></div>
            <h2 style={{ fontSize:20 }}>Packaging run complete</h2>
            <p style={{ color:"var(--slate)", fontSize:13, maxWidth:"46ch", margin:"8px auto 0" }}>
              {issued.length} unit packs serialized and {carton.serials.length} of them aggregated into carton {carton.id}. The parent–child record is committed and the labels are printed.
            </p>
            <div className="grid g-3" style={{ maxWidth:660, margin:"24px auto 0", textAlign:"left" }}>
              <SapField k="Master carton" v={carton.id} />
              <SapField k="Unit packs inside" v={String(carton.serials.length)} />
              <SapField k="Operator" v={db.ctx.operator} mono={false} />
              <SapField k="Line (internal)" v={db.ctx.line} mono={false} />
              <SapField k="Machine" v={db.ctx.machine} mono={false} />
              <SapField k="Batch" v={p.batch} />
            </div>
            <div style={{ display:"flex", gap:9, justifyContent:"center", marginTop:24, flexWrap:"wrap" }}>
              <Btn kind="g" icon={Boxes} onClick={() => go("cartons")}>View carton tree</Btn>
              <Btn kind="g" icon={ScanLine} onClick={() => { db.setScanPrefill(carton.id); go("scanner"); }}>Verify by scan</Btn>
              <Btn kind="p" icon={Play} onClick={() => { setStep(0); setIssued([]); setCarton(null); }}>Start another run</Btn>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

/* ==========================================================================
   LABELS
   Production line is deliberately absent from both label artworks.
   ========================================================================== */
function UnitLabel({ serial, p }) {
  if (!serial) return <Empty icon={Printer} title="No serial selected" body="Pick a serial from the register to render its unit pack label." />;
  return (
    <div className="label-sheet">
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:12 }}>
        <div>
          <SuperNovaLogo height={20} />
          <div style={{ fontSize:8.5, letterSpacing:".1em", textTransform:"uppercase", color:"#6B7C97", fontWeight:700, marginTop:6 }}>Unit pack · saleable unit</div>
        </div>
        <div style={{ textAlign:"right" }}>
          <div className="lbl-k">Rx only</div>
          <div style={{ fontSize:8.5, color:"#6B7C97", marginTop:3 }}>Store below 25°C</div>
        </div>
      </div>
      <div className="lbl-rule" />
      <div style={{ fontFamily:"Sora", fontWeight:600, fontSize:15, lineHeight:1.25 }}>{p.name}</div>
      <div style={{ fontSize:10, color:"#6B7C97", marginTop:2 }}>{p.form}</div>
      <div className="lbl-rule" />
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"9px 14px" }}>
        <div><div className="lbl-k">GTIN (01)</div><div className="lbl-v">{p.gtin}</div></div>
        <div><div className="lbl-k">Batch (10)</div><div className="lbl-v">{p.batch}</div></div>
        <div><div className="lbl-k">Mfg (11)</div><div className="lbl-v">{p.mfg}</div></div>
        <div><div className="lbl-k">Expiry (17)</div><div className="lbl-v" style={{ color:"#B01B28" }}>{p.exp}</div></div>
      </div>
      <div className="perf" />
      <div style={{ display:"flex", gap:14, alignItems:"center" }}>
        <DataMatrix value={`01${p.gtin}21${serial}10${p.batch}17${p.exp.replace(/-/g,"").slice(2)}`} size={96} />
        <div style={{ minWidth:0, flex:1 }}>
          <div className="lbl-k">Serial number (21)</div>
          <div className="mono" style={{ fontSize:15, fontWeight:700, letterSpacing:".04em", marginTop:3 }}>{serial}</div>
          <div style={{ marginTop:9 }}><Barcode1D value={serial} height={34} showText={false} /></div>
          <div style={{ fontSize:8, color:"#6B7C97", marginTop:6, lineHeight:1.4 }}>
            (01){p.gtin}(21){serial}(10){p.batch}(17){p.exp.replace(/-/g,"").slice(2)}
          </div>
        </div>
      </div>
    </div>
  );
}

function CartonLabel({ carton, p }) {
  if (!carton) return <Empty icon={Boxes} title="No carton selected" body="Choose a master carton to render its shipping label." />;
  return (
    <div className="label-sheet carton">
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:12 }}>
        <div>
          <SuperNovaLogo height={20} />
          <div style={{ fontSize:8.5, letterSpacing:".1em", textTransform:"uppercase", color:"#6B7C97", fontWeight:700, marginTop:6 }}>Master carton · aggregated parent</div>
        </div>
        <div style={{ textAlign:"right", background:"#1E0D63", color:"#fff", borderRadius:6, padding:"6px 10px" }}>
          <div style={{ fontSize:8, letterSpacing:".1em", textTransform:"uppercase", opacity:.7, fontWeight:700 }}>Packs inside</div>
          <div style={{ fontFamily:"Sora", fontWeight:700, fontSize:20, lineHeight:1 }}>{carton.serials.length}</div>
        </div>
      </div>
      <div className="lbl-rule" />
      <div className="lbl-k">Master carton number</div>
      <div className="mono" style={{ fontSize:19, fontWeight:700, letterSpacing:".05em", marginTop:3 }}>{carton.id}</div>
      <div style={{ marginTop:9 }}><Barcode1D value={carton.id} height={44} showText={false} /></div>
      <div className="lbl-rule" />
      <div style={{ display:"flex", gap:14 }}>
        <div style={{ flex:1, display:"grid", gridTemplateColumns:"1fr 1fr", gap:"9px 12px" }}>
          <div><div className="lbl-k">Product</div><div className="lbl-v" style={{ fontFamily:"Inter", fontSize:11 }}>{p.name}</div></div>
          <div><div className="lbl-k">GTIN (01)</div><div className="lbl-v">{p.gtin}</div></div>
          <div><div className="lbl-k">Batch (10)</div><div className="lbl-v">{p.batch}</div></div>
          <div><div className="lbl-k">Expiry (17)</div><div className="lbl-v" style={{ color:"#B01B28" }}>{p.exp}</div></div>
          <div><div className="lbl-k">Packaging date</div><div className="lbl-v">{carton.ts.slice(0,10)}</div></div>
          <div><div className="lbl-k">Pack size</div><div className="lbl-v">{carton.size} units</div></div>
        </div>
        <DataMatrix value={`00${carton.id}02${p.gtin}37${carton.serials.length}10${p.batch}`} size={92} />
      </div>
      <div className="perf" />
      <div className="lbl-k" style={{ marginBottom:5 }}>Contents · first and last serial</div>
      <div className="mono" style={{ fontSize:9.5, color:"#3B4A63", lineHeight:1.6 }}>
        {carton.serials[0]} → {carton.serials[carton.serials.length-1]}
        <span style={{ color:"#8494AC" }}> · {carton.serials.length} sequential unit serials</span>
      </div>
    </div>
  );
}

/* ==========================================================================
   MASTER CARTONS  — parent / child tree
   ========================================================================== */
function CartonTree({ carton, db, defaultOpen = false, onPrint }) {
  const [open, setOpen] = useState(defaultOpen);
  const p = prodByPid(carton.pid);
  const kids = db.serials.filter(s => s.carton === carton.id);
  return (
    <div className="tnode">
      <div className="tparent" onClick={() => setOpen(o => !o)} role="button" tabIndex={0}
           onKeyDown={e => (e.key === "Enter" || e.key === " ") && setOpen(o => !o)}>
        <div style={{ width:26, height:26, borderRadius:8, background:"var(--violet-soft)", color:"var(--violet)", display:"grid", placeItems:"center", flex:"0 0 26px" }}>
          {open ? <ChevronDown size={15} /> : <ChevronRight size={15} />}
        </div>
        <Boxes size={17} color="var(--violet)" />
        <div style={{ minWidth:0 }}>
          <SerialText value={carton.id} pid={carton.pid} carton size={14.5} />
          <div style={{ fontSize:11.5, color:"var(--slate)", marginTop:2 }}>{p.name} · {p.batch}</div>
        </div>
        <div style={{ marginLeft:"auto", display:"flex", gap:9, alignItems:"center", flexWrap:"wrap" }}>
          <Chip tone="c-vio" icon={Layers}>{carton.serials.length} unit packs</Chip>
          <St v={carton.status} />
          <span className="mono" style={{ fontSize:11.5, color:"var(--slate-2)" }}>{carton.ts}</span>
          {onPrint && <button className="iconbtn" style={{ width:29, height:29 }} title="Print carton label"
            onClick={e => { e.stopPropagation(); onPrint(carton); }}><Printer size={13} /></button>}
        </div>
      </div>
      {open && (
        <div className="tkids fade">
          {kids.length ? kids.map((s, i) => (
            <div key={s.serial} className="tkid">
              <span className="mono" style={{ fontSize:10.5, color:"var(--slate-2)", width:28 }}>{i+1}</span>
              <Barcode size={14} color="var(--nova)" />
              <SerialText value={s.serial} pid={s.pid} size={13.5} />
              <div style={{ marginLeft:"auto", display:"flex", gap:9, alignItems:"center" }}>
                <St v={s.status} />
                <span style={{ fontSize:11.5, color:"var(--slate-2)" }}>{s.operator}</span>
                <span className="mono" style={{ fontSize:11, color:"var(--slate-2)" }}>{s.ts}</span>
              </div>
            </div>
          )) : <div style={{ fontSize:12, color:"var(--slate-2)", padding:"6px 2px" }}>Child records were archived with the shipment.</div>}
        </div>
      )}
    </div>
  );
}

function MasterCartons({ db, toast, go }) {
  const [q, setQ] = useState("");
  const [fPid, setFPid] = useState("All products");
  const rows = db.cartons.filter(c => c.id.includes(q) && (fPid === "All products" || c.pid === fPid));
  const totalPacks = db.cartons.reduce((a,c) => a + c.serials.length, 0);
  return (
    <div>
      <PageHead crumbs={["Home","Master Cartons"]} title="Master cartons"
        sub="Each carton is a parent record holding the exact unit serials packed inside it. Expand a carton to walk its children — this is the aggregation evidence a regulator asks for."
        actions={<><Btn kind="g" icon={FileSpreadsheet} onClick={() => toast("Carton_report.xlsx downloaded")}>Export</Btn>
                    <Btn kind="p" icon={Plus} onClick={() => go("packaging")}>New carton</Btn></>} />

      <div className="grid g-kpi" style={{ marginBottom:14 }}>
        <KPI label="Cartons closed" value={nf(db.cartons.length)} delta="Across 5 products" icon={Boxes} tone="violet" trend={false} />
        <KPI label="Packs aggregated" value={nf(totalPacks)} delta="Full parent–child trail" icon={Layers} tone="nova" trend={false} />
        <KPI label="Awaiting dispatch" value={nf(db.cartons.filter(c => c.status === "Closed").length)} delta="At the dock" icon={MoveRight} tone="spark" trend={false} />
        <KPI label="Dispatched" value={nf(db.cartons.filter(c => c.status === "Dispatched").length)} delta="Handed to logistics" icon={CircleCheck} tone="mint" trend={false} />
      </div>

      <Card>
        <CardHead title="Aggregation tree" icon={Link2} sub="Master carton → contained unit packs"
          right={<div style={{ display:"flex", gap:9, flexWrap:"wrap" }}>
            <div className="searchbox" style={{ width:210 }}><Search size={14} color="var(--slate-2)" /><input placeholder="Carton number" value={q} onChange={e => setQ(e.target.value)} /></div>
            <select className="inp" style={{ width:"auto", padding:"7px 10px", fontSize:12.5 }} value={fPid} onChange={e => setFPid(e.target.value)}>
              {["All products", ...PRODUCTS.map(x => x.pid)].map(o => <option key={o}>{o}</option>)}
            </select>
          </div>} />
        <div style={{ padding:16, display:"flex", flexDirection:"column", gap:10 }} className="tree">
          {rows.map((c, i) => <CartonTree key={c.id} carton={c} db={db} defaultOpen={i === 0}
            onPrint={(cc) => { db.setLabelCarton(cc.id); go("labels"); }} />)}
        </div>
        {!rows.length && <Empty icon={Boxes} title="No cartons match" body="Clear the filters, or close a carton from a packaging run to see it here." action={<Btn kind="g" icon={X} onClick={() => { setQ(""); setFPid("All products"); }}>Clear filters</Btn>} />}
      </Card>
    </div>
  );
}

/* ==========================================================================
   LABEL PRINTING CENTRE
   ========================================================================== */
function LabelPrinting({ db, toast }) {
  const [tab, setTab] = useState("unit");
  const [serial, setSerial] = useState(db.labelSerial || db.serials[0]?.serial);
  const [cartonId, setCartonId] = useState(db.labelCarton || db.cartons[0]?.id);
  const [copies, setCopies] = useState(1);
  const [printer, setPrinter] = useState("Zebra ZT411 · LINE-01");

  useEffect(() => { if (db.labelSerial) { setSerial(db.labelSerial); setTab("unit"); } }, [db.labelSerial]);
  useEffect(() => { if (db.labelCarton) { setCartonId(db.labelCarton); setTab("carton"); } }, [db.labelCarton]);

  const rec = db.serials.find(s => s.serial === serial) || db.serials[0];
  const carton = db.cartons.find(c => c.id === cartonId) || db.cartons[0];
  const p = prodByPid(tab === "unit" ? rec?.pid : carton?.pid);

  return (
    <div>
      <PageHead crumbs={["Home","Label Printing"]} title="Label printing"
        sub="What reaches the printer is exactly what you see here. Production line is captured in the record but never rendered on artwork."
        actions={<>
          <Btn kind="g" icon={FileText} onClick={() => toast("Label artwork exported as PDF")}>Export PDF</Btn>
          <Btn kind="p" icon={Printer} onClick={() => toast(`${copies} label${copies>1?"s":""} sent to ${printer}`)}>Send to printer</Btn>
        </>} />

      <div className="grid" style={{ gridTemplateColumns:"320px minmax(0,1fr)" }}>
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          <Card>
            <CardHead title="What to print" icon={Printer} />
            <div style={{ padding:18 }}>
              <div style={{ display:"flex", gap:8, marginBottom:16, background:"var(--mist)", padding:4, borderRadius:10 }}>
                {[["unit","Unit pack",Barcode],["carton","Master carton",Boxes]].map(([k,l,Ic]) => (
                  <button key={k} onClick={() => setTab(k)} className="btn btn-sm"
                    style={{ flex:1, justifyContent:"center", background: tab===k ? "#fff" : "transparent",
                             color: tab===k ? "var(--nova)" : "var(--slate)", boxShadow: tab===k ? "var(--sh-1)" : "none", border:0 }}>
                    <Ic size={13} />{l}
                  </button>
                ))}
              </div>
              {tab === "unit" ? (
                <Field label="Serial number" hint="Any serial from the register.">
                  <select className="inp mono" value={serial} onChange={e => setSerial(e.target.value)}>
                    {db.serials.slice(0, 60).map(s => <option key={s.serial} value={s.serial}>{s.serial}</option>)}
                  </select>
                </Field>
              ) : (
                <Field label="Master carton number" hint="Parent record with its child serials.">
                  <select className="inp mono" value={cartonId} onChange={e => setCartonId(e.target.value)}>
                    {db.cartons.map(c => <option key={c.id} value={c.id}>{c.id} · {c.serials.length} packs</option>)}
                  </select>
                </Field>
              )}
              <div style={{ marginTop:14 }}>
                <Field label="Printer">
                  <Select options={["Zebra ZT411 · LINE-01","Zebra ZT411 · LINE-02","Zebra ZT230 · LINE-03 (offline)","Videojet 9550 · LINE-04"]} value={printer} onChange={e => setPrinter(e.target.value)} />
                </Field>
              </div>
              {printer.includes("offline") && (
                <div style={{ marginTop:10, padding:11, background:"var(--rose-soft)", borderRadius:10, fontSize:12, color:"#B01B28", display:"flex", gap:8 }}>
                  <WifiOff size={14} style={{ flex:"0 0 14px", marginTop:1 }} />
                  This printer is not responding. Choose another printer, or restart the ZT230 print server on LINE-03.
                </div>
              )}
              <div style={{ marginTop:14 }}>
                <Field label="Copies"><Input type="number" min="1" max="200" value={copies} onChange={e => setCopies(Number(e.target.value))} /></Field>
              </div>
            </div>
          </Card>

          <Card>
            <CardHead title="Encoded data" icon={Barcode} sub="GS1 application identifiers" />
            <div style={{ padding:18, display:"flex", flexDirection:"column", gap:10 }}>
              {(tab === "unit"
                ? [["01","GTIN",p.gtin],["21","Serial",serial],["10","Batch",p.batch],["17","Expiry",p.exp.replace(/-/g,"").slice(2)]]
                : [["00","SSCC / carton",carton?.id],["02","Contained GTIN",p.gtin],["37","Count",String(carton?.serials.length)],["10","Batch",p.batch]]
              ).map(([ai,k,v]) => (
                <div key={ai} style={{ display:"flex", alignItems:"center", gap:11 }}>
                  <span className="chip c-info mono" style={{ minWidth:34, justifyContent:"center" }}>{ai}</span>
                  <span style={{ fontSize:12, color:"var(--slate)", minWidth:96 }}>{k}</span>
                  <span className="mono" style={{ fontSize:12.5, fontWeight:600, marginLeft:"auto" }}>{v}</span>
                </div>
              ))}
              <div className="hint" style={{ marginTop:4 }}>Barcode and DataMatrix here are visual previews. Production artwork is rendered by the GS1 encoder in the label service.</div>
            </div>
          </Card>
        </div>

        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          <Card>
            <CardHead title="Print preview" icon={Eye}
              sub={tab === "unit" ? "Unit pack label · 60 × 40 mm" : "Master carton label · 100 × 75 mm"}
              right={<Chip tone="c-mut" icon={Info}>Actual size scales to stock</Chip>} />
            <div style={{ padding:22, background:"repeating-linear-gradient(45deg,#F7F9FD,#F7F9FD 10px,#F2F5FA 10px,#F2F5FA 20px)", display:"grid", placeItems:"center" }}>
              <div style={{ width:"100%", maxWidth: tab === "unit" ? 420 : 520 }} className="fade" key={tab + serial + cartonId}>
                {tab === "unit" ? <UnitLabel serial={serial} p={p} /> : <CartonLabel carton={carton} p={p} />}
              </div>
            </div>
          </Card>

          <div className="grid g-2">
            <Card>
              <CardHead title="1D barcode preview" icon={Barcode} sub="GS1-128, human readable below" />
              <div style={{ padding:20 }}><Barcode1D value={tab === "unit" ? serial : carton?.id} height={62} /></div>
            </Card>
            <Card>
              <CardHead title="2D DataMatrix preview" icon={Cpu} sub="GS1 DataMatrix, ECC 200" />
              <div style={{ padding:20, display:"flex", gap:16, alignItems:"center" }}>
                <DataMatrix value={tab === "unit" ? serial : carton?.id} size={118} />
                <div style={{ fontSize:12, color:"var(--slate)", lineHeight:1.6 }}>
                  Carries the full GS1 element string, so a single scan returns GTIN, serial, batch and expiry together.
                  <div className="mono" style={{ fontSize:10.5, marginTop:9, color:"var(--ink-2)", wordBreak:"break-all" }}>
                    {tab === "unit" ? `(01)${p.gtin}(21)${serial}` : `(00)${carton?.id}(37)${carton?.serials.length}`}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   BARCODE SCANNER
   ========================================================================== */
function Scanner({ db, toast }) {
  const [val, setVal] = useState(db.scanPrefill || "");
  const [result, setResult] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [openKids, setOpenKids] = useState(true);
  const inputRef = useRef(null);

  useEffect(() => { inputRef.current?.focus(); }, []);
  useEffect(() => { if (db.scanPrefill) { setVal(db.scanPrefill); doScan(db.scanPrefill); } }, [db.scanPrefill]);

  function doScan(raw) {
    const v = (raw ?? val).trim();
    if (!v) return;
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      const carton = db.cartons.find(c => c.id === v);
      if (carton) { setResult({ kind:"carton", carton }); toast(`Master carton ${v} decoded`); return; }
      const unit = db.serials.find(s => s.serial === v);
      if (unit) { setResult({ kind:"unit", unit }); toast(`Unit pack ${v} decoded`); return; }
      setResult({ kind:"miss", v });
    }, 620);
  }

  const sampleUnit = db.serials.find(s => s.carton)?.serial;
  const sampleCarton = db.cartons[0]?.id;

  return (
    <div>
      <PageHead crumbs={["Home","Barcode Scanner"]} title="Barcode scanner"
        sub="Point a handheld at any unit pack or carton. The system decides from the number itself whether it is holding a child or a parent."
        actions={<Chip tone="c-ok" icon={ScanLine}>Zebra DS8178 connected</Chip>} />

      <div className="grid" style={{ gridTemplateColumns:"minmax(0,380px) minmax(0,1fr)" }}>
        <Card>
          <CardHead title="Scan input" icon={ScanLine} sub="Keyboard-wedge or manual entry" />
          <div style={{ padding:18 }}>
            <div className="scanzone" style={{ marginBottom:16 }}>
              {scanning && <div className="scanline" />}
              <ScanLine size={34} color="var(--nova)" style={{ marginBottom:10 }} />
              <div style={{ fontSize:13, fontWeight:600 }}>{scanning ? "Decoding…" : "Ready to scan"}</div>
              <div style={{ fontSize:11.5, color:"var(--slate)", marginTop:4 }}>GS1 DataMatrix · GS1-128 · Code 128</div>
            </div>
            <Field label="Serial or carton number">
              <input ref={inputRef} className="inp mono" placeholder="1004000000001" value={val}
                onChange={e => setVal(e.target.value)} onKeyDown={e => e.key === "Enter" && doScan()} />
            </Field>
            <div style={{ display:"flex", gap:9, marginTop:14 }}>
              <Btn kind="p" icon={ScanLine} onClick={() => doScan()} disabled={scanning} style={{ flex:1, justifyContent:"center" }}>Scan</Btn>
              <Btn kind="g" icon={X} onClick={() => { setVal(""); setResult(null); inputRef.current?.focus(); }}>Clear</Btn>
            </div>
            <div style={{ borderTop:"1px solid var(--line-2)", marginTop:18, paddingTop:16 }}>
              <div style={{ fontSize:11.5, fontWeight:600, color:"var(--slate)", marginBottom:9 }}>Try one of these</div>
              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                <button className="btn btn-g btn-sm mono" style={{ justifyContent:"space-between" }} onClick={() => { setVal(sampleUnit); doScan(sampleUnit); }}>
                  {sampleUnit}<span style={{ fontFamily:"Inter", color:"var(--slate-2)" }}>unit pack</span>
                </button>
                <button className="btn btn-g btn-sm mono" style={{ justifyContent:"space-between" }} onClick={() => { setVal(sampleCarton); doScan(sampleCarton); }}>
                  {sampleCarton}<span style={{ fontFamily:"Inter", color:"var(--slate-2)" }}>master carton</span>
                </button>
                <button className="btn btn-g btn-sm mono" style={{ justifyContent:"space-between" }} onClick={() => { setVal("1004000999999"); doScan("1004000999999"); }}>
                  1004000999999<span style={{ fontFamily:"Inter", color:"var(--slate-2)" }}>unknown</span>
                </button>
              </div>
            </div>
          </div>
        </Card>

        <div>
          {!result && !scanning && (
            <Card><Empty icon={ScanLine} title="Waiting for a scan"
              body="Scan a unit pack to see its product, batch, GTIN, dates and status. Scan a master carton to open it and list every pack inside."
              action={<Btn kind="g" icon={MoveRight} onClick={() => { setVal(sampleCarton); doScan(sampleCarton); }}>Scan a sample carton</Btn>} /></Card>
          )}
          {scanning && <Card><Skeleton rows={5} /></Card>}

          {result?.kind === "unit" && !scanning && (() => {
            const p = prodByPid(result.unit.pid);
            return (
              <div className="grid fade" style={{ gap:14 }}>
                <Card>
                  <CardHead title="Unit pack decoded" icon={CircleCheck}
                    sub="Child record · single saleable pack"
                    right={<St v={result.unit.status} />} />
                  <div style={{ padding:18 }}>
                    <div style={{ display:"flex", gap:18, flexWrap:"wrap", alignItems:"center", marginBottom:18 }}>
                      <DataMatrix value={result.unit.serial} size={92} />
                      <div>
                        <div style={{ fontSize:11, textTransform:"uppercase", letterSpacing:".08em", color:"var(--slate-2)", fontWeight:700 }}>Serial number</div>
                        <SerialText value={result.unit.serial} pid={result.unit.pid} size={24} />
                        <div style={{ marginTop:9, display:"flex", gap:8, flexWrap:"wrap" }}>
                          <Chip tone="c-info" icon={Layers}>Product ID {result.unit.pid}</Chip>
                          {result.unit.carton
                            ? <Chip tone="c-vio" icon={Boxes}>In carton {result.unit.carton}</Chip>
                            : <Chip tone="c-mut" icon={Info}>Not yet aggregated</Chip>}
                        </div>
                      </div>
                    </div>
                    <div className="grid g-3">
                      <SapField k="Product" v={p.name} mono={false} />
                      <SapField k="Batch" v={p.batch} />
                      <SapField k="GTIN" v={p.gtin} />
                      <SapField k="Manufacturing date" v={p.mfg} />
                      <SapField k="Expiry date" v={p.exp} />
                      <SapField k="Status" v={result.unit.status} mono={false} />
                      <SapField k="Operator" v={result.unit.operator} mono={false} />
                      <SapField k="Generated" v={result.unit.ts} />
                      <SapField k="Machine" v={result.unit.machine} mono={false} />
                    </div>
                    <div className="hint" style={{ marginTop:12 }}>Production line is held against this record internally and is not exposed on the label or the scan response.</div>
                  </div>
                </Card>
              </div>
            );
          })()}

          {result?.kind === "carton" && !scanning && (() => {
            const c = result.carton; const p = prodByPid(c.pid);
            const kids = db.serials.filter(s => s.carton === c.id);
            return (
              <div className="grid fade" style={{ gap:14 }}>
                <Card>
                  <CardHead title="Master carton decoded" icon={Boxes} sub="Parent record · aggregated packs" right={<St v={c.status} />} />
                  <div style={{ padding:18 }}>
                    <div style={{ display:"flex", gap:18, flexWrap:"wrap", alignItems:"center", marginBottom:18 }}>
                      <DataMatrix value={c.id} size={92} />
                      <div>
                        <div style={{ fontSize:11, textTransform:"uppercase", letterSpacing:".08em", color:"var(--slate-2)", fontWeight:700 }}>Master carton number</div>
                        <SerialText value={c.id} pid={c.pid} carton size={24} />
                        <div style={{ marginTop:9, display:"flex", gap:8, flexWrap:"wrap" }}>
                          <Chip tone="c-vio" icon={Layers}>{c.serials.length} unit packs</Chip>
                          <Chip tone="c-info">Pack size {c.size}</Chip>
                        </div>
                      </div>
                    </div>
                    <div className="grid g-3">
                      <SapField k="Product" v={p.name} mono={false} />
                      <SapField k="Batch" v={p.batch} />
                      <SapField k="GTIN" v={p.gtin} />
                      <SapField k="Expiry date" v={p.exp} />
                      <SapField k="Packaging date" v={c.ts} />
                      <SapField k="Status" v={c.status} mono={false} />
                    </div>
                  </div>
                </Card>
                <Card>
                  <CardHead title="Unit packs inside this carton" icon={Link2} sub={`${kids.length} child records`}
                    right={<Btn kind="g" sm icon={openKids ? ChevronDown : ChevronRight} onClick={() => setOpenKids(o => !o)}>{openKids ? "Collapse" : "Expand"}</Btn>} />
                  {openKids && (
                    <div className="tblwrap" style={{ maxHeight:320, overflowY:"auto" }}>
                      <table className="tbl">
                        <thead><tr>{["#","Unit serial","Status","Operator","Machine","Generated"].map(h => <th key={h}>{h}</th>)}</tr></thead>
                        <tbody>
                          {kids.map((s, i) => (
                            <tr key={s.serial}>
                              <td className="num" style={{ color:"var(--slate-2)" }}>{i+1}</td>
                              <td><SerialText value={s.serial} pid={s.pid} size={13.5} /></td>
                              <td><St v={s.status} /></td>
                              <td style={{ fontSize:12 }}>{s.operator}</td>
                              <td style={{ fontSize:12 }}>{s.machine}</td>
                              <td className="num" style={{ color:"var(--slate)" }}>{s.ts}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </Card>
              </div>
            );
          })()}

          {result?.kind === "miss" && !scanning && (
            <Card className="fade">
              <Empty icon={TriangleAlert} title="That number is not in the register"
                body={`${result.v} was decoded cleanly but has no matching unit pack or carton. Either it belongs to another plant, or it was never committed.`}
                action={<Btn kind="g" icon={X} onClick={() => { setResult(null); setVal(""); }}>Scan again</Btn>} />
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   REPORTS
   ========================================================================== */
function Reports({ db, toast }) {
  const [sel, setSel] = useState("serialization");
  const [from, setFrom] = useState("2026-07-01");
  const [to, setTo] = useState("2026-07-30");
  const r = REPORTS.find(x => x.id === sel);

  const PREVIEW = {
    serialization: { cols:["Serial","Product","Batch","Status","Operator","Generated"],
      rows: db.serials.slice(0,7).map(s => [s.serial, prodByPid(s.pid).name, prodByPid(s.pid).batch, s.status, s.operator, s.ts]) },
    batch: { cols:["Batch","Product","Order qty","Serialized","Cartons","Yield"],
      rows: PRODUCTS.map((p,i) => [p.batch, p.name, nf(PROD_ORDERS[i].qty), nf(PROD_ORDERS[i].done), nf(SEED_CARTON[p.pid]), `${Math.round(PROD_ORDERS[i].done/PROD_ORDERS[i].qty*100)}%`]) },
    expired: { cols:["Batch","Product","Expiry","Days to expiry","Serials affected","Action"],
      rows: [["CEF-2506-A","Ceftriaxone 1g","2026-06-30","Expired","1,240","Quarantine"],
             ["PCM-2508-B","Paracetamol 650mg","2026-09-14","46","3,180","Monitor"],
             ["AMX-2509-C","Amoxicillin 500mg","2026-10-02","64","2,460","Monitor"]] },
    production: { cols:["Date","Line","Shift","Units","Cartons","Rejects","Rate"],
      rows: dailyProduction.map((d,i) => [d.d, LINES[i%4].split(" ")[0], SHIFTS[i%3].split(" ")[0], nf(d.units), nf(d.cartons), d.rejects, `${(d.rejects/d.units*100).toFixed(2)}%`]) },
    carton: { cols:["Carton","Product","Pack size","Packs inside","Packaging date","Status"],
      rows: db.cartons.slice(0,7).map(c => [c.id, prodByPid(c.pid).name, c.size, c.serials.length, c.ts, c.status]) },
    operator: { cols:["Operator","Shift","Line","Units","Cartons","Reprints","Rejection"],
      rows: OPERATORS.map((o,i) => [o, SHIFTS[i%3].split(" ")[0], LINES[i%4].split(" ")[0], nf(4200-i*640), nf(210-i*32), i%3, `${(0.12+i*0.06).toFixed(2)}%`]) },
    audit: { cols:["Timestamp","User","Role","Event","Object","Detail"],
      rows: AUDIT.map(a => [a.t, a.u, a.r, a.ev, a.obj, a.d]) },
  }[sel];

  return (
    <div>
      <PageHead crumbs={["Home","Reports"]} title="Reports"
        sub="Seven standing reports over the same serialization register. Pick a range, preview it on screen, then take it away as PDF or Excel."
        actions={<>
          <Btn kind="g" icon={Printer} onClick={() => toast("Report sent to printer")}>Print</Btn>
          <Btn kind="g" icon={FileSpreadsheet} onClick={() => toast(`${r.t}.xlsx downloaded`)}>Excel</Btn>
          <Btn kind="p" icon={FileText} onClick={() => toast(`${r.t}.pdf downloaded`)}>PDF</Btn>
        </>} />

      <div className="grid" style={{ gridTemplateColumns:"300px minmax(0,1fr)" }}>
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          <Card>
            <CardHead title="Choose a report" icon={FileBarChart} />
            <div style={{ padding:10, display:"flex", flexDirection:"column", gap:4 }}>
              {REPORTS.map(x => (
                <button key={x.id} onClick={() => setSel(x.id)}
                  style={{ display:"flex", gap:11, alignItems:"flex-start", textAlign:"left", border:0, borderRadius:10,
                           padding:"10px 12px", background: sel===x.id ? "var(--nova-soft)" : "transparent", transition:"background .16s" }}>
                  <x.ic size={16} color={sel===x.id ? "var(--nova)" : "var(--slate-2)"} style={{ marginTop:2, flex:"0 0 16px" }} />
                  <div>
                    <div style={{ fontSize:13, fontWeight:600, color: sel===x.id ? "var(--nova)" : "var(--ink)" }}>{x.t}</div>
                    <div style={{ fontSize:11.5, color:"var(--slate)", marginTop:2, lineHeight:1.45 }}>{x.d}</div>
                  </div>
                </button>
              ))}
            </div>
          </Card>
          <Card>
            <CardHead title="Range and scope" icon={Filter} />
            <div style={{ padding:18, display:"flex", flexDirection:"column", gap:13 }}>
              <Field label="From"><Input type="date" value={from} onChange={e => setFrom(e.target.value)} /></Field>
              <Field label="To"><Input type="date" value={to} onChange={e => setTo(e.target.value)} /></Field>
              <Field label="Product"><Select options={["All products", ...PRODUCTS.map(p => `${p.pid} · ${p.name}`)]} /></Field>
              <Field label="Line"><Select options={["All lines", ...LINES]} /></Field>
              <Field label="Plant"><Select options={["All plants","1100 · Karachi Plant","1200 · Lahore Plant"]} /></Field>
            </div>
          </Card>
        </div>

        <Card>
          <CardHead title={r.t} icon={r.ic} sub={`${from} to ${to} · ${PREVIEW.rows.length} rows in preview`}
            right={<Chip tone="c-mut" icon={Eye}>On-screen preview</Chip>} />
          <div style={{ padding:"16px 18px 0" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:16, paddingBottom:14, borderBottom:"2px solid var(--ink)", flexWrap:"wrap" }}>
              <div><SuperNovaLogo /><div style={{ fontSize:11.5, color:"var(--slate)", marginTop:6 }}>{r.t} · Plant 1100, Karachi</div></div>
              <div style={{ textAlign:"right", fontSize:11.5, color:"var(--slate)" }}>
                <div className="mono">{from} → {to}</div>
                <div style={{ marginTop:3 }}>Generated 2026-07-30 11:46 by Nabeel Ahmed</div>
              </div>
            </div>
          </div>
          <div className="tblwrap" style={{ padding:"0 4px" }}>
            <table className="tbl">
              <thead><tr>{PREVIEW.cols.map(c => <th key={c}>{c}</th>)}</tr></thead>
              <tbody>
                {PREVIEW.rows.map((row, i) => (
                  <tr key={i}>{row.map((cell, j) => (
                    <td key={j} className={j === 0 ? "num" : ""} style={j === 0 ? { fontWeight:600 } : { fontSize:12.5 }}>{cell}</td>
                  ))}</tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ padding:"14px 18px", borderTop:"1px solid var(--line-2)", display:"flex", justifyContent:"space-between", alignItems:"center", gap:12, flexWrap:"wrap" }}>
            <div style={{ fontSize:11.5, color:"var(--slate-2)" }}>Preview truncated. The exported file carries the full range.</div>
            <div style={{ display:"flex", gap:9 }}>
              <Btn kind="g" sm icon={FileSpreadsheet} onClick={() => toast(`${r.t}.xlsx downloaded`)}>Download Excel</Btn>
              <Btn kind="g" sm icon={FileText} onClick={() => toast(`${r.t}.pdf downloaded`)}>Download PDF</Btn>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

/* ==========================================================================
   AUDIT LOGS
   ========================================================================== */
function AuditLogs({ toast }) {
  const [q, setQ] = useState("");
  const [ev, setEv] = useState("All events");
  const events = ["All events", ...Array.from(new Set(AUDIT.map(a => a.ev)))];
  const rows = AUDIT.filter(a => `${a.u} ${a.ev} ${a.obj} ${a.d}`.toLowerCase().includes(q.toLowerCase()) && (ev === "All events" || a.ev === ev));
  const tone = { ok:"c-ok", warn:"c-warn", err:"c-err", info:"c-info" };
  return (
    <div>
      <PageHead crumbs={["Home","Audit Logs"]} title="Audit trail"
        sub="Every action leaves a record: who, what, which object, and when. Entries are append-only — nothing in this table can be edited or removed from the interface."
        actions={<>
          <Btn kind="g" icon={FileSpreadsheet} onClick={() => toast("Audit_trail_2026-07.xlsx downloaded")}>Export</Btn>
          <Btn kind="g" icon={Printer} onClick={() => toast("Audit trail sent to printer")}>Print</Btn>
        </>} />

      <div className="grid g-kpi" style={{ marginBottom:14 }}>
        <KPI label="Entries today" value="1,284" delta="Across 5 users" icon={ScrollText} tone="nova" trend={false} />
        <KPI label="Warnings" value="4" delta="2 duplicate reads" icon={TriangleAlert} tone="spark" trend={false} />
        <KPI label="Reprints raised" value="2" delta="Both QA approved" icon={Printer} tone="violet" trend={false} />
        <KPI label="Retention" value="7 yrs" delta="Immutable storage" icon={ShieldCheck} tone="mint" trend={false} />
      </div>

      <Card>
        <CardHead title="Activity log" icon={ScrollText} sub={`${rows.length} entries`}
          right={<div style={{ display:"flex", gap:9, flexWrap:"wrap" }}>
            <div className="searchbox" style={{ width:220 }}><Search size={14} color="var(--slate-2)" /><input placeholder="User, object, detail…" value={q} onChange={e => setQ(e.target.value)} /></div>
            <select className="inp" style={{ width:"auto", padding:"7px 10px", fontSize:12.5 }} value={ev} onChange={e => setEv(e.target.value)}>
              {events.map(o => <option key={o}>{o}</option>)}
            </select>
          </div>} />
        <div className="tblwrap">
          <table className="tbl">
            <thead><tr>{["Timestamp","User","Role","Event","Object","Detail"].map(h => <th key={h}>{h}</th>)}</tr></thead>
            <tbody>
              {rows.map((a,i) => (
                <tr key={i}>
                  <td className="num" style={{ color:"var(--slate)" }}>{a.t}</td>
                  <td style={{ fontWeight:600, fontSize:12.5 }}>{a.u}</td>
                  <td><Chip tone="c-mut">{a.r}</Chip></td>
                  <td><Chip tone={tone[a.sev]}>{a.ev}</Chip></td>
                  <td className="num">{a.obj}</td>
                  <td style={{ fontSize:12.5, color:"var(--slate)", whiteSpace:"normal", minWidth:280 }}>{a.d}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!rows.length && <Empty icon={ScrollText} title="No entries match" body="Try a different event type or clear the search." action={<Btn kind="g" icon={X} onClick={() => { setQ(""); setEv("All events"); }}>Clear filters</Btn>} />}
      </Card>
    </div>
  );
}

/* ==========================================================================
   USERS
   ========================================================================== */
function Users({ toast }) {
  const [q, setQ] = useState("");
  const rows = USERS.filter(u => `${u.n} ${u.e} ${u.r}`.toLowerCase().includes(q.toLowerCase()));
  const roleTone = { Admin:"c-vio", Supervisor:"c-info", Operator:"c-ok", QA:"c-warn", Warehouse:"c-mut" };
  return (
    <div>
      <PageHead crumbs={["Home","Users"]} title="Users, roles and permissions"
        sub="Five roles cover the plant floor. What a person can do follows the role, and the dashboard they land on changes with it."
        actions={<Btn kind="p" icon={Plus} onClick={() => toast("Invitation sent")}>Add user</Btn>} />

      <div className="grid" style={{ gridTemplateColumns:"minmax(0,1fr) minmax(0,1fr)", marginBottom:14 }}>
        <Card>
          <CardHead title="People" icon={UsersIcon} sub={`${rows.length} accounts`}
            right={<div className="searchbox" style={{ width:190 }}><Search size={14} color="var(--slate-2)" /><input placeholder="Search people" value={q} onChange={e => setQ(e.target.value)} /></div>} />
          <div className="tblwrap">
            <table className="tbl">
              <thead><tr>{["Name","Role","Lines","Last active","Status",""].map(h => <th key={h}>{h}</th>)}</tr></thead>
              <tbody>
                {rows.map(u => (
                  <tr key={u.e}>
                    <td>
                      <div style={{ display:"flex", gap:10, alignItems:"center" }}>
                        <div style={{ width:31, height:31, borderRadius:10, background:"var(--nova-soft)", color:"var(--nova)", display:"grid", placeItems:"center", fontSize:12, fontWeight:700, fontFamily:"Sora", flex:"0 0 31px" }}>
                          {u.n.split(" ").map(x => x[0]).join("")}
                        </div>
                        <div><div style={{ fontWeight:600, fontSize:12.5 }}>{u.n}</div><div style={{ fontSize:11, color:"var(--slate-2)" }}>{u.e}</div></div>
                      </div>
                    </td>
                    <td><Chip tone={roleTone[u.r]}>{u.r}</Chip></td>
                    <td style={{ fontSize:12 }}>{u.lines}</td>
                    <td className="num" style={{ color:"var(--slate)" }}>{u.last}</td>
                    <td><St v={u.st} /></td>
                    <td><button className="iconbtn" style={{ width:29, height:29 }} title="Edit" onClick={() => toast(`Editing ${u.n}`)}><Pencil size={13} /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          <CardHead title="Permission matrix" icon={ShieldCheck} sub="What each role is allowed to do" />
          <div className="tblwrap">
            <table className="tbl">
              <thead><tr><th>Capability</th>{["Admin","Supervisor","Operator","QA","Warehouse"].map(h => <th key={h} style={{ textAlign:"center" }}>{h}</th>)}</tr></thead>
              <tbody>
                {ROLE_MATRIX.map(m => (
                  <tr key={m.cap}>
                    <td style={{ fontSize:12.5, fontWeight:500, whiteSpace:"normal" }}>{m.cap}</td>
                    {["Admin","Supervisor","Operator","QA","Warehouse"].map(rk => (
                      <td key={rk} style={{ textAlign:"center" }}>
                        {m[rk]
                          ? <Check size={15} color="var(--mint)" strokeWidth={3} />
                          : <span style={{ color:"#D3DAE6" }}>—</span>}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <Card>
        <CardHead title="What each role sees first" icon={LayoutDashboard} sub="Dashboard widgets change with the role" />
        <div style={{ padding:18 }} className="grid g-3">
          {[
            ["Admin", "Plant-wide output, all lines, SAP health, full audit reach", UsersIcon, "c-vio"],
            ["Supervisor", "Line performance, holds, reprint approvals, operator output", Gauge, "c-info"],
            ["Operator", "This shift only: units, cartons closed, rejects, running machine", Factory, "c-ok"],
            ["QA", "Verification scans, quarantine, reprint queue, batch release", ShieldCheck, "c-warn"],
            ["Warehouse", "Cartons at the dock, dispatch queue, aggregation errors", Boxes, "c-mut"],
          ].map(([r,d,Ic,tone]) => (
            <div key={r} className="card pad">
              <div style={{ display:"flex", gap:9, alignItems:"center", marginBottom:8 }}><Ic size={16} color="var(--slate)" /><Chip tone={tone}>{r}</Chip></div>
              <div style={{ fontSize:12.5, color:"var(--slate)", lineHeight:1.55 }}>{d}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

/* ==========================================================================
   SETTINGS
   ========================================================================== */
const SET_TABS = [
  ["company","Company",Factory], ["sap","SAP configuration",Database], ["label","Label configuration",Printer],
  ["printer","Printer setup",Cpu], ["barcode","Barcode format",Barcode], ["serial","Serial rules",Layers], ["theme","Theme",Sparkles],
];

function Settings({ db, toast }) {
  const [tab, setTab] = useState("company");
  const [accent, setAccent] = useState("Nova indigo");
  const [pad, setPad] = useState(9);
  const [prefix, setPrefix] = useState("Product ID");
  const [marker, setMarker] = useState("5");

  return (
    <div>
      <PageHead crumbs={["Home","Settings"]} title="Settings"
        sub="Configuration a plant administrator owns. Changes here are versioned and land in the audit trail."
        actions={<><Btn kind="g" icon={X}>Discard</Btn><Btn kind="p" icon={Check} onClick={() => toast("Settings saved")}>Save changes</Btn></>} />

      <div className="grid" style={{ gridTemplateColumns:"240px minmax(0,1fr)" }}>
        <Card>
          <div style={{ padding:10, display:"flex", flexDirection:"column", gap:3 }}>
            {SET_TABS.map(([k,l,Ic]) => (
              <button key={k} onClick={() => setTab(k)}
                style={{ display:"flex", gap:10, alignItems:"center", border:0, borderRadius:10, padding:"10px 12px",
                         background: tab===k ? "var(--nova-soft)" : "transparent", color: tab===k ? "var(--nova)" : "var(--ink)",
                         fontSize:13, fontWeight: tab===k ? 600 : 500, textAlign:"left", transition:"background .16s" }}>
                <Ic size={15} />{l}
              </button>
            ))}
          </div>
        </Card>

        <Card className="fade" key={tab}>
          {tab === "company" && (<>
            <CardHead title="Company information" icon={Factory} sub="Printed on labels and report headers" />
            <div style={{ padding:18 }}>
              <div className="grid" style={{ gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))" }}>
                <Field label="Legal name"><Input defaultValue="SuperNova Pharmaceuticals (Pvt.) Ltd." /></Field>
                <Field label="Brand shown in the app"><Input defaultValue="SuperNova" /></Field>
                <Field label="Licence number"><Input defaultValue="DRAP-MFG-2019-4471" /></Field>
                <Field label="GS1 company prefix" hint="First digits of every GTIN you issue."><Input defaultValue="0896400" /></Field>
                <Field label="Plant"><Select options={["1100 · Karachi Plant","1200 · Lahore Plant"]} /></Field>
                <Field label="Time zone"><Select options={["Asia/Karachi (PKT, UTC+5)","Asia/Dubai (UTC+4)"]} /></Field>
              </div>
              <div style={{ marginTop:14 }}><Field label="Registered address"><Input defaultValue="Plot 22, Sector 23, Korangi Industrial Area, Karachi 74900" /></Field></div>
            </div>
          </>)}

          {tab === "sap" && (<>
            <CardHead title="SAP S/4HANA configuration" icon={Database} sub="RFC destination and field mapping"
              right={<Chip tone="c-ok" icon={Wifi}>Connection healthy</Chip>} />
            <div style={{ padding:18 }}>
              <div className="grid" style={{ gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))" }}>
                <Field label="RFC destination"><Input defaultValue="S4H_PRD" /></Field>
                <Field label="Application server"><Input defaultValue="s4hana-prd.supernova.local" /></Field>
                <Field label="System / client"><Input defaultValue="PRD / 100" /></Field>
                <Field label="OData service"><Input defaultValue="API_PACKAGING_ORDER_SRV" /></Field>
                <Field label="Sync mode"><Select options={["On demand (operator pulls)","Every 5 minutes","On order release (event driven)"]} /></Field>
                <Field label="Timeout"><Input defaultValue="30 s" /></Field>
              </div>
              <div style={{ marginTop:18, borderTop:"1px solid var(--line-2)", paddingTop:16 }}>
                <div style={{ fontSize:12.5, fontWeight:600, marginBottom:11 }}>Field mapping</div>
                <div className="tblwrap">
                  <table className="tbl">
                    <thead><tr>{["Application field","SAP source","Direction","Editable here"].map(h => <th key={h}>{h}</th>)}</tr></thead>
                    <tbody>
                      {[["Material code","MATNR","Inbound"],["Product name","MAKTX","Inbound"],["Batch number","CHARG","Inbound"],
                        ["Manufacturing date","HSDAT","Inbound"],["Expiry date","VFDAT","Inbound"],["GTIN number","EAN11","Inbound"],
                        ["Packaging order","AUFNR (PKG)","Inbound"],["Production order","AUFNR","Inbound"],
                        ["Plant","WERKS","Inbound"],["Storage location","LGORT","Inbound"],
                        ["Unit serial","SERNR","Outbound"],["Master carton","HU / VEKP","Outbound"]].map(([a,b,c]) => (
                        <tr key={a}><td style={{ fontWeight:600, fontSize:12.5 }}>{a}</td><td className="num">{b}</td>
                          <td><Chip tone={c==="Inbound"?"c-info":"c-vio"}>{c}</Chip></td>
                          <td>{c === "Inbound" ? <Chip tone="c-mut" icon={Lock}>No</Chip> : <Chip tone="c-ok">System writes</Chip>}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>)}

          {tab === "label" && (<>
            <CardHead title="Label configuration" icon={Printer} sub="Which fields appear on which artwork" />
            <div style={{ padding:18 }}>
              <div className="tblwrap">
                <table className="tbl">
                  <thead><tr>{["Field","Unit pack label","Master carton label","Note"].map(h => <th key={h}>{h}</th>)}</tr></thead>
                  <tbody>
                    {[["Company logo",1,1,""],["Product name",1,1,""],["GTIN",1,1,""],["Batch",1,1,""],
                      ["Manufacturing date",1,0,""],["Expiry date",1,1,""],["Serial number",1,0,"Human readable + DataMatrix"],
                      ["Master carton number",0,1,""],["Total unit packs",0,1,""],["Packaging date",0,1,""],
                      ["Tree summary (first → last)",0,1,""],["Production line",0,0,"Internal record only — locked off both labels"],
                      ["Operator name",0,0,"Held in the register"]].map(([f,u,c,note]) => (
                      <tr key={f}>
                        <td style={{ fontWeight:600, fontSize:12.5 }}>{f}</td>
                        <td>{u ? <Chip tone="c-ok" icon={Check}>On</Chip> : <Chip tone="c-mut">Off</Chip>}</td>
                        <td>{c ? <Chip tone="c-ok" icon={Check}>On</Chip> : <Chip tone="c-mut">Off</Chip>}</td>
                        <td style={{ fontSize:12, color:"var(--slate)", whiteSpace:"normal", minWidth:240 }}>{note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div style={{ marginTop:16, padding:13, background:"var(--spark-soft)", borderRadius:10, display:"flex", gap:9, fontSize:12.5, color:"#96620A" }}>
                <TriangleAlert size={15} style={{ flex:"0 0 15px", marginTop:1 }} />
                Production line is locked off both labels by policy. Unlocking it needs a change request signed by QA.
              </div>
            </div>
          </>)}

          {tab === "printer" && (<>
            <CardHead title="Printer setup" icon={Cpu} sub="One printer per line, plus a reprint station" />
            <div className="tblwrap">
              <table className="tbl">
                <thead><tr>{["Printer","Model","Assigned line","Resolution","Stock","Status"].map(h => <th key={h}>{h}</th>)}</tr></thead>
                <tbody>
                  {[["PRN-01","Zebra ZT411","LINE-01 · Blister Pack A","300 dpi","60 × 40 mm","Ready"],
                    ["PRN-02","Zebra ZT411","LINE-02 · Blister Pack B","300 dpi","60 × 40 mm","Ready"],
                    ["PRN-03","Zebra ZT230","LINE-03 · Bottle Fill","203 dpi","60 × 40 mm","Offline"],
                    ["PRN-04","Videojet 9550","LINE-04 · Vial Aseptic","Direct print","—","Ready"],
                    ["PRN-05","Zebra ZT610","Carton station","600 dpi","100 × 75 mm","Ready"]].map(r => (
                    <tr key={r[0]}>
                      <td className="num" style={{ fontWeight:600 }}>{r[0]}</td><td style={{ fontSize:12.5 }}>{r[1]}</td>
                      <td style={{ fontSize:12.5 }}>{r[2]}</td><td className="num">{r[3]}</td><td className="num">{r[4]}</td>
                      <td>{r[5]==="Ready" ? <Chip tone="c-ok" icon={Wifi}>Ready</Chip> : <Chip tone="c-err" icon={WifiOff}>Offline</Chip>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>)}

          {tab === "barcode" && (<>
            <CardHead title="Barcode format" icon={Barcode} sub="Symbology and GS1 element strings" />
            <div style={{ padding:18 }}>
              <div className="grid" style={{ gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))" }}>
                <Field label="Unit pack symbology"><Select options={["GS1 DataMatrix (ECC 200)","GS1-128","QR Code"]} /></Field>
                <Field label="Carton symbology"><Select options={["GS1-128 + GS1 DataMatrix","GS1-128 only","ITF-14"]} /></Field>
                <Field label="Module size"><Select options={["0.42 mm","0.50 mm","0.635 mm"]} /></Field>
                <Field label="Quiet zone"><Select options={["1 module","2 modules","4 modules"]} /></Field>
                <Field label="Grade target"><Select options={["ISO 15415 grade B or better","Grade C or better"]} /></Field>
                <Field label="Verification"><Select options={["Inline camera on every pack","Sampled 1 in 50","Manual"]} /></Field>
              </div>
              <div style={{ marginTop:18, padding:16, background:"var(--mist)", borderRadius:12 }}>
                <div style={{ fontSize:11, textTransform:"uppercase", letterSpacing:".08em", color:"var(--slate-2)", fontWeight:700, marginBottom:10 }}>Element string in use</div>
                <div className="mono" style={{ fontSize:13, lineHeight:1.9 }}>
                  <div><span style={{ color:"var(--nova)" }}>(01)</span>{prodByPid(db.pid).gtin}<span style={{ color:"var(--nova)" }}>(21)</span>{unitSerial(db.pid, db.seq[db.pid])}</div>
                  <div><span style={{ color:"var(--nova)" }}>(10)</span>{prodByPid(db.pid).batch}<span style={{ color:"var(--nova)" }}>(17)</span>{prodByPid(db.pid).exp.replace(/-/g,"").slice(2)}</div>
                </div>
              </div>
            </div>
          </>)}

          {tab === "serial" && (<>
            <CardHead title="Serial rules" icon={Layers} sub="How numbers are composed and reserved" />
            <div style={{ padding:18 }}>
              <div className="grid" style={{ gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))" }}>
                <Field label="Unit serial prefix" hint="Product ID keeps every product on its own sequence."><Select options={["Product ID","Material code","GTIN last 6","Custom prefix"]} value={prefix} onChange={e => setPrefix(e.target.value)} /></Field>
                <Field label="Sequence length"><Select options={["7","8","9","10","12"]} value={String(pad)} onChange={e => setPad(Number(e.target.value))} /></Field>
                <Field label="Carton marker digit" hint="Distinguishes a parent from a child at scan time."><Select options={["5","8","9"]} value={marker} onChange={e => setMarker(e.target.value)} /></Field>
                <Field label="On rejection"><Select options={["Void the serial, never reissue","Void and log for QA review"]} /></Field>
                <Field label="Gap policy"><Select options={["Gaps allowed and audited","Block the run on a gap"]} /></Field>
                <Field label="Reprint approval"><Select options={["QA or Supervisor","QA only","No approval needed"]} /></Field>
              </div>
              <div style={{ marginTop:18, display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:14 }}>
                <div style={{ padding:16, background:"var(--nova-soft)", borderRadius:12 }}>
                  <div style={{ fontSize:10.5, textTransform:"uppercase", letterSpacing:".08em", color:"#1739A0", fontWeight:700 }}>Unit pack pattern</div>
                  <div className="mono" style={{ fontSize:14, marginTop:8, fontWeight:600 }}>{"<"}{prefix}{">"} + {pad} digits</div>
                  <div style={{ marginTop:9 }}><SerialText value={db.pid + String(1).padStart(pad,"0")} pid={db.pid} size={17} /></div>
                </div>
                <div style={{ padding:16, background:"var(--violet-soft)", borderRadius:12 }}>
                  <div style={{ fontSize:10.5, textTransform:"uppercase", letterSpacing:".08em", color:"#4B21B8", fontWeight:700 }}>Master carton pattern</div>
                  <div className="mono" style={{ fontSize:14, marginTop:8, fontWeight:600 }}>{"<"}{prefix}{">"} + "{marker}" + {pad-1} digits</div>
                  <div style={{ marginTop:9 }}><SerialText value={db.pid + marker + String(1).padStart(pad-1,"0")} pid={db.pid} carton size={17} /></div>
                </div>
              </div>
              <div style={{ marginTop:16, padding:13, background:"var(--rose-soft)", borderRadius:10, display:"flex", gap:9, fontSize:12.5, color:"#B01B28" }}>
                <TriangleAlert size={15} style={{ flex:"0 0 15px", marginTop:1 }} />
                Changing the pattern does not renumber anything already issued. Old and new formats coexist, and the scanner reads both.
              </div>
            </div>
          </>)}

          {tab === "theme" && (<>
            <CardHead title="Theme" icon={Sparkles} sub="Applies to the interface, not to label artwork" />
            <div style={{ padding:18 }}>
              <Field label="Accent colour">
                <div style={{ display:"flex", gap:10, flexWrap:"wrap", marginTop:2 }}>
                  {[["Nova indigo","#3A22A8"],["Ring teal","#12A5B8"],["Violet","#6D3BEF"],["Graphite","#3A4658"]].map(([n,c]) => (
                    <button key={n} onClick={() => setAccent(n)} className={`btn btn-sm ${accent===n?"btn-s":"btn-g"}`}>
                      <i style={{ width:11, height:11, borderRadius:3, background:c }} />{n}
                    </button>
                  ))}
                </div>
              </Field>
              <div className="grid" style={{ gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", marginTop:16 }}>
                <Field label="Appearance"><Select options={["Light (recommended for the line)","Dark","Follow workstation"]} /></Field>
                <Field label="Density"><Select options={["Comfortable","Compact (more rows per screen)"]} /></Field>
                <Field label="Numbers"><Select options={["Monospaced, tabular","Proportional"]} /></Field>
                <Field label="Motion"><Select options={["Full","Reduced","Follow system"]} /></Field>
              </div>
              <div className="hint" style={{ marginTop:14 }}>Line HMIs run light and comfortable by default — glare on the floor makes dark themes hard to read at a distance.</div>
            </div>
          </>)}
        </Card>
      </div>
    </div>
  );
}

/* ==========================================================================
   APP SHELL
   ========================================================================== */
const NAV = [
  { g:"Operations", items:[
    { k:"dashboard", l:"Dashboard", ic:LayoutDashboard, roles:"*" },
    { k:"sap",       l:"SAP Sync",  ic:RefreshCw, roles:["Admin","Supervisor","Operator"] },
    { k:"orders",    l:"Production Orders", ic:ClipboardList, roles:["Admin","Supervisor","Operator"] },
  ]},
  { g:"Serialization", items:[
    { k:"serialization", l:"Serialization", ic:Barcode, roles:"*", cnt:"live" },
    { k:"packaging",     l:"Packaging",     ic:Package, roles:["Admin","Supervisor","Operator"] },
    { k:"cartons",       l:"Master Cartons",ic:Boxes, roles:"*" },
  ]},
  { g:"Verify & print", items:[
    { k:"scanner", l:"Barcode Scanner", ic:ScanLine, roles:"*" },
    { k:"labels",  l:"Label Printing",  ic:Printer, roles:["Admin","Supervisor","Operator","Warehouse"] },
  ]},
  { g:"Governance", items:[
    { k:"reports",  l:"Reports",    ic:FileBarChart, roles:"*" },
    { k:"audit",    l:"Audit Logs", ic:ScrollText, roles:["Admin","Supervisor","QA"] },
    { k:"settings", l:"Settings",   ic:SettingsIcon, roles:["Admin"] },
    { k:"users",    l:"Users",      ic:UsersIcon, roles:["Admin","Supervisor"] },
  ]},
];
const TITLES = {
  dashboard:"Dashboard", sap:"SAP Sync", orders:"Production Orders", serialization:"Serialization",
  packaging:"Packaging", cartons:"Master Cartons", scanner:"Barcode Scanner", labels:"Label Printing",
  reports:"Reports", audit:"Audit Logs", settings:"Settings", users:"Users",
};
const AUTH_STORAGE_KEY = "supernova-psms-auth";
const ROLE_STORAGE_KEY = "supernova-psms-role";

export default function App() {
  const [signedIn, setSignedIn] = useState(() => localStorage.getItem(AUTH_STORAGE_KEY) === "true");
  const [role, setRole] = useState(() => localStorage.getItem(ROLE_STORAGE_KEY) || "Admin");
  const [route, setRoute] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [search, setSearch] = useState("");

  const seed = useMemo(() => buildSeed(), []);
  const [serials, setSerials] = useState(seed.serials);
  const [cartons, setCartons] = useState(seed.cartons);
  const [seq, setSeq] = useState(seed.seq);
  const [cseq, setCseq] = useState(seed.cseq);
  const [pid, setPid] = useState("1004");
  const [labelSerial, setLabelSerial] = useState(null);
  const [labelCarton, setLabelCarton] = useState(null);
  const [scanPrefill, setScanPrefill] = useState(null);
  const [ctx, setCtx] = useState({
    operator:OPERATORS[0], line:LINES[0], shift:SHIFTS[0], machine:MACHINES[0],
    start:"06:10", end:"", remarks:"",
  });

  const toast = (msg) => {
    const id = Math.random().toString(36).slice(2);
    setToasts(t => [...t, { id, msg }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3200);
  };

  const generate = (p, n) => {
    const start = seq[p] ?? 1;
    const now = new Date();
    const ts = `2026-07-30 ${String(now.getHours()).padStart(2,"0")}:${String(now.getMinutes()).padStart(2,"0")}`;
    const made = Array.from({ length:n }, (_, i) => ({
      serial: unitSerial(p, start + i), pid:p, status:"Serialized",
      line:ctx.line, machine:ctx.machine, operator:ctx.operator, ts, carton:null,
    }));
    setSeq(s => ({ ...s, [p]: start + n }));
    setSerials(s => [...made, ...s]);
    return made;
  };

  const aggregate = (p, serialList, size) => {
    const cs = cseq[p] ?? 1;
    const id = cartonSerial(p, cs);
    const now = new Date();
    const ts = `2026-07-30 ${String(now.getHours()).padStart(2,"0")}:${String(now.getMinutes()).padStart(2,"0")}`;
    const carton = { id, pid:p, size, serials:serialList, ts, status:"Closed", printed:false };
    setCseq(s => ({ ...s, [p]: cs + 1 }));
    setCartons(c => [carton, ...c]);
    setSerials(s => s.map(r => serialList.includes(r.serial) ? { ...r, status:"Aggregated", carton:id } : r));
    return carton;
  };

  const db = { serials, cartons, seq, cseq, pid, setPid, ctx, setCtx, generate, aggregate,
               labelSerial, setLabelSerial, labelCarton, setLabelCarton, scanPrefill, setScanPrefill };

  const go = (k) => { setRoute(k); setNotifOpen(false); setProfileOpen(false); };
  const visible = NAV.map(g => ({ ...g, items:g.items.filter(i => i.roles === "*" || i.roles.includes(role)) })).filter(g => g.items.length);

  useEffect(() => {
    const allowed = visible.flatMap(g => g.items.map(i => i.k));
    if (!allowed.includes(route)) setRoute("dashboard");
  }, [role]);

  if (!signedIn) return <Login onIn={(r) => {
    localStorage.setItem(AUTH_STORAGE_KEY, "true");
    localStorage.setItem(ROLE_STORAGE_KEY, r);
    setRole(r);
    setSignedIn(true);
    setRoute("dashboard");
  }} />;

  const PAGE = {
    dashboard:     <Dashboard role={role} go={go} toast={toast} />,
    sap:           <SapSync db={db} toast={toast} />,
    orders:        <ProductionOrders db={db} go={go} toast={toast} />,
    serialization: <Serialization db={db} toast={toast} go={go} />,
    packaging:     <Packaging db={db} toast={toast} go={go} />,
    cartons:       <MasterCartons db={db} toast={toast} go={go} />,
    scanner:       <Scanner db={db} toast={toast} />,
    labels:        <LabelPrinting db={db} toast={toast} />,
    reports:       <Reports db={db} toast={toast} />,
    audit:         <AuditLogs toast={toast} />,
    settings:      <Settings db={db} toast={toast} />,
    users:         <Users toast={toast} />,
  }[route];

  return (
    <div className="sn" style={{ height:"100%" }}>
      <style>{CSS}</style>
      <div className="shell">
        {/* ---------- sidebar ---------- */}
        <aside className={`side${collapsed ? " collapsed" : ""}`}>
          <div className="brandbox">
            {collapsed ? <SuperNovaMark size={30} /> : <SuperNovaLogo dark />}
          </div>
          {!collapsed && (
            <div style={{ padding:"0 18px 12px", position:"relative", zIndex:1 }}>
              <div style={{ fontSize:10.5, color:"#7E93B8", lineHeight:1.5 }}>
                Product Serialization<br />Management System
              </div>
            </div>
          )}
          <nav className="navwrap">
            {visible.map(g => (
              <div key={g.g}>
                {!collapsed && <div className="navlabel">{g.g}</div>}
                {g.items.map(i => (
                  <button key={i.k} className={`navitem${route === i.k ? " on" : ""}`} onClick={() => go(i.k)} title={i.l}>
                    <i.ic size={16} style={{ flex:"0 0 16px" }} />
                    {!collapsed && <>{i.l}{i.cnt && <span className="cnt">{nf(serials.length)}</span>}</>}
                  </button>
                ))}
              </div>
            ))}
          </nav>
          <div className="sidefoot">
            {!collapsed ? (
              <>
                <div style={{ fontSize:9.5, color:"#5D7099", letterSpacing:".06em", textTransform:"uppercase", fontWeight:700, marginBottom:7 }}>Designed &amp; developed by</div>
                <ERMLogo light />
              </>
            ) : <div style={{ display:"grid", placeItems:"center", color:"#5D7099" }}><ShieldCheck size={16} /></div>}
          </div>
        </aside>

        {/* ---------- main ---------- */}
        <div className="main">
          <header className="topbar">
            <button className="iconbtn" onClick={() => setCollapsed(c => !c)} title={collapsed ? "Expand menu" : "Collapse menu"}>
              {collapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
            </button>
            <div className="searchbox">
              <Search size={15} color="var(--slate-2)" />
              <input placeholder="Search a serial, carton, batch or order" value={search}
                onChange={e => setSearch(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter" && search.trim()) { setScanPrefill(search.trim()); go("scanner"); setSearch(""); } }} />
            </div>
            <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:10 }}>
              <div style={{ display:"flex", alignItems:"center", gap:7, fontSize:12, color:"var(--slate)", padding:"6px 11px", background:"var(--mint-soft)", borderRadius:20, fontWeight:600 }}>
                <span style={{ width:7, height:7, borderRadius:"50%", background:"var(--mint)", boxShadow:"0 0 0 3px rgba(14,159,110,.18)" }} />
                <span style={{ color:"#08744F" }}>SAP connected</span>
              </div>

              <div style={{ position:"relative" }}>
                <button className="iconbtn" onClick={() => { setNotifOpen(o => !o); setProfileOpen(false); }} title="Notifications">
                  <Bell size={16} /><span className="dot" />
                </button>
                {notifOpen && (
                  <div className="pop fade">
                    <div className="cardhead">
                      <div><h3>Notifications</h3><div className="sub">3 unread</div></div>
                      <Btn kind="g" sm onClick={() => { setNotifOpen(false); toast("All notifications marked as read"); }}>Mark all read</Btn>
                    </div>
                    <div style={{ maxHeight:340, overflowY:"auto" }}>
                      {NOTIFS.map((n,i) => (
                        <div key={i} className="notif">
                          <div className={`ni chip ${n.tone}`} style={{ borderRadius:9 }}><n.ic size={14} /></div>
                          <div style={{ minWidth:0 }}>
                            <div className="nt">{n.t}</div><div className="nd">{n.d}</div><div className="nw">{n.w}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div style={{ padding:"11px 14px", borderTop:"1px solid var(--line-2)", textAlign:"center" }}>
                      <button className="btn btn-g btn-sm" style={{ width:"100%", justifyContent:"center" }} onClick={() => go("audit")}>Open the audit trail</button>
                    </div>
                  </div>
                )}
              </div>

              <div style={{ position:"relative" }}>
                <button onClick={() => { setProfileOpen(o => !o); setNotifOpen(false); }}
                  style={{ display:"flex", alignItems:"center", gap:9, border:"1px solid var(--line)", background:"#fff", borderRadius:12, padding:"5px 10px 5px 6px" }}>
                  <div style={{ width:28, height:28, borderRadius:9, background:"linear-gradient(140deg,#5236D6,#12A5B8)", color:"#fff", display:"grid", placeItems:"center", fontSize:11.5, fontWeight:700, fontFamily:"Sora" }}>
                    {role === "Operator" ? "FK" : role === "QA" ? "AN" : "NA"}
                  </div>
                  <div style={{ textAlign:"left", lineHeight:1.25 }}>
                    <div style={{ fontSize:12.5, fontWeight:600 }}>{role === "Operator" ? "Faisal Karim" : role === "QA" ? "Ayesha Noor" : "Nabeel Ahmed"}</div>
                    <div style={{ fontSize:10.5, color:"var(--slate-2)" }}>{role}</div>
                  </div>
                  <ChevronDown size={14} color="var(--slate-2)" />
                </button>
                {profileOpen && (
                  <div className="pop fade" style={{ width:262 }}>
                    <div style={{ padding:"14px 16px", borderBottom:"1px solid var(--line-2)" }}>
                      <div style={{ fontSize:13, fontWeight:600 }}>{role === "Operator" ? "Faisal Karim" : role === "QA" ? "Ayesha Noor" : "Nabeel Ahmed"}</div>
                      <div style={{ fontSize:11.5, color:"var(--slate-2)", marginTop:2 }}>Plant 1100 · {ctx.shift}</div>
                    </div>
                    <div style={{ padding:"10px 12px", borderBottom:"1px solid var(--line-2)" }}>
                      <div style={{ fontSize:10.5, textTransform:"uppercase", letterSpacing:".08em", color:"var(--slate-2)", fontWeight:700, marginBottom:7, paddingLeft:4 }}>Switch role (demo)</div>
                      {["Admin","Supervisor","Operator","QA","Warehouse"].map(r => (
                        <button key={r} onClick={() => { localStorage.setItem(ROLE_STORAGE_KEY, r); setRole(r); setProfileOpen(false); toast(`Now viewing as ${r}`); }}
                          style={{ display:"flex", alignItems:"center", gap:9, width:"100%", border:0, background: role===r ? "var(--nova-soft)" : "transparent",
                                   borderRadius:9, padding:"8px 10px", fontSize:12.5, color: role===r ? "var(--nova)" : "var(--ink)", fontWeight: role===r?600:500, textAlign:"left" }}>
                          <User size={14} />{r}{role===r && <Check size={14} style={{ marginLeft:"auto" }} />}
                        </button>
                      ))}
                    </div>
                    <div style={{ padding:10 }}>
                      <button className="btn btn-g btn-sm" style={{ width:"100%", justifyContent:"center" }} onClick={() => { localStorage.removeItem(AUTH_STORAGE_KEY); localStorage.removeItem(ROLE_STORAGE_KEY); setSignedIn(false); setProfileOpen(false); }}>
                        <LogOut size={13} />Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </header>

          <main className="content" onClick={() => { setNotifOpen(false); setProfileOpen(false); }}>
            <div key={route} className="fade">{PAGE}</div>
          </main>

          <footer className="appfoot">
            <div style={{ display:"flex", alignItems:"center", gap:9, flexWrap:"wrap" }}>
              <span>Designed &amp; Developed by</span><ERMLogo />
            </div>
            <div style={{ display:"flex", gap:16, alignItems:"center", flexWrap:"wrap" }}>
              <span>SuperNova PSMS · v1.0 demonstration build</span>
              <span className="mono">{TITLES[route]}</span>
            </div>
          </footer>
        </div>
      </div>

      <div className="toasts">
        {toasts.map(t => (
          <div key={t.id} className="toast"><CircleCheck size={16} color="#3ED598" />{t.msg}</div>
        ))}
      </div>
    </div>
  );
}
