export const Chip = ({ tone = "c-mut", icon: Ic, children }) => (
  <span className={`chip ${tone}`}>{Ic && <Ic size={11} />}{children}</span>
);

const STATUS_TONE = {
  "Serialized":"c-ok", "Printed":"c-info", "Aggregated":"c-vio", "Pending":"c-mut", "Rejected":"c-err",
  "In Progress":"c-info", "Completed":"c-ok", "Released":"c-mut", "On Hold":"c-warn",
  "Active":"c-ok", "Suspended":"c-err", "Open":"c-warn", "Closed":"c-ok", "Dispatched":"c-vio",
};

/* Status chip — tone is picked from the status text */
export const St = ({ v }) => <Chip tone={STATUS_TONE[v] || "c-mut"}>{v}</Chip>;
