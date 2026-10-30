import { Barcode, Info, RefreshCw, Zap } from "lucide-react";
import { SerialText, unitSerial } from "@/entities/serial";
import { Btn, Card, CardHead, Field, Input } from "@/shared/ui";
import { QUICK_PACK_QTY } from "../constants/steps.js";

/* Step 3 — choose how many unit packs to serialize and issue them */
export function UnitSerialsStep({ pid, nextSeq, qty, setQty, busy, onIssue }) {
  const last = nextSeq + Number(qty||1) - 1;
  const rules = [
    ["Digits 1–4", `Product ID ${pid}. Fixed for the life of the material.`, "var(--nova)"],
    ["Digits 5–13", "Nine-digit running sequence, zero padded. One billion packs per product before the space is exhausted.", "var(--ink)"],
    ["Independence", "Product 1005 starts again at 1005000000001. Two products can never produce the same number.", "var(--violet)"],
    ["Commitment", "A serial is written to the register before it reaches a printer, so a print failure can never silently reuse a number.", "var(--mint)"],
  ];
  return (
    <div className="grid fade" style={{ gridTemplateColumns:"minmax(0,1fr) minmax(0,1.1fr)" }}>
      <Card>
        <CardHead title="Step 3 · Generate unit serials" icon={Barcode} sub={`Product ${pid} · next sequence #${nextSeq}`} />
        <div style={{ padding:18 }}>
          <Field label="Unit packs in this run" req hint={`Issues ${unitSerial(pid, nextSeq)} through ${unitSerial(pid, last)}.`}>
            <Input type="number" min="1" max="500" value={qty} onChange={e => setQty(e.target.value)} />
          </Field>
          <div style={{ display:"flex", gap:8, marginTop:12, flexWrap:"wrap" }}>
            {QUICK_PACK_QTY.map(n => <button key={n} className={`btn btn-sm ${Number(qty)===n?"btn-s":"btn-g"}`} onClick={() => setQty(n)}>{n} packs</button>)}
          </div>
          <div style={{ marginTop:18, padding:14, background:"var(--mist)", borderRadius:12 }}>
            <div style={{ fontSize:10.5, textTransform:"uppercase", letterSpacing:".08em", color:"var(--slate-2)", fontWeight:700, marginBottom:9 }}>Preview</div>
            <div className="ladder">
              {[0,1,2].map(i => (
                <div key={i} className="lrow">
                  <span className="sq">#{nextSeq+i}</span>
                  <SerialText value={unitSerial(pid, nextSeq+i)} pid={pid} />
                </div>
              ))}
              <div style={{ textAlign:"center", color:"var(--slate-2)", fontSize:16, letterSpacing:".3em" }}>⋮</div>
              <div className="lrow">
                <span className="sq">#{last}</span>
                <SerialText value={unitSerial(pid, last)} pid={pid} />
              </div>
            </div>
          </div>
          <div style={{ display:"flex", justifyContent:"flex-end", marginTop:18 }}>
            <Btn kind="p" icon={busy ? RefreshCw : Zap} onClick={onIssue} disabled={busy}>{busy ? "Issuing…" : `Generate ${qty} serials`}</Btn>
          </div>
        </div>
      </Card>
      <Card>
        <CardHead title="Serial format" icon={Info} sub="Why this scheme survives an audit" />
        <div style={{ padding:18, fontSize:13, color:"var(--slate)", lineHeight:1.65 }}>
          <div style={{ display:"flex", gap:11, alignItems:"center", padding:"12px 14px", background:"var(--nova-soft)", borderRadius:12, marginBottom:14 }}>
            <SerialText value={unitSerial(pid, nextSeq)} pid={pid} size={21} />
          </div>
          {rules.map(([k,v,c]) => (
            <div key={k} style={{ display:"flex", gap:11, marginBottom:13 }}>
              <div style={{ width:4, borderRadius:4, background:c, flex:"0 0 4px" }} />
              <div><div style={{ fontWeight:600, color:"var(--ink)", fontSize:12.5 }}>{k}</div><div style={{ fontSize:12.5 }}>{v}</div></div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
