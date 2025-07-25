import { useContext, useEffect, useState } from "react";
import { apiClient, authClient } from "../../hook/api";
import type { Meal, Participant, MealWithParticipants } from "../../types";
import MealCard from "../../components/Meal/MealCard";
import { AppContext } from "../../context/AppContext";
import ErrorToast from "../../components/Modal/ErrorToast";
import SuccessToast from "../../components/Modal/SuccessfulToast";
import MobileFilterButton from "../../components/Button/MobileFilterButton";
import MealFilterSidebar from "../../components/Meal/MenuFilter";
import { useFilteredMeals } from "../../hook/useFilteredMeals";
import { useMealButtons } from "../../hook/useMealButtons";
import { useNavigate } from "react-router-dom";

function MealDashboard() {
  const { setLoading, user, setPendingId } = useContext(AppContext);
  const [meals, setMeals] = useState<MealWithParticipants[]>([]);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [filters, setFilters] = useState({
    tag: "",
    availability: "all",
    searchText: "",
  });

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

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));

    setSidebarOpen(false);
  };

  const filteredMeals = useFilteredMeals(meals, filters);

  const getMealButtons = useMealButtons({
    onDelete: handleDelete,
    onLeave: handleLeave,
    onJoin: handleJoin,
    onMessage: handleMessage,
  });

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.tag !== "") count++;
    if (filters.availability !== "all") count++;
    if (filters.searchText) count++;
    return count;
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="p-4 bg-gray-150 rounded-xl shadow-md flex gap-4 ">
        <MealFilterSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          filters={filters}
          onFilterChange={handleFilterChange}
        />

        <div className="flex-1 space-y-4">
          <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <MobileFilterButton
                  onClick={() => setSidebarOpen(true)}
                  activeFiltersCount={getActiveFiltersCount()}
                />

                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Find Meal
                </h1>
              </div>
            </div>
          </div>

          {filteredMeals.length === 0 && <p>No meals available</p>}

          {meals.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredMeals.map((meal) => (
                <MealCard
                  key={meal.mid}
                  meal={meal}
                  buttons={getMealButtons(meal)}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              No meals available
            </p>
          )}
        </div>
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
