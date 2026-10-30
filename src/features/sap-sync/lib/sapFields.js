/* The ten SAP-owned master-data fields, as [label, value] pairs for a product */
export const sapFieldsFor = (p) => [
  ["Material Code", p.material], ["Product Name", p.name], ["Batch Number", p.batch],
  ["Manufacturing Date", p.mfg], ["Expiry Date", p.exp], ["GTIN Number", p.gtin],
  ["Packaging Order", p.pkgOrder], ["Production Order", p.prodOrder],
  ["Plant", p.plant], ["Storage Location", p.sloc],
];

/* Fields rendered in the proportional (non-mono) font */
export const TEXT_FIELDS = ["Product Name", "Plant", "Storage Location"];
