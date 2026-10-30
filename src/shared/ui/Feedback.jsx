import { Boxes } from "lucide-react";

export const Empty = ({ icon: Ic = Boxes, title, body, action }) => (
  <div className="empty">
    <div className="eic"><Ic size={24} /></div>
    <h4>{title}</h4><p>{body}</p>{action}
  </div>
);

export const Skeleton = ({ rows = 5 }) => (
  <div style={{ padding:16, display:"flex", flexDirection:"column", gap:11 }}>
    {Array.from({ length:rows }).map((_, i) => (
      <div key={i} style={{ display:"flex", gap:12, alignItems:"center" }}>
        <div className="sk" style={{ width:34, height:34, borderRadius:10 }} />
        <div className="sk" style={{ height:11, flex:1 }} />
        <div className="sk" style={{ height:11, width:"18%" }} />
        <div className="sk" style={{ height:22, width:78, borderRadius:20 }} />
      </div>
    ))}
  </div>
);

/* Placeholder tiles shown while SAP fields load */
export const FieldGridSkeleton = ({ count = 10 }) => (
  <div className="grid g-3">{Array.from({ length:count }).map((_,i) => <div key={i} className="sk" style={{ height:62, borderRadius:12 }} />)}</div>
);
