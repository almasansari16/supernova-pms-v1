import { useNavigate } from "react-router-dom";
import { Boxes, CircleCheck, Play, ScanLine } from "lucide-react";
import { useProduction } from "@/entities/production";
import { Btn, Card, SapField } from "@/shared/ui";
import { ROUTES, withQuery } from "@/shared/config";

/* Step 6 — run summary with links to verify the carton */
export function CompleteStep({ product: p, issued, carton, onRestart }) {
  const { ctx } = useProduction();
  const navigate = useNavigate();
  return (
    <Card className="fade">
      <div style={{ padding:"34px 24px", textAlign:"center" }}>
        <div style={{ width:62, height:62, borderRadius:20, background:"var(--mint-soft)", color:"var(--mint)", display:"grid", placeItems:"center", margin:"0 auto 16px" }}><CircleCheck size={30} /></div>
        <h2 style={{ fontSize:20 }}>Packaging run complete</h2>
        <p style={{ color:"var(--slate)", fontSize:13, maxWidth:"46ch", margin:"8px auto 0" }}>
          {issued.length} unit packs serialized and {carton.serials.length} of them aggregated into carton {carton.id}. The parent–child record is committed and the labels are printed.
        </p>
        <div className="grid g-3" style={{ maxWidth:660, margin:"24px auto 0", textAlign:"left" }}>
          <SapField k="Master carton" v={carton.id} />
          <SapField k="Unit packs inside" v={String(carton.serials.length)} />
          <SapField k="Operator" v={ctx.operator} mono={false} />
          <SapField k="Line (internal)" v={ctx.line} mono={false} />
          <SapField k="Machine" v={ctx.machine} mono={false} />
          <SapField k="Batch" v={p.batch} />
        </div>
        <div style={{ display:"flex", gap:9, justifyContent:"center", marginTop:24, flexWrap:"wrap" }}>
          <Btn kind="g" icon={Boxes} onClick={() => navigate(ROUTES.cartons)}>View carton tree</Btn>
          <Btn kind="g" icon={ScanLine} onClick={() => navigate(withQuery(ROUTES.scanner, { code:carton.id }))}>Verify by scan</Btn>
          <Btn kind="p" icon={Play} onClick={onRestart}>Start another run</Btn>
        </div>
      </div>
    </Card>
  );
}
