import { useState } from "react";

/* Runs `fn` after a delay while exposing a busy flag — simulated async work. */
export function useTimedAction(defaultMs = 780) {
  const [busy, setBusy] = useState(false);
  const run = (fn, ms = defaultMs) => {
    setBusy(true);
    setTimeout(() => { fn(); setBusy(false); }, ms);
  };
  return { busy, run };
}
