import { useEffect, useState } from "react";

/* true for `ms` after mount — stands in for network latency in the demo build */
export function useSimulatedLoading(ms) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), ms);
    return () => clearTimeout(t);
  }, [ms]);
  return loading;
}
