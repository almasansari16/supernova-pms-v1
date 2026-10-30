import { createContext, useContext, useState } from "react";
import { LINES, MACHINES, OPERATORS, SHIFTS } from "@/shared/config";

/* The active production run: which product is selected and who/where it is
   being packed. Shared by SAP Sync, Serialization, Packaging and the topbar. */
const ProductionContext = createContext(null);

const INITIAL_RUN_CONTEXT = {
  operator:OPERATORS[0], line:LINES[0], shift:SHIFTS[0], machine:MACHINES[0],
  start:"06:10", end:"", remarks:"",
};

export function ProductionProvider({ children }) {
  const [pid, setPid] = useState("1004");
  const [ctx, setCtx] = useState(INITIAL_RUN_CONTEXT);

  /* Patch one or more run-context fields */
  const updateCtx = (patch) => setCtx(c => ({ ...c, ...patch }));

  return (
    <ProductionContext.Provider value={{ pid, setPid, ctx, setCtx, updateCtx }}>
      {children}
    </ProductionContext.Provider>
  );
}

export function useProduction() {
  const value = useContext(ProductionContext);
  if (!value) throw new Error("useProduction must be used inside <ProductionProvider>");
  return value;
}
