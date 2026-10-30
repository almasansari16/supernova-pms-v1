import { useNavigate } from "react-router-dom";
import { Boxes, Eye, Printer } from "lucide-react";
import { CartonLabel, UnitLabel } from "@/entities/label";
import { Btn, Card, CardHead, useToast } from "@/shared/ui";
import { ROUTES } from "@/shared/config";

/* Step 5 — preview both label artworks and send them to the line printer */
export function PrintLabelsStep({ product: p, issued, carton, onPrinted }) {
  const toast = useToast();
  const navigate = useNavigate();
  return (
    <div className="fade">
      <div className="grid" style={{ gridTemplateColumns:"minmax(0,1fr) minmax(0,1fr)", marginBottom:14 }}>
        <Card><CardHead title="Unit pack label" icon={Printer} sub="One per saleable pack" />
          <div style={{ padding:18 }}><UnitLabel serial={issued[0]?.serial} p={p} /></div>
        </Card>
        <Card><CardHead title="Master carton label" icon={Boxes} sub="One per closed carton" />
          <div style={{ padding:18 }}><CartonLabel carton={carton} p={p} /></div>
        </Card>
      </div>
      <Card className="pad" style={{ display:"flex", gap:10, justifyContent:"space-between", alignItems:"center", flexWrap:"wrap" }}>
        <div style={{ fontSize:12.5, color:"var(--slate)" }}>
          Sent to <strong style={{ color:"var(--ink)" }}>Zebra ZT411 (LINE-01)</strong> · {issued.length} unit labels + 1 carton label
        </div>
        <div style={{ display:"flex", gap:9 }}>
          <Btn kind="g" icon={Eye} onClick={() => navigate(ROUTES.labels)}>Open print centre</Btn>
          <Btn kind="p" icon={Printer} onClick={() => { toast(`${issued.length + 1} labels sent to printer`); onPrinted(); }}>Print all labels</Btn>
        </div>
      </Card>
    </div>
  );
}
