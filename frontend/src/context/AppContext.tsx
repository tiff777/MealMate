import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  use,
} from "react";
import { useNavigate } from "react-router-dom";
import type { User } from "../types";
import { apiClient, authClient } from "../hook/api";
import ErrorToast from "../components/Modal/ErrorToast";
import SuccessToast from "../components/Modal/SuccessfulToast";

interface AppContextType {
  user: User | null;
  isAuthenticated: boolean;
  isDarkMode: boolean;
  isLoading: boolean;
  pendingRoomId: number | null;
  hasInitAuth: boolean;
  loginUser: (user: User, token: string, isRemember?: boolean) => void;
  logoutUser: () => void;
  updateUser: (user: User) => void;
  deleteUser: () => void;
  toggleDarkMode: () => void;
  setLoading: (loading: boolean) => void;
  setPendingId: (roomId: number | null) => void;
  getToken: () => string;
  showError: (message: string) => void;
  showSuccess: (message: string) => void;
  setAuthenticated: (loading: boolean) => void;
}

const AppContext = createContext<AppContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  isDarkMode: false,
  pendingRoomId: null,
  hasInitAuth: false,
  loginUser: () => {},
  logoutUser: () => {},
  updateUser: () => {},
  deleteUser: () => {},
  toggleDarkMode: () => {},
  setLoading: () => {},
  setPendingId: () => {},
  getToken: () => "",
  showError: () => {},
  showSuccess: () => {},
  setAuthenticated: () => {},
});

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [pendingRoomId, setPendingRoomId] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const [hasInitAuth, setHasInitAuth] = useState(false);

  const loginUser = (userData: User, token: string, isRemember?: boolean) => {
    setUser(userData);
    setIsAuthenticated(true);

    const storage = isRemember ? localStorage : sessionStorage;
    storage.setItem("token", token);
    storage.setItem("user", JSON.stringify(userData));

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    navigate("/meal");
  };

  const logoutUser = useCallback(async () => {
    const token = getToken();
    console.log("Token in logout: ", token);

    try {
      setIsLoading(true);

      const response = await authClient.post("/auth/logout");

      if (!response) {
        throw new Error("Logout failed");
      }

      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");

      localStorage.setItem("justLoggedOut", "true");

      setTimeout(() => {
        navigate("/login", { replace: true });
        localStorage.removeItem("justLoggedOut");
      }, 0);
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchUserProfile = useCallback(async (): Promise<User | null> => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
      const response = await fetch("/api/user/profile/info", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user profile");
      }
      const userData = await response.json();
      return userData;
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      console.error("Error fetching user profile:", error);
      return null;
    }
  }, []);

  const updateUser = useCallback(
    (updatedUser: User) => {
      setUser(updatedUser);

      setIsAuthenticated(true);

      setTimeout(() => {
        try {
          localStorage.setItem("user", JSON.stringify(updatedUser));
          setIsAuthenticated(true);
          console.log("✅ Context: User data saved to localStorage");
          console.log("✅ Context: Final auth state after update:", {
            isAuthenticated: true,
            userUid: updatedUser.uid,
          });
        } catch (error) {
          console.error(
            "❌ Context: Failed to save user to localStorage",
            error
          );
        }
      }, 0);
    },
    [fetchUserProfile]
  );

  const deleteUser = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    localStorage.setItem("justLoggedOut", "true");

    setTimeout(() => {
      navigate("/login", { replace: true });
      localStorage.removeItem("justLoggedOut");
    }, 0);

    navigate("/");
  };

  const getToken = useCallback(() => {
    return localStorage.getItem("token") || "";
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      if (newMode) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      return newMode;
    });
  };

  const setLoading = (loading: boolean) => {
    setIsLoading(loading);
  };

  const setPendingId = (roomId: number | null) => {
    setPendingRoomId(roomId);
  };

  const showError = useCallback((msg: string) => {
    setTimeout(() => {
      setErrorMessage(msg);
    }, 0);
  }, []);

  const showSuccess = useCallback((msg: string) => {
    setTimeout(() => {
      setSuccessMessage(msg);
    }, 0);
  }, []);

  const setAuthenticated = (auth: boolean) => {
    setIsAuthenticated(auth);
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (storedTheme === "dark" || (!storedTheme && prefersDark)) {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDarkMode(false);
    }
  }, []);

  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    const cachedUser =
      localStorage.getItem("user") || sessionStorage.getItem("user");

    setIsLoading(true);
    setHasInitAuth(true);

    if (!token || !cachedUser) {
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setIsLoading(false);
      return;
    }

    try {
      const parsedUser = JSON.parse(cachedUser);
      if (parsedUser?.uid) {
        setUser(parsedUser);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    } catch (error) {
      console.error("Error parsing cached user:", error);
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }

    setIsLoading(false);
  }, [fetchUserProfile]);

  const context = {
    user,
    isAuthenticated,
    isLoading,
    isDarkMode,
    pendingRoomId,
    hasInitAuth,
    loginUser,
    logoutUser,
    updateUser,
    deleteUser,
    getToken,
    toggleDarkMode,
    setLoading,
    setPendingId,
    showError,
    showSuccess,
    setAuthenticated,
  };

  return (
    <AppContext.Provider value={context}>
      {children}
      {errorMessage && (
        <ErrorToast
          message={errorMessage}
          onClose={() => setErrorMessage("")}
        />
      )}
      {successMessage && (
        <SuccessToast
          message={successMessage}
          onClose={() => setSuccessMessage("")}
        />
      )}
    </AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };
