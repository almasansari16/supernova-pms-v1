import { useState } from "react";
import { useRegister } from "@/entities/register";
import { useToast } from "@/shared/ui";

/* Decodes a scanned number against the register: carton (parent), unit (child) or miss */
export function useScanLookup() {
  const { serials, cartons } = useRegister();
  const toast = useToast();
  const [val, setVal] = useState("");
  const [result, setResult] = useState(null);
  const [scanning, setScanning] = useState(false);

  function scan(raw) {
    const v = (raw ?? val).trim();
    if (!v) return;
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      const carton = cartons.find(c => c.id === v);
      if (carton) { setResult({ kind:"carton", carton }); toast(`Master carton ${v} decoded`); return; }
      const unit = serials.find(s => s.serial === v);
      if (unit) { setResult({ kind:"unit", unit }); toast(`Unit pack ${v} decoded`); return; }
      setResult({ kind:"miss", v });
    }, 620);
  }

  /* Put a value in the input and scan it immediately */
  const scanValue = (v) => { setVal(v); scan(v); };

  const clear = () => { setVal(""); setResult(null); };

  return { val, setVal, result, setResult, scanning, scan, scanValue, clear };
}
