/* Centered overlay; a click on the backdrop calls onClose */
export const Modal = ({ onClose, children }) => (
  <div style={{ position:"fixed", inset:0, background:"rgba(10,23,48,.42)", backdropFilter:"blur(3px)", display:"grid", placeItems:"center", zIndex:150, padding:20 }} onClick={onClose}>
    {children}
  </div>
);
