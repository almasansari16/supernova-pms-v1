import { Database } from "lucide-react";

/* Read-only key/value tile for SAP-owned and record fields */
export const SapField = ({ k, v, mono = true }) => (
  <div className="sapfield">
    <div className="k"><Database size={10} color="var(--nova)" />{k}</div>
    <div className="v" style={mono ? undefined : { fontFamily:"Inter", fontWeight:600 }}>{v}</div>
  </div>
);
