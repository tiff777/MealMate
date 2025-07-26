import React from "react";
import MobileFilterButton from "../Button/MobileFilterButton";

interface PageHeaderProps {
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  onFilterClick: () => void;
  activeFiltersCount?: number;
  borderType?: "bottom" | "bottomAccent";
}

function PageHeader({
  icon,
  title,
  subtitle,
  onFilterClick,
  activeFiltersCount = 0,
  borderType = "bottom",
}: PageHeaderProps) {
  const borderClass =
    borderType === "bottomAccent"
      ? "border-b-2 border-orange-200 dark:border-orange-700/50"
      : "border-b border-gray-200 dark:border-gray-700";

  return (
    <div className={`bg-white dark:bg-gray-800 ${borderClass} p-4`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <MobileFilterButton
            onClick={onFilterClick}
            activeFiltersCount={activeFiltersCount}
          />

          <div className="flex items-center gap-3">
            {icon && (
              <span className="text-2xl text-orange-500 dark:text-orange-400">
                {icon}
              </span>
            )}

            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                {title}
              </h1>

              {subtitle && (
                <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  <span>{subtitle}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageHeader;
