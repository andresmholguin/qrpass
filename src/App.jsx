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

function App() {
  // const [user, setUser] = useState(null);

  return (
    <div className="w-[370px] sm:container flex align-center flex-col lg:px-4 h-full">
      <Header />
      <Routes>
        <Route index element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/registers" element={<Users />} />
          <Route path="/checkin" element={<CheckIn />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/createuser" element={<CreateUsers />} />
          <Route path="/*" element={<Reports />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
