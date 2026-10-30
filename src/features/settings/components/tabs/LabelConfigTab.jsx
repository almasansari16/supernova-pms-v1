import { Check, Printer, TriangleAlert } from "lucide-react";
import { CardHead, Chip } from "@/shared/ui";

export function LabelConfigTab() {
  return (
    <>
      <CardHead title="Label configuration" icon={Printer} sub="Which fields appear on which artwork" />
      <div style={{ padding:18 }}>
        <div className="tblwrap">
          <table className="tbl">
            <thead><tr>{["Field","Unit pack label","Master carton label","Note"].map(h => <th key={h}>{h}</th>)}</tr></thead>
            <tbody>
              {[["Company logo",1,1,""],["Product name",1,1,""],["GTIN",1,1,""],["Batch",1,1,""],
                ["Manufacturing date",1,0,""],["Expiry date",1,1,""],["Serial number",1,0,"Human readable + DataMatrix"],
                ["Master carton number",0,1,""],["Total unit packs",0,1,""],["Packaging date",0,1,""],
                ["Tree summary (first → last)",0,1,""],["Production line",0,0,"Internal record only — locked off both labels"],
                ["Operator name",0,0,"Held in the register"]].map(([f,u,c,note]) => (
                <tr key={f}>
                  <td style={{ fontWeight:600, fontSize:12.5 }}>{f}</td>
                  <td>{u ? <Chip tone="c-ok" icon={Check}>On</Chip> : <Chip tone="c-mut">Off</Chip>}</td>
                  <td>{c ? <Chip tone="c-ok" icon={Check}>On</Chip> : <Chip tone="c-mut">Off</Chip>}</td>
                  <td style={{ fontSize:12, color:"var(--slate)", whiteSpace:"normal", minWidth:240 }}>{note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ marginTop:16, padding:13, background:"var(--spark-soft)", borderRadius:10, display:"flex", gap:9, fontSize:12.5, color:"#96620A" }}>
          <TriangleAlert size={15} style={{ flex:"0 0 15px", marginTop:1 }} />
          Production line is locked off both labels by policy. Unlocking it needs a change request signed by QA.
        </div>
      </div>
    </>
  );
}
