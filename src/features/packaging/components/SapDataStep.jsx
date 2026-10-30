import { ArrowRight, Database, RefreshCw, Wifi } from "lucide-react";
import { useProduction } from "@/entities/production";
import { Btn, Card, CardHead, Chip, Field, FieldGridSkeleton, Input, SapField, Select, useToast } from "@/shared/ui";
import { LINES, MACHINES, OPERATORS, SHIFTS } from "@/shared/config";

/* Step 2 — show the SAP master data and capture who/where on the line */
export function SapDataStep({ product: p, busy, run, onContinue }) {
  const { ctx, updateCtx } = useProduction();
  const toast = useToast();
  return (
    <Card className="fade">
      <CardHead title="Step 2 · Fetch master data from SAP S/4HANA" icon={Database}
        sub="Ten fields, read-only" right={<Chip tone={busy ? "c-warn" : "c-ok"} icon={busy ? RefreshCw : Wifi}>{busy ? "Pulling" : "Connected"}</Chip>} />
      <div style={{ padding:18 }}>
        {busy ? <FieldGridSkeleton /> : (
          <div className="grid g-3 rise">
            <SapField k="Material code" v={p.material} /><SapField k="Product name" v={p.name} mono={false} />
            <SapField k="Batch number" v={p.batch} /><SapField k="Manufacturing date" v={p.mfg} />
            <SapField k="Expiry date" v={p.exp} /><SapField k="GTIN number" v={p.gtin} />
            <SapField k="Packaging order" v={p.pkgOrder} /><SapField k="Production order" v={p.prodOrder} />
            <SapField k="Plant" v={p.plant} mono={false} /><SapField k="Storage location" v={p.sloc} mono={false} />
          </div>
        )}
        <div style={{ borderTop:"1px solid var(--line-2)", marginTop:18, paddingTop:18 }}>
          <div style={{ fontSize:12.5, fontWeight:600, marginBottom:12 }}>Captured on the line</div>
          <div className="grid" style={{ gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))" }}>
            <Field label="Operator name" req><Select options={OPERATORS} value={ctx.operator} onChange={e => updateCtx({ operator:e.target.value })} /></Field>
            <Field label="Production line" req hint="Internal only — excluded from labels."><Select options={LINES} value={ctx.line} onChange={e => updateCtx({ line:e.target.value })} /></Field>
            <Field label="Shift" req><Select options={SHIFTS} value={ctx.shift} onChange={e => updateCtx({ shift:e.target.value })} /></Field>
            <Field label="Packaging machine" req><Select options={MACHINES} value={ctx.machine} onChange={e => updateCtx({ machine:e.target.value })} /></Field>
            <Field label="Packaging start" req><Input type="time" value={ctx.start} onChange={e => updateCtx({ start:e.target.value })} /></Field>
            <Field label="Packaging end"><Input type="time" value={ctx.end} onChange={e => updateCtx({ end:e.target.value })} /></Field>
          </div>
          <div style={{ marginTop:14 }}><Field label="Remarks"><Input placeholder="Optional" value={ctx.remarks} onChange={e => updateCtx({ remarks:e.target.value })} /></Field></div>
        </div>
        <div style={{ display:"flex", justifyContent:"space-between", gap:9, marginTop:18, flexWrap:"wrap" }}>
          <Btn kind="g" icon={RefreshCw} onClick={() => run(() => toast("Master data refreshed"))} disabled={busy}>Re-pull from SAP</Btn>
          <Btn kind="p" icon={ArrowRight} onClick={onContinue} disabled={busy}>Continue to serialization</Btn>
        </div>
      </div>
    </Card>
  );
}
