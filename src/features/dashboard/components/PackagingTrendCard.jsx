import { TrendingUp } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RTooltip } from "recharts";
import { Card, CardHead } from "@/shared/ui";
import { chartAxis, tipStyle } from "@/shared/charts";
import { pkgTrend } from "../data/charts.js";

export function PackagingTrendCard() {
  return (
    <Card>
      <CardHead title="Packaging trend" sub="Units per hour, two active lines" icon={TrendingUp} />
      <div style={{ padding:"14px 8px 10px", height:214 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={pkgTrend} margin={{ top:4, right:8, left:0, bottom:0 }} barGap={3}>
            <CartesianGrid strokeDasharray="3 4" stroke="#EFF2F8" vertical={false} />
            <XAxis dataKey="h" {...chartAxis} /><YAxis {...chartAxis} width={38} />
            <RTooltip {...tipStyle} />
            <Bar dataKey="a" name="LINE-01" fill="#3A22A8" radius={[4,4,0,0]} maxBarSize={13} />
            <Bar dataKey="b" name="LINE-02" fill="#A796EE" radius={[4,4,0,0]} maxBarSize={13} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
