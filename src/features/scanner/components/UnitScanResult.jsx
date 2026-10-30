import { Boxes, CircleCheck, Info, Layers } from "lucide-react";
import { prodByPid } from "@/entities/product";
import { SerialText } from "@/entities/serial";
import { DataMatrix } from "@/shared/barcode";
import { Card, CardHead, Chip, SapField, St } from "@/shared/ui";

/* Decoded child record — a single saleable unit pack */
export function UnitScanResult({ unit }) {
  const p = prodByPid(unit.pid);
  return (
    <div className="grid fade" style={{ gap:14 }}>
      <Card>
        <CardHead title="Unit pack decoded" icon={CircleCheck}
          sub="Child record · single saleable pack"
          right={<St v={unit.status} />} />
        <div style={{ padding:18 }}>
          <div style={{ display:"flex", gap:18, flexWrap:"wrap", alignItems:"center", marginBottom:18 }}>
            <DataMatrix value={unit.serial} size={92} />
            <div>
              <div style={{ fontSize:11, textTransform:"uppercase", letterSpacing:".08em", color:"var(--slate-2)", fontWeight:700 }}>Serial number</div>
              <SerialText value={unit.serial} pid={unit.pid} size={24} />
              <div style={{ marginTop:9, display:"flex", gap:8, flexWrap:"wrap" }}>
                <Chip tone="c-info" icon={Layers}>Product ID {unit.pid}</Chip>
                {unit.carton
                  ? <Chip tone="c-vio" icon={Boxes}>In carton {unit.carton}</Chip>
                  : <Chip tone="c-mut" icon={Info}>Not yet aggregated</Chip>}
              </div>
            </div>
          </div>
          <div className="grid g-3">
            <SapField k="Product" v={p.name} mono={false} />
            <SapField k="Batch" v={p.batch} />
            <SapField k="GTIN" v={p.gtin} />
            <SapField k="Manufacturing date" v={p.mfg} />
            <SapField k="Expiry date" v={p.exp} />
            <SapField k="Status" v={unit.status} mono={false} />
            <SapField k="Operator" v={unit.operator} mono={false} />
            <SapField k="Generated" v={unit.ts} />
            <SapField k="Machine" v={unit.machine} mono={false} />
          </div>
          <div className="hint" style={{ marginTop:12 }}>Production line is held against this record internally and is not exposed on the label or the scan response.</div>
        </div>
      </Card>
    </div>
  );
}
