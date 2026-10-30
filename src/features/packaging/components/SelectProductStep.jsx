import { ArrowRight, Check, ClipboardList } from "lucide-react";
import { PRODUCTS } from "@/entities/product";
import { useProduction } from "@/entities/production";
import { Btn, Card, CardHead, Chip } from "@/shared/ui";

/* Step 1 — choose the packaging order; its product ID becomes the serial prefix */
export function SelectProductStep({ onContinue }) {
  const { pid, setPid } = useProduction();
  return (
    <Card className="fade">
      <CardHead title="Step 1 · Select the packaging order" icon={ClipboardList} sub="The product ID on the order becomes the serial prefix" />
      <div style={{ padding:18 }}>
        <div className="grid g-3">
          {PRODUCTS.map(x => (
            <button key={x.pid} onClick={() => setPid(x.pid)} style={{ textAlign:"left", border:0, background:"transparent", padding:0 }}>
              <div className="card pad" style={{ borderColor: pid===x.pid ? "var(--nova)" : undefined, boxShadow: pid===x.pid ? "0 0 0 3px rgba(30,79,216,.12)" : undefined, transition:"all .16s" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:8 }}>
                  <div className="mono" style={{ fontSize:12, color:"var(--nova)", fontWeight:700 }}>ID {x.pid}</div>
                  {pid===x.pid && <Chip tone="c-info" icon={Check}>Selected</Chip>}
                </div>
                <div style={{ fontWeight:600, fontSize:13.5, marginTop:8 }}>{x.name}</div>
                <div style={{ fontSize:11.5, color:"var(--slate)", marginTop:4 }}>{x.form}</div>
                <div className="mono" style={{ fontSize:11, color:"var(--slate-2)", marginTop:9 }}>{x.pkgOrder} · {x.batch}</div>
              </div>
            </button>
          ))}
        </div>
        <div style={{ display:"flex", justifyContent:"flex-end", marginTop:18 }}>
          <Btn kind="p" icon={ArrowRight} onClick={onContinue}>Continue with {pid}</Btn>
        </div>
      </div>
    </Card>
  );
}
