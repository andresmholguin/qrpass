import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard, Users, Login } from "./Components/index";
import { ProtectedRoute } from "./Components/utils/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<ProtectedRoute canActivate={false} />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
