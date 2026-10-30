import { Eye, FileSpreadsheet, FileText } from "lucide-react";
import { Btn, Card, CardHead, Chip, useToast } from "@/shared/ui";
import { SuperNovaLogo } from "@/shared/brand";

/* Branded report header plus the truncated preview table */
export function ReportPreview({ report: r, preview, from, to }) {
  const toast = useToast();
  return (
    <Card>
      <CardHead title={r.t} icon={r.ic} sub={`${from} to ${to} · ${preview.rows.length} rows in preview`}
        right={<Chip tone="c-mut" icon={Eye}>On-screen preview</Chip>} />
      <div style={{ padding:"16px 18px 0" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:16, paddingBottom:14, borderBottom:"2px solid var(--ink)", flexWrap:"wrap" }}>
          <div><SuperNovaLogo /><div style={{ fontSize:11.5, color:"var(--slate)", marginTop:6 }}>{r.t} · Plant 1100, Karachi</div></div>
          <div style={{ textAlign:"right", fontSize:11.5, color:"var(--slate)" }}>
            <div className="mono">{from} → {to}</div>
            <div style={{ marginTop:3 }}>Generated 2026-07-30 11:46 by Nabeel Ahmed</div>
          </div>
        </div>
      </div>
      <div className="tblwrap" style={{ padding:"0 4px" }}>
        <table className="tbl">
          <thead><tr>{preview.cols.map(c => <th key={c}>{c}</th>)}</tr></thead>
          <tbody>
            {preview.rows.map((row, i) => (
              <tr key={i}>{row.map((cell, j) => (
                <td key={j} className={j === 0 ? "num" : ""} style={j === 0 ? { fontWeight:600 } : { fontSize:12.5 }}>{cell}</td>
              ))}</tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ padding:"14px 18px", borderTop:"1px solid var(--line-2)", display:"flex", justifyContent:"space-between", alignItems:"center", gap:12, flexWrap:"wrap" }}>
        <div style={{ fontSize:11.5, color:"var(--slate-2)" }}>Preview truncated. The exported file carries the full range.</div>
        <div style={{ display:"flex", gap:9 }}>
          <Btn kind="g" sm icon={FileSpreadsheet} onClick={() => toast(`${r.t}.xlsx downloaded`)}>Download Excel</Btn>
          <Btn kind="g" sm icon={FileText} onClick={() => toast(`${r.t}.pdf downloaded`)}>Download PDF</Btn>
        </div>
      </div>
    </Card>
  );
}
