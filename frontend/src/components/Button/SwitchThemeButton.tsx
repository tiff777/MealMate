import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { FiMoon } from "react-icons/fi";
import { FiSun } from "react-icons/fi";

function SwitchThemeButton() {
  const { toggleDarkMode } = useContext(AppContext);

  return (
    <>
      <button
        onClick={toggleDarkMode}
        className={`
         relative inline-flex items-center justify-center
         w-12 h-12 rounded-full
         bg-white/20 dark:bg-gray-700
         hover:bg-white/30 dark:hover:bg-gray-600
         transition-all duration-300 ease-in-out
         focus:outline-none focus:ring-2 focus:ring-orange-400 dark:focus:ring-orange-300 focus:ring-offset-2
         shadow-md hover:shadow-lg
       `}
      >
        <div className="relative w-6 h-6">
          {/* Sun Icon */}
          <FiSun
            className="
             absolute inset-0 w-6 h-6
             text-white
             transition-all duration-300 ease-in-out transform
             opacity-100 rotate-90 scale-0
             dark:opacity-0 rotate-0 scale-100
           "
          />

          {/* Moon Icon */}
          <FiMoon
            className="
             absolute inset-0 w-6 h-6
             text-blue-400
             transition-all duration-300 ease-in-out transform
             opacity-0 rotate-0 scale-100
             dark:opacity-100 -rotate-90 scale-0
           "
          />
        </div>
      </button>
    </>
  );
}

export default SwitchThemeButton;
