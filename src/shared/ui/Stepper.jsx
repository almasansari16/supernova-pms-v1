import { Check } from "lucide-react";

export const Stepper = ({ steps, current }) => (
  <div className="stepper">
    {steps.map((s, i) => (
      <div key={s.t} className={`step ${i === current ? "on" : ""} ${i < current ? "done" : ""}`}>
        <div className="body">
          <div className="bub">{i < current ? <Check size={16} /> : i + 1}</div>
          <div className="st">{s.t}</div><div className="sd">{s.d}</div>
        </div>
        {i < steps.length - 1 && <div className="bar" />}
      </div>
    ))}
  </div>
);
