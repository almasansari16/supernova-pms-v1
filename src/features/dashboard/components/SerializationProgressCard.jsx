import { Gauge } from "lucide-react";
import { ResponsiveContainer, RadialBarChart, RadialBar, Tooltip as RTooltip } from "recharts";
import { Card, CardHead } from "@/shared/ui";
import { tipStyle } from "@/shared/charts";
import { serializationProgress } from "../data/charts.js";

export function SerializationProgressCard() {
  return (
    <Card>
      <CardHead title="Serialization progress" sub="Against released order quantity" icon={Gauge} />
      <div style={{ padding:"6px 10px 0", height:198 }}>
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart innerRadius="52%" outerRadius="100%" data={serializationProgress} startAngle={90} endAngle={-270}>
            <RadialBar dataKey="v" cornerRadius={8} background={{ fill:"#F1F4FA" }} />
            <RTooltip {...tipStyle} formatter={(v,_n,p) => [`${v}% complete`, `Product ${p.payload.n}`]} />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
      <div style={{ padding:"4px 18px 16px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
        {serializationProgress.map(({ n, v, fill }) => (
          <div key={n} style={{ display:"flex", alignItems:"center", gap:7, fontSize:12 }}>
            <i style={{ width:9, height:9, borderRadius:3, background:fill }} />
            <span className="mono">{n}</span><span style={{ marginLeft:"auto", fontWeight:600 }}>{v}%</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
