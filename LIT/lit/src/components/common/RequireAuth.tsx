import { Navigate, Outlet, useLocation } from "react-router";
import { useUser } from "../context/UserContext";
import { isEmpty, isNil } from "ramda";

export const RequireAuth = () => {
  const { user } = useUser();
  const location = useLocation();

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
