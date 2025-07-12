import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import SwitchThemeButton from "../Button/SwitchThemeButton";
import Navigation from "./Navigation";
import NavButton from "../Button/NavButton";
import { AppContext } from "../../context/AppContext";

function NavBar() {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();

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

        {user ? <span>Welcome {user.name}</span> : <span>Guest</span>}

        {user ? (
          <NavButton
            label="Logout"
            variant="outlined"
            onClick={() => navigate("/")}
          />
        ) : (
          <div className="flex gap-2">
            <NavButton
              label="Sign Up"
              variant="outlined"
              onClick={() => navigate("/register")}
            />
            <NavButton label="Sign In" onClick={() => navigate("/login")} />
          </div>
        )}

        <SwitchThemeButton />
      </header>
    </>
  );
}

export default NavBar;
