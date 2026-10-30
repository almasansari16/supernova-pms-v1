import { TrendingUp } from "lucide-react";

const TONES = {
  nova:  ["var(--nova-soft)","var(--nova)"], mint:["var(--mint-soft)","var(--mint)"],
  spark: ["var(--spark-soft)","#B47509"],    rose:["var(--rose-soft)","var(--rose)"],
  violet:["var(--violet-soft)","var(--violet)"],
};

export const KPI = ({ label, value, delta, icon: Ic, tone = "nova", trend }) => {
  const tones = TONES[tone];
  return (
    <div className="kpi">
      <div className="ic" style={{ background:tones[0], color:tones[1] }}><Ic size={17} /></div>
      <div className="lbl">{label}</div>
      <div className="val">{value}</div>
      {delta && <div className="delta">{trend !== false && <TrendingUp size={12} color="var(--mint)" />}{delta}</div>}
      <Ic className="spark" size={78} />
    </div>
  );
};
