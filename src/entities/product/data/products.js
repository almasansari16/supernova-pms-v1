/* Product master data. In production this is pulled from SAP S/4HANA (MATNR, MAKTX, CHARG, …). */
export const PRODUCTS = [
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
