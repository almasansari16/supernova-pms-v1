import { Boxes, Factory, Gauge, LayoutDashboard, ShieldCheck, Users as UsersIcon } from "lucide-react";
import { Card, CardHead, Chip } from "@/shared/ui";

const ROLE_LANDING = [
  ["Admin", "Plant-wide output, all lines, SAP health, full audit reach", UsersIcon, "c-vio"],
  ["Supervisor", "Line performance, holds, reprint approvals, operator output", Gauge, "c-info"],
  ["Operator", "This shift only: units, cartons closed, rejects, running machine", Factory, "c-ok"],
  ["QA", "Verification scans, quarantine, reprint queue, batch release", ShieldCheck, "c-warn"],
  ["Warehouse", "Cartons at the dock, dispatch queue, aggregation errors", Boxes, "c-mut"],
];

/* What each role sees first on the dashboard */
export function RoleLandingGrid() {
  return (
    <Card>
      <CardHead title="What each role sees first" icon={LayoutDashboard} sub="Dashboard widgets change with the role" />
      <div style={{ padding:18 }} className="grid g-3">
        {ROLE_LANDING.map(([r,d,Ic,tone]) => (
          <div key={r} className="card pad">
            <div style={{ display:"flex", gap:9, alignItems:"center", marginBottom:8 }}><Ic size={16} color="var(--slate)" /><Chip tone={tone}>{r}</Chip></div>
            <div style={{ fontSize:12.5, color:"var(--slate)", lineHeight:1.55 }}>{d}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}
