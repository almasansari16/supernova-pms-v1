export const Card = ({ children, className = "", style, ...rest }) => <div className={`card ${className}`} style={style} {...rest}>{children}</div>;

export const CardHead = ({ title, sub, right, icon: Ic }) => (
  <div className="cardhead">
    <div style={{ display:"flex", gap:11, alignItems:"center", minWidth:0 }}>
      {Ic && <div style={{ width:30, height:30, borderRadius:9, background:"var(--nova-soft)", color:"var(--nova)", display:"grid", placeItems:"center", flex:"0 0 30px" }}><Ic size={15} /></div>}
      <div style={{ minWidth:0 }}><h3>{title}</h3>{sub && <div className="sub">{sub}</div>}</div>
    </div>
    {right}
  </div>
);
