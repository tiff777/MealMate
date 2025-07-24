import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiUser, FiSettings, FiChevronDown, FiLogOut } from "react-icons/fi";
import { FaUtensils } from "react-icons/fa";
import type { User } from "../../types";
import UserAvatar from "../User/UserAvatar";

interface DropdownItem {
  label: string;
  icon: React.ReactNode;
  action: () => void;
}

interface UserDropdownProps {
  user: User;
  onLogout: () => void;
  className?: string;
}

function UserNavIcon({ user, onLogout, className = "" }: UserDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const dropdownItems: DropdownItem[] = [
    {
      label: "Profile",
      icon: <FiUser className="w-4 h-4" />,
      action: () => {
        navigate(`/profile/${user.uid}`);
        setIsOpen(false);
      },
    },
    {
      label: "Settings",
      icon: <FiSettings className="w-4 h-4" />,
      action: () => {
        navigate("/setting");
        setIsOpen(false);
      },
    },
    {
      label: "My Meals",
      icon: <FaUtensils className="w-4 h-4" />,
      action: () => {
        navigate("/my-meals");
        setIsOpen(false);
      },
    },
    {
      label: "Sign out",
      icon: <FiLogOut className="w-4 h-4" />,
      action: () => {
        onLogout();
        setIsOpen(false);
      },
    },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close dropdown on escape key
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen]);

  const getUserInitials = (name: string): string => {
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase())
      .slice(0, 2)
      .join("");
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className={`relative ${className}`} ref={dropdownRef}>
        {/* User Avatar Button */}
        <button
          type="button"
          onClick={toggleDropdown}
          className="flex items-center text-sm bg-white dark:bg-gray-700 rounded-full md:me-0 focus:ring-4 focus:ring-orange-300 dark:focus:ring-orange-600 hover:ring-4 hover:ring-orange-200 dark:hover:ring-orange-700 transition-all duration-200 group"
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          <span className="sr-only">Open user menu</span>

          {/* Avatar */}
          <div className="relative">
            {user.avatar ? (
              <UserAvatar
                avatar={user.avatar}
                isOnline={user.isOnline}
                userId={user.uid}
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-400 to-red-400 flex items-center justify-center text-white font-semibold text-sm">
                {getUserInitials(user.name)}
              </div>
            )}
          </div>
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <>
            {/* Backdrop for mobile */}
            <div
              className="fixed inset-0 z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown Content */}
            <div className="z-50 absolute right-0 mt-2 w-56 text-base list-none bg-white divide-y divide-gray-100 rounded-xl shadow-lg dark:bg-gray-700 dark:divide-gray-600 border border-gray-200 dark:border-gray-600 animate-in slide-in-from-top-2 duration-200">
              {/* User Info Header */}
              <div className="px-4 py-3 bg-gradient-to-r from-orange-50 to-red-50 dark:from-gray-600 dark:to-gray-600 rounded-t-xl">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    {user.avatar ? (
                      <UserAvatar
                        avatar={user.avatar}
                        isOnline={user.isOnline}
                        userId={user.uid}
                        size="sm"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-400 to-red-400 flex items-center justify-center text-white font-semibold">
                        {getUserInitials(user.name)}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="block text-sm font-semibold text-gray-900 dark:text-white truncate">
                      {user.name}
                    </span>
                    <span className="block text-sm text-gray-500 dark:text-gray-400 truncate">
                      {user.email}
                    </span>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <ul className="py-2">
                {dropdownItems.map((item, index) => (
                  <li key={index}>
                    <button
                      onClick={item.action}
                      className={
                        "flex items-center w-full px-4 py-2 text-sm transition-colors duration-200 text-gray-700 hover:bg-orange-50 dark:text-gray-200 dark:hover:bg-gray-600"
                      }
                    >
                      <span className="mr-3 flex-shrink-0">{item.icon}</span>
                      <span>{item.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default UserNavIcon;
