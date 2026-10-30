import { createContext, useContext, useState } from "react";
import { unitSerial, cartonSerial } from "@/entities/serial";
import { useProduction } from "@/entities/production";
import { demoTimestamp } from "@/shared/lib";
import { loadInitialRegister } from "../api/registerApi.js";

/* The serialization register: every unit serial, every master carton, and the
   per-product counters. Serials and cartons live together because closing a
   carton (aggregation) updates both in one step. */
const RegisterContext = createContext(null);

export function RegisterProvider({ children }) {
  const { ctx } = useProduction();
  const [seed] = useState(loadInitialRegister);
  const [serials, setSerials] = useState(seed.serials);
  const [cartons, setCartons] = useState(seed.cartons);
  const [seq, setSeq] = useState(seed.seq);
  const [cseq, setCseq] = useState(seed.cseq);

  /* Issue `n` new unit serials for product `p`, stamped with the current run context */
  const generate = (p, n) => {
    const start = seq[p] ?? 1;
    const ts = demoTimestamp();
    const made = Array.from({ length:n }, (_, i) => ({
      serial: unitSerial(p, start + i), pid:p, status:"Serialized",
      line:ctx.line, machine:ctx.machine, operator:ctx.operator, ts, carton:null,
    }));
    setSeq(s => ({ ...s, [p]: start + n }));
    setSerials(s => [...made, ...s]);
    return made;
  };

  /* Close a master carton around `serialList` and mark those serials Aggregated */
  const aggregate = (p, serialList, size) => {
    const cs = cseq[p] ?? 1;
    const id = cartonSerial(p, cs);
    const carton = { id, pid:p, size, serials:serialList, ts:demoTimestamp(), status:"Closed", printed:false };
    setCseq(s => ({ ...s, [p]: cs + 1 }));
    setCartons(c => [carton, ...c]);
    setSerials(s => s.map(r => serialList.includes(r.serial) ? { ...r, status:"Aggregated", carton:id } : r));
    return carton;
  };

  return (
    <RegisterContext.Provider value={{ serials, cartons, seq, cseq, generate, aggregate }}>
      {children}
    </RegisterContext.Provider>
  );
}

export function useRegister() {
  const value = useContext(RegisterContext);
  if (!value) throw new Error("useRegister must be used inside <RegisterProvider>");
  return value;
}
