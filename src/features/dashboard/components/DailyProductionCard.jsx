import { Activity } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RTooltip } from "recharts";
import { dailyProduction } from "@/entities/production";
import { Card, CardHead } from "@/shared/ui";
import { chartAxis, tipStyle } from "@/shared/charts";

export function DailyProductionCard({ loading }) {
  return (
    <Card>
      <CardHead title="Daily production" sub="Unit packs serialised vs cartons closed · last 7 days" icon={Activity}
        right={<div style={{ display:"flex", gap:14, fontSize:11.5, color:"var(--slate)" }}>
          <span style={{ display:"flex", gap:6, alignItems:"center" }}><i style={{ width:9, height:9, borderRadius:3, background:"#5236D6" }} />Units</span>
          <span style={{ display:"flex", gap:6, alignItems:"center" }}><i style={{ width:9, height:9, borderRadius:3, background:"#6D3BEF" }} />Cartons</span>
        </div>} />
      <div style={{ padding:"14px 10px 6px", height:262 }}>
        {loading ? <div className="sk" style={{ height:"100%", margin:"0 8px" }} /> : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={dailyProduction} margin={{ top:6, right:12, left:0, bottom:0 }}>
              <defs>
                <linearGradient id="gU" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#5236D6" stopOpacity=".28" /><stop offset="100%" stopColor="#5236D6" stopOpacity="0" /></linearGradient>
                <linearGradient id="gC" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#6D3BEF" stopOpacity=".22" /><stop offset="100%" stopColor="#6D3BEF" stopOpacity="0" /></linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 4" stroke="#EFF2F8" vertical={false} />
              <XAxis dataKey="d" {...chartAxis} />
              <YAxis yAxisId="l" {...chartAxis} width={44} />
              <YAxis yAxisId="r" orientation="right" {...chartAxis} width={36} />
              <RTooltip {...tipStyle} />
              <Area yAxisId="l" type="monotone" dataKey="units" stroke="#5236D6" strokeWidth={2.4} fill="url(#gU)" name="Units" />
              <Area yAxisId="r" type="monotone" dataKey="cartons" stroke="#6D3BEF" strokeWidth={2.2} fill="url(#gC)" name="Cartons" />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </Card>
  );
}
