import { useContext, useEffect, useState } from "react";
import { apiClient, authClient } from "../../hook/api";
import type { MealWithParticipants } from "../../types";
import MealCard from "../../components/Meal/MealCard";
import { AppContext } from "../../context/AppContext";
import MealFilterSidebar from "../../components/Meal/MenuFilter";
import { useFilteredMeals } from "../../hook/useFilteredMeals";
import { useMealButtons } from "../../hook/useMealButtons";
import { useNavigate } from "react-router-dom";
import { LuUtensilsCrossed } from "react-icons/lu";
import PageHeader from "../../components/UI/PageHeader";

function MealDashboard() {
  const { setLoading, user, setPendingId, showError, showSuccess } =
    useContext(AppContext);
  const [meals, setMeals] = useState<MealWithParticipants[]>([]);

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

      const mealsData = response.data.meals || response.data;

      const meals = mealsData.map((meal: MealWithParticipants) => ({
        ...meal,
        isJoined: user
          ? meal.participants.some((p) => p.userId === user.uid)
          : false,
        isHost: user ? meal.hostId === user.uid : false,
      }));

      setMeals(meals);
    } catch (error) {
      showError(`Error of fetching meals: ${error}`);
    }
  };

  const handleJoin = async (mid: number) => {
    if (!user) {
      showError("Please login for joining the meal");
      return;
    }
    try {
      const response = await authClient.post(`/participant/join/${mid}`);
      if (response.status !== 200) {
        showError("Cannot join");
        return;
      }

      fetchMeals();
      showSuccess("Successful join the meal");
    } catch (error) {
      showError(`Error in joining meals: ${error}`);
    }
  };

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
      showSuccess("Successful for leaving the meal");
      fetchMeals();
    } catch (error) {
      showError(`Error in leaving meals: ${error}`);
    }
  };

  const handleDelete = async (mid: number) => {
    if (!user) {
      return;
    }

    try {
      const response = await authClient.delete(`/meal/${mid}`);
      if (response.status !== 200) {
        showError("Cannot not delete");
      }
      showSuccess("Delete meal successful");
      fetchMeals();
    } catch (error) {
      showError(`Error in deleting meals: ${error}`);
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
          <PageHeader
            title="Find Meal"
            subtitle="Share good food. Make great connections"
            icon={<LuUtensilsCrossed className="w-6 h-6" />}
            onFilterClick={() => setSidebarOpen(true)}
            activeFiltersCount={getActiveFiltersCount()}
            borderType="bottomAccent"
          />

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
    </>
  );
}

export default MealDashboard;
