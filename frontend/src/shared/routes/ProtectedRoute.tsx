import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth();

  console.log(loading, isAuthenticated);
  
  if (loading) {
    return <div>Loading...</div>; // Esperar hasta que termine la verificación
  }

  if (!loading && !isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />; // Mostrar la ruta protegida
}

export default ProtectedRoute;
