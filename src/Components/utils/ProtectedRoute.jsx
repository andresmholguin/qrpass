import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "../store/userStore";

export const ProtectedRoute = ({ redirectTo = "/login" }) => {
  const storedUser = useUserStore((state) => state.user);

  if (!storedUser) {
    return <Navigate to={redirectTo} replace />;
  }
  if (storedUser.user_role == 3245) {
    console.log("No tiene rol");
    return <Navigate to={"/checkin"} replace />;
  }
  return <Outlet />;
};
