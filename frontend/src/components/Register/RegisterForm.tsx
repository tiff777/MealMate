import RegisterPage1 from "./RegisterPage1";
import RegisterPage2 from "./RegisterPage2";
import type { RegisterUser } from "../../types";
import { useState } from "react";
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

  return (
    <div className="h-[calc(100vh-4.5rem)] flex items-center justify-center">
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
              className="bg-gradient-to-r from-rose-400 to-rose-300 h-2 rounded-full"
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
            />
          ) : (
            <RegisterPage2
              formData={formData}
              handleInputChange={handleInputChange}
              handleArrayInputChange={handleArrayInputChange}
              handleBack={handleBack}
              setAvatarFile={setAvatarFile}
            />
          )}
        </form>

        {/* Footer - only show on page 1 */}
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
