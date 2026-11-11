import { SessionProvider } from "@/entities/session";
import { ProductionProvider } from "@/entities/production";
import { RegisterProvider } from "@/entities/register";
import { ToastProvider } from "@/shared/ui";
import { SapStatusProvider } from "@/shared/lib/SapStatusProvider";
import { ProductionOrdersProvider } from "@/shared/lib/ProductionOrdersProvider";

/* Composes every global context. Order matters: the register reads the
   production run context, so ProductionProvider must wrap RegisterProvider. */
export function AppProviders({ children }) {
  return (
    <SessionProvider>
      <ToastProvider>
        <SapStatusProvider>
          <ProductionOrdersProvider>
            <ProductionProvider>
              <RegisterProvider>{children}</RegisterProvider>
            </ProductionProvider>
          </ProductionOrdersProvider>
        </SapStatusProvider>
      </ToastProvider>
    </SessionProvider>
  );
}
