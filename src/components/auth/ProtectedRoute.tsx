import { useAuthStore } from "@/stores/useAuthStore";
import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router";

const ProtectedRoute = () => {
  const { accessToken, user, loading, refresh, fetchProfile } = useAuthStore();
  const location = useLocation();
  const [starting, setStarting] = useState(true);

  useEffect(() => {
    const init = async () => {
      if (!accessToken) await refresh();

      if (accessToken && !user) await fetchProfile();
    };

    init().then(() => setStarting(false));
  }, [accessToken, user, refresh, fetchProfile]);

  if (loading || starting) {
    return <div>Loading authentication status...</div>; // Or a spinner
  }

  if (!accessToken) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
