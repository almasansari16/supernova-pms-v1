import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, CircleCheck, ClipboardList, Download, Factory, Play, RefreshCw, TriangleAlert, X } from "lucide-react";
import { prodByPid } from "@/entities/product";
import { PROD_ORDERS } from "@/entities/production-order";
import { useProduction } from "@/entities/production";
import { Btn, Card, CardHead, Empty, KPI, PageHead, SearchBox, St, useToast } from "@/shared/ui";
import { nf } from "@/shared/lib";
import { ROUTES } from "@/shared/config";

const COLUMNS = ["Production order","Product","Material","Order qty","Serialized","Progress","Line","Status","Started","Actions"];

export default function ProductionOrdersPage() {
  const { setPid } = useProduction();
  const toast = useToast();
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const rows = PROD_ORDERS.filter(r => (r.po + prodByPid(r.pid).name + r.line + r.status).toLowerCase().includes(q.toLowerCase()));

  const openRun = (pid) => { setPid(pid); navigate(ROUTES.packaging); };

  return (
    <div>
      <PageHead crumbs={["Home","Production Orders"]} title="Production orders"
        sub="Released orders arriving from SAP S/4HANA. Pick one to open the packaging run — the serial prefix follows its product ID."
        actions={<><Btn kind="g" icon={Download}>Export</Btn><Btn kind="p" icon={RefreshCw} onClick={() => toast("Order list refreshed from SAP")}>Refresh from SAP</Btn></>} />

      <div className="grid g-kpi" style={{ marginBottom:14 }}>
        <KPI label="Released" value="5" delta="Across 2 plants" icon={ClipboardList} tone="nova" trend={false} />
        <KPI label="In progress" value="2" delta="LINE-01, LINE-04" icon={Play} tone="mint" trend={false} />
        <KPI label="On hold" value="1" delta="Foil splice change" icon={TriangleAlert} tone="spark" trend={false} />
        <KPI label="Completed today" value="1" delta="PO-1005-8907" icon={CircleCheck} tone="violet" trend={false} />
      </div>

      <Card>
        <CardHead title="Order list" icon={Factory}
          right={<SearchBox width={230} placeholder="Search orders" value={q} onChange={e => setQ(e.target.value)} />} />
        <div className="tblwrap">
          <table className="tbl">
            <thead><tr>{COLUMNS.map(h => <th key={h}>{h}</th>)}</tr></thead>
            <tbody>
              {rows.map(r => {
                const p = prodByPid(r.pid); const pct = Math.round(r.done / r.qty * 100);
                return (
                  <tr key={r.po}>
                    <td className="num" style={{ fontWeight:600 }}>{r.po}</td>
                    <td><div style={{ fontWeight:600 }}>{p.name}</div><div style={{ fontSize:11, color:"var(--slate-2)" }} className="mono">ID {r.pid} · {p.batch}</div></td>
                    <td className="num">{p.material}</td>
                    <td className="num">{nf(r.qty)}</td>
                    <td className="num">{nf(r.done)}</td>
                    <td style={{ minWidth:120 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                        <div style={{ flex:1, height:6, background:"#F1F4FA", borderRadius:20, overflow:"hidden" }}>
                          <div style={{ width:`${pct}%`, height:"100%", background: pct===100 ? "var(--mint)" : "var(--nova)", borderRadius:20 }} />
                        </div>
                        <span className="mono" style={{ fontSize:11.5, color:"var(--slate)" }}>{pct}%</span>
                      </div>
                    </td>
                    <td style={{ fontSize:12 }}>{r.line}</td>
                    <td><St v={r.status} /></td>
                    <td className="num" style={{ color:"var(--slate)" }}>{r.start}</td>
                    <td>
                      <Btn kind="g" sm icon={ArrowRight} onClick={() => openRun(r.pid)}>Open run</Btn>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {!rows.length && <Empty icon={ClipboardList} title="No orders match that search" body="Clear the search box, or refresh the order list from SAP to pull newly released orders." action={<Btn kind="g" icon={X} onClick={() => setQ("")}>Clear search</Btn>} />}
      </Card>
    </div>
  );
}
