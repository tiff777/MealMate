// components/RouteProtection/ProtectedRoute.tsx
import { useContext, useRef } from "react";
import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import LoadingSpinner from "../UI/LoadingSpinner";

interface ProtectedRouteProps {
  children: ReactNode;
  requireAuth?: boolean;
  redirectWhenAuth?: boolean;
  redirectTo?: string;
  fallbackTo?: string;
}

function ProtectedRoute({
  children,
  requireAuth = false,
  redirectWhenAuth = false,
  redirectTo = "/",
  fallbackTo = "/login",
}: ProtectedRouteProps) {
  const { user, isLoading, showError } = useContext(AppContext);
  const hasCheckedAuth = useRef(false);
  const location = useLocation();
  const currentPath = location.pathname;
  const lastSegment = currentPath.split("/").filter(Boolean).pop();

  if (isLoading && !hasCheckedAuth.current) {
    return <LoadingSpinner message="Authenticating..." size="md" />;
  }

  hasCheckedAuth.current = true;

  if (requireAuth && !user) {
    showError(`Please login to access ${lastSegment} page`);
    return <Navigate to={fallbackTo} replace state={{ fromProtected: true }} />;
  }

  if (redirectWhenAuth && user) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
