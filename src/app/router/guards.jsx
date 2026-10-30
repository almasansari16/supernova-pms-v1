import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSession } from "@/entities/session";
import { canAccess, ROUTES } from "@/shared/config";

/* Signed-out users go to the login screen */
export function RequireAuth() {
  const { signedIn } = useSession();
  const location = useLocation();
  if (!signedIn) return <Navigate to={ROUTES.login} replace state={{ from:location }} />;
  return <Outlet />;
}

/* Signed-in users never see the login screen again */
export function RedirectIfAuthed({ children }) {
  const { signedIn } = useSession();
  if (signedIn) return <Navigate to={ROUTES.dashboard} replace />;
  return children;
}

/* A role without access to this route lands on the dashboard (also covers a live role switch) */
export function RequireRole({ roles, children }) {
  const { role } = useSession();
  if (!canAccess(roles, role)) return <Navigate to={ROUTES.dashboard} replace />;
  return children;
}
