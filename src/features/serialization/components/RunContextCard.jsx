import { useNavigate } from "react-router-dom";
import { ClipboardList, RefreshCw } from "lucide-react";
import { useProduction } from "@/entities/production";
import { Btn, Card, CardHead, Field, Input, SapField, Select } from "@/shared/ui";
import { LINES, MACHINES, OPERATORS, ROUTES, SHIFTS } from "@/shared/config";

/* SAP-locked product fields plus the line-captured run context */
export function RunContextCard({ product: p }) {
  const { ctx, updateCtx } = useProduction();
  const navigate = useNavigate();
  return (
    <Card>
      <CardHead title="Run context" icon={ClipboardList}
        sub="SAP fields are locked; the rest is captured on the line"
        right={<Btn kind="g" sm icon={RefreshCw} onClick={() => navigate(ROUTES.sap)}>SAP data</Btn>} />
      <div style={{ padding:18 }}>
        <div className="grid" style={{ gridTemplateColumns:"repeat(auto-fit,minmax(148px,1fr))", marginBottom:16 }}>
          <SapField k="Product name" v={p.name} mono={false} />
          <SapField k="GTIN" v={p.gtin} />
          <SapField k="Batch" v={p.batch} />
          <SapField k="Expiry" v={p.exp} />
        </div>
        <div className="grid" style={{ gridTemplateColumns:"repeat(auto-fit,minmax(148px,1fr))" }}>
          <Field label="Operator name"><Select options={OPERATORS} value={ctx.operator} onChange={e => updateCtx({ operator:e.target.value })} /></Field>
          <Field label="Production line" hint="Internal record only — never printed on a label.">
            <Select options={LINES} value={ctx.line} onChange={e => updateCtx({ line:e.target.value })} />
          </Field>
          <Field label="Shift"><Select options={SHIFTS} value={ctx.shift} onChange={e => updateCtx({ shift:e.target.value })} /></Field>
          <Field label="Packaging machine"><Select options={MACHINES} value={ctx.machine} onChange={e => updateCtx({ machine:e.target.value })} /></Field>
          <Field label="Packaging start"><Input type="time" value={ctx.start} onChange={e => updateCtx({ start:e.target.value })} /></Field>
          <Field label="Packaging end"><Input type="time" value={ctx.end} onChange={e => updateCtx({ end:e.target.value })} /></Field>
        </div>
        <div style={{ marginTop:14 }}>
          <Field label="Remarks"><Input placeholder="Anything the next shift should know" value={ctx.remarks} onChange={e => updateCtx({ remarks:e.target.value })} /></Field>
        </div>
      </div>
    </Card>
  );
}
