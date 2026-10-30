import { Check, ChevronDown, LogOut, User } from "lucide-react";
import { getPersona, useSession } from "@/entities/session";
import { useProduction } from "@/entities/production";
import { useToast } from "@/shared/ui";
import { ROLES } from "@/shared/config";

export function ProfileMenu({ open, onToggle, onClose }) {
  const { role, switchRole, signOut } = useSession();
  const { ctx } = useProduction();
  const toast = useToast();
  const persona = getPersona(role);

  return (
    <div style={{ position:"relative" }}>
      <button onClick={onToggle}
        style={{ display:"flex", alignItems:"center", gap:9, border:"1px solid var(--line)", background:"#fff", borderRadius:12, padding:"5px 10px 5px 6px" }}>
        <div style={{ width:28, height:28, borderRadius:9, background:"linear-gradient(140deg,#5236D6,#12A5B8)", color:"#fff", display:"grid", placeItems:"center", fontSize:11.5, fontWeight:700, fontFamily:"Sora" }}>
          {persona.initials}
        </div>
        <div style={{ textAlign:"left", lineHeight:1.25 }}>
          <div style={{ fontSize:12.5, fontWeight:600 }}>{persona.name}</div>
          <div style={{ fontSize:10.5, color:"var(--slate-2)" }}>{role}</div>
        </div>
        <ChevronDown size={14} color="var(--slate-2)" />
      </button>
      {open && (
        <div className="pop fade" style={{ width:262 }}>
          <div style={{ padding:"14px 16px", borderBottom:"1px solid var(--line-2)" }}>
            <div style={{ fontSize:13, fontWeight:600 }}>{persona.name}</div>
            <div style={{ fontSize:11.5, color:"var(--slate-2)", marginTop:2 }}>Plant 1100 · {ctx.shift}</div>
          </div>
          <div style={{ padding:"10px 12px", borderBottom:"1px solid var(--line-2)" }}>
            <div style={{ fontSize:10.5, textTransform:"uppercase", letterSpacing:".08em", color:"var(--slate-2)", fontWeight:700, marginBottom:7, paddingLeft:4 }}>Switch role (demo)</div>
            {ROLES.map(r => (
              <button key={r} onClick={() => { switchRole(r); onClose(); toast(`Now viewing as ${r}`); }}
                style={{ display:"flex", alignItems:"center", gap:9, width:"100%", border:0, background: role===r ? "var(--nova-soft)" : "transparent",
                         borderRadius:9, padding:"8px 10px", fontSize:12.5, color: role===r ? "var(--nova)" : "var(--ink)", fontWeight: role===r?600:500, textAlign:"left" }}>
                <User size={14} />{r}{role===r && <Check size={14} style={{ marginLeft:"auto" }} />}
              </button>
            ))}
          </div>
          <div style={{ padding:10 }}>
            <button className="btn btn-g btn-sm" style={{ width:"100%", justifyContent:"center" }} onClick={() => { onClose(); signOut(); }}>
              <LogOut size={13} />Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
