import { useState, useContext, useEffect } from "react";
import type { Meal } from "../../types";
import { AppContext } from "../../context/AppContext";
import { authClient } from "../../hook/api";
import MyMealTabNav from "../../components/Meal/MyMealTabNav";
import MealCard from "../../components/Meal/MealCard";
import { useNavigate } from "react-router-dom";
import ButtonFactory from "../../components/Button/ButtonFactory";
import RoundButton from "../../components/Button/RoundButton";
import DeleteModal from "../../components/Modal/DeleteModal";

function myMealPage() {
  const { setLoading, user, setPendingId, showError } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState<"created" | "joined">("created");
  const [createdMeals, setCreatedMeals] = useState<Meal[]>([]);
  const [joinedMeals, setJoinedMeals] = useState<Meal[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [mealToDelete, setMealToDelete] = useState<Meal | null>(null);
  const navigate = useNavigate();

  // Fetch both created and joined meals
  const fetchMeals = async () => {
    setLoading(true);
    if (!user) {
      showError("No user cannot enter");
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
      showError(`Error in fetching meals: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  // Handle leave meal action
  const handleLeave = async (mid: number) => {
    if (!user) {
      return;
    }
    try {
      const response = await authClient.delete(`/participant/leave/${mid}`);
      if (response.status !== 200) {
        showError("Cannot leave");
        return;
      }

      fetchMeals();
    } catch (error) {
      showError(`Error in joining the meal: ${error}`);
    }
  };

  // Handle delete meal action
  const handleDelete = async (mid: number) => {
    if (!user) {
      return;
    }

    try {
      const response = await authClient.delete(`/meal/${mid}`);
      if (response.status !== 200) {
        showError("Cannot leave");
        return;
      }

      setShowDeleteModal(false);

      fetchMeals();
    } catch (error) {
      showError(`Error in joining the meal: ${error}`);
    }
  };

  // Navigate to chatroom for a meal
  const handleMessage = (roomId: number) => {
    setPendingId(roomId);
    navigate("/messages");
  };

  // Load data on first render
  useEffect(() => {
    fetchMeals();
  }, []);

  return (
    <>
      <div className="p-4">
        <div className="flex items-center justify-between mb-4 border-b pb-2">
          {/* Title */}
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              My Meal
            </h1>
          </div>

          {/* Button */}
          <RoundButton
            size="sm"
            message="+  Create New Meal"
            onClick={() => navigate("/create-meals")}
          />
        </div>

        {/* Tab Navigation */}
        <div>
          <MyMealTabNav
            createLength={createdMeals.length}
            joinedLength={joinedMeals.length}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>

        {/* Created Meals View */}
        {activeTab === "created" &&
          (createdMeals.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {createdMeals.map((meal) => {
                const butttons = [
                  <ButtonFactory
                    key="delete"
                    type="delete"
                    message="Delete"
                    // onClick={() => handleDelete(meal.mid)}
                    onClick={() => {
                      setMealToDelete(meal);
                      setShowDeleteModal(true);
                    }}
                    disabled={false}
                  />,
                  <ButtonFactory
                    key="edit"
                    type="edit"
                    message="Modify"
                    onClick={() => navigate(`/update-meal/${meal.mid}`)}
                    disabled={false}
                  />,
                  <ButtonFactory
                    key="message"
                    type="message"
                    message="Message"
                    onClick={() => handleMessage(meal.chatRoomId)}
                    disabled={false}
                  />,
                ];
                return (
                  <MealCard key={meal.mid} meal={meal} buttons={butttons} />
                );
              })}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              No meals available
            </p>
          ))}

        {/* Joined Meals View */}
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
                  <ButtonFactory
                    key="message"
                    type="message"
                    message="Message"
                    onClick={() => handleMessage(meal.chatRoomId)}
                    disabled={false}
                  />,
                ];
                return (
                  <MealCard key={meal.mid} meal={meal} buttons={butttons} />
                );
              })}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              No meals available
            </p>
          ))}
      </div>
      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => {
          if (mealToDelete) {
            handleDelete(mealToDelete.mid);
          }
        }}
        title={`Are you sure you want to delete "${mealToDelete?.title}"?`}
      />
    </>
  );
}

export default myMealPage;
