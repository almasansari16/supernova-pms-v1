import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Barcode, ChevronLeft, ChevronRight, Eye, Plus, Printer, RefreshCw } from "lucide-react";
import { PRODUCTS, prodByPid } from "@/entities/product";
import { SerialText } from "@/entities/serial";
import { useRegister } from "@/entities/register";
import { Btn, Card, CardHead, Empty, FilterSelect, SearchBox, St, useToast } from "@/shared/ui";
import { usePagination } from "@/shared/hooks";
import { nf } from "@/shared/lib";
import { ROUTES, withQuery } from "@/shared/config";

const COLUMNS = ["Serial number","Product","Batch","GTIN","Manufacturing","Expiry","Status","Packaging line","Generated","Operator","Actions"];
const STATUSES = ["All statuses","Serialized","Printed","Aggregated","Rejected"];
const PER_PAGE = 8;

/* Searchable, filterable, paged table of every unit serial */
export function SerialRegister({ onBulkGenerate }) {
  const { serials, generate } = useRegister();
  const toast = useToast();
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [fPid, setFPid] = useState("All products");
  const [fSt, setFSt] = useState("All statuses");

  const rows = useMemo(() => serials.filter(r => {
    const p = prodByPid(r.pid);
    const hay = `${r.serial} ${p.name} ${p.batch} ${p.gtin} ${r.line} ${r.operator} ${r.status}`.toLowerCase();
    return hay.includes(q.toLowerCase())
      && (fPid === "All products" || r.pid === fPid)
      && (fSt === "All statuses" || r.status === fSt);
  }), [serials, q, fPid, fSt]);

  const { page, setPage, pages, view } = usePagination(rows, PER_PAGE, [q, fPid, fSt]);

  return (
    <Card>
      <CardHead title="Serial register" icon={Barcode} sub={`${nf(rows.length)} of ${nf(serials.length)} serials`}
        right={
          <div style={{ display:"flex", gap:9, flexWrap:"wrap", alignItems:"center" }}>
            <SearchBox width={210} placeholder="Serial, batch, operator…" value={q} onChange={e => setQ(e.target.value)} />
            <FilterSelect value={fPid} onChange={e => setFPid(e.target.value)} options={["All products", ...PRODUCTS.map(x => x.pid)]} />
            <FilterSelect value={fSt} onChange={e => setFSt(e.target.value)} options={STATUSES} />
          </div>
        } />
      <div className="tblwrap">
        <table className="tbl">
          <thead><tr>{COLUMNS.map(h => <th key={h}>{h}</th>)}</tr></thead>
          <tbody>
            {view.map(r => {
              const pp = prodByPid(r.pid);
              return (
                <tr key={r.serial}>
                  <td><SerialText value={r.serial} pid={r.pid} size={13.5} /></td>
                  <td><div style={{ fontWeight:600, fontSize:12.5 }}>{pp.name}</div><div className="mono" style={{ fontSize:11, color:"var(--slate-2)" }}>ID {r.pid}</div></td>
                  <td className="num">{pp.batch}</td>
                  <td className="num">{pp.gtin}</td>
                  <td className="num">{pp.mfg}</td>
                  <td className="num">{pp.exp}</td>
                  <td><St v={r.status} /></td>
                  <td style={{ fontSize:12 }}>{r.line}</td>
                  <td className="num" style={{ color:"var(--slate)" }}>{r.ts}</td>
                  <td style={{ fontSize:12 }}>{r.operator}</td>
                  <td>
                    <div style={{ display:"flex", gap:6 }}>
                      <button className="iconbtn" style={{ width:29, height:29 }} title="View label" onClick={() => navigate(withQuery(ROUTES.labels, { serial:r.serial }))}><Eye size={13} /></button>
                      <button className="iconbtn" style={{ width:29, height:29 }} title="Reprint" onClick={() => toast(`Reprint request raised for ${r.serial} — awaiting QA approval`)}><Printer size={13} /></button>
                      <button className="iconbtn" style={{ width:29, height:29 }} title="Regenerate" onClick={() => { generate(r.pid, 1); toast(`New serial issued for product ${r.pid}`); }}><RefreshCw size={13} /></button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {!rows.length && <Empty icon={Barcode} title="Nothing serialized under these filters"
        body="Widen the filters, or generate a batch of unit serials for the selected packaging order."
        action={<Btn kind="p" icon={Plus} onClick={onBulkGenerate}>Bulk generate</Btn>} />}
      {!!rows.length && (
        <div style={{ padding:"12px 18px", borderTop:"1px solid var(--line-2)", display:"flex", alignItems:"center", justifyContent:"space-between", gap:12, flexWrap:"wrap" }}>
          <div style={{ fontSize:12, color:"var(--slate)" }}>
            Showing {(page-1)*PER_PAGE + 1}–{Math.min(page*PER_PAGE, rows.length)} of {nf(rows.length)}
          </div>
          <div style={{ display:"flex", gap:6, alignItems:"center" }}>
            <Btn kind="g" sm icon={ChevronLeft} onClick={() => setPage(p2 => Math.max(1, p2-1))} disabled={page===1}>Prev</Btn>
            {Array.from({ length:Math.min(5, pages) }).map((_, i) => {
              const n = i + 1;
              return <button key={n} onClick={() => setPage(n)} className={`btn btn-sm ${page===n?"btn-s":"btn-g"}`} style={{ minWidth:32, justifyContent:"center" }}>{n}</button>;
            })}
            {pages > 5 && <span style={{ color:"var(--slate-2)", fontSize:12 }}>… {pages}</span>}
            <Btn kind="g" sm onClick={() => setPage(p2 => Math.min(pages, p2+1))} disabled={page===pages}>Next<ChevronRight size={13} /></Btn>
          </div>
        </div>
      )}
    </Card>
  );
}
