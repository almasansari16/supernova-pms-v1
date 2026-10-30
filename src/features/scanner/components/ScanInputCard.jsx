import { ScanLine, X } from "lucide-react";
import { Btn, Card, CardHead, Field } from "@/shared/ui";

/* Scan zone, manual entry and sample numbers */
export function ScanInputCard({ inputRef, val, setVal, scanning, scan, scanValue, onClear, sampleUnit, sampleCarton }) {
  const samples = [
    [sampleUnit, "unit pack"],
    [sampleCarton, "master carton"],
    ["1004000999999", "unknown"],
  ];
  return (
    <Card>
      <CardHead title="Scan input" icon={ScanLine} sub="Keyboard-wedge or manual entry" />
      <div style={{ padding:18 }}>
        <div className="scanzone" style={{ marginBottom:16 }}>
          {scanning && <div className="scanline" />}
          <ScanLine size={34} color="var(--nova)" style={{ marginBottom:10 }} />
          <div style={{ fontSize:13, fontWeight:600 }}>{scanning ? "Decoding…" : "Ready to scan"}</div>
          <div style={{ fontSize:11.5, color:"var(--slate)", marginTop:4 }}>GS1 DataMatrix · GS1-128 · Code 128</div>
        </div>
        <Field label="Serial or carton number">
          <input ref={inputRef} className="inp mono" placeholder="1004000000001" value={val}
            onChange={e => setVal(e.target.value)} onKeyDown={e => e.key === "Enter" && scan()} />
        </Field>
        <div style={{ display:"flex", gap:9, marginTop:14 }}>
          <Btn kind="p" icon={ScanLine} onClick={() => scan()} disabled={scanning} style={{ flex:1, justifyContent:"center" }}>Scan</Btn>
          <Btn kind="g" icon={X} onClick={onClear}>Clear</Btn>
        </div>
        <div style={{ borderTop:"1px solid var(--line-2)", marginTop:18, paddingTop:16 }}>
          <div style={{ fontSize:11.5, fontWeight:600, color:"var(--slate)", marginBottom:9 }}>Try one of these</div>
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {samples.map(([v, kind]) => (
              <button key={kind} className="btn btn-g btn-sm mono" style={{ justifyContent:"space-between" }} onClick={() => scanValue(v)}>
                {v}<span style={{ fontFamily:"Inter", color:"var(--slate-2)" }}>{kind}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
