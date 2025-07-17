import { useState } from "react";
import { FaUniversity } from "react-icons/fa";
import { FiUser, FiMail, FiBookOpen } from "react-icons/fi";
import type { RegisterUser } from "../../types";
import NormalButton from "../Button/NormalButton";
import PasswordInput from "../Form/PasswordInput";

interface Props {
  formData: RegisterUser;
  handleInputChange: (field: keyof RegisterUser, value: string) => void;
  handleNext: () => void;
}

function RegisterPage1({ formData, handleInputChange, handleNext }: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  return (
    <>
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
          Full Name
        </label>
        <div className="relative">
          <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-rose-500 dark:focus:ring-rose-400 focus:border-transparent transition-colors text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
            required
          />
        </div>
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
          Email Address
        </label>
        <div className="relative">
          <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-rose-500 dark:focus:ring-rose-400 focus:border-transparent transition-colors text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
            required
          />
        </div>
      </div>

      <PasswordInput
        label="Password"
        placeholder="Create password"
        value={formData.password}
        onChange={(val) => handleInputChange("password", val)}
        show={showPassword}
        setShow={setShowPassword}
      />

      <PasswordInput
        label="Confirm Password"
        placeholder="Confirm your password"
        value={confirmPassword}
        onChange={setConfirmPassword}
        show={showConfirmPassword}
        setShow={setShowConfirmPassword}
      />

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
          University
        </label>
        <div className="relative">
          <FaUniversity className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Enter your university"
            value={formData.university}
            onChange={(e) => handleInputChange("university", e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-rose-500 dark:focus:ring-rose-400 focus:border-transparent transition-colors text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
            required
          />
        </div>
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
          Major
        </label>
        <div className="relative">
          <FiBookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Enter your major"
            value={formData.major}
            onChange={(e) => handleInputChange("major", e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-rose-500 dark:focus:ring-rose-400 focus:border-transparent transition-colors text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
            required
          />
        </div>
      </div>

      <NormalButton message="Continue" onClick={handleNext} />
    </>
  );
}

export default RegisterPage1;
