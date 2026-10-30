import { useState } from "react";
import { Check, X } from "lucide-react";
import { Btn, Card, PageHead, useToast } from "@/shared/ui";
import { SETTINGS_TABS } from "../constants/tabs.js";
import { CompanyTab } from "../components/tabs/CompanyTab.jsx";
import { SapConfigTab } from "../components/tabs/SapConfigTab.jsx";
import { LabelConfigTab } from "../components/tabs/LabelConfigTab.jsx";
import { PrinterSetupTab } from "../components/tabs/PrinterSetupTab.jsx";
import { BarcodeFormatTab } from "../components/tabs/BarcodeFormatTab.jsx";
import { SerialRulesTab } from "../components/tabs/SerialRulesTab.jsx";
import { ThemeTab } from "../components/tabs/ThemeTab.jsx";

export default function SettingsPage() {
  const toast = useToast();
  const [tab, setTab] = useState("company");
  // Draft values live here so they survive switching between tabs
  const [accent, setAccent] = useState("Nova indigo");
  const [pad, setPad] = useState(9);
  const [prefix, setPrefix] = useState("Product ID");
  const [marker, setMarker] = useState("5");

  return (
    <div>
      <PageHead crumbs={["Home","Settings"]} title="Settings"
        sub="Configuration a plant administrator owns. Changes here are versioned and land in the audit trail."
        actions={<><Btn kind="g" icon={X}>Discard</Btn><Btn kind="p" icon={Check} onClick={() => toast("Settings saved")}>Save changes</Btn></>} />

      <div className="grid" style={{ gridTemplateColumns:"240px minmax(0,1fr)" }}>
        <Card>
          <div style={{ padding:10, display:"flex", flexDirection:"column", gap:3 }}>
            {SETTINGS_TABS.map(([k,l,Ic]) => (
              <button key={k} onClick={() => setTab(k)}
                style={{ display:"flex", gap:10, alignItems:"center", border:0, borderRadius:10, padding:"10px 12px",
                         background: tab===k ? "var(--nova-soft)" : "transparent", color: tab===k ? "var(--nova)" : "var(--ink)",
                         fontSize:13, fontWeight: tab===k ? 600 : 500, textAlign:"left", transition:"background .16s" }}>
                <Ic size={15} />{l}
              </button>
            ))}
          </div>
        </Card>

        <Card className="fade" key={tab}>
          {tab === "company" && <CompanyTab />}
          {tab === "sap" && <SapConfigTab />}
          {tab === "label" && <LabelConfigTab />}
          {tab === "printer" && <PrinterSetupTab />}
          {tab === "barcode" && <BarcodeFormatTab />}
          {tab === "serial" && <SerialRulesTab prefix={prefix} setPrefix={setPrefix} pad={pad} setPad={setPad} marker={marker} setMarker={setMarker} />}
          {tab === "theme" && <ThemeTab accent={accent} setAccent={setAccent} />}
        </Card>
      </div>
    </div>
  );
}
