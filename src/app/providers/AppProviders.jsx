import { SessionProvider } from "@/entities/session";
import { ProductionProvider } from "@/entities/production";
import { RegisterProvider } from "@/entities/register";
import { ToastProvider } from "@/shared/ui";

/* Composes every global context. Order matters: the register reads the
   production run context, so ProductionProvider must wrap RegisterProvider. */
export function AppProviders({ children }) {
  return (
    <SessionProvider>
      <ToastProvider>
        <ProductionProvider>
          <RegisterProvider>
            {children}
          </RegisterProvider>
        </ProductionProvider>
      </ToastProvider>
    </SessionProvider>
  );
}
