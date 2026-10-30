import { useState } from "react";
import { Boxes, ChevronDown, ChevronRight, Layers, Link2 } from "lucide-react";
import { prodByPid } from "@/entities/product";
import { SerialText } from "@/entities/serial";
import { useRegister } from "@/entities/register";
import { DataMatrix } from "@/shared/barcode";
import { Btn, Card, CardHead, Chip, SapField, St } from "@/shared/ui";

const KID_COLUMNS = ["#","Unit serial","Status","Operator","Machine","Generated"];

/* Decoded parent record — a master carton and every pack inside it */
export function CartonScanResult({ carton: c }) {
  const { serials } = useRegister();
  const [openKids, setOpenKids] = useState(true);
  const p = prodByPid(c.pid);
  const kids = serials.filter(s => s.carton === c.id);
  return (
    <div className="grid fade" style={{ gap:14 }}>
      <Card>
        <CardHead title="Master carton decoded" icon={Boxes} sub="Parent record · aggregated packs" right={<St v={c.status} />} />
        <div style={{ padding:18 }}>
          <div style={{ display:"flex", gap:18, flexWrap:"wrap", alignItems:"center", marginBottom:18 }}>
            <DataMatrix value={c.id} size={92} />
            <div>
              <div style={{ fontSize:11, textTransform:"uppercase", letterSpacing:".08em", color:"var(--slate-2)", fontWeight:700 }}>Master carton number</div>
              <SerialText value={c.id} pid={c.pid} carton size={24} />
              <div style={{ marginTop:9, display:"flex", gap:8, flexWrap:"wrap" }}>
                <Chip tone="c-vio" icon={Layers}>{c.serials.length} unit packs</Chip>
                <Chip tone="c-info">Pack size {c.size}</Chip>
              </div>
            </div>
          </div>
          <div className="grid g-3">
            <SapField k="Product" v={p.name} mono={false} />
            <SapField k="Batch" v={p.batch} />
            <SapField k="GTIN" v={p.gtin} />
            <SapField k="Expiry date" v={p.exp} />
            <SapField k="Packaging date" v={c.ts} />
            <SapField k="Status" v={c.status} mono={false} />
          </div>
        </div>
      </Card>
      <Card>
        <CardHead title="Unit packs inside this carton" icon={Link2} sub={`${kids.length} child records`}
          right={<Btn kind="g" sm icon={openKids ? ChevronDown : ChevronRight} onClick={() => setOpenKids(o => !o)}>{openKids ? "Collapse" : "Expand"}</Btn>} />
        {openKids && (
          <div className="tblwrap" style={{ maxHeight:320, overflowY:"auto" }}>
            <table className="tbl">
              <thead><tr>{KID_COLUMNS.map(h => <th key={h}>{h}</th>)}</tr></thead>
              <tbody>
                {kids.map((s, i) => (
                  <tr key={s.serial}>
                    <td className="num" style={{ color:"var(--slate-2)" }}>{i+1}</td>
                    <td><SerialText value={s.serial} pid={s.pid} size={13.5} /></td>
                    <td><St v={s.status} /></td>
                    <td style={{ fontSize:12 }}>{s.operator}</td>
                    <td style={{ fontSize:12 }}>{s.machine}</td>
                    <td className="num" style={{ color:"var(--slate)" }}>{s.ts}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
