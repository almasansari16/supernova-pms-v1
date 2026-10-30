import { Barcode } from "lucide-react";
import { gs1Expiry } from "@/entities/product";
import { Card, CardHead } from "@/shared/ui";

/* GS1 application identifiers that the selected label encodes */
export function EncodedDataCard({ tab, product: p, serial, carton }) {
  const rows = tab === "unit"
    ? [["01","GTIN",p.gtin],["21","Serial",serial],["10","Batch",p.batch],["17","Expiry",gs1Expiry(p)]]
    : [["00","SSCC / carton",carton?.id],["02","Contained GTIN",p.gtin],["37","Count",String(carton?.serials.length)],["10","Batch",p.batch]];
  return (
    <Card>
      <CardHead title="Encoded data" icon={Barcode} sub="GS1 application identifiers" />
      <div style={{ padding:18, display:"flex", flexDirection:"column", gap:10 }}>
        {rows.map(([ai,k,v]) => (
          <div key={ai} style={{ display:"flex", alignItems:"center", gap:11 }}>
            <span className="chip c-info mono" style={{ minWidth:34, justifyContent:"center" }}>{ai}</span>
            <span style={{ fontSize:12, color:"var(--slate)", minWidth:96 }}>{k}</span>
            <span className="mono" style={{ fontSize:12.5, fontWeight:600, marginLeft:"auto" }}>{v}</span>
          </div>
        ))}
        <div className="hint" style={{ marginTop:4 }}>Barcode and DataMatrix here are visual previews. Production artwork is rendered by the GS1 encoder in the label service.</div>
      </div>
    </Card>
  );
}
