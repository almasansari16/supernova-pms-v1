import { NavLink } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import { useSession } from "@/entities/session";
import { useRegister } from "@/entities/register";
import { ERMLogo, SuperNovaLogo, SuperNovaMark } from "@/shared/brand";
import { canAccess } from "@/shared/config";
import { nf } from "@/shared/lib";
import { NAV } from "../router/routes.config.js";

export function Sidebar({ collapsed }) {
  const { role } = useSession();
  const { serials } = useRegister();
  const visible = NAV
    .map(g => ({ ...g, items:g.items.filter(i => canAccess(i.roles, role)) }))
    .filter(g => g.items.length);

  return (
    <aside className={`side${collapsed ? " collapsed" : ""}`}>
      <div className="brandbox">
        {collapsed ? <SuperNovaMark size={30} /> : <SuperNovaLogo dark />}
      </div>
      {!collapsed && (
        <div style={{ padding:"0 18px 12px", position:"relative", zIndex:1 }}>
          <div style={{ fontSize:10.5, color:"#7E93B8", lineHeight:1.5 }}>
            Product Serialization<br />Management System
          </div>
        </div>
      )}
      <nav className="navwrap">
        {visible.map(g => (
          <div key={g.group}>
            {!collapsed && <div className="navlabel">{g.group}</div>}
            {g.items.map(i => (
              <NavLink key={i.path} to={i.path} title={i.label}
                className={({ isActive }) => `navitem${isActive ? " on" : ""}`} style={{ textDecoration:"none" }}>
                <i.icon size={16} style={{ flex:"0 0 16px" }} />
                {!collapsed && <>{i.label}{i.liveCount && <span className="cnt">{nf(serials.length)}</span>}</>}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>
      <div className="sidefoot">
        {!collapsed ? (
          <>
            <div style={{ fontSize:9.5, color:"#5D7099", letterSpacing:".06em", textTransform:"uppercase", fontWeight:700, marginBottom:7 }}>Designed &amp; developed by</div>
            <ERMLogo light />
          </>
        ) : <div style={{ display:"grid", placeItems:"center", color:"#5D7099" }}><ShieldCheck size={16} /></div>}
      </div>
    </aside>
  );
}
