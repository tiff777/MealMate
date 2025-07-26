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
import DeleteModal from "../../components/Modal/DeleteModal";

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

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [mealToDelete, setMealToDelete] = useState<MealWithParticipants | null>(
    null
  );

  const navigate = useNavigate();

  // Fetch all meals from API
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

  // Join a meal
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

  // Leave a meal
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

  // Delete a meal (for host)
  const handleDelete = async (mid: number) => {
    if (!user) {
      return;
    }

    try {
      const response = await authClient.delete(`/meal/${mid}`);
      if (response.status !== 200) {
        showError("Cannot not delete");
      }
      setShowDeleteModal(false);
      showSuccess("Delete meal successful");
      fetchMeals();
    } catch (error) {
      showError(`Error in deleting meals: ${error}`);
    }
  };

  // Go to chatroom related to meal
  const handleMessage = async (chatRoomId: number) => {
    setPendingId(chatRoomId);
    navigate("/messages");
  };

  // Handle filter sidebar changes
  const handleFilterChange = (filterType: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));

    setSidebarOpen(false);
  };

  // Filtered meals based on tag, availability, and search text
  const filteredMeals = useFilteredMeals(meals, filters);

  // Button handlers for join, leave, delete, message
  const getMealButtons = useMealButtons({
    onDelete: (mid) => {
      const targetMeal = meals.find((m) => m.mid === mid);
      if (targetMeal) {
        setMealToDelete(targetMeal);
        setShowDeleteModal(true);
      }
    },
    onLeave: handleLeave,
    onJoin: handleJoin,
    onMessage: handleMessage,
  });

  // Calculate number of active filters (for badge)
  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.tag !== "") count++;
    if (filters.availability !== "all") count++;
    if (filters.searchText) count++;
    return count;
  };

  // Initial fetch
  useEffect(() => {
    fetchMeals();
  }, []);

  // Auto-close sidebar on small screens
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
        {/* Sidebar */}
        <MealFilterSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          filters={filters}
          onFilterChange={handleFilterChange}
        />

        {/* Main content */}
        <div className="flex-1 space-y-4">
          <PageHeader
            title="Find Meal"
            subtitle="Share good food. Make great connections"
            icon={<LuUtensilsCrossed className="w-6 h-6" />}
            onFilterClick={() => setSidebarOpen(true)}
            activeFiltersCount={getActiveFiltersCount()}
            borderType="bottomAccent"
          />

          {/* Fallback if no meals after filtering */}
          {filteredMeals.length === 0 && <p>No meals available</p>}

          {/* Meal Grid */}
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
      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setMealToDelete(null);
        }}
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

export default MealDashboard;
