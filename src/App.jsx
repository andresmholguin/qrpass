import { Route, Routes } from "react-router-dom";
import {
  Dashboard,
  Users,
  Login,
  CheckIn,
  Reports,
  Header,
  CreateUsers,
} from "./Components/index";
import { ProtectedRoute } from "./Components/utils/ProtectedRoute";
import { useState } from "react";

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="w-[370px] sm:container flex align-center flex-col lg:px-4 h-full">
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<ProtectedRoute canActivate={true} />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/registers" element={<Users />} />
          <Route path="/checkin" element={<CheckIn />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/createusers" element={<CreateUsers />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
