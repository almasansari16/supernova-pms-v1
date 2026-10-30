import { PRODUCTS } from "@/entities/product";
import { unitSerial, cartonSerial } from "@/entities/serial";
import { LINES, MACHINES, OPERATORS } from "@/shared/config";

/* Running sequence per product — each product keeps an independent counter */
export const SEED_SEQ = { "1004": 4820, "1005": 2650, "1006": 1180, "1007": 940, "1008": 610 };
export const SEED_CARTON = { "1004": 482, "1005": 133, "1006": 118, "1007": 47, "1008": 61 };

/* Pre-existing serialization records so screens are never empty */
export function buildMockRegister() {
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
