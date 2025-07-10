import React, { createContext, useState, useEffect } from "react";
import type { User } from "../types";

interface AppContextType {
  user: User | null;
  isAuthenticated: boolean;
  isDarkMode: boolean;
  isLoading: boolean;
  loginUser: (user: User) => void;
  logoutUser: () => void;
  toggleDarkMode: () => void;
  setLoading: (loading: boolean) => void;
}

const AppContext = createContext<AppContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  isDarkMode: false,
  loginUser: () => {},
  logoutUser: () => {},
  toggleDarkMode: () => {},
  setLoading: () => {},
});

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

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

  const loginUser = (userData: User) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logoutUser = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

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

  const context = {
    user,
    isAuthenticated,
    isLoading,
    isDarkMode,
    loginUser,
    logoutUser,
    toggleDarkMode,
    setLoading,
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};

export { AppContext, AppContextProvider };
