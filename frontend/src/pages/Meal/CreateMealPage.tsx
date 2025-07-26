import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authClient } from "../../hook/api";
import MealForm from "../../components/Meal/MealForm";
import type { MealFormData } from "../../types";
import { AppContext } from "../../context/AppContext";

function CreateMealPage() {
  const navigate = useNavigate();
  const { showError } = useContext(AppContext);

  // Initialize meal form state
  const [formData, setFormData] = useState<MealFormData>({
    title: "",
    description: "",
    maxParticipant: 2,
    restaurantName: "",
    restaurantAddress: "",
    mealDate: "",
    tags: [],
  });

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await authClient.post("/meal", formData);
      if (!response) {
        throw new Error("Regiter failed");
      }
      if (response.data) {
        navigate("/my-meals");
      }
    } catch (error) {
      showError(`Error in create meal: ${error}`);
    }
  };

  return (
    <MealForm
      onCancel={() => navigate("/my-meals")}
      handleSubmit={handleSubmit}
      formData={formData}
      setFormData={setFormData}
      mode="create"
    />
  );
}

export default CreateMealPage;
