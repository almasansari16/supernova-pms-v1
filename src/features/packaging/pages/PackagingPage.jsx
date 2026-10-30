import { ChevronLeft, X } from "lucide-react";
import { prodByPid } from "@/entities/product";
import { useProduction } from "@/entities/production";
import { useRegister } from "@/entities/register";
import { Btn, Card, PageHead, Stepper } from "@/shared/ui";
import { PKG_STEPS, STEP } from "../constants/steps.js";
import { usePackagingRun } from "../hooks/usePackagingRun.js";
import { SelectProductStep } from "../components/SelectProductStep.jsx";
import { SapDataStep } from "../components/SapDataStep.jsx";
import { UnitSerialsStep } from "../components/UnitSerialsStep.jsx";
import { MasterCartonStep } from "../components/MasterCartonStep.jsx";
import { PrintLabelsStep } from "../components/PrintLabelsStep.jsx";
import { CompleteStep } from "../components/CompleteStep.jsx";

export default function PackagingPage() {
  const { pid } = useProduction();
  const { seq, cseq } = useRegister();
  const runState = usePackagingRun();
  const { step, setStep, back, reset, busy, run, issued, carton } = runState;
  const p = prodByPid(pid);

  return (
    <div>
      <PageHead crumbs={["Home","Packaging"]} title="Packaging run"
        sub="Six steps from a released order to a closed, labelled master carton. Each step writes to the audit trail before the next one unlocks."
        actions={<>
          {step > 0 && <Btn kind="g" icon={ChevronLeft} onClick={back}>Back</Btn>}
          <Btn kind="g" icon={X} onClick={reset}>Reset run</Btn>
        </>} />

      <Card className="pad" style={{ marginBottom:14 }}><Stepper steps={PKG_STEPS} current={step} /></Card>

      {step === STEP.SELECT && <SelectProductStep onContinue={() => setStep(STEP.SAP)} />}

      {step === STEP.SAP && <SapDataStep product={p} busy={busy} run={run} onContinue={() => setStep(STEP.SERIALS)} />}

      {step === STEP.SERIALS && (
        <UnitSerialsStep pid={pid} nextSeq={seq[pid]} qty={runState.qty} setQty={runState.setQty}
          busy={busy} onIssue={runState.issueSerials} />
      )}

      {step === STEP.CARTON && (
        <MasterCartonStep pid={pid} nextCartonSeq={cseq[pid]} issued={issued}
          cartonSize={runState.cartonSize} setCartonSize={runState.setCartonSize}
          busy={busy} onClose={runState.closeCarton} />
      )}

      {step === STEP.LABELS && carton && (
        <PrintLabelsStep product={p} issued={issued} carton={carton} onPrinted={() => setStep(STEP.DONE)} />
      )}

      {step === STEP.DONE && carton && (
        <CompleteStep product={p} issued={issued} carton={carton} onRestart={reset} />
      )}
    </div>
  );
}
