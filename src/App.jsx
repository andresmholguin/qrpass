import { Route, Routes } from "react-router-dom";
import {
  Users,
  Login,
  CheckIn,
  Reports,
  Header,
  CreateUsers,
  EditRegister,
} from "./Components/index";
import { ProtectedRoute } from "./Components/utils/ProtectedRoute";
import { useUserStore } from "./Components/store/userStore";

function App() {
  const user = useUserStore((state) => state.user); // ✅ leer directo de Zustand

  return (
    <div className="w-[370px] sm:container flex align-center flex-col lg:px-4 h-full">
      <Header />
      <Routes>
        {/* Public routes */}
        <Route index element={<Login />} />
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute isAllowed={!!user} />}>
          <Route path="/createuser" element={<CreateUsers />} />
          <Route
            path="/checkin"
            element={<CheckIn userName={user.user_name} />}
          />
          <Route path="/registers" element={<Users />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/edit/:id" element={<EditRegister />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
