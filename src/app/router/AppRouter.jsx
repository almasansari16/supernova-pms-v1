import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "@/features/auth";
import { ROUTES } from "@/shared/config";
import { AppLayout } from "../layout/AppLayout.jsx";
import { RedirectIfAuthed, RequireAuth, RequireRole } from "./guards.jsx";
import { NAV_ITEMS } from "./routes.config.js";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.login} element={<RedirectIfAuthed><LoginPage /></RedirectIfAuthed>} />

        <Route element={<RequireAuth />}>
          <Route element={<AppLayout />}>
            {NAV_ITEMS.map(({ path, roles, Page }) => (
              <Route key={path} path={path} element={<RequireRole roles={roles}><Page /></RequireRole>} />
            ))}
          </Route>
        </Route>

        <Route path="*" element={<Navigate to={ROUTES.dashboard} replace />} />
      </Routes>
    </BrowserRouter>
  );
}
