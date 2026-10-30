import { useState } from "react";
import { FileSpreadsheet, FileText, Printer } from "lucide-react";
import { useRegister } from "@/entities/register";
import { Btn, PageHead, useToast } from "@/shared/ui";
import { REPORTS } from "../data/reportDefinitions.js";
import { buildReportPreview } from "../lib/buildReportPreview.js";
import { ReportPicker } from "../components/ReportPicker.jsx";
import { ReportFilters } from "../components/ReportFilters.jsx";
import { ReportPreview } from "../components/ReportPreview.jsx";

export default function ReportsPage() {
  const register = useRegister();
  const toast = useToast();
  const [sel, setSel] = useState("serialization");
  const [from, setFrom] = useState("2026-07-01");
  const [to, setTo] = useState("2026-07-30");
  const r = REPORTS.find(x => x.id === sel);
  const preview = buildReportPreview(sel, register);

  return (
    <div>
      <PageHead crumbs={["Home","Reports"]} title="Reports"
        sub="Seven standing reports over the same serialization register. Pick a range, preview it on screen, then take it away as PDF or Excel."
        actions={<>
          <Btn kind="g" icon={Printer} onClick={() => toast("Report sent to printer")}>Print</Btn>
          <Btn kind="g" icon={FileSpreadsheet} onClick={() => toast(`${r.t}.xlsx downloaded`)}>Excel</Btn>
          <Btn kind="p" icon={FileText} onClick={() => toast(`${r.t}.pdf downloaded`)}>PDF</Btn>
        </>} />

      <div className="grid" style={{ gridTemplateColumns:"300px minmax(0,1fr)" }}>
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          <ReportPicker selected={sel} onSelect={setSel} />
          <ReportFilters from={from} to={to} setFrom={setFrom} setTo={setTo} />
        </div>
        <ReportPreview report={r} preview={preview} from={from} to={to} />
      </div>
    </div>
  );
}
