import type { Meal } from "../../types";
import { FiMapPin, FiUser } from "react-icons/fi";
import { FaCalendarAlt } from "react-icons/fa";
import formatDate from "../../util/dateUtils";
import JoinButton from "../Button/JoinButton";
import TagDisplay from "../UI/TagDisplay";
import MealParticipantAvatar from "./MealParticipantAvatar";
import MealStatus from "./MealStatus";
import TagListDisplay from "../UI/TagListDisplay";
import { useRef, useState, useEffect } from "react";

function MealCard({
  meal,
  buttons,
}: {
  meal: Meal;
  buttons: React.ReactNode[];
}) {
  const [layout, setLayout] = useState<"compact" | "spacious">("compact");
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateLayout = () => {
      if (!cardRef.current) return;

      const cardWidth = cardRef.current.offsetWidth;

      // 根據卡片寬度決定佈局
      if (cardWidth >= 350) {
        setLayout("spacious");
      } else {
        setLayout("compact");
      }
    };

    updateLayout();

    const resizeObserver = new ResizeObserver(updateLayout);
    if (cardRef.current) {
      resizeObserver.observe(cardRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/30 overflow-hidden hover:shadow-2xl dark:hover:shadow-gray-900/50 transition-all duration-300 transform hover:scale-[1.02] cursor-pointer w-full">
      <div className="absolute top-0 left-0 right-0 h-1 rounded-t-xl bg-gradient-to-r from-[#FF7F7F] to-[#FFA07A] dark:from-[#0F0F23] dark:via-[#1A1A2E] dark:to-[#16213E]"></div>
      <div className="p-6">
        {/* Header section */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-300 leading-tight">
              {meal.title}
            </h2>
          </div>
          <MealStatus status={meal.status} />
        </div>

        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2 leading-relaxed break-words min-h-[3em]">
          {meal.description}
        </p>

        {/* Info section with icons */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <FaCalendarAlt className="w-4 h-4 text-orange-500" />
            <span>{formatDate(new Date(meal.mealDate))}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <FiMapPin className="w-4 h-4 text-orange-500" />
            <span className="truncate">{meal.restaurantName}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <FiMapPin className="w-4 h-4 text-orange-500" />
            <span className="truncate text-xs">{meal.restaurantAddress}</span>
          </div>
        </div>

        {/* Tags section */}
        {meal.tags.length > 0 && (
          <div className="flex gap-1 mt-2 flex-wrap">
            <TagListDisplay tags={meal.tags} />
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-4 sm:mt-0">
          {/* 左邊：avatars + count */}
          <div className="flex items-center space-x-3">
            {/* avatar stack */}
            <div className="flex -space-x-2">
              {meal.participants
                .slice(0, Math.min(3, meal.maxParticipant))
                .map((p) => (
                  <div key={p.userId} className="relative">
                    <MealParticipantAvatar
                      userId={p.userId}
                      avatar={p.avatar}
                    />
                  </div>
                ))}
              {meal.participants.length > 3 && (
                <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-xs font-medium text-gray-600 dark:text-gray-300 border-2 border-white dark:border-gray-800">
                  +{meal.participants.length - 3}
                </div>
              )}
            </div>

            {/* count */}
            <div className="flex items-center space-x-1">
              <FiUser className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {meal.currentParticipant}/{meal.maxParticipant}
              </span>
            </div>
          </div>

          {(layout === "compact" || window.innerWidth < 640) && (
            <div className="flex gap-2">
              {buttons.map((button, index) => (
                <div key={index}>{button}</div>
              ))}
            </div>
          )}

          {layout === "spacious" && (
            <div className="hidden sm:flex gap-2">
              {buttons.map((button, index) => (
                <div key={index}>{button}</div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MealCard;
