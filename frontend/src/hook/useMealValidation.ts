import { useState, useMemo, useRef } from "react";
import { validateMealForm } from "../util/mealValidation";
import type { RawMealFormInput } from "../types";

const defaultMealData: RawMealFormInput = {
  title: "",
  description: "",
  maxParticipant: 1,
  restaurantName: "",
  restaurantAddress: "",
  mealDate: "",
};

export function useSimpleMealValidation(
  initialData: Partial<RawMealFormInput> = {}
) {
  const [formData, setFormData] = useState<RawMealFormInput>({
    ...defaultMealData,
    ...initialData,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const previousValuesRef = useRef<Record<string, any>>({});

  const updateField = async (field: keyof RawMealFormInput, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (previousValuesRef.current[field] === value) return;
    previousValuesRef.current[field] = value;

    const { [field]: fieldValidation } = await validateMealForm({
      ...formData,
      [field]: value,
    });
    setErrors((prev) => ({
      ...prev,
      [field]: fieldValidation.errors[0] || "",
    }));
  };

  const validateAll = async (): Promise<boolean> => {
    const result = await validateMealForm(formData);
    const fieldErrors: Record<string, string> = {
      title: result.title.errors[0] || "",
      description: result.description.errors[0] || "",
      maxParticipant: result.maxParticipant.errors[0] || "",
      restaurantName: result.restaurantName.errors[0] || "",
      restaurantAddress: result.restaurantAddress.errors[0] || "",
      mealDate: result.mealDate.errors[0] || "",
    };
    setErrors(fieldErrors);
    return result.isFormValid;
  };

  const isFormValid = useMemo(() => {
    const requiredFields = [
      "title",
      "description",
      "maxParticipant",
      "restaurantName",
      "restaurantAddress",
      "mealDate",
    ];
    const hasRequiredFields = requiredFields.every((field) =>
      formData[field as keyof RawMealFormInput]?.toString().trim()
    );
    const hasNoErrors = Object.values(errors).every((err) => !err);
    return hasRequiredFields && hasNoErrors;
  }, [formData, errors]);

  return {
    formData,
    errors,
    setFormData,
    updateField,
    validateAll,
    isFormValid,
  };
}
