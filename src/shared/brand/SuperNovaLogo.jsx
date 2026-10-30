import { SN_W, SN_RING, SN_RATIO } from "./paths.js";

/* Wordmark navy #1E0D63 on light, reversed to white on the dark sidebar.
   Ring gradient sampled from the original: #044F93 -> #45E3DC. */
export function SNSvg({ height = 28, dark = false, ringOnly = false, title = "SuperNova" }) {
  const vb = ringOnly ? "614 -33.5 220 220" : "0 0 1024 152.5";
  const w = ringOnly ? height : Math.round(height * SN_RATIO);
  return (
    <svg height={height} width={w} viewBox={vb} role="img" aria-label={title}
         style={{ display:"block", overflow:"visible" }}>
      <defs>
        <linearGradient id="snRing" gradientUnits="userSpaceOnUse" x1="620" y1="146" x2="830" y2="8">
          <stop offset="0%" stopColor="#044F93" /><stop offset="34%" stopColor="#1585AE" />
          <stop offset="66%" stopColor="#33B8CC" /><stop offset="100%" stopColor="#45E3DC" />
        </linearGradient>
      </defs>
      {!ringOnly && <path d={SN_W} fill={dark ? "#FFFFFF" : "#1E0D63"} fillRule="evenodd" />}
      <path d={SN_RING} fill="url(#snRing)" fillRule="evenodd" />
    </svg>
  );
}

/* Compact square glyph — the ringed planet alone. Used where space is tight. */
export function SuperNovaMark({ size = 30 }) { return <SNSvg height={size} ringOnly />; }

export function SuperNovaLogo({ dark = false, compact = false, height }) {
  return <SNSvg height={height || (compact ? 19 : 28)} dark={dark} />;
}
