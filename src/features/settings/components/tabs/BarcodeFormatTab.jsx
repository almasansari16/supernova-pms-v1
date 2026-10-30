import { Barcode } from "lucide-react";
import { gs1Expiry, prodByPid } from "@/entities/product";
import { unitSerial } from "@/entities/serial";
import { useProduction } from "@/entities/production";
import { useRegister } from "@/entities/register";
import { CardHead, Field, Select } from "@/shared/ui";

export function BarcodeFormatTab() {
  const { pid } = useProduction();
  const { seq } = useRegister();
  const p = prodByPid(pid);
  return (
    <>
      <CardHead title="Barcode format" icon={Barcode} sub="Symbology and GS1 element strings" />
      <div style={{ padding:18 }}>
        <div className="grid" style={{ gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))" }}>
          <Field label="Unit pack symbology"><Select options={["GS1 DataMatrix (ECC 200)","GS1-128","QR Code"]} /></Field>
          <Field label="Carton symbology"><Select options={["GS1-128 + GS1 DataMatrix","GS1-128 only","ITF-14"]} /></Field>
          <Field label="Module size"><Select options={["0.42 mm","0.50 mm","0.635 mm"]} /></Field>
          <Field label="Quiet zone"><Select options={["1 module","2 modules","4 modules"]} /></Field>
          <Field label="Grade target"><Select options={["ISO 15415 grade B or better","Grade C or better"]} /></Field>
          <Field label="Verification"><Select options={["Inline camera on every pack","Sampled 1 in 50","Manual"]} /></Field>
        </div>
        <div style={{ marginTop:18, padding:16, background:"var(--mist)", borderRadius:12 }}>
          <div style={{ fontSize:11, textTransform:"uppercase", letterSpacing:".08em", color:"var(--slate-2)", fontWeight:700, marginBottom:10 }}>Element string in use</div>
          <div className="mono" style={{ fontSize:13, lineHeight:1.9 }}>
            <div><span style={{ color:"var(--nova)" }}>(01)</span>{p.gtin}<span style={{ color:"var(--nova)" }}>(21)</span>{unitSerial(pid, seq[pid])}</div>
            <div><span style={{ color:"var(--nova)" }}>(10)</span>{p.batch}<span style={{ color:"var(--nova)" }}>(17)</span>{gs1Expiry(p)}</div>
          </div>
        </div>
      </div>
    </>
  );
}
