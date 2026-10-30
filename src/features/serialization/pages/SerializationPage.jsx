import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileSpreadsheet, FileText, Plus, Printer } from "lucide-react";
import { prodByPid } from "@/entities/product";
import { useProduction } from "@/entities/production";
import { useRegister } from "@/entities/register";
import { Btn, PageHead, useToast } from "@/shared/ui";
import { ROUTES } from "@/shared/config";
import { SerialRuleCard } from "../components/SerialRuleCard.jsx";
import { RunContextCard } from "../components/RunContextCard.jsx";
import { SerialRegister } from "../components/SerialRegister.jsx";
import { BulkGenerateModal } from "../components/BulkGenerateModal.jsx";

export default function SerializationPage() {
  const { pid, setPid } = useProduction();
  const { seq } = useRegister();
  const toast = useToast();
  const navigate = useNavigate();
  const [bulkOpen, setBulkOpen] = useState(false);

  const p = prodByPid(pid);
  const nextSeq = seq[pid];

  return (
    <div>
      <PageHead crumbs={["Home","Serialization"]} title="Unit pack serialization"
        sub="One unique serial per saleable unit pack. The number is built from the product ID, so every product runs its own sequence and the two can never collide."
        actions={<>
          <Btn kind="g" icon={Printer} onClick={() => navigate(ROUTES.labels)}>Print labels</Btn>
          <Btn kind="g" icon={FileSpreadsheet} onClick={() => toast("Serialization_2026-07-30.xlsx downloaded")}>Excel</Btn>
          <Btn kind="g" icon={FileText} onClick={() => toast("Serialization_2026-07-30.pdf downloaded")}>PDF</Btn>
          <Btn kind="p" icon={Plus} onClick={() => setBulkOpen(true)}>Bulk generate</Btn>
        </>} />

      <div className="grid" style={{ gridTemplateColumns:"minmax(0,1fr) minmax(0,1.25fr)", marginBottom:14 }}>
        <SerialRuleCard pid={pid} nextSeq={nextSeq} onSelectProduct={setPid} />
        <RunContextCard product={p} />
      </div>

      <SerialRegister onBulkGenerate={() => setBulkOpen(true)} />

      {bulkOpen && <BulkGenerateModal pid={pid} product={p} nextSeq={nextSeq} onClose={() => setBulkOpen(false)} />}
    </div>
  );
}
