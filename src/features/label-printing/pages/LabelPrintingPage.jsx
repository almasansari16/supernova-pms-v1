import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Barcode, Boxes, Eye, FileText, Info, Printer, WifiOff } from "lucide-react";
import { prodByPid } from "@/entities/product";
import { useRegister } from "@/entities/register";
import { CartonLabel, UnitLabel } from "@/entities/label";
import { Btn, Card, CardHead, Chip, Field, Input, PageHead, Select, useToast } from "@/shared/ui";
import { EncodedDataCard } from "../components/EncodedDataCard.jsx";
import { BarcodePreviews } from "../components/BarcodePreviews.jsx";

const PRINTERS = ["Zebra ZT411 · LINE-01","Zebra ZT411 · LINE-02","Zebra ZT230 · LINE-03 (offline)","Videojet 9550 · LINE-04"];
const TABS = [["unit","Unit pack",Barcode],["carton","Master carton",Boxes]];

/* Opened directly, or with ?serial=… / ?carton=… from the register and carton tree */
export default function LabelPrintingPage() {
  const { serials, cartons } = useRegister();
  const toast = useToast();
  const [params] = useSearchParams();
  const linkedSerial = params.get("serial");
  const linkedCarton = params.get("carton");

  const [tab, setTab] = useState(linkedCarton && !linkedSerial ? "carton" : "unit");
  const [serial, setSerial] = useState(linkedSerial || serials[0]?.serial);
  const [cartonId, setCartonId] = useState(linkedCarton || cartons[0]?.id);
  const [copies, setCopies] = useState(1);
  const [printer, setPrinter] = useState(PRINTERS[0]);

  useEffect(() => { if (linkedSerial) { setSerial(linkedSerial); setTab("unit"); } }, [linkedSerial]);
  useEffect(() => { if (linkedCarton) { setCartonId(linkedCarton); setTab("carton"); } }, [linkedCarton]);

  const rec = serials.find(s => s.serial === serial) || serials[0];
  const carton = cartons.find(c => c.id === cartonId) || cartons[0];
  const p = prodByPid(tab === "unit" ? rec?.pid : carton?.pid);

  return (
    <div>
      <PageHead crumbs={["Home","Label Printing"]} title="Label printing"
        sub="What reaches the printer is exactly what you see here. Production line is captured in the record but never rendered on artwork."
        actions={<>
          <Btn kind="g" icon={FileText} onClick={() => toast("Label artwork exported as PDF")}>Export PDF</Btn>
          <Btn kind="p" icon={Printer} onClick={() => toast(`${copies} label${copies>1?"s":""} sent to ${printer}`)}>Send to printer</Btn>
        </>} />

      <div className="grid" style={{ gridTemplateColumns:"320px minmax(0,1fr)" }}>
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          <Card>
            <CardHead title="What to print" icon={Printer} />
            <div style={{ padding:18 }}>
              <div style={{ display:"flex", gap:8, marginBottom:16, background:"var(--mist)", padding:4, borderRadius:10 }}>
                {TABS.map(([k,l,Ic]) => (
                  <button key={k} onClick={() => setTab(k)} className="btn btn-sm"
                    style={{ flex:1, justifyContent:"center", background: tab===k ? "#fff" : "transparent",
                             color: tab===k ? "var(--nova)" : "var(--slate)", boxShadow: tab===k ? "var(--sh-1)" : "none", border:0 }}>
                    <Ic size={13} />{l}
                  </button>
                ))}
              </div>
              {tab === "unit" ? (
                <Field label="Serial number" hint="Any serial from the register.">
                  <select className="inp mono" value={serial} onChange={e => setSerial(e.target.value)}>
                    {serials.slice(0, 60).map(s => <option key={s.serial} value={s.serial}>{s.serial}</option>)}
                  </select>
                </Field>
              ) : (
                <Field label="Master carton number" hint="Parent record with its child serials.">
                  <select className="inp mono" value={cartonId} onChange={e => setCartonId(e.target.value)}>
                    {cartons.map(c => <option key={c.id} value={c.id}>{c.id} · {c.serials.length} packs</option>)}
                  </select>
                </Field>
              )}
              <div style={{ marginTop:14 }}>
                <Field label="Printer">
                  <Select options={PRINTERS} value={printer} onChange={e => setPrinter(e.target.value)} />
                </Field>
              </div>
              {printer.includes("offline") && (
                <div style={{ marginTop:10, padding:11, background:"var(--rose-soft)", borderRadius:10, fontSize:12, color:"#B01B28", display:"flex", gap:8 }}>
                  <WifiOff size={14} style={{ flex:"0 0 14px", marginTop:1 }} />
                  This printer is not responding. Choose another printer, or restart the ZT230 print server on LINE-03.
                </div>
              )}
              <div style={{ marginTop:14 }}>
                <Field label="Copies"><Input type="number" min="1" max="200" value={copies} onChange={e => setCopies(Number(e.target.value))} /></Field>
              </div>
            </div>
          </Card>

          <EncodedDataCard tab={tab} product={p} serial={serial} carton={carton} />
        </div>

        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          <Card>
            <CardHead title="Print preview" icon={Eye}
              sub={tab === "unit" ? "Unit pack label · 60 × 40 mm" : "Master carton label · 100 × 75 mm"}
              right={<Chip tone="c-mut" icon={Info}>Actual size scales to stock</Chip>} />
            <div style={{ padding:22, background:"repeating-linear-gradient(45deg,#F7F9FD,#F7F9FD 10px,#F2F5FA 10px,#F2F5FA 20px)", display:"grid", placeItems:"center" }}>
              <div style={{ width:"100%", maxWidth: tab === "unit" ? 420 : 520 }} className="fade" key={tab + serial + cartonId}>
                {tab === "unit" ? <UnitLabel serial={serial} p={p} /> : <CartonLabel carton={carton} p={p} />}
              </div>
            </div>
          </Card>

          <BarcodePreviews tab={tab} product={p} serial={serial} carton={carton} />
        </div>
      </div>
    </div>
  );
}
