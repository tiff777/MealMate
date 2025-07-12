import React, { useContext } from "react";
import SwitchThemeButton from "../Button/SwitchThemeButton";

function NavBar() {
  return (
    <>
      <header className="bg-gradient-to-r from-rose-400 to-teal-400 dark:from-rose-500 dark:to-teal-500 px-6 py-3 shadow dark:shadow-gray-900/20 flex items-center justify-between transition-all duration-300">
        <div className="text-xl font-bold text-white flex items-center gap-2">
          <img src="/logo.svg" alt="logo" className="w-6 h-6" />
          MealMate
        </div>

        <nav className="flex gap-6 text-sm text-white">
          <button className="hover:underline hover:text-white/90 transition-colors">
            Find Meal
          </button>
          <button className="hover:underline hover:text-white/90 transition-colors">
            Find Buddy
          </button>
          <button className="bg-white/20 hover:bg-white/30 dark:bg-white/25 dark:hover:bg-white/35 px-3 py-1 rounded text-white transition-all duration-200">
            My Meals
          </button>
          <button className="hover:underline hover:text-white/90 transition-colors">
            Messages
          </button>
          <button className="hover:underline hover:text-white/90 transition-colors">
            Profile
          </button>
        </nav>
        <SwitchThemeButton />
      </header>
    </>
  );
}

export default NavBar;
