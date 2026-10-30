/* URL paths for every screen. Features navigate with these constants,
   never with string literals, so a path can be renamed in one place. */
export const ROUTES = {
  login:         "/login",
  dashboard:     "/dashboard",
  sap:           "/sap-sync",
  orders:        "/production-orders",
  serialization: "/serialization",
  packaging:     "/packaging",
  cartons:       "/master-cartons",
  scanner:       "/scanner",
  labels:        "/label-printing",
  reports:       "/reports",
  audit:         "/audit-logs",
  settings:      "/settings",
  users:         "/users",
};

/* Build a link carrying hand-off data, e.g. withQuery(ROUTES.scanner, { code }) */
export const withQuery = (path, params) => `${path}?${new URLSearchParams(params)}`;
