import type { CreateMeal, UpdateMeal } from "../../types";
import { useSimpleMealValidation } from "../../hook/useMealValidation";
import { IoIosPricetags } from "react-icons/io";
import ButtonFactory from "../Button/ButtonFactory";
import TagInput from "../Form/TagInput";
import TextInput from "../Form/TextInput";
import TextBoxInput from "../Form/TextBoxInput";
import { FaRegAddressCard } from "react-icons/fa6";

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
  const today = new Date().toISOString().split("T")[0];

  const { updateField, errors, validateAll, isFormValid } =
    useSimpleMealValidation({
      title: formData.title,
      description: formData.description,
      maxParticipant: formData.maxParticipant,
      restaurantName: formData.restaurantName,
      restaurantAddress: formData.restaurantAddress,
      mealDate:
        formData.mealDate instanceof Date
          ? formData.mealDate.toISOString()
          : formData.mealDate ?? "",
    });

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

  // const handleAddTag = () => {
  //   const trimmed = tagInput.trim();

  //   if (trimmed !== "" && !(formData.tags ?? []).includes(trimmed)) {
  //     setFormData((prev) => ({
  //       ...prev,
  //       tags: [...(prev.tags ?? []), trimmed],
  //     }));
  //     setTagInput("");
  //   }
  // };

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
      <TextInput
        label="Meal Title"
        placeholder="e.g., Pizza & Study Session"
        value={formData.title ?? ""}
        onChange={(value) => {
          handleInputChange("title", value);
        }}
        onBlur={(value) => updateField("title", value)}
        icon={<FaRegAddressCard className="w-4 h-4" />}
        error={errors.title}
        required
      />

      {/* Description */}
      <div className="mt-3">
        <TextBoxInput
          title="Description"
          placeholder="Describe your meal plan, what you'll be doing, or any special notes…"
          value={formData.description ?? ""}
          rows={3}
          onChange={(value) => {
            handleInputChange("description", value);
          }}
          onBlur={(value) => updateField("description", value)}
          error={errors.description}
          required
        />
      </div>

      {/* Restaurant Name */}
      <div className="mt-3">
        <TextInput
          label="Restaurant Name"
          placeholder="e.g., Pizza Club"
          value={formData.restaurantName ?? ""}
          onChange={(value) => handleInputChange("restaurantName", value)}
          onBlur={(value) => updateField("restaurantName", value)}
          icon={<FaRegAddressCard className="w-4 h-4" />}
          error={errors.restaurantName}
          required
        />
      </div>

      {/* Address */}
      <div className="mt-3">
        <TextInput
          label="Address"
          placeholder="e.g., 123 Main Street, Auckland"
          value={formData.restaurantAddress ?? ""}
          onChange={(value) => {
            handleInputChange("restaurantAddress", value);
          }}
          onBlur={(value) => updateField("restaurantAddress", value)}
          icon={<FaRegAddressCard className="w-4 h-4" />}
          error={errors.restaurantAddress}
          required
        />
      </div>

      {/* Date & Time */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
        <div>
          <label className="block text-sm font-medium mb-1">
            Date<span className="text-red-500 dark:text-red-400 ml-1">*</span>
          </label>
          <input
            name="date"
            type="date"
            value={dateValue}
            onChange={(e) => handleDateTimeChange("date", e.target.value)}
            className="w-full rounded-lg border p-2 text-sm bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-rose-500 dark:focus:ring-rose-400 focus:border-transparent"
            min={today}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Time<span className="text-red-500 dark:text-red-400 ml-1">*</span>
          </label>
          <input
            name="time"
            type="time"
            value={timeValue}
            onChange={(e) => handleDateTimeChange("time", e.target.value)}
            className="w-full rounded-lg border p-2 text-sm bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-rose-500 dark:focus:ring-rose-400 focus:border-transparent"
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
      <TagInput
        label="Preferred Cuisines (Optional)"
        icon={<IoIosPricetags />}
        tags={formData.tags ?? []}
        setTags={(tags) => {
          setFormData((prev) => ({
            ...prev,
            tags,
          }));
        }}
        placeholder="e.g., Italian, Chinese, Japanese"
      />

      {/* Buttons */}
      <div className="flex flex-col md:flex-row justify-between gap-5">
        <ButtonFactory type="cancel" message="Cancel" onClick={onCancel} />
        {mode == "create" ? (
          <ButtonFactory type="submit" message="Create meal" />
        ) : (
          <ButtonFactory type="submit" message="Update Meal" />
        )}
      </div>
    </form>
  );
}

export default MealForm;
