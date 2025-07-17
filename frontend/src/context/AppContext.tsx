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

interface AppContextType {
  user: User | null;
  isAuthenticated: boolean;
  isDarkMode: boolean;
  isLoading: boolean;
  pendingRoomId: number | null;
  loginUser: (user: User, token: string) => void;
  logoutUser: () => void;
  updateUser: (user: User) => void;
  deleteUser: () => void;
  toggleDarkMode: () => void;
  setLoading: (loading: boolean) => void;
  setPendingId: (roomId: number | null) => void;
  getToken: () => string;
}

const AppContext = createContext<AppContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  isDarkMode: false,
  pendingRoomId: null,
  loginUser: () => {},
  logoutUser: () => {},
  updateUser: () => {},
  deleteUser: () => {},
  toggleDarkMode: () => {},
  setLoading: () => {},
  setPendingId: () => {},
  getToken: () => "",
});

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [pendingRoomId, setPendingRoomId] = useState<number | null>(null);
  const navigate = useNavigate();

  const loginUser = (userData: User, token: string) => {
    setUser(userData);
    setIsAuthenticated(true);

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

      navigate("/");
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
      localStorage.setItem("user", JSON.stringify(updatedUser));
    },
    [fetchUserProfile]
  );

  const deleteUser = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    localStorage.removeItem("user");

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
    const token = localStorage.getItem("token");
    const cachedUser = localStorage.getItem("user");

    if (!token) {
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem("user");
      setIsLoading(false);
      return;
    }

    if (cachedUser) {
      setUser(JSON.parse(cachedUser));
      setIsAuthenticated(true);
    }
  }, [fetchUserProfile]);

  const context = {
    user,
    isAuthenticated,
    isLoading,
    isDarkMode,
    pendingRoomId,
    loginUser,
    logoutUser,
    updateUser,
    deleteUser,
    getToken,
    toggleDarkMode,
    setLoading,
    setPendingId,
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};

export { AppContext, AppContextProvider };
