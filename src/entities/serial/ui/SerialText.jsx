/* Splits a serial for the coloured display: prefix | marker | padding | sequence */
export function SerialText({ value, pid, carton = false, size = 15 }) {
  if (!value) return null;
  const p = pid || value.slice(0, 4);
  const rest = value.slice(p.length);
  const marker = carton ? rest.slice(0, 1) : "";
  const seq = carton ? rest.slice(1) : rest;
  const firstSig = seq.search(/[1-9]/);
  const pad = firstSig < 0 ? seq : seq.slice(0, firstSig);
  const sig = firstSig < 0 ? "" : seq.slice(firstSig);
  return (
    <span className="serial" style={{ fontSize:size }}>
      <span className="pfx">{p}</span>
      {marker && <span className="mid">{marker}</span>}
      <span className="pad">{pad}</span>
      <span className="seq">{sig}</span>
    </span>
  );
}
