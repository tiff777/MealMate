import FeaturedMealCard from "./FearturedMeal";
import type { Meal } from "../../types";
import { useNavigate } from "react-router-dom";
function MealMeetingSection({ meals }: { meals: Meal[] }) {
  const navigate = useNavigate();

  return (
    <section id="meals" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Upcoming Meal Meetings
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Join these exciting meal meetings happening around campus
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {meals &&
            meals.map((meal, i) => <FeaturedMealCard meal={meal} key={i} />)}
        </div>

        <div className="text-center mt-12">
          <button
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-full font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-200 transform hover:scale-105"
            onClick={() => navigate("/meal")}
          >
            View All Meal Meetings
          </button>
        </div>
      </div>
    </section>
  );
}

export default MealMeetingSection;
