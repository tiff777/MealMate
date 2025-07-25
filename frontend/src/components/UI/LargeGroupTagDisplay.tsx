import React, { useMemo, useState } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import SearchBar from "./SearchBar";

export interface Option {
  key: string;
  label: string;
  icon?: React.ReactNode | string;
}

interface LargeGroupTagDisplayProps {
  title: string;
  icon?: React.ReactNode;
  filterKey: string;
  value: string;
  options: Option[];
  onFilterChange: (key: string, value: string) => void;
}

function LargeGroupTagDisplay({
  title,
  icon,
  filterKey,
  value,
  options,
  onFilterChange,
}: LargeGroupTagDisplayProps) {
  const [search, setSearch] = useState("");

  const showSearch = options.length > 8;

  const filteredOptions = useMemo(() => {
    const lower = search.trim().toLowerCase();
    if (!lower) {
      return options.slice(0, 8);
    }
    return options.filter((opt) => opt.label.toLowerCase().includes(lower));
  }, [search, options]);

  return (
    <div className="mb-6">
      <h4 className="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300 flex items-center">
        {icon && <span className="mr-2">{icon}</span>}
        {title}
      </h4>

      {showSearch && (
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder={`Search ${title}...`}
        />
      )}

      <div className="flex flex-wrap gap-2">
        {filteredOptions.map((opt) => (
          <button
            key={opt.key}
            onClick={() => onFilterChange(filterKey, opt.key)}
            className={`px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105 ${
              value === opt.key
                ? "bg-gradient-to-r from-orange-400 to-red-500  dark:from-gray-600 dark:to-gray-700 text-white shadow-md border dark:border-gray-500"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-700/70 dark:hover:bg-gray-600/70 dark:text-gray-200 border border-transparent dark:border-gray-600/50 hover:border-gray-300 dark:hover:border-gray-500"
            }`}
          >
            {opt.icon && <span className="mr-2">{opt.icon}</span>}
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default LargeGroupTagDisplay;
