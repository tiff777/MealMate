import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authClient } from "../../hook/api";
import CreateMealForm from "../../components/Meal/CreateMealForm";
import type { CreateMeal } from "../../types";

function CreateMealPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<CreateMeal>({
    title: "",
    description: "",
    maxParticipant: 2,
    restaurantName: "",
    restaurantAddress: "",
    mealDate: "",
    tags: [],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("Sign up data:", formData);
    e.preventDefault();

    try {
      const response = await authClient.post("/meal", formData);
      if (!response) {
        throw new Error("Regiter failed");
      }
      //   console.log("Test response: ", response.data);

      if (response.data) {
        navigate("/my-meals");
      }
    } catch (error) {
      console.log("Error in create meal: ", error);
    }
  };

  return (
    <CreateMealForm
      onCancel={() => navigate("/my-meals")}
      handleSubmit={handleSubmit}
      formData={formData}
      setFormData={setFormData}
    />
  );
}

export default CreateMealPage;
