import { useState, useContext, useEffect } from "react";
import type { Meal } from "../../types";
import { AppContext } from "../../context/AppContext";
import { authClient } from "../../hook/api";
import MyMealTabNav from "../../components/Meal/MyMealTabNav";
import MealCard from "../../components/Meal/MealCard";

function myMealPage() {
  const { setLoading, user } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState<"created" | "joined">("created");
  const [createdMeals, setCreatedMeals] = useState<Meal[]>([]);
  const [joinedMeals, setJoinedMeals] = useState<Meal[]>([]);

  const fetchMeals = async () => {
    setLoading(true);
    if (!user) {
      console.log("No user cannot enter");
      setLoading(false);
      return;
    }

    try {
      const hostMealResponse = await authClient.get("/meal/hostedmeals");
      console.log("Test join response: ", hostMealResponse);
      if (hostMealResponse) {
        setCreatedMeals(hostMealResponse.data.meals);
      } else {
        setCreatedMeals([]);
      }

      const joinedMealsResponse = await authClient.get(
        `/participant/user/${user.uid}`
      );
      console.log("Test join response: ", joinedMealsResponse);

      if (joinedMealsResponse) {
        setJoinedMeals(joinedMealsResponse.data);
      } else {
        setJoinedMeals([]);
      }
    } catch (error) {
      console.log("Error in fetching meals: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Meals</h1>

      <div>
        <MyMealTabNav
          createLength={createdMeals.length}
          joinedLength={joinedMeals.length}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>

      {/* Content */}
      {activeTab === "created" &&
        (createdMeals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {createdMeals.map((meal) => (
              <MealCard
                key={meal.mid}
                meal={meal}
                onJoin={() => console.log("Test")}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">No meals available</p>
        ))}

      {activeTab === "joined" &&
        (joinedMeals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {joinedMeals.map((meal) => (
              <MealCard
                key={meal.mid}
                meal={meal}
                onJoin={() => console.log("Test")}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">No meals available</p>
        ))}
    </div>
  );
}

export default myMealPage;
