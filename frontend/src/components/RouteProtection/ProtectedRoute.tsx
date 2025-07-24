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
  const { isAuthenticated, isLoading, showError, user, setAuthenticated } =
    useContext(AppContext);
  const hasCheckedAuth = useRef(false);
  const location = useLocation();
  const currentPath = location.pathname;
  const lastSegment = currentPath.split("/").filter(Boolean).pop();

  if (isLoading && !hasCheckedAuth.current) {
    return <LoadingSpinner message="Authenticating..." size="md" />;
  }

  hasCheckedAuth.current = true;

  console.log("Test is auth: ", isAuthenticated);

  useEffect(() => {
    if (!isLoading && user && !isAuthenticated) {
      console.log(
        "🔧 ProtectedRoute: Found user but not authenticated, fixing..."
      );
      console.log("🔧 User data:", { uid: user.uid, name: user.name });
      
      const savedUser = localStorage.getItem("user");
      if (savedUser && user.uid) {
        console.log("🔧 ProtectedRoute: Forcing authentication to true");
        setAuthenticated(true);
      }
    }
  }, [isLoading, user, isAuthenticated, setAuthenticated]);

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
