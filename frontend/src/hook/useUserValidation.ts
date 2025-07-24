// hooks/useSimpleUserValidation.ts
import { useState, useMemo, useRef } from "react";
import {
  validateUserForm,
  validateField,
  type UserFormData,
  type ValidationResult,
} from "../util/userValidation";

const defaultFormData: UserFormData = {
  name: "",
  email: "",
  university: "",
  major: "",
  bio: "",
  avatar: "👤",
  interests: [],
  preferredCuisines: [],
};

export function useSimpleUserValidation(
  initialData: Partial<UserFormData> = {}
) {
  const [formData, setFormData] = useState<UserFormData>({
    ...defaultFormData,
    ...initialData,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const previousValuesRef = useRef<Record<string, string>>({});

  const updateField = async (field: keyof UserFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (previousValuesRef.current[field] === value) {
      return;
    }

    const result: ValidationResult = await validateField(field, value);
    previousValuesRef.current[field] = value;

    setErrors((prev) => ({
      ...prev,
      [field]: result.isValid ? "" : result.errors[0],
    }));
  };

  const validateAll = async (): Promise<boolean> => {
    const result = await validateUserForm(formData);

    Object.entries(formData).forEach(([key, value]) => {
      previousValuesRef.current[key] = value;
    });
    const fieldErrors: Record<string, string> = {
      name: result.name.errors[0] || "",
      email: result.email.errors[0] || "",
      university: result.university.errors[0] || "",
      major: result.major.errors[0] || "",
      bio: result.bio.errors[0] || "",
    };

    setErrors(fieldErrors);
    return result.isFormValid;
  };

  const isFormValid = useMemo(() => {
    const requiredFields = ["name", "email", "university", "major"];
    const hasRequiredFields = requiredFields.every((field) =>
      formData[field as keyof UserFormData]?.toString().trim()
    );

    const hasNoErrors = Object.values(errors).every((error) => !error);

    return hasRequiredFields && hasNoErrors;
  }, [formData, errors]);

  return {
    formData,
    errors,
    updateField,
    validateAll,
    setFormData,
    isFormValid,
  };
}
