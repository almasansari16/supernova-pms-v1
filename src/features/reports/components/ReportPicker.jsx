import { FileBarChart } from "lucide-react";
import { Card, CardHead } from "@/shared/ui";
import { REPORTS } from "../data/reportDefinitions.js";

export function ReportPicker({ selected, onSelect }) {
  return (
    <Card>
      <CardHead title="Choose a report" icon={FileBarChart} />
      <div style={{ padding:10, display:"flex", flexDirection:"column", gap:4 }}>
        {REPORTS.map(x => (
          <button key={x.id} onClick={() => onSelect(x.id)}
            style={{ display:"flex", gap:11, alignItems:"flex-start", textAlign:"left", border:0, borderRadius:10,
                     padding:"10px 12px", background: selected===x.id ? "var(--nova-soft)" : "transparent", transition:"background .16s" }}>
            <x.ic size={16} color={selected===x.id ? "var(--nova)" : "var(--slate-2)"} style={{ marginTop:2, flex:"0 0 16px" }} />
            <div>
              <div style={{ fontSize:13, fontWeight:600, color: selected===x.id ? "var(--nova)" : "var(--ink)" }}>{x.t}</div>
              <div style={{ fontSize:11.5, color:"var(--slate)", marginTop:2, lineHeight:1.45 }}>{x.d}</div>
            </div>
          </button>
        ))}
      </div>
    </Card>
  );
}
