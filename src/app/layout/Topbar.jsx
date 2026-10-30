import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PanelLeftClose, PanelLeftOpen, Search } from "lucide-react";
import { ROUTES, withQuery } from "@/shared/config";
import { NotificationsMenu } from "./NotificationsMenu.jsx";
import { ProfileMenu } from "./ProfileMenu.jsx";

/* popover: "notif" | "profile" | null — only one menu is open at a time */
export function Topbar({ collapsed, onToggleSidebar, popover, setPopover }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const toggle = (name) => setPopover(p => p === name ? null : name);
  const close = () => setPopover(null);

  const onSearchKey = (e) => {
    if (e.key === "Enter" && search.trim()) {
      navigate(withQuery(ROUTES.scanner, { code:search.trim() }));
      setSearch("");
    }
  };

  return (
    <header className="topbar">
      <button className="iconbtn" onClick={onToggleSidebar} title={collapsed ? "Expand menu" : "Collapse menu"}>
        {collapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
      </button>
      <div className="searchbox">
        <Search size={15} color="var(--slate-2)" />
        <input placeholder="Search a serial, carton, batch or order" value={search}
          onChange={e => setSearch(e.target.value)} onKeyDown={onSearchKey} />
      </div>
      <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:10 }}>
        <div style={{ display:"flex", alignItems:"center", gap:7, fontSize:12, color:"var(--slate)", padding:"6px 11px", background:"var(--mint-soft)", borderRadius:20, fontWeight:600 }}>
          <span style={{ width:7, height:7, borderRadius:"50%", background:"var(--mint)", boxShadow:"0 0 0 3px rgba(14,159,110,.18)" }} />
          <span style={{ color:"#08744F" }}>SAP connected</span>
        </div>
        <NotificationsMenu open={popover === "notif"} onToggle={() => toggle("notif")} onClose={close} />
        <ProfileMenu open={popover === "profile"} onToggle={() => toggle("profile")} onClose={close} />
      </div>
    </header>
  );
}
