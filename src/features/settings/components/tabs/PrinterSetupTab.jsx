import { Cpu, Wifi, WifiOff } from "lucide-react";
import { CardHead, Chip } from "@/shared/ui";

export function PrinterSetupTab() {
  return (
    <>
      <CardHead title="Printer setup" icon={Cpu} sub="One printer per line, plus a reprint station" />
      <div className="tblwrap">
        <table className="tbl">
          <thead><tr>{["Printer","Model","Assigned line","Resolution","Stock","Status"].map(h => <th key={h}>{h}</th>)}</tr></thead>
          <tbody>
            {[["PRN-01","Zebra ZT411","LINE-01 · Blister Pack A","300 dpi","60 × 40 mm","Ready"],
              ["PRN-02","Zebra ZT411","LINE-02 · Blister Pack B","300 dpi","60 × 40 mm","Ready"],
              ["PRN-03","Zebra ZT230","LINE-03 · Bottle Fill","203 dpi","60 × 40 mm","Offline"],
              ["PRN-04","Videojet 9550","LINE-04 · Vial Aseptic","Direct print","—","Ready"],
              ["PRN-05","Zebra ZT610","Carton station","600 dpi","100 × 75 mm","Ready"]].map(r => (
              <tr key={r[0]}>
                <td className="num" style={{ fontWeight:600 }}>{r[0]}</td><td style={{ fontSize:12.5 }}>{r[1]}</td>
                <td style={{ fontSize:12.5 }}>{r[2]}</td><td className="num">{r[3]}</td><td className="num">{r[4]}</td>
                <td>{r[5]==="Ready" ? <Chip tone="c-ok" icon={Wifi}>Ready</Chip> : <Chip tone="c-err" icon={WifiOff}>Offline</Chip>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
