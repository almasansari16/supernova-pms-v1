export const ROLES = ["Admin", "Supervisor", "Operator", "QA", "Warehouse"];

/* Marker for routes every signed-in role may open */
export const ALL_ROLES = "*";

export const canAccess = (allowed, role) => allowed === ALL_ROLES || allowed.includes(role);
