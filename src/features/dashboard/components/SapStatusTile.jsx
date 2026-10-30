import { Database } from "lucide-react";

export function SapStatusTile() {
  return (
    <div className="kpi" style={{ background:"linear-gradient(150deg,#180C42,#2B1673)", borderColor:"#2B1673", color:"#fff" }}>
      <div className="ic" style={{ background:"rgba(255,255,255,.12)", color:"#7FF3C1" }}><Database size={17} /></div>
      <div className="lbl" style={{ color:"#8FA6C9" }}>SAP S/4HANA sync</div>
      <div className="val" style={{ fontSize:19, color:"#fff", marginTop:5 }}>Connected</div>
      <div style={{ fontSize:11.5, color:"#9FB4D6", marginTop:7, display:"flex", alignItems:"center", gap:6 }}>
        <span style={{ width:7, height:7, borderRadius:"50%", background:"#22C58B", boxShadow:"0 0 0 3px rgba(34,197,139,.22)" }} />
        Last pull 11:30:02 · 412 ms
      </div>
    </div>
  );
}
