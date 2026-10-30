import { Boxes } from "lucide-react";
import { Empty } from "@/shared/ui";
import { SuperNovaLogo } from "@/shared/brand";
import { Barcode1D, DataMatrix } from "@/shared/barcode";

/* Master carton shipping artwork. Production line is deliberately absent from the label. */
export function CartonLabel({ carton, p }) {
  if (!carton) return <Empty icon={Boxes} title="No carton selected" body="Choose a master carton to render its shipping label." />;
  return (
    <div className="label-sheet carton">
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:12 }}>
        <div>
          <SuperNovaLogo height={20} />
          <div style={{ fontSize:8.5, letterSpacing:".1em", textTransform:"uppercase", color:"#6B7C97", fontWeight:700, marginTop:6 }}>Master carton · aggregated parent</div>
        </div>
        <div style={{ textAlign:"right", background:"#1E0D63", color:"#fff", borderRadius:6, padding:"6px 10px" }}>
          <div style={{ fontSize:8, letterSpacing:".1em", textTransform:"uppercase", opacity:.7, fontWeight:700 }}>Packs inside</div>
          <div style={{ fontFamily:"Sora", fontWeight:700, fontSize:20, lineHeight:1 }}>{carton.serials.length}</div>
        </div>
      </div>
      <div className="lbl-rule" />
      <div className="lbl-k">Master carton number</div>
      <div className="mono" style={{ fontSize:19, fontWeight:700, letterSpacing:".05em", marginTop:3 }}>{carton.id}</div>
      <div style={{ marginTop:9 }}><Barcode1D value={carton.id} height={44} showText={false} /></div>
      <div className="lbl-rule" />
      <div style={{ display:"flex", gap:14 }}>
        <div style={{ flex:1, display:"grid", gridTemplateColumns:"1fr 1fr", gap:"9px 12px" }}>
          <div><div className="lbl-k">Product</div><div className="lbl-v" style={{ fontFamily:"Inter", fontSize:11 }}>{p.name}</div></div>
          <div><div className="lbl-k">GTIN (01)</div><div className="lbl-v">{p.gtin}</div></div>
          <div><div className="lbl-k">Batch (10)</div><div className="lbl-v">{p.batch}</div></div>
          <div><div className="lbl-k">Expiry (17)</div><div className="lbl-v" style={{ color:"#B01B28" }}>{p.exp}</div></div>
          <div><div className="lbl-k">Packaging date</div><div className="lbl-v">{carton.ts.slice(0,10)}</div></div>
          <div><div className="lbl-k">Pack size</div><div className="lbl-v">{carton.size} units</div></div>
        </div>
        <DataMatrix value={`00${carton.id}02${p.gtin}37${carton.serials.length}10${p.batch}`} size={92} />
      </div>
      <div className="perf" />
      <div className="lbl-k" style={{ marginBottom:5 }}>Contents · first and last serial</div>
      <div className="mono" style={{ fontSize:9.5, color:"#3B4A63", lineHeight:1.6 }}>
        {carton.serials[0]} → {carton.serials[carton.serials.length-1]}
        <span style={{ color:"#8494AC" }}> · {carton.serials.length} sequential unit serials</span>
      </div>
    </div>
  );
}
