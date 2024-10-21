import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "../../shared/routes/ProtectedRoute";
import ProfilePage from "../pages/ProfilePage";
import DashboardPage from "../pages/DashboardPage";

export const UserRoutes = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/dashboard" element={<DashboardPage/>}/>
      </Route>
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};
