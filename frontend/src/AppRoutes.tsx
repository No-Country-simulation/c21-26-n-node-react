import { Navigate, Route, Routes } from "react-router-dom";
import { HomeRoutes } from "./home/routes/HomeRoutes";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeRoutes />} />
      <Route path="/*" element={<Navigate to="/" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
};
