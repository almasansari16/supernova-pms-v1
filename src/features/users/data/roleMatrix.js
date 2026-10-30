/* Capability x role grid (1 = allowed) */
export const ROLE_MATRIX = [
  { cap:"View dashboard",        Admin:1, Supervisor:1, Operator:1, QA:1, Warehouse:1 },
  { cap:"Pull SAP master data",  Admin:1, Supervisor:1, Operator:1, QA:0, Warehouse:0 },
  { cap:"Generate unit serials", Admin:1, Supervisor:1, Operator:1, QA:0, Warehouse:0 },
  { cap:"Create master carton",  Admin:1, Supervisor:1, Operator:1, QA:0, Warehouse:1 },
  { cap:"Print labels",          Admin:1, Supervisor:1, Operator:1, QA:0, Warehouse:1 },
  { cap:"Approve reprint",       Admin:1, Supervisor:1, Operator:0, QA:1, Warehouse:0 },
  { cap:"Reject / quarantine",   Admin:1, Supervisor:1, Operator:0, QA:1, Warehouse:0 },
  { cap:"Edit serial rules",     Admin:1, Supervisor:0, Operator:0, QA:0, Warehouse:0 },
  { cap:"Export audit trail",    Admin:1, Supervisor:1, Operator:0, QA:1, Warehouse:0 },
];
