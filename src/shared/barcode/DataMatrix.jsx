import { useMemo } from "react";
import { hash32 } from "./hash.js";

/* Visual GS1 DataMatrix preview. Swap in bwip-js for scannable output — same props. */
export function DataMatrix({ value = "", size = 108 }) {
  const n = 22;
  const cells = useMemo(() => {
    const g = Array.from({ length:n }, () => Array(n).fill(0));
    for (let i=0;i<n;i++) { g[n-1][i] = 1; g[i][0] = 1; }                 // solid finder L
    for (let i=0;i<n;i+=2) { g[0][i] = 1; g[i][n-1] = 1; }                // timing pattern
    let h = hash32(value || "0");
    for (let r=1;r<n-1;r++) for (let c=1;c<n-1;c++) {
      h = (h * 1103515245 + 12345) >>> 0;
      g[r][c] = ((h >>> 12) & 3) === 0 || ((h >>> 17) & 5) === 1 ? 1 : 0;
    }
    return g;
  }, [value]);
  const s = size / (n + 2);
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={`GS1 DataMatrix ${value}`}>
      <rect width={size} height={size} fill="#fff" />
      {cells.map((row,r) => row.map((v,c) => v ? <rect key={`${r}-${c}`} x={(c+1)*s} y={(r+1)*s} width={s} height={s} fill="#1E0D63" /> : null))}
    </svg>
  );
}
