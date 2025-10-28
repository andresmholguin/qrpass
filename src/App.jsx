import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard, Users, Login, CheckIn } from "./Components/index";
import { ProtectedRoute } from "./Components/utils/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<ProtectedRoute canActivate={true} />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/checkin" element={<CheckIn />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
