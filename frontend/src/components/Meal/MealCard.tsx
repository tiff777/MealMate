import type { Meal } from "../../types";
import formatDate from "../../util/dateUtils";
import JoinButton from "../Button/JoinButton";
import MealParticipantAvatar from "./MealParticipantAvatar";
import MealStatus from "./MealStatus";

function MealCard({ meal }: { meal: Meal }) {
  return (
    <div
      className={`relative bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-900/20 p-4 dark:border-gray-700 space-y-2 transition-colors overflow-hidden`}
    >
      <div className="absolute top-0 left-0 right-0 h-1 rounded-t-xl bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 dark:from-pink-500/30 dark:via-purple-500/30 dark:to-blue-500/30"></div>
      <div className="flex justify-between items-start">
        <h2 className="font-bold text-lg text-gray-900 dark:text-white">
          {meal.title}
        </h2>
        <MealStatus status={meal.status} />
      </div>

      <div className="flex flex-col text-sm text-gray-500 dark:text-gray-400 gap-1">
        <span>📅 {formatDate(new Date(meal.createdAt))}</span>
        <span>📍 {meal.restaurantName}</span>
        <span className="truncate max-w">📍{meal.restaurantAddress}</span>
      </div>

      <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2 min-h-[3rem]">
        {meal.description}
      </p>

      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
        <div className="flex -space-x-1">
          {meal.participants.slice(0, meal.maxParticipant).map((p) => (
            <MealParticipantAvatar
              key={p.userId}
              userId={p.userId}
              avatar={p.avatar}
            />
          ))}
        </div>
        <span>
          {meal.currentParticipant}/{meal.maxParticipant} joined
        </span>
      </div>

      <div className="flex gap-2">
        <JoinButton />
      </div>
    </div>
  );
}

export default MealCard;
