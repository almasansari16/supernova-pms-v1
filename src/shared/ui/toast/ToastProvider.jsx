import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { CircleCheck } from "lucide-react";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const toast = useCallback((msg) => {
    const id = Math.random().toString(36).slice(2);
    setToasts(t => [...t, { id, msg }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3200);
  }, []);

  const value = useMemo(() => ({ toast, toasts }), [toast, toasts]);
  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
}

/* Returns the toast(message) function */
export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
  return ctx.toast;
}

/* Renders the toast stack; place it inside the .sn scope so it picks up the theme */
export function Toaster() {
  const { toasts } = useContext(ToastContext);
  return (
    <div className="toasts">
      {toasts.map(t => (
        <div key={t.id} className="toast"><CircleCheck size={16} color="#3ED598" />{t.msg}</div>
      ))}
    </div>
  );
}
