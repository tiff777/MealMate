import React, { useState } from "react";
import { FiX } from "react-icons/fi";
import { IoIosPricetags } from "react-icons/io";
import { HiMagnifyingGlass } from "react-icons/hi2";
import CurrentTimeCard from "../UI/CurrentTimeCard";

interface FilterState {
  tag: string;
  availability: string;
  searchText?: string;
}

interface MealFilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onFilterChange: (filterType: string, value: string) => void;

  tags?: string[];
  className?: string;
}

const DUMMY_TAGS = [
  "Social",
  "Vegetarian",
  "Friends",
  "Pizza",
  "Morning",
  "Quick Lunch",
  "Welcome",
];

const MealFilterSidebar: React.FC<MealFilterSidebarProps> = ({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  tags = DUMMY_TAGS,
  className = "",
}) => {
  const [searchValue, setSearchValue] = useState(filters.searchText || "");

  const clearAllFilters = () => {
    onFilterChange("searchText", "");
    onFilterChange("tag", "");
    onFilterChange("availability", "all");
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.tag !== "") count++;
    if (filters.availability !== "all") count++;
    if (filters.searchText) count++;
    return count;
  };

  const activeFiltersCount = getActiveFiltersCount();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange("searchText", searchValue);
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      <div
        className={`
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          fixed lg:relative lg:translate-x-0 z-30 w-80 h-screen lg:h-auto 
          transition-transform duration-300 ease-in-out
          ${className}
        `}
      >
        <div
          className={`
            h-full overflow-y-auto
            bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700
            p-6 transition-colors duration-300
          `}
        >
          <div className="lg:hidden flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Filter Criteria
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
            >
              <FiX size={20} />
            </button>
          </div>

          <div className="mb-6">
            <CurrentTimeCard />
          </div>

          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
              🎯 Find Your Lunch
            </h3>
            {activeFiltersCount > 0 && (
              <button
                onClick={clearAllFilters}
                className="text-xs text-orange-500 hover:text-orange-600 font-medium transition-colors"
              >
                Clear ({activeFiltersCount})
              </button>
            )}
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <label htmlFor="default-search" className="sr-only">
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <HiMagnifyingGlass />
              </div>
              <input
                type="search"
                id="default-search"
                value={searchValue}
                onChange={(e) => {
                  setSearchValue(e.target.value);
                  onFilterChange("searchText", e.target.value);
                }}
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="Search Meals..."
              />
            </div>
          </div>

          {/* Meal Tags */}
          <div className="mb-6">
            <h4 className="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300 flex items-center">
              <IoIosPricetags size={16} className="mr-2" />
              Meal Tags
            </h4>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <button
                  key={index}
                  onClick={() => onFilterChange("tag", tag)}
                  className={`p-3 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105 ${
                    filters.tag === tag
                      ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-md transform scale-105"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Status filter */}
          <div className="mb-6">
            <h4 className="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">
              Status
            </h4>
            <div className="space-y-2">
              {[
                { key: "all", label: "All Meals", icon: "🍽️" },
                { key: "available", label: "Available to Join", icon: "✅" },
                { key: "soon", label: "Upcoming", icon: "⏰" },
                { key: "completed", label: "Completed", icon: "📍" },
              ].map((option) => (
                <button
                  key={option.key}
                  onClick={() => onFilterChange("availability", option.key)}
                  className={`w-full flex items-center p-3 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105 ${
                    filters.availability === option.key
                      ? "bg-gradient-to-r from-purple-400 to-pink-400 text-white shadow-md transform scale-105"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200"
                  }`}
                >
                  <span className="mr-3">{option.icon}</span>
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MealFilterSidebar;
