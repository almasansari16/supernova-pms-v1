export const PKG_STEPS = [
  { t:"Select product", d:"Packaging order" },
  { t:"Fetch SAP data", d:"S/4HANA pull" },
  { t:"Unit serials",   d:"Generate & verify" },
  { t:"Master carton",  d:"Aggregate packs" },
  { t:"Print labels",   d:"Unit + carton" },
  { t:"Complete",       d:"Close the run" },
];

/* Step indexes, so components never compare against bare numbers */
export const STEP = { SELECT:0, SAP:1, SERIALS:2, CARTON:3, LABELS:4, DONE:5 };

export const QUICK_PACK_QTY = [10, 20, 50, 100];
