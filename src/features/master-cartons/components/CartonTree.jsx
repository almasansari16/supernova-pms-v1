import { useState } from "react";
import { Barcode, Boxes, ChevronDown, ChevronRight, Layers, Printer } from "lucide-react";
import { prodByPid } from "@/entities/product";
import { SerialText } from "@/entities/serial";
import { useRegister } from "@/entities/register";
import { Chip, St } from "@/shared/ui";

/* One master carton (parent) that expands to list its unit packs (children) */
export function CartonTree({ carton, defaultOpen = false, onPrint }) {
  const { serials } = useRegister();
  const [open, setOpen] = useState(defaultOpen);
  const p = prodByPid(carton.pid);
  const kids = serials.filter(s => s.carton === carton.id);
  return (
    <div className="tnode">
      <div className="tparent" onClick={() => setOpen(o => !o)} role="button" tabIndex={0}
           onKeyDown={e => (e.key === "Enter" || e.key === " ") && setOpen(o => !o)}>
        <div style={{ width:26, height:26, borderRadius:8, background:"var(--violet-soft)", color:"var(--violet)", display:"grid", placeItems:"center", flex:"0 0 26px" }}>
          {open ? <ChevronDown size={15} /> : <ChevronRight size={15} />}
        </div>
        <Boxes size={17} color="var(--violet)" />
        <div style={{ minWidth:0 }}>
          <SerialText value={carton.id} pid={carton.pid} carton size={14.5} />
          <div style={{ fontSize:11.5, color:"var(--slate)", marginTop:2 }}>{p.name} · {p.batch}</div>
        </div>
        <div style={{ marginLeft:"auto", display:"flex", gap:9, alignItems:"center", flexWrap:"wrap" }}>
          <Chip tone="c-vio" icon={Layers}>{carton.serials.length} unit packs</Chip>
          <St v={carton.status} />
          <span className="mono" style={{ fontSize:11.5, color:"var(--slate-2)" }}>{carton.ts}</span>
          {onPrint && <button className="iconbtn" style={{ width:29, height:29 }} title="Print carton label"
            onClick={e => { e.stopPropagation(); onPrint(carton); }}><Printer size={13} /></button>}
        </div>
      </div>
      {open && (
        <div className="tkids fade">
          {kids.length ? kids.map((s, i) => (
            <div key={s.serial} className="tkid">
              <span className="mono" style={{ fontSize:10.5, color:"var(--slate-2)", width:28 }}>{i+1}</span>
              <Barcode size={14} color="var(--nova)" />
              <SerialText value={s.serial} pid={s.pid} size={13.5} />
              <div style={{ marginLeft:"auto", display:"flex", gap:9, alignItems:"center" }}>
                <St v={s.status} />
                <span style={{ fontSize:11.5, color:"var(--slate-2)" }}>{s.operator}</span>
                <span className="mono" style={{ fontSize:11, color:"var(--slate-2)" }}>{s.ts}</span>
              </div>
            </div>
          )) : <div style={{ fontSize:12, color:"var(--slate-2)", padding:"6px 2px" }}>Child records were archived with the shipment.</div>}
        </div>
      )}
    </div>
  );
}
