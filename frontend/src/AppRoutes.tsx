import { Route, Routes } from "react-router-dom";
import { HomeRoutes } from "./home/routes/HomeRoutes";
import { AuthProvider } from "./shared/context/AuthContext";
import { AuthRoutes } from "./auth/routes/AuthRoutes";
import { UserRoutes } from "./user/routes/UserRoutes";

export const AppRoutes = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/*" element={<HomeRoutes />} />
        <Route path="/auth/*" element={<AuthRoutes />} />
        <Route path="/user/*" element={<UserRoutes/>}/>
      </Routes>
    </AuthProvider>
  );
};
