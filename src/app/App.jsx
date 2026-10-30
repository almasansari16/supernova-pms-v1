/* ==========================================================================
   SuperNova · Product Serialization Management System
   Pharmaceutical Manufacturing · SAP S/4HANA integrated (mock)
   Designed & Developed by ERManager Consulting Services
   ========================================================================== */
import { AppProviders } from "./providers/AppProviders.jsx";
import { AppRouter } from "./router/AppRouter.jsx";

export default function App() {
  return (
    <AppProviders>
      <AppRouter />
    </AppProviders>
  );
}
