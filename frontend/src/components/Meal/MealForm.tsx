import { useState } from "react";
import type { CreateMeal, UpdateMeal } from "../../types";
import SubmitButton from "../Button/SubmitButton";
import NormalButton from "../Button/NormalButton";
import ButtonFactory from "../Button/ButtonFactory";

type MealFormData = CreateMeal | UpdateMeal;

interface MeaFormlProps {
  onCancel: () => void;
  handleSubmit: (data: any) => void;
  formData: MealFormData;
  setFormData: React.Dispatch<React.SetStateAction<MealFormData>>;
  mode?: "create" | "update";
}

function MealForm({
  onCancel,
  handleSubmit,
  formData,
  setFormData,
  mode = "create",
}: MeaFormlProps) {
  const [tagInput, setTagInput] = useState("");

  const dateValue = formData.mealDate
    ? new Date(formData.mealDate).toISOString().split("T")[0]
    : "";

  const timeValue = formData.mealDate
    ? new Date(formData.mealDate).toTimeString().slice(0, 5)
    : "";

  const handleInputChange = (
    field: keyof CreateMeal,
    value: string | number
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDateTimeChange = (field: "date" | "time", value: string) => {
    setFormData((prev) => {
      const currentDate = prev.mealDate ? new Date(prev.mealDate) : new Date();

      if (field === "date") {
        const [year, month, day] = value.split("-").map(Number);
        currentDate.setFullYear(year);
        currentDate.setMonth(month - 1);
        currentDate.setDate(day);
      }

      if (field === "time") {
        const [hour, minute] = value.split(":").map(Number);
        currentDate.setHours(hour);
        currentDate.setMinutes(minute);
        currentDate.setSeconds(0);
      }

      return { ...prev, mealDate: currentDate.toISOString() };
    });
  };

  const handleAddTag = () => {
    const trimmed = tagInput.trim();

    if (trimmed !== "" && !(formData.tags ?? []).includes(trimmed)) {
      setFormData((prev) => ({
        ...prev,
        tags: [...(prev.tags ?? []), trimmed],
      }));
      setTagInput("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow p-6 mt-6"
    >
      {mode == "create" ? (
        <div>
          <h2 className="text-xl font-bold">🍽️ Create New Meal</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Organize a meal and invite others to join
          </p>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-bold">🍽️ Update New Meal</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Modify the meal detail
          </p>
        </div>
      )}

      {/* Title */}
      <label className="block text-sm font-medium mb-1">Meal Title</label>
      <input
        type="text"
        placeholder="e.g., Pizza & Study Session"
        value={formData.title}
        onChange={(e) => handleInputChange("title", e.target.value)}
        className="w-full rounded border p-2 mb-4"
        required
      />

      {/* Description */}
      <label className="block text-sm font-medium mb-1">Description</label>
      <textarea
        placeholder="Describe your meal plan, what you'll be doing, or any special notes…"
        value={formData.description}
        onChange={(e) => handleInputChange("description", e.target.value)}
        className="w-full rounded border p-2 mb-4"
        rows={3}
        required
      />

      {/* Restaurant Name */}
      <label className="block text-sm font-medium mb-1">Restaurant Name</label>
      <input
        type="text"
        placeholder="e.g., Pizza Club"
        value={formData.restaurantName}
        onChange={(e) => handleInputChange("restaurantName", e.target.value)}
        className="w-full rounded border p-2 mb-4"
        required
      />

      {/* Address */}
      <label className="block text-sm font-medium mb-1">Address</label>
      <input
        name="address"
        type="text"
        placeholder="e.g., 123 Main Street, Auckland"
        value={formData.restaurantAddress}
        onChange={(e) => handleInputChange("restaurantAddress", e.target.value)}
        className="w-full rounded border p-2 mb-4"
        required
      />

      {/* Date & Time */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Date</label>
          <input
            name="date"
            type="date"
            value={dateValue}
            onChange={(e) => handleDateTimeChange("date", e.target.value)}
            className="w-full rounded border p-2 mb-4"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Time</label>
          <input
            name="time"
            type="time"
            value={timeValue}
            onChange={(e) => handleDateTimeChange("time", e.target.value)}
            className="w-full rounded border p-2 mb-4"
            required
          />
        </div>
      </div>

      {/* Max Participants */}
      <label className="block text-sm font-medium mb-1">
        Maximum Participants
      </label>
      <div className="flex items-center gap-2 mb-4">
        <input
          type="range"
          min="2"
          max="20"
          value={formData.maxParticipant}
          onChange={(e) => handleInputChange("maxParticipant", +e.target.value)}
          className="w-full"
        />
        <span>{formData.maxParticipant}</span>
      </div>
      <p className="text-xs text-gray-500 mb-4">
        Including yourself (2–20 people)
      </p>

      {/* Tags */}
      <label className="block text-sm font-medium mb-1">Tags (Optional)</label>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Add a tag (e.g., study, casual, birthday)"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          className="flex-1 rounded border p-2"
        />
        <button
          type="button"
          onClick={handleAddTag}
          className="bg-gray-200 px-3 py-1 rounded"
        >
          Add
        </button>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {(formData.tags ?? []).map((tag, idx) => (
          <span
            key={idx}
            className="bg-pink-100 text-pink-700 px-2 py-0.5 rounded-full text-xs"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex justify-between">
        <ButtonFactory type="cancel" message="Cancel" onClick={onCancel} />
        {mode == "create" ? (
          <ButtonFactory type="submit" message="Create meal" />
        ) : (
          <ButtonFactory type="submit" message="Update Meal" />
        )}
        {/* <NormalButton message="Cancel" onClick={onCancel} />
        <SubmitButton message="Create meal" /> */}
      </div>
    </form>
  );
}

export default MealForm;
