import { useContext, useEffect, useState } from "react";
import { apiClient, authClient } from "../../hook/api";
import type { Meal, Participant } from "../../types";
import MealCard from "../../components/Meal/MealCard";
import { AppContext } from "../../context/AppContext";
import ErrorToast from "../../components/Modal/ErrorToast";
import SuccessToast from "../../components/Modal/SuccessfulToast";
import ButtonFactory from "../../components/Button/ButtonFactory";
import { useNavigate } from "react-router-dom";

function MealDashboard() {
  type MealWithParticipants = Meal & { participants: Participant[] } & {
    isJoined: boolean;
  } & { isHost: boolean } & { chartRoomId: number };

  const { setLoading, user, setPendingId } = useContext(AppContext);
  const [meals, setMeals] = useState<MealWithParticipants[]>([]);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const fetchMeals = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get("/meal");

      const mealsData = response.data;

      const meals = mealsData.map((meal: MealWithParticipants) => ({
        ...meal,
        isJoined: user
          ? meal.participants.some((p) => p.userId === user.uid)
          : false,
        isHost: user ? meal.hostId === user.uid : false,
      }));
      console.log(meals);

      setMeals(meals);
    } catch (error) {
      console.log("Error of fetching meals:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleJoin = async (mid: number) => {
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
      setShowSuccess(true);
    } catch (error) {
      console.log("Error in joining the meal: ", error);
    }
  };

  const handleLeave = async (mid: number) => {
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

  const handleDelete = async (mid: number) => {
    if (!user) {
      return;
    }

    try {
      const response = await authClient.delete(`/meal/${mid}`);
      if (!response) {
        console.log("Cannot not delete");
      }
      console.log("Delete meal");

      fetchMeals();
    } catch (error) {
      console.log("Error in deleting: ", error);
    }
  };

  const handleMessage = async (chatRoomId: number) => {
    setPendingId(chatRoomId);
    navigate("/messages");
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
            {meals.map((meal) => {
              const buttons = [
                meal.isHost ? (
                  <ButtonFactory
                    key="delete"
                    type="delete"
                    message="Delete"
                    onClick={() => handleDelete(meal.mid)}
                    disabled={false}
                  />
                ) : meal.isJoined ? (
                  <ButtonFactory
                    key="leave"
                    type="leave"
                    message="Leave"
                    onClick={() => handleLeave(meal.mid)}
                  />
                ) : (
                  <ButtonFactory
                    key="join"
                    type="join"
                    message="Join"
                    onClick={() => handleJoin(meal.mid)}
                  />
                ),
                <ButtonFactory
                  key="message"
                  type="message"
                  message="Message"
                  onClick={() => handleMessage(meal.chartRoomId)}
                />,
              ];

              return <MealCard key={meal.mid} meal={meal} buttons={buttons} />;
            })}
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

      {showSuccess && (
        <SuccessToast
          message="Successful Join the meal"
          onClose={() => setShowSuccess(false)}
        />
      )}
    </>
  );
}

export default MealDashboard;
