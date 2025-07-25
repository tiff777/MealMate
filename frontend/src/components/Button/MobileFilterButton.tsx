import { FiFilter } from "react-icons/fi";
function MobileFilterButton({
  onClick,
  activeFiltersCount = 0,
}: {
  onClick: () => void;
  activeFiltersCount?: number;
}) {
  return (
    <button
      onClick={onClick}
      className="lg:hidden relative inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
    >
      <FiFilter className="w-4 h-4 text-gray-600 dark:text-gray-300" />
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Filters
      </span>
      {activeFiltersCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
          {activeFiltersCount}
        </span>
      )}
    </button>
  );
}

export default MobileFilterButton;
