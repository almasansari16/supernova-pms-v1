import { Database, Lock, Wifi } from "lucide-react";
import { CardHead, Chip, Field, Input, Select } from "@/shared/ui";

export function SapConfigTab() {
  return (
    <>
      <CardHead title="SAP S/4HANA configuration" icon={Database} sub="RFC destination and field mapping"
        right={<Chip tone="c-ok" icon={Wifi}>Connection healthy</Chip>} />
      <div style={{ padding:18 }}>
        <div className="grid" style={{ gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))" }}>
          <Field label="RFC destination"><Input defaultValue="S4H_PRD" /></Field>
          <Field label="Application server"><Input defaultValue="s4hana-prd.supernova.local" /></Field>
          <Field label="System / client"><Input defaultValue="PRD / 100" /></Field>
          <Field label="OData service"><Input defaultValue="API_PACKAGING_ORDER_SRV" /></Field>
          <Field label="Sync mode"><Select options={["On demand (operator pulls)","Every 5 minutes","On order release (event driven)"]} /></Field>
          <Field label="Timeout"><Input defaultValue="30 s" /></Field>
        </div>
        <div style={{ marginTop:18, borderTop:"1px solid var(--line-2)", paddingTop:16 }}>
          <div style={{ fontSize:12.5, fontWeight:600, marginBottom:11 }}>Field mapping</div>
          <div className="tblwrap">
            <table className="tbl">
              <thead><tr>{["Application field","SAP source","Direction","Editable here"].map(h => <th key={h}>{h}</th>)}</tr></thead>
              <tbody>
                {[["Material code","MATNR","Inbound"],["Product name","MAKTX","Inbound"],["Batch number","CHARG","Inbound"],
                  ["Manufacturing date","HSDAT","Inbound"],["Expiry date","VFDAT","Inbound"],["GTIN number","EAN11","Inbound"],
                  ["Packaging order","AUFNR (PKG)","Inbound"],["Production order","AUFNR","Inbound"],
                  ["Plant","WERKS","Inbound"],["Storage location","LGORT","Inbound"],
                  ["Unit serial","SERNR","Outbound"],["Master carton","HU / VEKP","Outbound"]].map(([a,b,c]) => (
                  <tr key={a}><td style={{ fontWeight:600, fontSize:12.5 }}>{a}</td><td className="num">{b}</td>
                    <td><Chip tone={c==="Inbound"?"c-info":"c-vio"}>{c}</Chip></td>
                    <td>{c === "Inbound" ? <Chip tone="c-mut" icon={Lock}>No</Chip> : <Chip tone="c-ok">System writes</Chip>}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
