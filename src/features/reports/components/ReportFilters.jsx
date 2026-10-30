import { Filter } from "lucide-react";
import { PRODUCTS } from "@/entities/product";
import { Card, CardHead, Field, Input, Select } from "@/shared/ui";
import { LINES } from "@/shared/config";

export function ReportFilters({ from, to, setFrom, setTo }) {
  return (
    <Card>
      <CardHead title="Range and scope" icon={Filter} />
      <div style={{ padding:18, display:"flex", flexDirection:"column", gap:13 }}>
        <Field label="From"><Input type="date" value={from} onChange={e => setFrom(e.target.value)} /></Field>
        <Field label="To"><Input type="date" value={to} onChange={e => setTo(e.target.value)} /></Field>
        <Field label="Product"><Select options={["All products", ...PRODUCTS.map(p => `${p.pid} · ${p.name}`)]} /></Field>
        <Field label="Line"><Select options={["All lines", ...LINES]} /></Field>
        <Field label="Plant"><Select options={["All plants","1100 · Karachi Plant","1200 · Lahore Plant"]} /></Field>
      </div>
    </Card>
  );
}
