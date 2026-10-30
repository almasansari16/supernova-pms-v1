import { useState } from "react";
import { FileSpreadsheet, Printer, ScrollText, ShieldCheck, TriangleAlert, X } from "lucide-react";
import { AUDIT_EVENTS, SEVERITY_TONE } from "@/entities/audit";
import { Btn, Card, CardHead, Chip, Empty, FilterSelect, KPI, PageHead, SearchBox, useToast } from "@/shared/ui";

const COLUMNS = ["Timestamp","User","Role","Event","Object","Detail"];
const EVENT_TYPES = ["All events", ...Array.from(new Set(AUDIT_EVENTS.map(a => a.ev)))];

export default function AuditLogsPage() {
  const toast = useToast();
  const [q, setQ] = useState("");
  const [ev, setEv] = useState("All events");
  const rows = AUDIT_EVENTS.filter(a => `${a.u} ${a.ev} ${a.obj} ${a.d}`.toLowerCase().includes(q.toLowerCase()) && (ev === "All events" || a.ev === ev));

  return (
    <div>
      <PageHead crumbs={["Home","Audit Logs"]} title="Audit trail"
        sub="Every action leaves a record: who, what, which object, and when. Entries are append-only — nothing in this table can be edited or removed from the interface."
        actions={<>
          <Btn kind="g" icon={FileSpreadsheet} onClick={() => toast("Audit_trail_2026-07.xlsx downloaded")}>Export</Btn>
          <Btn kind="g" icon={Printer} onClick={() => toast("Audit trail sent to printer")}>Print</Btn>
        </>} />

      <div className="grid g-kpi" style={{ marginBottom:14 }}>
        <KPI label="Entries today" value="1,284" delta="Across 5 users" icon={ScrollText} tone="nova" trend={false} />
        <KPI label="Warnings" value="4" delta="2 duplicate reads" icon={TriangleAlert} tone="spark" trend={false} />
        <KPI label="Reprints raised" value="2" delta="Both QA approved" icon={Printer} tone="violet" trend={false} />
        <KPI label="Retention" value="7 yrs" delta="Immutable storage" icon={ShieldCheck} tone="mint" trend={false} />
      </div>

      <Card>
        <CardHead title="Activity log" icon={ScrollText} sub={`${rows.length} entries`}
          right={<div style={{ display:"flex", gap:9, flexWrap:"wrap" }}>
            <SearchBox width={220} placeholder="User, object, detail…" value={q} onChange={e => setQ(e.target.value)} />
            <FilterSelect value={ev} onChange={e => setEv(e.target.value)} options={EVENT_TYPES} />
          </div>} />
        <div className="tblwrap">
          <table className="tbl">
            <thead><tr>{COLUMNS.map(h => <th key={h}>{h}</th>)}</tr></thead>
            <tbody>
              {rows.map((a,i) => (
                <tr key={i}>
                  <td className="num" style={{ color:"var(--slate)" }}>{a.t}</td>
                  <td style={{ fontWeight:600, fontSize:12.5 }}>{a.u}</td>
                  <td><Chip tone="c-mut">{a.r}</Chip></td>
                  <td><Chip tone={SEVERITY_TONE[a.sev]}>{a.ev}</Chip></td>
                  <td className="num">{a.obj}</td>
                  <td style={{ fontSize:12.5, color:"var(--slate)", whiteSpace:"normal", minWidth:280 }}>{a.d}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!rows.length && <Empty icon={ScrollText} title="No entries match" body="Try a different event type or clear the search." action={<Btn kind="g" icon={X} onClick={() => { setQ(""); setEv("All events"); }}>Clear filters</Btn>} />}
      </Card>
    </div>
  );
}
