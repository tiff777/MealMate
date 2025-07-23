import MealCard from "../Meal/MealCard";
import RoundButton from "../Button/RoundButton";
import { FiArrowRight } from "react-icons/fi";
import type { Meal } from "../../types";
function HeroSection({
  currentMeal,
  latestMeals,
  currentMealIndex,
  setCurrentMealIndex,
  navigate,
}: {
  currentMeal: Meal;
  latestMeals: Meal[];
  currentMealIndex: number;
  setCurrentMealIndex: React.Dispatch<React.SetStateAction<number>>;
  navigate: (path: string) => void;
}) {
  return (
    <>
      <section className="relative overflow-hidden py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-5xl lg:text-6xl font-bold text-gray-800 dark:text-white leading-tight">
                  Share Meals,
                  <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                    {" "}
                    Share Knowledge
                  </span>
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                  Connect with fellow university students for study sessions,
                  networking, and friendship over delicious meals. Make every
                  bite count!
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="group bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-orange-600 hover:to-red-600 transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2">
                  <span>Start Connecting</span>
                  <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
                <button className="border-2 border-orange-500 text-orange-500 dark:text-orange-400 px-8 py-4 rounded-full font-semibold text-lg hover:bg-orange-500 hover:text-white dark:hover:bg-orange-500 dark:hover:text-white transition-all duration-200 transform hover:scale-105">
                  Browse Meals
                </button>
              </div>
            </div>

            {/* Right Content - Featured Meal Card */}
            <div className="relative">
              <MealCard
                meal={currentMeal}
                buttons={[
                  <RoundButton
                    key="join"
                    variant="primary"
                    size="xs"
                    message="Join"
                    onClick={() => navigate("/login")}
                  />,
                ]}
              />

              {/* Meal Navigation Dots */}
              <div className="flex justify-center space-x-2 mt-6">
                {latestMeals.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentMealIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${
                      index === currentMealIndex
                        ? "bg-orange-500 scale-125"
                        : "bg-gray-300 dark:bg-gray-600 hover:bg-orange-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-orange-200 dark:bg-orange-900 rounded-full opacity-50 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-red-200 dark:bg-red-900 rounded-full opacity-50 animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-pink-200 dark:bg-pink-900 rounded-full opacity-50 animate-ping"></div>
      </section>
    </>
  );
}

export default HeroSection;
