import { useState } from "react";
import { Check, Info, Plus, RefreshCw, X } from "lucide-react";
import { unitSerial } from "@/entities/serial";
import { useRegister } from "@/entities/register";
import { Btn, Card, CardHead, Field, Input, Modal, useToast } from "@/shared/ui";
import { useTimedAction } from "@/shared/hooks";

const QUICK_QTY = [10, 20, 50, 100];

export function BulkGenerateModal({ pid, product: p, nextSeq, onClose }) {
  const { generate } = useRegister();
  const toast = useToast();
  const [bulkQty, setBulkQty] = useState(20);
  const { busy, run } = useTimedAction(720);

  const submit = () => run(() => {
    generate(pid, Number(bulkQty));
    onClose();
    toast(`${bulkQty} unit serials generated for product ${pid}`);
  });

  return (
    <Modal onClose={onClose}>
      <Card className="fade" style={{ width:430, maxWidth:"100%", boxShadow:"var(--sh-3)" }} onClick={e => e.stopPropagation()}>
        <CardHead title="Bulk generate unit serials" icon={Plus} sub={`Product ${pid} · ${p.name}`}
          right={<button className="iconbtn" style={{ width:30, height:30 }} onClick={onClose}><X size={14} /></button>} />
        <div style={{ padding:18 }}>
          <Field label="How many unit packs" req hint={`Serials ${unitSerial(pid, nextSeq)} to ${unitSerial(pid, nextSeq + Number(bulkQty||1) - 1)} will be issued.`}>
            <Input type="number" min="1" max="500" value={bulkQty} onChange={e => setBulkQty(e.target.value)} />
          </Field>
          <div style={{ display:"flex", gap:8, marginTop:12, flexWrap:"wrap" }}>
            {QUICK_QTY.map(n => <button key={n} className={`btn btn-sm ${Number(bulkQty)===n?"btn-s":"btn-g"}`} onClick={() => setBulkQty(n)}>{n}</button>)}
          </div>
          <div style={{ marginTop:16, padding:12, background:"var(--spark-soft)", borderRadius:10, display:"flex", gap:9, fontSize:12, color:"#96620A" }}>
            <Info size={15} style={{ flex:"0 0 15px", marginTop:1 }} />
            Serials are committed the moment they are issued. Cancelling a run leaves gaps in the sequence — that is intentional and auditable.
          </div>
          <div style={{ display:"flex", gap:9, marginTop:18, justifyContent:"flex-end" }}>
            <Btn kind="g" onClick={onClose}>Cancel</Btn>
            <Btn kind="p" icon={busy ? RefreshCw : Check} onClick={submit} disabled={busy}>{busy ? "Generating…" : `Generate ${bulkQty} serials`}</Btn>
          </div>
        </div>
      </Card>
    </Modal>
  );
}
