import { useContext, useRef, useEffect } from "react";
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
  const {
    isAuthenticated,
    isLoading,
    showError,
    user,
    setAuthenticated,
    hasInitAuth,
  } = useContext(AppContext);
  const hasCheckedAuth = useRef(false);
  const location = useLocation();
  const currentPath = location.pathname;
  const lastSegment = currentPath.split("/").filter(Boolean).pop();

  hasCheckedAuth.current = true;

  useEffect(() => {
    if (!isLoading && user && !isAuthenticated) {
      const savedUser = localStorage.getItem("user");
      if (savedUser && user.uid) {
        setAuthenticated(true);
      }
    }
  }, [isLoading, user, isAuthenticated, setAuthenticated]);

  if (!hasInitAuth) {
    return <LoadingSpinner message="Authenticating..." size="md" />;
  }

  if (requireAuth && !isAuthenticated) {
    showError(`Please login to access ${lastSegment} page`);
    return <Navigate to={fallbackTo} replace state={{ fromProtected: true }} />;
  }

  if (redirectWhenAuth && isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
