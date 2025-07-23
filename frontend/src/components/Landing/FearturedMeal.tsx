import type { Meal } from "../../types";
import { useNavigate } from "react-router-dom";
import { FiUsers, FiMapPin, FiClock } from "react-icons/fi";
import formatDate from "../../util/dateUtils";
import RoundButton from "../Button/RoundButton";

function FeaturedMealCard({ meal }: { meal: Meal }) {
  const navigate = useNavigate();
  return (
    <>
      <div
        key={meal.mid}
        className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/30 overflow-hidden hover:shadow-2xl dark:hover:shadow-gray-900/50 transition-all duration-300 transform hover:scale-105 cursor-pointer"
      >
        <div className="p-6">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-300">
            {meal.title}
          </h3>

          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2 min-h-[3em] break-words">
            {meal.description}
          </p>

          <div className="space-y-2 mb-4">
            <div className="flex items-start space-x-2 text-xs text-gray-600 dark:text-gray-400 min-h-[2.5em] line-clamp-2 break-words">
              <FiMapPin className="w-3 h-3 mt-[2px]" />
              <span className="line-clamp-2">{meal.restaurantAddress}</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-400">
              <FiClock className="w-3 h-3" />
              <span>{formatDate(new Date(meal.mealDate))}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FiUsers className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {meal.currentParticipant}/{meal.maxParticipant}
              </span>
            </div>
            <RoundButton
              variant="primary"
              size="xs"
              message="Join"
              onClick={() => navigate("/login")}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default FeaturedMealCard;
