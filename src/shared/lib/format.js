export const nf = (n) => n.toLocaleString("en-US");

const pad2 = (n) => String(n).padStart(2, "0");

/* The demo runs on a fixed business date; only the clock time is live. */
export const DEMO_DATE = "2026-07-30";

export function demoTimestamp({ seconds = false } = {}) {
  const now = new Date();
  const hm = `${pad2(now.getHours())}:${pad2(now.getMinutes())}`;
  return `${DEMO_DATE} ${hm}${seconds ? `:${pad2(now.getSeconds())}` : ""}`;
}
