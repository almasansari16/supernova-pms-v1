/* ==========================================================================
   SERIAL LOGIC
   Unit pack    : <ProductID><9-digit sequence>      1004 000000001  -> 1004000000001
   Master carton: <ProductID>5<8-digit sequence>     1004 5 00000001 -> 1004500000001
   Every product keeps its own independent counter.
   ========================================================================== */
export const CARTON_MARKER = "5";

export const unitSerial   = (pid, seq) => `${pid}${String(seq).padStart(9, "0")}`;
export const cartonSerial = (pid, seq) => `${pid}${CARTON_MARKER}${String(seq).padStart(8, "0")}`;

/* Leading zeros of a zero-padded sequence, e.g. (482, 9) -> "000000" */
export const zeroPad = (seq, width) => String(seq).padStart(width, "0").replace(/[1-9]\d*$/, "");
