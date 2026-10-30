import { Barcode, Boxes, Clock, Factory, Gauge, Layers, ShieldCheck } from "lucide-react";

export const REPORTS = [
  { id:"serialization", ic:Barcode,      t:"Serialization Report", d:"Every serial generated in a period, with product, batch, line and operator." },
  { id:"batch",         ic:Layers,       t:"Batch Report",         d:"Batch-wise serialization totals, carton counts and yield against order quantity." },
  { id:"expired",       ic:Clock,        t:"Expired Products",     d:"Serials whose batch expiry has passed or falls inside the alert window." },
  { id:"production",    ic:Factory,      t:"Production Report",    d:"Daily and shift-wise output per line with rejection rate." },
  { id:"carton",        ic:Boxes,        t:"Carton Report",        d:"Master cartons with pack size, contained serials and dispatch status." },
  { id:"operator",      ic:Gauge,        t:"Operator Performance", d:"Units per operator per shift, reprints raised and rejection share." },
  { id:"audit",         ic:ShieldCheck,  t:"Audit Report",         d:"Full 21 CFR Part 11 style activity trail for a selected date range." },
];
