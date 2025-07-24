import { useState, useEffect } from "react";
import { FaUniversity } from "react-icons/fa";
import { FiUser, FiMail, FiBookOpen } from "react-icons/fi";
import type { RegisterUser } from "../../types";
import NormalButton from "../Button/NormalButton";
import PasswordInput from "../Form/PasswordInput";
import TextInput from "../Form/TextInput";
import { usePasswordValidation } from "../../hook/usePasswordValidation";
import PasswordValidationFeedback from "../User/PasswordValidationFeedback";
import ConfirmPasswordFeedback from "../User/ConfirmationPasswordFeedback";
import ButtonFactory from "../Button/ButtonFactory";
import { useSimpleUserValidation } from "../../hook/useUserValidation";

interface Props {
  formData: RegisterUser;
  handleInputChange: (field: keyof RegisterUser, value: string) => void;
  handleNext: () => void;
}

function RegisterPage1({ formData, handleInputChange, handleNext }: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isConfirmedPasswordFocused, setIsConfirmedPasswordFocused] =
    useState(false);

  const {
    password,
    confirmPassword,
    passwordValidation,
    matchValidation,
    isPasswordValid,
    setPassword,
    setConfirmPassword,
  } = usePasswordValidation();

  const {
    formData: userData,
    errors: userErrors,
    updateField: updateUserField,
    isFormValid: isUserDataValid,
  } = useSimpleUserValidation({
    name: formData.name,
    email: formData.email,
    university: formData.university,
    major: formData.major,
  });

  const handlePasswordBlur = () => {
    setIsConfirmedPasswordFocused(false);
    if (isPasswordValid) {
      handleInputChange("password", password);
    } else {
      handleInputChange("password", "");
    }
  };

  const handlePasswordChange = setPassword;
  const handleConfirmPasswordChange = setConfirmPassword;
  const canProceed = isUserDataValid && isPasswordValid;

  return (
    <>
      <TextInput
        label="Full Name"
        placeholder="Enter your full name"
        value={formData.name}
        onChange={(value) => {
          handleInputChange("name", value);
          updateUserField("name", value);
        }}
        icon={<FiUser className="w-4 h-4" />}
        error={userErrors.name}
        required
      />

      <TextInput
        label="Email Address"
        placeholder="you@example.com"
        type="email"
        value={formData.email}
        onChange={(value) => {
          handleInputChange("email", value);
        }}
        icon={<FiMail className="w-4 h-4" />}
        error={userErrors.email}
        onBlur={async (value) => {
          await updateUserField("email", value);
        }}
        required
      />

      <div>
        <PasswordInput
          label="Password"
          placeholder="Create password"
          value={password}
          onChange={handlePasswordChange}
          show={showPassword}
          setShow={setShowPassword}
          onFocus={() => setIsPasswordFocused(true)}
          onBlur={() => setIsPasswordFocused(false)}
        />

        {isPasswordFocused && password && (
          <PasswordValidationFeedback
            password={password}
            passwordValidation={passwordValidation}
          />
        )}
      </div>

      {/* Confirm Password Input */}
      <div>
        <PasswordInput
          label="Confirm Password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          show={showConfirmPassword}
          setShow={setShowConfirmPassword}
          onFocus={() => setIsConfirmedPasswordFocused(true)}
          onBlur={handlePasswordBlur}
        />

        {/* Confirm Password Validation Feedback */}
        {isConfirmedPasswordFocused && confirmPassword && (
          <ConfirmPasswordFeedback
            confirmPassword={confirmPassword}
            matchValidation={matchValidation}
          />
        )}
      </div>

      <TextInput
        label="University"
        placeholder="Enter your university"
        value={formData.university}
        onChange={(value) => {
          handleInputChange("university", value);
          updateUserField("university", value);
        }}
        icon={<FaUniversity className="w-4 h-4" />}
        error={userErrors.university}
        required
      />

      <TextInput
        label="Major"
        placeholder="Enter your major"
        value={formData.major}
        onChange={(value) => {
          handleInputChange("major", value);
          updateUserField("major", value);
        }}
        icon={<FiBookOpen className="w-4 h-4" />}
        error={userErrors.major}
        required
      />

      <ButtonFactory
        type="view"
        onClick={() => handleNext()}
        message={canProceed ? "Continue" : "Complete All Fields"}
        disabled={!canProceed}
      />
    </>
  );
}

export default RegisterPage1;
