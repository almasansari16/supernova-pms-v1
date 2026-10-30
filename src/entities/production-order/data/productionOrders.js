/* Released production orders from SAP S/4HANA */
export const PROD_ORDERS = [
  { po:"PO-1004-8842", pid:"1004", qty:15000, done:12480, line:"LINE-01 · Blister Pack A", status:"In Progress", start:"2026-07-30 06:10" },
  { po:"PO-1005-8907", pid:"1005", qty:20000, done:20000, line:"LINE-02 · Blister Pack B", status:"Completed", start:"2026-07-29 06:05" },
  { po:"PO-1006-8790", pid:"1006", qty:6000,  done:1180,  line:"LINE-04 · Vial Aseptic",   status:"In Progress", start:"2026-07-30 07:40" },
  { po:"PO-1007-8955", pid:"1007", qty:12000, done:0,     line:"LINE-03 · Bottle Fill",    status:"Released", start:"—" },
  { po:"PO-1008-8971", pid:"1008", qty:8000,  done:610,   line:"LINE-02 · Blister Pack B", status:"On Hold", start:"2026-07-30 09:15" },
];
