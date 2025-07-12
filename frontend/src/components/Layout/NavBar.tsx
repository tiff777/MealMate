import React, { useContext } from "react";
import SwitchThemeButton from "../Button/SwitchThemeButton";
import Navigation from "./Navigation";
import { AppContext } from "../../context/AppContext";

function NavBar() {
  const { user } = useContext(AppContext);

  const userNavItems = [
    { path: "/meal", label: "Find Meal", exact: true },
    { path: "/buddy", label: "Find Buddy", exact: true },
    { path: "/my-meals", label: "My Meals", exact: false },
    { path: "/messages", label: "Messages", exact: false },
    { path: "/profile", label: "Profile", exact: false },
  ];

  const navItems = [
    { path: "/meal", label: "Find Meal", exact: true },
    { path: "/buddy", label: "Find Buddy", exact: true },
  ];

  return (
    <>
      <header className="bg-gradient-to-r from-rose-400 vida-rose-350 to-rose-300 dark:from-rose-900/60 dark:to-blue-900/90 px-6 py-3 shadow dark:shadow-gray-900/20 flex items-center justify-between transition-all duration-300">
        <div className="text-xl font-bold text-white flex items-center gap-2">
          MealMate
        </div>
        {user ? (
          <Navigation items={userNavItems} />
        ) : (
          <Navigation items={navItems} />
        )}

        <div className="flex gap-2">
          <button
            className="px-4 py-2 rounded-full border bg-[#f9fafb] border-pink-500 text-rose-400 font-medium
           hover:scale-105 hover:shadow-md transition-transform duration-300
           dark:bg-gray-700/90 dark:border-gray-700/90 dark:text-[#f9fafb]"
          >
            Sign Up
          </button>

          <button
            className="px-4 py-2 rounded-full bg-pink-400 text-white font-medium
           hover:scale-105 hover:shadow-md transition-transform duration-300
           dark:bg-purple-600 dark:text-[#f9fafb]"
          >
            Sign In
          </button>
        </div>

        <SwitchThemeButton />
      </header>
    </>
  );
}

export default NavBar;
