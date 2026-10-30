import { Sparkles } from "lucide-react";
import { CardHead, Field, Select } from "@/shared/ui";

export function ThemeTab({ accent, setAccent }) {
  return (
    <>
      <CardHead title="Theme" icon={Sparkles} sub="Applies to the interface, not to label artwork" />
      <div style={{ padding:18 }}>
        <Field label="Accent colour">
          <div style={{ display:"flex", gap:10, flexWrap:"wrap", marginTop:2 }}>
            {[["Nova indigo","#3A22A8"],["Ring teal","#12A5B8"],["Violet","#6D3BEF"],["Graphite","#3A4658"]].map(([n,c]) => (
              <button key={n} onClick={() => setAccent(n)} className={`btn btn-sm ${accent===n?"btn-s":"btn-g"}`}>
                <i style={{ width:11, height:11, borderRadius:3, background:c }} />{n}
              </button>
            ))}
          </div>
        </Field>
        <div className="grid" style={{ gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", marginTop:16 }}>
          <Field label="Appearance"><Select options={["Light (recommended for the line)","Dark","Follow workstation"]} /></Field>
          <Field label="Density"><Select options={["Comfortable","Compact (more rows per screen)"]} /></Field>
          <Field label="Numbers"><Select options={["Monospaced, tabular","Proportional"]} /></Field>
          <Field label="Motion"><Select options={["Full","Reduced","Follow system"]} /></Field>
        </div>
        <div className="hint" style={{ marginTop:14 }}>Line HMIs run light and comfortable by default — glare on the floor makes dark themes hard to read at a distance.</div>
      </div>
    </>
  );
}
