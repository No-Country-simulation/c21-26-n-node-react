import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LoadingSpinner } from "../components/LoadingSpinner";

function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth();

  console.log(loading, isAuthenticated);
  
  if (loading) {
    return <LoadingSpinner />
  }

  if (!loading && !isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
