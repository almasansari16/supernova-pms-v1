import { useMemo } from "react";
import { hash32 } from "./hash.js";

/* Visual 1D barcode preview. Swap in bwip-js (GS1-128) for scannable output — same props. */
export function Barcode1D({ value = "", height = 54, showText = true }) {
  const bars = useMemo(() => {
    let h = hash32(value || "0"), out = [];
    const guard = [3,1,1,1,2,1];                       // start guard
    guard.forEach((w,i) => out.push({ w, on:i%2===0 }));
    for (let i=0;i<(value.length||8)*6;i++) {
      h = (h * 1103515245 + 12345) >>> 0;
      out.push({ w: 1 + (h >>> 8) % 4, on: i % 2 === 0 });
    }
    [2,3,3,1,1,1,2].forEach((w,i) => out.push({ w, on:i%2===0 })); // stop guard
    return out;
  }, [value]);
  const total = bars.reduce((a,b)=>a+b.w,0);
  let x = 0;
  return (
    <div style={{ width:"100%" }}>
      <svg viewBox={`0 0 ${total} ${height}`} width="100%" height={height} preserveAspectRatio="none" role="img" aria-label={`Barcode ${value}`}>
        <rect width={total} height={height} fill="#fff" />
        {bars.map((b,i) => { const r = b.on ? <rect key={i} x={x} y="0" width={b.w} height={height} fill="#1E0D63" /> : null; x += b.w; return r; })}
      </svg>
      {showText && <div className="mono" style={{ textAlign:"center", fontSize:11, letterSpacing:".22em", marginTop:4, fontWeight:600 }}>{value}</div>}
    </div>
  );
}
