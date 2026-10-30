/* Units per hour on the two active lines */
export const pkgTrend = [
  { h:"06", a:640, b:0 }, { h:"08", a:1480, b:0 }, { h:"10", a:2210, b:120 },
  { h:"12", a:1760, b:980 }, { h:"14", a:2380, b:1640 }, { h:"16", a:2140, b:2010 },
  { h:"18", a:1180, b:2260 }, { h:"20", a:420, b:1840 },
];

/* Serialized units, month to date */
export const topProducts = [
  { name:"Amoxicillin 500mg", pid:"1004", v:4820, fill:"#3A22A8" },
  { name:"Paracetamol 650mg", pid:"1005", v:2650, fill:"#5236D6" },
  { name:"Ceftriaxone 1g",    pid:"1006", v:1180, fill:"#6D3BEF" },
  { name:"Omeprazole 20mg",   pid:"1007", v:940,  fill:"#12A5B8" },
  { name:"Azithromycin 250mg",pid:"1008", v:610,  fill:"#0E9F6E" },
];

/* % complete against released order quantity */
export const serializationProgress = [
  { n:"1004", v:83, fill:"#3A22A8" }, { n:"1005", v:100, fill:"#0E9F6E" },
  { n:"1006", v:20, fill:"#6D3BEF" }, { n:"1008", v:8, fill:"#12A5B8" },
];
