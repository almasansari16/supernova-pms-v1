import { Search } from "lucide-react";

export const Field = ({ label, hint, req, children }) => (
  <label className="field">
    <span className="lb">{label}{req && <span className="req"> *</span>}</span>
    {children}
    {hint && <span className="hint">{hint}</span>}
  </label>
);

export const Input = (p) => <input className="inp" {...p} />;

export const Select = ({ options = [], labels, ...p }) => (
  <select className="inp" {...p}>
    {options.map((o, i) => (
      <option key={o} value={o}>{labels ? labels[i] : o}</option>
    ))}
  </select>
);

/* Compact select used in table toolbars */
export const FilterSelect = ({ options = [], ...p }) => (
  <select className="inp" style={{ width:"auto", padding:"7px 10px", fontSize:12.5 }} {...p}>
    {options.map(o => <option key={o}>{o}</option>)}
  </select>
);

/* Search input used in card headers */
export const SearchBox = ({ width, ...p }) => (
  <div className="searchbox" style={{ width }}>
    <Search size={14} color="var(--slate-2)" />
    <input {...p} />
  </div>
);
