import { PRODUCTS, prodByPid } from "@/entities/product";
import { PROD_ORDERS } from "@/entities/production-order";
import { dailyProduction } from "@/entities/production";
import { AUDIT_EVENTS } from "@/entities/audit";
import { SEED_CARTON } from "@/entities/register";
import { LINES, OPERATORS, SHIFTS } from "@/shared/config";
import { nf } from "@/shared/lib";

const EXPIRY_ROWS = [
  ["CEF-2506-A","Ceftriaxone 1g","2026-06-30","Expired","1,240","Quarantine"],
  ["PCM-2508-B","Paracetamol 650mg","2026-09-14","46","3,180","Monitor"],
  ["AMX-2509-C","Amoxicillin 500mg","2026-10-02","64","2,460","Monitor"],
];

const BUILDERS = {
  serialization: ({ serials }) => ({ cols:["Serial","Product","Batch","Status","Operator","Generated"],
    rows: serials.slice(0,7).map(s => [s.serial, prodByPid(s.pid).name, prodByPid(s.pid).batch, s.status, s.operator, s.ts]) }),
  batch: () => ({ cols:["Batch","Product","Order qty","Serialized","Cartons","Yield"],
    rows: PRODUCTS.map((p,i) => [p.batch, p.name, nf(PROD_ORDERS[i].qty), nf(PROD_ORDERS[i].done), nf(SEED_CARTON[p.pid]), `${Math.round(PROD_ORDERS[i].done/PROD_ORDERS[i].qty*100)}%`]) }),
  expired: () => ({ cols:["Batch","Product","Expiry","Days to expiry","Serials affected","Action"], rows: EXPIRY_ROWS }),
  production: () => ({ cols:["Date","Line","Shift","Units","Cartons","Rejects","Rate"],
    rows: dailyProduction.map((d,i) => [d.d, LINES[i%4].split(" ")[0], SHIFTS[i%3].split(" ")[0], nf(d.units), nf(d.cartons), d.rejects, `${(d.rejects/d.units*100).toFixed(2)}%`]) }),
  carton: ({ cartons }) => ({ cols:["Carton","Product","Pack size","Packs inside","Packaging date","Status"],
    rows: cartons.slice(0,7).map(c => [c.id, prodByPid(c.pid).name, c.size, c.serials.length, c.ts, c.status]) }),
  operator: () => ({ cols:["Operator","Shift","Line","Units","Cartons","Reprints","Rejection"],
    rows: OPERATORS.map((o,i) => [o, SHIFTS[i%3].split(" ")[0], LINES[i%4].split(" ")[0], nf(4200-i*640), nf(210-i*32), i%3, `${(0.12+i*0.06).toFixed(2)}%`]) }),
  audit: () => ({ cols:["Timestamp","User","Role","Event","Object","Detail"],
    rows: AUDIT_EVENTS.map(a => [a.t, a.u, a.r, a.ev, a.obj, a.d]) }),
};

/* On-screen preview table ({ cols, rows }) for a report id */
export const buildReportPreview = (id, register) => BUILDERS[id](register);
