import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { MoveRight, ScanLine, TriangleAlert, X } from "lucide-react";
import { useRegister } from "@/entities/register";
import { Btn, Card, Chip, Empty, PageHead, Skeleton } from "@/shared/ui";
import { useScanLookup } from "../hooks/useScanLookup.js";
import { ScanInputCard } from "../components/ScanInputCard.jsx";
import { UnitScanResult } from "../components/UnitScanResult.jsx";
import { CartonScanResult } from "../components/CartonScanResult.jsx";

/* Opened directly, or with ?code=… from the topbar search / packaging run */
export default function ScannerPage() {
  const { serials, cartons } = useRegister();
  const [params] = useSearchParams();
  const code = params.get("code");
  const { val, setVal, result, scanning, scan, scanValue, clear } = useScanLookup();
  const inputRef = useRef(null);

  useEffect(() => { inputRef.current?.focus(); }, []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { if (code) scanValue(code); }, [code]);

  const sampleUnit = serials.find(s => s.carton)?.serial;
  const sampleCarton = cartons[0]?.id;

  return (
    <div>
      <PageHead crumbs={["Home","Barcode Scanner"]} title="Barcode scanner"
        sub="Point a handheld at any unit pack or carton. The system decides from the number itself whether it is holding a child or a parent."
        actions={<Chip tone="c-ok" icon={ScanLine}>Zebra DS8178 connected</Chip>} />

      <div className="grid" style={{ gridTemplateColumns:"minmax(0,380px) minmax(0,1fr)" }}>
        <ScanInputCard inputRef={inputRef} val={val} setVal={setVal} scanning={scanning}
          scan={scan} scanValue={scanValue} sampleUnit={sampleUnit} sampleCarton={sampleCarton}
          onClear={() => { clear(); inputRef.current?.focus(); }} />

        <div>
          {!result && !scanning && (
            <Card><Empty icon={ScanLine} title="Waiting for a scan"
              body="Scan a unit pack to see its product, batch, GTIN, dates and status. Scan a master carton to open it and list every pack inside."
              action={<Btn kind="g" icon={MoveRight} onClick={() => scanValue(sampleCarton)}>Scan a sample carton</Btn>} /></Card>
          )}
          {scanning && <Card><Skeleton rows={5} /></Card>}

          {result?.kind === "unit" && !scanning && <UnitScanResult unit={result.unit} />}

          {result?.kind === "carton" && !scanning && <CartonScanResult carton={result.carton} />}

          {result?.kind === "miss" && !scanning && (
            <Card className="fade">
              <Empty icon={TriangleAlert} title="That number is not in the register"
                body={`${result.v} was decoded cleanly but has no matching unit pack or carton. Either it belongs to another plant, or it was never committed.`}
                action={<Btn kind="g" icon={X} onClick={clear}>Scan again</Btn>} />
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
