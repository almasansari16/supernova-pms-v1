import { NavLink } from "react-router-dom";
import { ShieldCheck, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { useSession } from "@/entities/session";
import { useRegister } from "@/entities/register";
import { ERMLogo, SuperNovaLogo, SuperNovaMark } from "@/shared/brand";
import { canAccess } from "@/shared/config";
import { nf } from "@/shared/lib";
import { NAV } from "../router/routes.config.js";

export function Sidebar({ collapsed, onToggle }) {
  const { role } = useSession();
  const { serials } = useRegister();
  const visible = NAV
    .map(g => ({ ...g, items: g.items.filter(i => canAccess(i.roles, role)) }))
    .filter(g => g.items.length);

  return (
    <aside className={`side${collapsed ? " collapsed" : ""}`}>
      <div className="brandbox" style={{ justifyContent: collapsed ? "center" : "flex-start" }}>
        {collapsed ? <SuperNovaMark size={30} /> : <SuperNovaLogo dark />}

        {/* ── Collapse toggle button inside sidebar ── */}
        <button
          onClick={onToggle}
          title={collapsed ? "Expand menu" : "Collapse menu"}
          style={{
            marginLeft: "auto",
            border: "none",
            background: "rgba(255,255,255,.08)",
            color: "#AFC0DC",
            borderRadius: 8,
            width: 28,
            height: 28,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            flexShrink: 0,
            transition: "background .15s",
          }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,.15)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,.08)"}
        >
          {collapsed
            ? <PanelLeftOpen size={14} />
            : <PanelLeftClose size={14} />
          }
        </button>
      </div>

      {!collapsed && (
        <div style={{ padding: "0 18px 12px", position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 10.5, color: "#7E93B8", lineHeight: 1.5 }}>
            Product Serialization<br />Management System
          </div>
        </div>
      )}

      <nav className="navwrap">
        {visible.map(g => (
          <div key={g.group}>
            {!collapsed && <div className="navlabel">{g.group}</div>}
            {g.items.map(i => (
              <NavLink
                key={i.path}
                to={i.path}
                title={i.label}
                className={({ isActive }) => `navitem${isActive ? " on" : ""}`}
                style={{ textDecoration: "none" }}
              >
                <i.icon size={16} style={{ flex: "0 0 16px" }} />
                {!collapsed && (
                  <>
                    {i.label}
                    {i.liveCount && (
                      <span className="cnt">{nf(serials.length)}</span>
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      <div className="sidefoot">
        {!collapsed ? (
          <>
            <div style={{
              fontSize: 9.5, color: "#5D7099", letterSpacing: ".06em",
              textTransform: "uppercase", fontWeight: 700, marginBottom: 7,
            }}>
              Designed &amp; developed by
            </div>
            <ERMLogo light />
          </>
        ) : (
          <div style={{ display: "grid", placeItems: "center", color: "#5D7099" }}>
            <ShieldCheck size={16} />
          </div>
        )}
      </div>
    </aside>
  );
}