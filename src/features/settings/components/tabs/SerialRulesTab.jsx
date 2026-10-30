import { Layers, TriangleAlert } from "lucide-react";
import { SerialText } from "@/entities/serial";
import { useProduction } from "@/entities/production";
import { CardHead, Field, Select } from "@/shared/ui";

export function SerialRulesTab({ prefix, setPrefix, pad, setPad, marker, setMarker }) {
  const { pid } = useProduction();
  return (
    <>
      <CardHead title="Serial rules" icon={Layers} sub="How numbers are composed and reserved" />
      <div style={{ padding:18 }}>
        <div className="grid" style={{ gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))" }}>
          <Field label="Unit serial prefix" hint="Product ID keeps every product on its own sequence."><Select options={["Product ID","Material code","GTIN last 6","Custom prefix"]} value={prefix} onChange={e => setPrefix(e.target.value)} /></Field>
          <Field label="Sequence length"><Select options={["7","8","9","10","12"]} value={String(pad)} onChange={e => setPad(Number(e.target.value))} /></Field>
          <Field label="Carton marker digit" hint="Distinguishes a parent from a child at scan time."><Select options={["5","8","9"]} value={marker} onChange={e => setMarker(e.target.value)} /></Field>
          <Field label="On rejection"><Select options={["Void the serial, never reissue","Void and log for QA review"]} /></Field>
          <Field label="Gap policy"><Select options={["Gaps allowed and audited","Block the run on a gap"]} /></Field>
          <Field label="Reprint approval"><Select options={["QA or Supervisor","QA only","No approval needed"]} /></Field>
        </div>
        <div style={{ marginTop:18, display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:14 }}>
          <div style={{ padding:16, background:"var(--nova-soft)", borderRadius:12 }}>
            <div style={{ fontSize:10.5, textTransform:"uppercase", letterSpacing:".08em", color:"#1739A0", fontWeight:700 }}>Unit pack pattern</div>
            <div className="mono" style={{ fontSize:14, marginTop:8, fontWeight:600 }}>{"<"}{prefix}{">"} + {pad} digits</div>
            <div style={{ marginTop:9 }}><SerialText value={pid + String(1).padStart(pad,"0")} pid={pid} size={17} /></div>
          </div>
          <div style={{ padding:16, background:"var(--violet-soft)", borderRadius:12 }}>
            <div style={{ fontSize:10.5, textTransform:"uppercase", letterSpacing:".08em", color:"#4B21B8", fontWeight:700 }}>Master carton pattern</div>
            <div className="mono" style={{ fontSize:14, marginTop:8, fontWeight:600 }}>{"<"}{prefix}{">"} + "{marker}" + {pad-1} digits</div>
            <div style={{ marginTop:9 }}><SerialText value={pid + marker + String(1).padStart(pad-1,"0")} pid={pid} carton size={17} /></div>
          </div>
        </div>
        <div style={{ marginTop:16, padding:13, background:"var(--rose-soft)", borderRadius:10, display:"flex", gap:9, fontSize:12.5, color:"#B01B28" }}>
          <TriangleAlert size={15} style={{ flex:"0 0 15px", marginTop:1 }} />
          Changing the pattern does not renumber anything already issued. Old and new formats coexist, and the scanner reads both.
        </div>
      </div>
    </>
  );
}
