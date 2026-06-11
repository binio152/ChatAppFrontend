import { useAuthStore } from "@/stores/useAuthStore";
import { Navigate, Outlet, useLocation } from "react-router";

const ProtectedRoute = () => {
  const { accessToken, loading } = useAuthStore();
  const location = useLocation();

  if (loading) {
    return <div>Loading authentication status...</div>; // Or a spinner
  }

  if (!accessToken) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
