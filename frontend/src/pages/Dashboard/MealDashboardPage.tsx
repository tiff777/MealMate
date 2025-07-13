import { useContext, useEffect, useState } from "react";
import { apiClient, authClient } from "../../hook/api";
import type { Meal, Participant } from "../../types";
import MealCard from "../../components/Meal/MealCard";
import { AppContext } from "../../context/AppContext";
import ErrorToast from "../../components/Modal/ErrorToast";

function MealDashboard() {
  type MealWithParticipants = Meal & { participants: Participant[] };

  const { setLoading, user } = useContext(AppContext);
  const [meals, setMeals] = useState<MealWithParticipants[]>([]);
  const [showError, setShowError] = useState(false);

  console.log("User in MealDashboard:", user);

  const fetchMeals = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get("/meal");
      console.log("Test response: ", response);

      const meals = response.data;
      console.log(meals);

      const mealsWithParticipants = await Promise.all(
        meals.map(async (meal: Meal) => {
          const res = await apiClient.get(`/participant/meal/${meal.mid}`);
          return {
            ...meal,
            participants: res.data,
          };
        })
      );

      setMeals(mealsWithParticipants);

      console.log(mealsWithParticipants);
    } catch (error) {
      console.log("Error of fetching meals:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleJoin = async (mid: string) => {
    if (!user) {
      setShowError(true);
      return;
    }
    try {
      const response = await authClient.post(`/participant/join/${mid}`);
      if (!response) {
        console.log("Cannot join");
        return;
      }
      console.log("Join meal");
      fetchMeals();
    } catch (error) {
      console.log("Error in joining the meal: ", error);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  return (
    <>
      <div className="p-4 space-y-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Meal Dashboard
        </h1>

        {meals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {meals.map((meal) => (
              <MealCard key={meal.mid} meal={meal} onJoin={handleJoin} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">No meals available</p>
        )}
      </div>
      {showError && (
        <ErrorToast
          message={"Need login to join"}
          onClose={() => setShowError(false)}
        />
      )}
    </>
  );
}

export default MealDashboard;
