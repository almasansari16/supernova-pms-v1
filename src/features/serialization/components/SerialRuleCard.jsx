import { ArrowRight, Barcode, Plus } from "lucide-react";
import { PRODUCTS } from "@/entities/product";
import { SerialText, unitSerial, zeroPad } from "@/entities/serial";
import { Card, CardHead, Chip } from "@/shared/ui";
import { nf } from "@/shared/lib";

/* Signature panel: the serial rule shown as a working ladder for the selected product */
export function SerialRuleCard({ pid, nextSeq, onSelectProduct }) {
  return (
    <Card>
      <CardHead title="How the number is built" icon={Barcode} sub="Product ID + 9-digit running sequence" />
      <div style={{ padding:18 }}>
        <div style={{ display:"flex", gap:9, marginBottom:14, flexWrap:"wrap" }}>
          {PRODUCTS.map(x => (
            <button key={x.pid} onClick={() => onSelectProduct(x.pid)}
              className={`btn btn-sm ${pid === x.pid ? "btn-s" : "btn-g"}`}>
              <span className="mono">{x.pid}</span>
            </button>
          ))}
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:11, padding:"13px 15px", background:"var(--mist)", borderRadius:12, marginBottom:14 }}>
          <div>
            <div style={{ fontSize:10.5, textTransform:"uppercase", letterSpacing:".08em", color:"var(--nova)", fontWeight:700 }}>Prefix</div>
            <div className="serial" style={{ fontSize:22 }}><span className="pfx">{pid}</span></div>
          </div>
          <Plus size={15} color="var(--slate-2)" />
          <div>
            <div style={{ fontSize:10.5, textTransform:"uppercase", letterSpacing:".08em", color:"var(--slate-2)", fontWeight:700 }}>Sequence (9)</div>
            <div className="serial" style={{ fontSize:22 }}><span className="pad">{zeroPad(nextSeq, 9)}</span><span className="seq">{String(nextSeq)}</span></div>
          </div>
          <ArrowRight size={16} color="var(--slate-2)" style={{ marginLeft:"auto" }} />
          <div>
            <div style={{ fontSize:10.5, textTransform:"uppercase", letterSpacing:".08em", color:"var(--slate-2)", fontWeight:700 }}>Next serial</div>
            <SerialText value={unitSerial(pid, nextSeq)} pid={pid} size={22} />
          </div>
        </div>
        <div className="ladder">
          {[0,1,2,3].map(i => (
            <div key={i} className="lrow" style={{ animationDelay:`${i*0.05}s` }}>
              <span className="sq">#{nextSeq + i}</span>
              <SerialText value={unitSerial(pid, nextSeq + i)} pid={pid} />
              <span style={{ marginLeft:"auto" }}><Chip tone="c-mut">Queued</Chip></span>
            </div>
          ))}
        </div>
        <div className="hint" style={{ marginTop:12 }}>
          Product {pid} is at {nf(nextSeq - 1)} packs. Switching to another product picks up that product's own counter — sequences never share a pool.
        </div>
      </div>
    </Card>
  );
}
