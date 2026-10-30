import { useState } from "react";
import { Pencil, Users as UsersIcon } from "lucide-react";
import { Card, CardHead, Chip, SearchBox, St, useToast } from "@/shared/ui";
import { USERS } from "../data/users.js";

const ROLE_TONE = { Admin:"c-vio", Supervisor:"c-info", Operator:"c-ok", QA:"c-warn", Warehouse:"c-mut" };
const COLUMNS = ["Name","Role","Lines","Last active","Status",""];

export function UsersTable() {
  const toast = useToast();
  const [q, setQ] = useState("");
  const rows = USERS.filter(u => `${u.n} ${u.e} ${u.r}`.toLowerCase().includes(q.toLowerCase()));
  return (
    <Card>
      <CardHead title="People" icon={UsersIcon} sub={`${rows.length} accounts`}
        right={<SearchBox width={190} placeholder="Search people" value={q} onChange={e => setQ(e.target.value)} />} />
      <div className="tblwrap">
        <table className="tbl">
          <thead><tr>{COLUMNS.map(h => <th key={h}>{h}</th>)}</tr></thead>
          <tbody>
            {rows.map(u => (
              <tr key={u.e}>
                <td>
                  <div style={{ display:"flex", gap:10, alignItems:"center" }}>
                    <div style={{ width:31, height:31, borderRadius:10, background:"var(--nova-soft)", color:"var(--nova)", display:"grid", placeItems:"center", fontSize:12, fontWeight:700, fontFamily:"Sora", flex:"0 0 31px" }}>
                      {u.n.split(" ").map(x => x[0]).join("")}
                    </div>
                    <div><div style={{ fontWeight:600, fontSize:12.5 }}>{u.n}</div><div style={{ fontSize:11, color:"var(--slate-2)" }}>{u.e}</div></div>
                  </div>
                </td>
                <td><Chip tone={ROLE_TONE[u.r]}>{u.r}</Chip></td>
                <td style={{ fontSize:12 }}>{u.lines}</td>
                <td className="num" style={{ color:"var(--slate)" }}>{u.last}</td>
                <td><St v={u.st} /></td>
                <td><button className="iconbtn" style={{ width:29, height:29 }} title="Edit" onClick={() => toast(`Editing ${u.n}`)}><Pencil size={13} /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
