import { Navigate, Route, Routes } from "react-router-dom";
import { HomeRoutes } from "./home/routes/HomeRoutes";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Profile from "./pages/Profile";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";

export const AppRoutes = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<HomeRoutes />} />
        <Route path="/*" element={<Navigate to="/" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/Profile" element={<Profile />} />
        </Route>
      </Routes>{" "}
    </AuthProvider>
  );
};
