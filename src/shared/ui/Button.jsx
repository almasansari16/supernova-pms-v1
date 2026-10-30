/* kind: p = primary, g = ghost, d = danger, s = solid ink */
export const Btn = ({ kind = "g", icon: Ic, children, sm, ...p }) => (
  <button className={`btn btn-${kind}${sm ? " btn-sm" : ""}`} {...p}>{Ic && <Ic size={sm ? 13 : 15} />}{children}</button>
);
