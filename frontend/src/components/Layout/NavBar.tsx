import React, { useContext, useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SwitchThemeButton from "../Button/SwitchThemeButton";
import Navigation from "./Navigation";
import NavButton from "../Button/NavButton";
import UserNavIcon from "./UserNavIcon";
import { AppContext } from "../../context/AppContext";
import { FaUtensils } from "react-icons/fa";
import { FiX, FiMenu } from "react-icons/fi";

function NavBar() {
  const { user, logoutUser } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const userNavItems = [
    { path: "/meal", label: "Find Meal", exact: true },
    { path: "/buddy", label: "Find Buddy", exact: true },
    { path: "/my-meals", label: "My Meals", exact: false },
    { path: "/messages", label: "Messages", exact: false },
    { path: "/setting", label: "Profile Setting", exact: false },
  ];

  const guestNavItems = [
    { path: "/meal", label: "Find Meal", exact: true },
    { path: "/buddy", label: "Find Buddy", exact: true },
  ];

  const homeNavItems = [
    { path: "/#features", label: "Features", exact: true },
    { path: "/#meals", label: "Meals Meetings", exact: true },
  ];

  const handleLogout = async () => {
    try {
      logoutUser();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const getNavItems = () => {
    if (user) return userNavItems;
    return location.pathname === "/"
      ? [...guestNavItems, ...homeNavItems]
      : guestNavItems;
  };

  const isActive = (path: string) => {
    if (path.startsWith("/#")) {
      return false; // Handle anchor links differently if needed
    }
    return location.pathname === path;
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (isMenuOpen) {
      timeoutId = setTimeout(() => {
        setIsMenuOpen(false);
      }, 5000);
    }

    return () => clearTimeout(timeoutId);
  }, [isMenuOpen]);

  return (
    <>
      <nav className="bg-gradient-to-r from-[#FF7F7F] to-[#FFA07A] dark:from-[#0F0F23] dark:via-[#1A1A2E] dark:to-[#16213E] shadow dark:shadow-gray-900/20 transition-all duration-300 relative">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div
            className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity duration-200"
            onClick={() => navigate("/")}
          >
            <div className="w-8 h-8 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center">
              <FaUtensils className="w-5 h-5 text-orange-500" />
            </div>
            <span className="self-center text-2xl font-bold whitespace-nowrap text-white">
              MealMate
            </span>
          </div>

          <div className="hidden min-[890px]:flex">
            <Navigation
              items={getNavItems()}
              setIsMenuOpen={setIsMenuOpen}
              isMobile={false}
            />
          </div>

          <div className="flex items-center md:order-2 space-x-3 rtl:space-x-reverse">
            {/* Theme Toggle */}
            <SwitchThemeButton />

            {user ? (
              /* User Dropdown Component */
              <UserNavIcon
                user={user}
                onLogout={handleLogout}
                className="ml-3"
              />
            ) : (
              /* Guest Auth Buttons */
              <div className="flex items-center space-x-2 gap-2">
                <button
                  onClick={() => navigate("/login")}
                  className="px-4 py-2 text-sm font-medium text-orange-600 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-orange-300 dark:bg-gray-800 dark:text-orange-400 dark:hover:bg-gray-700 transition-all duration-200"
                >
                  Join Now
                </button>
              </div>
            )}

            {/* Mobile menu button - shows when width < 890px */}
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg max-[889px]:inline-flex min-[890px]:hidden hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all duration-200"
              aria-controls="navbar-user"
              aria-expanded={isMenuOpen}
              aria-haspopup="true"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <FiX className="w-5 h-5" />
              ) : (
                <FiMenu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <>
            <div
              className="fixed inset-0 z-30"
              onClick={() => setIsMenuOpen(false)}
            />

            <div
              id="navbar-user"
              className={`absolute top-full right-3  max-w-screen-sm z-40 max-[889px]:${
                isMenuOpen ? "block" : "hidden"
              } min-[890px]:hidden`}
              role="menu"
              aria-labelledby="mobile-menu-button"
            >
              <ul className="flex flex-col font-medium p-4 border border-white/20 rounded-lg bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm dark:border-gray-700/50">
                <Navigation
                  items={getNavItems()}
                  setIsMenuOpen={setIsMenuOpen}
                  isMobile={true}
                />
              </ul>
            </div>
          </>
        )}
      </nav>
    </>
  );
}

export default NavBar;
