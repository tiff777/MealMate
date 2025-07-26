import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiClient, authClient } from "../../hook/api";
import MealForm from "../../components/Meal/MealForm";
import type { MealFormData, UpdateMeal } from "../../types";
import { AppContext } from "../../context/AppContext";

function UpdateMealPage() {
  const { mid } = useParams();
  const { showError } = useContext(AppContext);
  const navigate = useNavigate();
  const [originalData, setOriginalData] = useState<UpdateMeal | null>(null);
  const [formData, setFormData] = useState<MealFormData>({
    title: "",
    description: "",
    maxParticipant: 2,
    restaurantName: "",
    restaurantAddress: "",
    mealDate: "",
    tags: [],
  });

  const fetchMealDetail = async () => {
    const mealResponse = await apiClient.get(`/meal/${mid}`);
    if (mealResponse.status !== 200) {
      showError("Cannot find meal");
      return;
    }

    const meal = mealResponse.data;
    setFormData({
      title: meal.title,
      description: meal.description,
      maxParticipant: meal.maxParticipant,
      restaurantName: meal.restaurantName,
      restaurantAddress: meal.restaurantAddress,
      mealDate: meal.mealDate,
      tags: meal.tags ?? [],
    });

    setOriginalData(meal);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!originalData) return;

    const updatedFields: UpdateMeal = {};

    if (formData.title !== originalData.title)
      updatedFields.title = formData.title;
    if (formData.description !== originalData.description)
      updatedFields.description = formData.description;
    if (formData.maxParticipant !== originalData.maxParticipant)
      updatedFields.maxParticipant = formData.maxParticipant;
    if (formData.restaurantName !== originalData.restaurantName)
      updatedFields.restaurantName = formData.restaurantName;
    if (formData.restaurantAddress !== originalData.restaurantAddress)
      updatedFields.restaurantAddress = formData.restaurantAddress;
    if (formData.mealDate !== originalData.mealDate)
      updatedFields.mealDate = formData.mealDate;
    if (JSON.stringify(formData.tags) !== JSON.stringify(originalData.tags))
      updatedFields.tags = formData.tags;

    try {
      const response = await authClient.patch(`/meal/${mid}`, updatedFields);
      if (response.status !== 200) {
        showError("Cannot update meal");
      }

      navigate("/my-meals");
    } catch (err) {
      showError(`Error updating meal:  ${err}`);
    }
  };

  useEffect(() => {
    fetchMealDetail();
  }, [mid]);
  return (
    <>
      <MealForm
        formData={formData}
        onCancel={() => navigate("/my-meals")}
        handleSubmit={handleSubmit}
        setFormData={setFormData}
        mode="update"
      />
    </>
  );
}

export default UpdateMealPage;
