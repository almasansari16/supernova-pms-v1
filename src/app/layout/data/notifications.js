import { Barcode, Boxes, Database, Printer, ScanLine, TriangleAlert, WifiOff } from "lucide-react";

/* Topbar notification feed (demo data) */
export const NOTIFICATIONS = [
  { ic:Database, tone:"c-ok",   t:"SAP sync successful",     d:"10 master-data fields refreshed for PKG-1004-0231", w:"2 min ago" },
  { ic:Barcode,  tone:"c-info", t:"Batch generated",          d:"20 unit serials created on LINE-01", w:"6 min ago" },
  { ic:Boxes,    tone:"c-vio",  t:"Master carton closed",     d:"1004500000482 · 20 unit packs aggregated", w:"8 min ago" },
  { ic:Printer,  tone:"c-ok",   t:"Label printed",            d:"Carton label sent to Zebra ZT411", w:"9 min ago" },
  { ic:WifiOff,  tone:"c-err",  t:"Printer offline",          d:"Zebra ZT230 (LINE-03) not responding", w:"31 min ago" },
  { ic:TriangleAlert, tone:"c-warn", t:"Duplicate serial warning", d:"1006000001174 read twice in 4 s", w:"1 hr ago" },
  { ic:ScanLine, tone:"c-info", t:"Scanner connected",        d:"Zebra DS8178 paired to LINE-01 HMI", w:"5 hr ago" },
];
