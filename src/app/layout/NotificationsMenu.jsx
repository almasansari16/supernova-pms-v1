import { useNavigate } from "react-router-dom";
import { Bell } from "lucide-react";
import { Btn, useToast } from "@/shared/ui";
import { ROUTES } from "@/shared/config";
import { NOTIFICATIONS } from "./data/notifications.js";

export function NotificationsMenu({ open, onToggle, onClose }) {
  const toast = useToast();
  const navigate = useNavigate();
  return (
    <div style={{ position:"relative" }}>
      <button className="iconbtn" onClick={onToggle} title="Notifications">
        <Bell size={16} /><span className="dot" />
      </button>
      {open && (
        <div className="pop fade">
          <div className="cardhead">
            <div><h3>Notifications</h3><div className="sub">3 unread</div></div>
            <Btn kind="g" sm onClick={() => { onClose(); toast("All notifications marked as read"); }}>Mark all read</Btn>
          </div>
          <div style={{ maxHeight:340, overflowY:"auto" }}>
            {NOTIFICATIONS.map((n,i) => (
              <div key={i} className="notif">
                <div className={`ni chip ${n.tone}`} style={{ borderRadius:9 }}><n.ic size={14} /></div>
                <div style={{ minWidth:0 }}>
                  <div className="nt">{n.t}</div><div className="nd">{n.d}</div><div className="nw">{n.w}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ padding:"11px 14px", borderTop:"1px solid var(--line-2)", textAlign:"center" }}>
            <button className="btn btn-g btn-sm" style={{ width:"100%", justifyContent:"center" }} onClick={() => { onClose(); navigate(ROUTES.audit); }}>Open the audit trail</button>
          </div>
        </div>
      )}
    </div>
  );
}
