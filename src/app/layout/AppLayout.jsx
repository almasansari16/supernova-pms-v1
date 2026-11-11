import { Suspense, useEffect, useState, useCallback } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ErrorBoundary, Skeleton, Toaster } from "@/shared/ui";
import { Sidebar } from "./Sidebar.jsx";
import { Topbar } from "./Topbar.jsx";
import { AppFooter } from "./AppFooter.jsx";

export function AppLayout() {
  const { pathname } = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [popover, setPopover] = useState(null);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 820);

  // Theme — persisted in localStorage, applied to <html>
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") ?? "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleToggleTheme = useCallback(() => {
    setTheme(t => t === "dark" ? "light" : "dark");
  }, []);

  // Track viewport width for mobile behavior
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 820);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // On mobile, sidebar starts collapsed
  useEffect(() => {
    if (isMobile) setCollapsed(true);
  }, [isMobile]);

  // Close popover and sidebar (on mobile) on navigation
  useEffect(() => {
    setPopover(null);
    if (isMobile) setCollapsed(true);
  }, [pathname]);

  const handleToggleSidebar = useCallback(() => {
    setCollapsed(c => !c);
  }, []);

  const handleBackdropClick = useCallback(() => {
    setCollapsed(true);
  }, []);

  return (
    <div className="sn" style={{ height: "100%" }}>
      <div className="shell">

        {/* Mobile backdrop — only shown when sidebar is open on mobile */}
        {isMobile && !collapsed && (
          <div
            className="sidebar-backdrop"
            onClick={handleBackdropClick}
            aria-hidden="true"
          />
        )}

        <Sidebar
          collapsed={collapsed}
          onToggle={handleToggleSidebar}
        />

        <div className="main">
          <Topbar
            collapsed={collapsed}
            onToggleSidebar={handleToggleSidebar}
            popover={popover}
            setPopover={setPopover}
            theme={theme}
            onToggleTheme={handleToggleTheme}
          />

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