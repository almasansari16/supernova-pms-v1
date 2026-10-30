import { Factory } from "lucide-react";
import { CardHead, Field, Input, Select } from "@/shared/ui";

export function CompanyTab() {
  return (
    <>
      <CardHead title="Company information" icon={Factory} sub="Printed on labels and report headers" />
      <div style={{ padding:18 }}>
        <div className="grid" style={{ gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))" }}>
          <Field label="Legal name"><Input defaultValue="SuperNova Pharmaceuticals (Pvt.) Ltd." /></Field>
          <Field label="Brand shown in the app"><Input defaultValue="SuperNova" /></Field>
          <Field label="Licence number"><Input defaultValue="DRAP-MFG-2019-4471" /></Field>
          <Field label="GS1 company prefix" hint="First digits of every GTIN you issue."><Input defaultValue="0896400" /></Field>
          <Field label="Plant"><Select options={["1100 · Karachi Plant","1200 · Lahore Plant"]} /></Field>
          <Field label="Time zone"><Select options={["Asia/Karachi (PKT, UTC+5)","Asia/Dubai (UTC+4)"]} /></Field>
        </div>
        <div style={{ marginTop:14 }}><Field label="Registered address"><Input defaultValue="Plot 22, Sector 23, Korangi Industrial Area, Karachi 74900" /></Field></div>
      </div>
    </>
  );
}
