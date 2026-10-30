import { useState } from "react";
import { useProduction } from "@/entities/production";
import { useRegister } from "@/entities/register";
import { useToast } from "@/shared/ui";
import { useTimedAction } from "@/shared/hooks";
import { STEP } from "../constants/steps.js";

/* State machine for the six-step guided packaging run */
export function usePackagingRun() {
  const { pid } = useProduction();
  const { generate, aggregate } = useRegister();
  const toast = useToast();
  const { busy, run } = useTimedAction(780);

  const [step, setStep] = useState(STEP.SELECT);
  const [qty, setQty] = useState(20);
  const [cartonSize, setCartonSize] = useState(20);
  const [issued, setIssued] = useState([]);
  const [carton, setCarton] = useState(null);

  const issueSerials = () => run(() => {
    const made = generate(pid, Number(qty));
    setIssued(made); setStep(STEP.CARTON);
    toast(`${made.length} unit serials issued`);
  });

  const closeCarton = () => run(() => {
    const c = aggregate(pid, issued.slice(0, Number(cartonSize)).map(s => s.serial), Number(cartonSize));
    setCarton(c); setStep(STEP.LABELS);
    toast(`Master carton ${c.id} closed with ${c.serials.length} packs`);
  });

  const reset = () => { setStep(STEP.SELECT); setIssued([]); setCarton(null); };
  const back = () => setStep(s => s - 1);

  return {
    step, setStep, back, reset, busy, run,
    qty, setQty, cartonSize, setCartonSize,
    issued, carton, issueSerials, closeCarton,
  };
}
