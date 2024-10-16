import { useAuth } from "./context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Esperar hasta que termine la verificación
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />; // Redirigir a login si no está autenticado
  }

  return <Outlet />; // Mostrar la ruta protegida
}

export default ProtectedRoute;
