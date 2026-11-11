import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Moon, PanelLeftClose, PanelLeftOpen, Search, Sun } from "lucide-react";
import { ROUTES, withQuery } from "@/shared/config";
import { NotificationsMenu } from "./NotificationsMenu.jsx";
import { ProfileMenu } from "./ProfileMenu.jsx";
import { useSapStatus } from "@/shared/lib/SapStatusProvider";

export function Topbar({ collapsed, onToggleSidebar, popover, setPopover, theme, onToggleTheme }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const toggle = (name) => setPopover(p => p === name ? null : name);
  const close = () => setPopover(null);

  const { status: sapStatus } = useSapStatus();
const isConnected = sapStatus?.isConnected ?? null;
const isMock = sapStatus?.source === "Mock";

  const onSearchKey = (e) => {
    if (e.key === "Enter" && search.trim()) {
      navigate(withQuery(ROUTES.scanner, { code: search.trim() }));
      setSearch("");
    }
  };

  const dotStyle = (color, glow) => ({
    width: 7, height: 7, borderRadius: "50%",
    background: color,
    boxShadow: `0 0 0 3px ${glow}`,
    flexShrink: 0,
  });

  return (
    <header className="topbar">
      
      <div className="searchbox">
        <Search size={15} color="var(--slate-2)" />
        <input
          placeholder="Search a serial, carton, batch or order"
          value={search}
          onChange={e => setSearch(e.target.value)}
          onKeyDown={onSearchKey}
        />
      </div>

      <div className="topbar-right">

        {/* ── SAP status pill ── */}
        {isConnected === null && (
          <div className="sap-pill" style={{ background: "var(--surface-2)" }}>
            <span style={dotStyle("var(--slate-2)", "transparent")} />
            <span style={{ color: "var(--slate-2)" }}>SAP…</span>
          </div>
        )}

        {isConnected === true && !isMock && (
          <div className="sap-pill" style={{ background: "var(--mint-soft)" }}>
            <span style={dotStyle("var(--mint)", "rgba(14,159,110,.18)")} />
            <span style={{ color: "var(--mint-ink, #065F46)" }}>SAP connected</span>
          </div>
        )}

        {isConnected === true && isMock && (
          <div className="sap-pill" style={{ background: "#fffbeb" }}>
            <span style={dotStyle("#f59e0b", "rgba(245,158,11,.18)")} />
            <span style={{ color: "#92400e" }}>SAP Mock</span>
          </div>
        )}

        {isConnected === false && (
          <div className="sap-pill" style={{ background: "var(--red-soft)" }}>
            <span style={dotStyle("var(--red)", "rgba(220,38,38,.18)")} />
            <span style={{ color: "var(--red)" }}>SAP disconnected</span>
          </div>
        )}

        {/* ── Dark mode toggle ── */}
        <button
          className="iconbtn"
          onClick={onToggleTheme}
          title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        >
          {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
        </button>

        <NotificationsMenu
          open={popover === "notif"}
          onToggle={() => toggle("notif")}
          onClose={close}
        />
        <ProfileMenu
          open={popover === "profile"}
          onToggle={() => toggle("profile")}
          onClose={close}
        />
      </div>
    </header>
  );
}