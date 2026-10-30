import { Layers } from "lucide-react";
import { Card, CardHead } from "@/shared/ui";
import { nf } from "@/shared/lib";
import { topProducts } from "../data/charts.js";

const MAX = Math.max(...topProducts.map(p => p.v));

export function TopProductsCard() {
  return (
    <Card>
      <CardHead title="Top products" sub="Serialized units, month to date" icon={Layers} />
      <div style={{ padding:"14px 14px 10px", display:"flex", flexDirection:"column", gap:13 }}>
        {topProducts.map(p => (
          <div key={p.pid}>
            <div style={{ display:"flex", justifyContent:"space-between", fontSize:12.5, marginBottom:5 }}>
              <span style={{ fontWeight:600 }}>{p.name}</span>
              <span className="mono" style={{ color:"var(--slate)" }}>{nf(p.v)}</span>
            </div>
            <div style={{ height:7, background:"#F1F4FA", borderRadius:20, overflow:"hidden" }}>
              <div style={{ width:`${(p.v/MAX)*100}%`, height:"100%", background:p.fill, borderRadius:20, transition:"width .8s cubic-bezier(.2,.7,.3,1)" }} />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
