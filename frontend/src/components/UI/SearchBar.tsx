import { HiMagnifyingGlass } from "react-icons/hi2";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
}: SearchBarProps) {
  return (
    <div className={`mb-6 ${className}`}>
      <label htmlFor="search-bar" className="sr-only">
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <HiMagnifyingGlass />
        </div>
        <input
          type="search"
          id="search-bar"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}

export default SearchBar;
