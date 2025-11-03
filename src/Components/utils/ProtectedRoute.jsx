import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoute({ isAllowed, redirectTo = "/login" }) {
  if (!isAllowed) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
}
