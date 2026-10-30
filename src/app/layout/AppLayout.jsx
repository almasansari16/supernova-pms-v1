import { Suspense, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ErrorBoundary, Skeleton, Toaster } from "@/shared/ui";
import { Sidebar } from "./Sidebar.jsx";
import { Topbar } from "./Topbar.jsx";
import { AppFooter } from "./AppFooter.jsx";

/* Authenticated shell: sidebar + topbar + routed page + footer + toasts */
export function AppLayout() {
  const { pathname } = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [popover, setPopover] = useState(null);

  // Any navigation closes the open topbar menu
  useEffect(() => setPopover(null), [pathname]);

  return (
    <div className="sn" style={{ height:"100%" }}>
      <div className="shell">
        <Sidebar collapsed={collapsed} />

        <div className="main">
          <Topbar collapsed={collapsed} onToggleSidebar={() => setCollapsed(c => !c)}
            popover={popover} setPopover={setPopover} />

          <main className="content" onClick={() => setPopover(null)}>
            <div key={pathname} className="fade">
              <ErrorBoundary>
                <Suspense fallback={<Skeleton rows={6} />}>
                  <Outlet />
                </Suspense>
              </ErrorBoundary>
            </div>
          </main>

          <AppFooter />
        </div>
      </div>

      <Toaster />
    </div>
  );
}
