import { useState, useContext, useEffect } from "react";
import type { Meal } from "../../types";
import { AppContext } from "../../context/AppContext";
import { authClient } from "../../hook/api";
import MyMealTabNav from "../../components/Meal/MyMealTabNav";
import MealCard from "../../components/Meal/MealCard";
import { useNavigate } from "react-router-dom";
import ButtonFactory from "../../components/Button/ButtonFactory";

function myMealPage() {
  const { setLoading, user } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState<"created" | "joined">("created");
  const [createdMeals, setCreatedMeals] = useState<Meal[]>([]);
  const [joinedMeals, setJoinedMeals] = useState<Meal[]>([]);
  const navigate = useNavigate();

  const fetchMeals = async () => {
    setLoading(true);
    if (!user) {
      console.log("No user cannot enter");
      setLoading(false);
      return;
    }

    try {
      const hostMealResponse = await authClient.get("/meal/hostedmeals");
      if (hostMealResponse) {
        setCreatedMeals(hostMealResponse.data.meals);
      } else {
        setCreatedMeals([]);
      }

      const joinedMealsResponse = await authClient.get(
        `/participant/user/${user.uid}`
      );
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

    const handleLeave = async (mid: string) => {
    if (!user) {
      return;
    }
    try {
      const response = await authClient.delete(`/participant/leave/${mid}`);
      if (!response) {
        console.log("Cannot leave");
        return;
      }
      console.log("Leave meal");
      fetchMeals();
      // setShowSuccess(true);
    } catch (error) {
      console.log("Error in joining the meal: ", error);
    }
  };

  const handleDelete = async (mid: string) => {
    if (!user) {
      return;
    }

    try {
      const response = await authClient.delete(`/meal/${mid}`);
      if (!response) {
        console.log("Cannot not leave");
      }
      console.log("Leave meal");

      fetchMeals();
    } catch (error) {
      console.log("Error in deleting: ", error);
    }
  };

  useEffect(() => {
    fetchMeals();
    console.log("Test hosted meal: ", createdMeals);
  }, []);

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4 border-b pb-2">
        {/* Title */}
        <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-teal-500 text-transparent bg-clip-text">
          My Meals
        </h1>

        {/* Button */}
        <button
          className="
      flex items-center gap-1
      px-4 py-1.5 rounded-full text-sm font-medium text-white
      bg-gradient-to-r from-pink-400 to-teal-400 shadow-sm
      hover:from-pink-500 hover:to-teal-500 transition
    "
          onClick={() => navigate("/create-meals")}
        >
          <span className="text-lg">＋</span> Create New Meal
        </button>
      </div>
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
            {createdMeals.map((meal) => {
              const butttons = [
                <ButtonFactory
                  key="delete"
                  type="delete"
                  message="Delete"
                  onClick={() => handleDelete(meal.mid)}
                  disabled={false}
                />,
              ];
              return <MealCard key={meal.mid} meal={meal} buttons={butttons} />;
            })}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">No meals available</p>
        ))}

      {activeTab === "joined" &&
        (joinedMeals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {joinedMeals.map((meal) => {
              const butttons = [
                <ButtonFactory
                  key="leave"
                  type="leave"
                  message="Leave"
                  onClick={() => handleLeave(meal.mid)}
                />,
              ];
              return <MealCard key={meal.mid} meal={meal} buttons={butttons} />;
            })}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">No meals available</p>
        ))}
    </div>
  );
}

export default myMealPage;
