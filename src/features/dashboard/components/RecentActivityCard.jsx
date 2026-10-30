import { useNavigate } from "react-router-dom";
import { CircleDot, Eye, ScrollText } from "lucide-react";
import { AUDIT_EVENTS, SEVERITY_TONE } from "@/entities/audit";
import { Btn, Card, CardHead, Skeleton } from "@/shared/ui";
import { ROUTES } from "@/shared/config";

export function RecentActivityCard({ loading }) {
  const navigate = useNavigate();
  return (
    <Card>
      <CardHead title="Recent activities" sub="Live audit stream" icon={ScrollText}
        right={<Btn kind="g" sm icon={Eye} onClick={() => navigate(ROUTES.audit)}>Full log</Btn>} />
      {loading ? <Skeleton rows={4} /> : (
        <div style={{ maxHeight:236, overflowY:"auto" }}>
          {AUDIT_EVENTS.slice(0,6).map((a,i) => (
            <div key={i} className="notif">
              <div className={`ni chip ${SEVERITY_TONE[a.sev] || "c-info"}`} style={{ borderRadius:9 }}>
                <CircleDot size={13} />
              </div>
              <div style={{ minWidth:0 }}>
                <div className="nt">{a.ev}</div>
                <div className="nd" style={{ whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{a.d}</div>
                <div className="nw">{a.t.slice(11)} · {a.u}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
