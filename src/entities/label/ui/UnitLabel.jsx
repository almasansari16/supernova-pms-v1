import { Printer } from "lucide-react";
import { Empty } from "@/shared/ui";
import { SuperNovaLogo } from "@/shared/brand";
import { Barcode1D, DataMatrix } from "@/shared/barcode";

/* Unit pack artwork. Production line is deliberately absent from the label. */
export function UnitLabel({ serial, p }) {
  if (!serial) return <Empty icon={Printer} title="No serial selected" body="Pick a serial from the register to render its unit pack label." />;
  return (
    <div className="label-sheet">
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:12 }}>
        <div>
          <SuperNovaLogo height={20} />
          <div style={{ fontSize:8.5, letterSpacing:".1em", textTransform:"uppercase", color:"#6B7C97", fontWeight:700, marginTop:6 }}>Unit pack · saleable unit</div>
        </div>
        <div style={{ textAlign:"right" }}>
          <div className="lbl-k">Rx only</div>
          <div style={{ fontSize:8.5, color:"#6B7C97", marginTop:3 }}>Store below 25°C</div>
        </div>
      </div>
      <div className="lbl-rule" />
      <div style={{ fontFamily:"Sora", fontWeight:600, fontSize:15, lineHeight:1.25 }}>{p.name}</div>
      <div style={{ fontSize:10, color:"#6B7C97", marginTop:2 }}>{p.form}</div>
      <div className="lbl-rule" />
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"9px 14px" }}>
        <div><div className="lbl-k">GTIN (01)</div><div className="lbl-v">{p.gtin}</div></div>
        <div><div className="lbl-k">Batch (10)</div><div className="lbl-v">{p.batch}</div></div>
        <div><div className="lbl-k">Mfg (11)</div><div className="lbl-v">{p.mfg}</div></div>
        <div><div className="lbl-k">Expiry (17)</div><div className="lbl-v" style={{ color:"#B01B28" }}>{p.exp}</div></div>
      </div>
      <div className="perf" />
      <div style={{ display:"flex", gap:14, alignItems:"center" }}>
        <DataMatrix value={`01${p.gtin}21${serial}10${p.batch}17${p.exp.replace(/-/g,"").slice(2)}`} size={96} />
        <div style={{ minWidth:0, flex:1 }}>
          <div className="lbl-k">Serial number (21)</div>
          <div className="mono" style={{ fontSize:15, fontWeight:700, letterSpacing:".04em", marginTop:3 }}>{serial}</div>
          <div style={{ marginTop:9 }}><Barcode1D value={serial} height={34} showText={false} /></div>
          <div style={{ fontSize:8, color:"#6B7C97", marginTop:6, lineHeight:1.4 }}>
            (01){p.gtin}(21){serial}(10){p.batch}(17){p.exp.replace(/-/g,"").slice(2)}
          </div>
        </div>
      </div>
    </div>
  );
}
