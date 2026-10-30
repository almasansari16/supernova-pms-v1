import {
  Barcode, Boxes, CircleCheck, ClipboardList, Cpu, Factory, MoveRight, Printer,
  ScanLine, ShieldCheck, TriangleAlert,
} from "lucide-react";

/* KPI tiles per role. Admin and Supervisor see the plant-wide set. */
export const ROLE_KPIS = {
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

export const ADMIN_KPIS = [
  { label:"Today's production", value:"12,480", delta:"+8.4% vs yesterday", icon:Factory, tone:"nova" },
  { label:"Serialized units",   value:"93,840", delta:"+6.1% this week", icon:Barcode, tone:"violet" },
  { label:"Serialized cartons", value:"1,782",  delta:"+112 today", icon:Boxes, tone:"mint" },
  { label:"Packaging orders",   value:"5",      delta:"2 in progress · 1 on hold", icon:ClipboardList, tone:"spark", trend:false },
  { label:"Rejected packs",     value:"23",     delta:"0.18% rejection rate", icon:TriangleAlert, tone:"rose", trend:false },
  { label:"Running lines",      value:"3 / 4",  delta:"LINE-03 idle", icon:Cpu, tone:"nova", trend:false },
];

export const kpisForRole = (role) => ROLE_KPIS[role] || ADMIN_KPIS;
