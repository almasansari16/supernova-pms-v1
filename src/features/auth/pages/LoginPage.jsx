import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Lock, Mail, RefreshCw } from "lucide-react";
import { useSession } from "@/entities/session";
import { Btn, Field, Select } from "@/shared/ui";
import { ERMLogo, SuperNovaLogo } from "@/shared/brand";
import { ROLES, ROUTES } from "@/shared/config";

const HIGHLIGHTS = [["GS1","DataMatrix & GTIN-14"],["S/4HANA","Live master data"],["Part 11","Full audit trail"]];

export default function LoginPage() {
  const { signIn } = useSession();
  const navigate = useNavigate();
  const [u, setU] = useState("faisal@supernova.pk");
  const [p, setP] = useState("demo1234");
  const [role, setRole] = useState("Operator");
  const [busy, setBusy] = useState(false);

  const submit = () => {
    setBusy(true);
    setTimeout(() => { signIn(role); navigate(ROUTES.dashboard, { replace:true }); }, 620);
  };

  return (
    <div className="sn" style={{ height:"100%" }}>
      <div className="login">
        <div className="login-art">
          <div className="gridlines" />
          <div style={{ position:"relative" }}>
            <SuperNovaLogo dark />
            <div style={{ marginTop:52, maxWidth:"30ch" }}>
              <div style={{ fontSize:11, letterSpacing:".16em", textTransform:"uppercase", color:"#45E3DC", fontWeight:700 }}>Pharmaceutical Serialization</div>
              <h1 style={{ color:"#fff", fontSize:38, lineHeight:1.12, marginTop:14 }}>Every pack gets an identity.</h1>
              <p style={{ color:"#A9BCDA", fontSize:14, marginTop:14, maxWidth:"38ch" }}>
                Serialize unit packs, aggregate them into master cartons, and hand a verified parent–child trail to your supply chain — with master data pulled straight from SAP S/4HANA.
              </p>
            </div>
            <div style={{ display:"flex", gap:12, marginTop:30, flexWrap:"wrap" }}>
              {HIGHLIGHTS.map(([a,b]) => (
                <div key={a} className="glass" style={{ minWidth:132 }}>
                  <div style={{ fontFamily:"Sora", fontWeight:600, fontSize:15, color:"#fff" }}>{a}</div>
                  <div style={{ fontSize:11, color:"#9FB4D6", marginTop:3 }}>{b}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ position:"relative", display:"flex", justifyContent:"space-between", alignItems:"center", gap:12, flexWrap:"wrap" }}>
            <ERMLogo light />
            <div style={{ fontSize:11, color:"#7E93B8" }}>Demonstration build · v1.0</div>
          </div>
        </div>

        <div className="login-form">
          <div className="login-card fade">
            <div style={{ display:"flex", justifyContent:"center", marginBottom:20 }}><SuperNovaLogo /></div>
            <h2 style={{ fontSize:19, textAlign:"center" }}>Sign in to continue</h2>
            <p style={{ textAlign:"center", color:"var(--slate)", fontSize:12.5, marginTop:6, marginBottom:22 }}>
              Product Serialization Management System
            </p>

            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              <Field label="Username">
                <div style={{ position:"relative" }}>
                  <Mail size={14} style={{ position:"absolute", left:11, top:11, color:"var(--slate-2)" }} />
                  <input className="inp" style={{ paddingLeft:33 }} value={u} onChange={e => setU(e.target.value)} />
                </div>
              </Field>
              <Field label="Password">
                <div style={{ position:"relative" }}>
                  <Lock size={14} style={{ position:"absolute", left:11, top:11, color:"var(--slate-2)" }} />
                  <input className="inp" style={{ paddingLeft:33 }} type="password" value={p} onChange={e => setP(e.target.value)} />
                </div>
              </Field>
              <Field label="Sign in as" hint="Demo control — each role sees a different dashboard and menu.">
                <Select options={ROLES} value={role} onChange={e => setRole(e.target.value)} />
              </Field>

              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", fontSize:12.5 }}>
                <label style={{ display:"flex", gap:7, alignItems:"center", color:"var(--slate)" }}>
                  <input type="checkbox" defaultChecked /> Remember me
                </label>
                <a href="#" onClick={e => e.preventDefault()} style={{ color:"var(--nova)", fontWeight:600, textDecoration:"none" }}>Forgot password?</a>
              </div>

              <Btn kind="p" icon={busy ? RefreshCw : ArrowRight} onClick={submit} disabled={busy}
                   style={{ justifyContent:"center", padding:"11px 14px", marginTop:4 }}>
                {busy ? "Signing in…" : "Sign in"}
              </Btn>
            </div>

            <div style={{ borderTop:"1px solid var(--line-2)", marginTop:22, paddingTop:15, textAlign:"center" }}>
              <div style={{ fontSize:10.5, color:"var(--slate-2)", marginBottom:7 }}>Designed &amp; Developed by</div>
              <div style={{ display:"flex", justifyContent:"center" }}><ERMLogo /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
