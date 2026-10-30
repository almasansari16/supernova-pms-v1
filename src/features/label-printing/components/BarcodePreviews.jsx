import { Barcode, Cpu } from "lucide-react";
import { Barcode1D, DataMatrix } from "@/shared/barcode";
import { Card, CardHead } from "@/shared/ui";

/* Side-by-side 1D and 2D symbol previews for the selected label */
export function BarcodePreviews({ tab, product: p, serial, carton }) {
  const value = tab === "unit" ? serial : carton?.id;
  return (
    <div className="grid g-2">
      <Card>
        <CardHead title="1D barcode preview" icon={Barcode} sub="GS1-128, human readable below" />
        <div style={{ padding:20 }}><Barcode1D value={value} height={62} /></div>
      </Card>
      <Card>
        <CardHead title="2D DataMatrix preview" icon={Cpu} sub="GS1 DataMatrix, ECC 200" />
        <div style={{ padding:20, display:"flex", gap:16, alignItems:"center" }}>
          <DataMatrix value={value} size={118} />
          <div style={{ fontSize:12, color:"var(--slate)", lineHeight:1.6 }}>
            Carries the full GS1 element string, so a single scan returns GTIN, serial, batch and expiry together.
            <div className="mono" style={{ fontSize:10.5, marginTop:9, color:"var(--ink-2)", wordBreak:"break-all" }}>
              {tab === "unit" ? `(01)${p.gtin}(21)${serial}` : `(00)${carton?.id}(37)${carton?.serials.length}`}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
