import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import LeadDetails from "./pages/LeadDetails";
import { isLoggedIn } from "./utils/auth";

const PrivateRoute = ({ children }) => {
  return isLoggedIn() ? children : <Navigate to="/" />;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/lead/:id"
          element={
            <PrivateRoute>
              <LeadDetails />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
