import RegisterPage1 from "./RegisterPage1";
import RegisterPage2 from "./RegisterPage2";
import type { RegisterUser } from "../../types";
import { useState } from "react";
import { useSimpleUserValidation } from "../../hook/useUserValidation";
import { Link } from "react-router-dom";

interface Props {
  currentPage: number;
  handleNext: () => void;
  handleBack: () => void;
  handleSubmit: (e: React.FormEvent) => void;
  formData: RegisterUser;
  setFormData: React.Dispatch<React.SetStateAction<RegisterUser>>;
  setAvatarFile: React.Dispatch<React.SetStateAction<File | null>>;
}

function RegisterForm({
  currentPage,
  handleNext,
  handleBack,
  formData,
  setFormData,
  handleSubmit,
  setAvatarFile,
}: Props) {
  const handleInputChange = (field: keyof RegisterUser, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleArrayInputChange = (
    field: "interests" | "preferredCuisines",
    value: string
  ) => {
    const items = value
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item);
    setFormData((prev) => ({ ...prev, [field]: items }));
  };

  const {
    formData: validatedUserData,
    errors: userErrors,
    updateField: updateUserField,
    validateAll,
    isFormValid: isUserFormValid,
  } = useSimpleUserValidation({
    name: formData.name,
    email: formData.email,
    university: formData.university,
    major: formData.major,
    bio: formData.bio,
  });

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center bg-gray-50 dark:bg-[#334155] p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md dark:bg-slate-600">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">Create Account</h2>
          <p className="text-sm mt-2">
            Step {currentPage} of 2 -{" "}
            {currentPage === 1 ? "Basic Information" : "Personal Details"}
          </p>
        </div>

        <div className="mb-6">
          <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-slate-500">
            <div
              className="bg-gradient-to-r from-[#FF7F7F] to-[#FFA07A] dark:from-[#0F0F23] dark:via-[#1A1A2E] dark:to-[#16213E] h-2 rounded-full"
              style={{ width: `${(currentPage / 2) * 100}%` }}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {currentPage === 1 ? (
            <RegisterPage1
              formData={formData}
              handleInputChange={handleInputChange}
              handleNext={handleNext}
              userErrors={userErrors}
              updateUserField={updateUserField}
            />
          ) : (
            <RegisterPage2
              formData={formData}
              handleInputChange={handleInputChange}
              handleArrayInputChange={handleArrayInputChange}
              handleBack={handleBack}
              setAvatarFile={setAvatarFile}
              userErrors={userErrors}
              updateUserField={updateUserField}
              isUserFormValid={isUserFormValid}
            />
          )}
        </form>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-pink-500 font-medium hover:text-pink-600 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterForm;
