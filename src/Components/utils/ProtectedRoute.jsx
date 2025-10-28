import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({ canActivate, redirectPath = "/" }) => {
  if (!canActivate) {
    return <Navigate to={redirectPath} replace />;
  }
  return <Outlet />;
};
