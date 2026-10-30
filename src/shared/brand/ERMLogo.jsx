/* ERManager Consulting Services — rebuilt as live type, brand colours from the supplied artwork */
export function ERMLogo({ light = false, size = 1 }) {
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:1, lineHeight:1 }}>
      <div style={{ fontFamily:"Inter,Helvetica,Arial,sans-serif", fontWeight:800,
                    fontSize:14 * size, letterSpacing:"-.025em", whiteSpace:"nowrap" }}>
        <span style={{ color:"#E2191A" }}>ERM</span>
        <span style={{ color: light ? "#E4EAF6" : "#1C295E" }}>anager</span>
      </div>
      <div style={{ fontFamily:"Inter,Helvetica,Arial,sans-serif", fontWeight:500,
                    fontSize:6.6 * size, letterSpacing:".19em", textTransform:"uppercase",
                    color: light ? "rgba(228,234,246,.62)" : "#6B7A96", whiteSpace:"nowrap" }}>
        Consulting Services
      </div>
    </div>
  );
}
