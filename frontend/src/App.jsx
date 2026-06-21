import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Landing from "./pages/Landing/Landing";
function App() {
  const token =
    localStorage.getItem("bizboost-token");

  return (
    <BrowserRouter>
      <Routes>
        <Route
  path="/"
  element={<Landing />}
/>

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>

        <Route
  path="*"
  element={<Navigate to="/" />}
/>
          

      </Routes>
    </BrowserRouter>
  );
}

export default App;