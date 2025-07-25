import { useState } from "react";
import { FiX } from "react-icons/fi";
import { IoIosPricetags } from "react-icons/io";
import CurrentTimeCard from "../UI/CurrentTimeCard";
import SmallGroupTagDisplay from "../UI/SmallGroupTagDisplay";
import LargeGroupTagDisplay from "../UI/LargeGroupTagDisplay";
import SearchBar from "../UI/SearchBar";

interface FilterState {
  interest: string;
  cuisine: string;
  searchText?: string;
}

interface MealFilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onFilterChange: (filterType: string, value: string) => void;

  interests?: string[];
  cuisines?: string[];
  className?: string;
}

export const DUMMY_INTERESTS = [
  "Programming",
  "Food Photography",
  "Rock Climbing",
  "Board Games",
  "Cooking",
  "Travel",
  "React",
  "Gaming",
  "Anime",
  "Photography",
  "UI/UX",
  "Coffee",
  "Art",
  "Music",
  "Medicine",
  "Fitness",
  "Languages",
  "Startup",
  "Investing",
  "Basketball",
  "Networking",
  "Engineering",
  "Movies",
  "Hiking",
];

export const DUMMY_CUISINES = [
  "Korean",
  "Japanese",
  "Italian",
  "Mexican",
  "Chinese",
  "Healthy",
  "Western",
  "Coffee",
  "Fast Food",
  "Asian",
  "Adventure",
  "Indian",
];

function BuddyFilterSidebar({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  interests = DUMMY_INTERESTS,
  cuisines = DUMMY_CUISINES,
  className = "",
}: MealFilterSidebarProps) {
  const [searchValue, setSearchValue] = useState(filters.searchText || "");

  const clearAllFilters = () => {
    onFilterChange("interest", "");
    onFilterChange("cuisine", "");
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.interest !== "") count++;
    if (filters.cuisine !== "") count++;
    if (filters.searchText) count++;
    return count;
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 bg-opacity-50 z-20 lg:hidden transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      <div
        className={`
    ${isOpen ? "translate-x-0" : "-translate-x-full"} 
    lg:translate-x-0 
    fixed lg:static
    top-0 left-0 z-30 lg:z-auto w-80 lg:w-72 h-full lg:h-auto
    transition-transform duration-300 ease-in-out
    ${className}
  `}
      >
        <div
          className={`
    h-full overflow-y-auto
    bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700
    p-6 pb-24 transition-colors duration-300 scrollbar-hide
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
              🎯 Find Your Buddy
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
            placeholder="Search Users..."
          />

          {/* Interests Tags */}
          <LargeGroupTagDisplay
            title="Interests"
            icon={<IoIosPricetags />}
            filterKey="interest"
            value={filters.interest}
            onFilterChange={onFilterChange}
            options={interests.map((interest) => ({
              key: interest,
              label: interest,
            }))}
          />

          {/* Cuisine Tags */}
          <LargeGroupTagDisplay
            title="Preferred Cuisines"
            icon={<IoIosPricetags />}
            filterKey="cuisine"
            value={filters.cuisine}
            onFilterChange={onFilterChange}
            options={cuisines.map((cuisine) => ({
              key: cuisine,
              label: cuisine,
            }))}
          />
        </div>
      </div>
    </>
  );
}

export default BuddyFilterSidebar;
