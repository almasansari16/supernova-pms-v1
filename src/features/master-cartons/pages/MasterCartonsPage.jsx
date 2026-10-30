import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Boxes, CircleCheck, FileSpreadsheet, Layers, Link2, MoveRight, Plus, X } from "lucide-react";
import { PRODUCTS } from "@/entities/product";
import { useRegister } from "@/entities/register";
import { Btn, Card, CardHead, Empty, FilterSelect, KPI, PageHead, SearchBox, useToast } from "@/shared/ui";
import { nf } from "@/shared/lib";
import { ROUTES, withQuery } from "@/shared/config";
import { CartonTree } from "../components/CartonTree.jsx";

export default function MasterCartonsPage() {
  const { cartons } = useRegister();
  const toast = useToast();
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [fPid, setFPid] = useState("All products");
  const rows = cartons.filter(c => c.id.includes(q) && (fPid === "All products" || c.pid === fPid));
  const totalPacks = cartons.reduce((a,c) => a + c.serials.length, 0);

  return (
    <div>
      <PageHead crumbs={["Home","Master Cartons"]} title="Master cartons"
        sub="Each carton is a parent record holding the exact unit serials packed inside it. Expand a carton to walk its children — this is the aggregation evidence a regulator asks for."
        actions={<><Btn kind="g" icon={FileSpreadsheet} onClick={() => toast("Carton_report.xlsx downloaded")}>Export</Btn>
                    <Btn kind="p" icon={Plus} onClick={() => navigate(ROUTES.packaging)}>New carton</Btn></>} />

      <div className="grid g-kpi" style={{ marginBottom:14 }}>
        <KPI label="Cartons closed" value={nf(cartons.length)} delta="Across 5 products" icon={Boxes} tone="violet" trend={false} />
        <KPI label="Packs aggregated" value={nf(totalPacks)} delta="Full parent–child trail" icon={Layers} tone="nova" trend={false} />
        <KPI label="Awaiting dispatch" value={nf(cartons.filter(c => c.status === "Closed").length)} delta="At the dock" icon={MoveRight} tone="spark" trend={false} />
        <KPI label="Dispatched" value={nf(cartons.filter(c => c.status === "Dispatched").length)} delta="Handed to logistics" icon={CircleCheck} tone="mint" trend={false} />
      </div>

      <Card>
        <CardHead title="Aggregation tree" icon={Link2} sub="Master carton → contained unit packs"
          right={<div style={{ display:"flex", gap:9, flexWrap:"wrap" }}>
            <SearchBox width={210} placeholder="Carton number" value={q} onChange={e => setQ(e.target.value)} />
            <FilterSelect value={fPid} onChange={e => setFPid(e.target.value)} options={["All products", ...PRODUCTS.map(x => x.pid)]} />
          </div>} />
        <div style={{ padding:16, display:"flex", flexDirection:"column", gap:10 }} className="tree">
          {rows.map((c, i) => <CartonTree key={c.id} carton={c} defaultOpen={i === 0}
            onPrint={(cc) => navigate(withQuery(ROUTES.labels, { carton:cc.id }))} />)}
        </div>
        {!rows.length && <Empty icon={Boxes} title="No cartons match" body="Clear the filters, or close a carton from a packaging run to see it here." action={<Btn kind="g" icon={X} onClick={() => { setQ(""); setFPid("All products"); }}>Clear filters</Btn>} />}
      </Card>
    </div>
  );
}
