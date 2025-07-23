import React, { useState } from "react";
import { FiX } from "react-icons/fi";
import { IoIosPricetags } from "react-icons/io";
import { HiMagnifyingGlass } from "react-icons/hi2";
import CurrentTimeCard from "../UI/CurrentTimeCard";
import SmallGroupTagDisplay from "../UI/SmallGroupTagDisplay";
import LargeGroupTagDisplay from "../UI/LargeGroupTagDisplay";
import SearchBar from "../UI/SearchBar";

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

function MealFilterSidebar({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  tags = DUMMY_TAGS,
  className = "",
}: MealFilterSidebarProps) {
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
          <SearchBar
            value={searchValue}
            onChange={(val) => {
              setSearchValue(val);
              onFilterChange("searchText", val);
            }}
            placeholder="Search Meals..."
          />

          {/* Meal Tags */}
          <LargeGroupTagDisplay
            title="Meal Tags"
            icon={<IoIosPricetags />}
            filterKey="tag"
            value={filters.tag}
            onFilterChange={onFilterChange}
            options={tags.map((tag) => ({ key: tag, label: tag }))}
          />

          {/* Status filter */}
          <SmallGroupTagDisplay
            title="Status"
            filterKey="availability"
            value={filters.availability}
            onFilterChange={onFilterChange}
            options={[
              { key: "all", label: "All Meals", icon: "🍽️" },
              { key: "available", label: "Available to Join", icon: "✅" },
              { key: "soon", label: "Upcoming", icon: "⏰" },
              { key: "completed", label: "Completed", icon: "📍" },
            ]}
          />
        </div>
      </div>
    </>
  );
}

export default MealFilterSidebar;
