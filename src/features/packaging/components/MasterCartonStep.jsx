import { ArrowRight, Barcode, Boxes, RefreshCw } from "lucide-react";
import { SerialText, zeroPad } from "@/entities/serial";
import { Btn, Card, CardHead, Chip, Field } from "@/shared/ui";
import { CARTON_SIZES } from "@/shared/config";

/* Step 4 — aggregate the issued packs into a master carton */
export function MasterCartonStep({ pid, nextCartonSeq, issued, cartonSize, setCartonSize, busy, onClose }) {
  return (
    <div className="grid fade" style={{ gridTemplateColumns:"minmax(0,.95fr) minmax(0,1.05fr)" }}>
      <Card>
        <CardHead title="Step 4 · Build the master carton" icon={Boxes} sub={`${issued.length} unit packs available to aggregate`} />
        <div style={{ padding:18 }}>
          <Field label="Unit packs per carton" req>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
              {CARTON_SIZES.map(n => (
                <button key={n} onClick={() => setCartonSize(n)} className={`btn ${cartonSize===n?"btn-s":"btn-g"}`} style={{ flex:"1 0 auto", justifyContent:"center" }}>{n}</button>
              ))}
            </div>
          </Field>
          <div className="hint" style={{ marginTop:8 }}>
            {cartonSize > issued.length
              ? `Only ${issued.length} packs were issued in this run — the carton will close short.`
              : `${cartonSize} of ${issued.length} packs go into this carton; the remainder stay loose for the next one.`}
          </div>
          <div style={{ marginTop:18, padding:14, background:"linear-gradient(150deg,#180C42,#2B1673)", borderRadius:12, color:"#fff" }}>
            <div style={{ fontSize:10.5, textTransform:"uppercase", letterSpacing:".08em", color:"#8FA6C9", fontWeight:700 }}>Carton number to be issued</div>
            <div className="serial" style={{ fontSize:23, marginTop:7 }}>
              <span style={{ color:"#A796EE" }}>{pid}</span><span style={{ color:"#45E3DC" }}>5</span>
              <span style={{ color:"#6A5AA8" }}>{zeroPad(nextCartonSeq, 8)}</span>
              <span style={{ color:"#fff" }}>{nextCartonSeq}</span>
            </div>
            <div style={{ fontSize:11.5, color:"#9FB4D6", marginTop:9 }}>
              Product ID · carton marker <span className="mono" style={{ color:"#45E3DC" }}>5</span> · 8-digit carton sequence. The marker is what tells a scanner it is holding a parent, not a unit.
            </div>
          </div>
          <div style={{ display:"flex", justifyContent:"flex-end", marginTop:18 }}>
            <Btn kind="p" icon={busy ? RefreshCw : Boxes} onClick={onClose} disabled={busy}>{busy ? "Aggregating…" : "Close carton"}</Btn>
          </div>
        </div>
      </Card>
      <Card>
        <CardHead title="Packs waiting to be aggregated" icon={Barcode} sub={`${issued.length} issued in this run`} />
        <div style={{ maxHeight:330, overflowY:"auto", padding:"12px 18px" }}>
          <div className="ladder">
            {issued.map((s, i) => (
              <div key={s.serial} className="lrow">
                <span className="sq">{i+1}</span>
                <SerialText value={s.serial} pid={s.pid} size={13.5} />
                <span style={{ marginLeft:"auto" }}>
                  {i < cartonSize ? <Chip tone="c-info" icon={ArrowRight}>To carton</Chip> : <Chip tone="c-mut">Loose</Chip>}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
