import { Fragment } from "react";
import { ChevronRight } from "lucide-react";

export const PageHead = ({ crumbs = [], title, sub, actions }) => (
  <div className="fade">
    <div className="crumbs">
      {crumbs.map((c, i) => <Fragment key={c}>{i > 0 && <ChevronRight size={11} />}<span style={{ color: i === crumbs.length-1 ? "var(--slate)" : undefined }}>{c}</span></Fragment>)}
    </div>
    <div className="pghead">
      <div><h1>{title}</h1>{sub && <div className="pgsub">{sub}</div>}</div>
      {actions && <div style={{ display:"flex", gap:9, flexWrap:"wrap" }}>{actions}</div>}
    </div>
  </div>
);
