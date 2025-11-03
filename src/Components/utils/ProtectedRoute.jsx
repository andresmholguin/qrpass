import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "../store/userStore";

export const ProtectedRoute = ({ redirectTo = "/login" }) => {
  // const storedUser = localStorage.getItem("user");
  // console.log("variable creada", storedUser);
  const storedUser = useUserStore((state) => state.user);
  if (!storedUser) {
    return <Navigate to={redirectTo} replace />;
  }

  // if (parsedUser.user_role !== 2525) {
  //   console.log("No tiene rol");
  //   return <Navigate to={redirectPath} replace />;
  // }
  return <Outlet />;
};
