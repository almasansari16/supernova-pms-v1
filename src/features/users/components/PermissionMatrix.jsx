import { Check, ShieldCheck } from "lucide-react";
import { Card, CardHead } from "@/shared/ui";
import { ROLES } from "@/shared/config";
import { ROLE_MATRIX } from "../data/roleMatrix.js";

export function PermissionMatrix() {
  return (
    <Card>
      <CardHead title="Permission matrix" icon={ShieldCheck} sub="What each role is allowed to do" />
      <div className="tblwrap">
        <table className="tbl">
          <thead><tr><th>Capability</th>{ROLES.map(h => <th key={h} style={{ textAlign:"center" }}>{h}</th>)}</tr></thead>
          <tbody>
            {ROLE_MATRIX.map(m => (
              <tr key={m.cap}>
                <td style={{ fontSize:12.5, fontWeight:500, whiteSpace:"normal" }}>{m.cap}</td>
                {ROLES.map(rk => (
                  <td key={rk} style={{ textAlign:"center" }}>
                    {m[rk]
                      ? <Check size={15} color="var(--mint)" strokeWidth={3} />
                      : <span style={{ color:"#D3DAE6" }}>—</span>}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
