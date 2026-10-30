/* Audit trail entries (append-only). In production these come from the audit service. */
export const AUDIT_EVENTS = [
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
