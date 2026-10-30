import { useLocation } from "react-router-dom";
import { ERMLogo } from "@/shared/brand";
import { env } from "@/shared/config";
import { findNavItem } from "../router/routes.config.js";

export function AppFooter() {
  const { pathname } = useLocation();
  return (
    <footer className="appfoot">
      <div style={{ display:"flex", alignItems:"center", gap:9, flexWrap:"wrap" }}>
        <span>Designed &amp; Developed by</span><ERMLogo />
      </div>
      <div style={{ display:"flex", gap:16, alignItems:"center", flexWrap:"wrap" }}>
        <span>{env.appName} · v{env.appVersion} demonstration build</span>
        <span className="mono">{findNavItem(pathname)?.label}</span>
      </div>
    </footer>
  );
}
