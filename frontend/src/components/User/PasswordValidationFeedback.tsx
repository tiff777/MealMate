import {
  getPasswordStrengthColor,
  getPasswordStrengthText,
} from "../../util/passwordValidation";
import type { PasswordValidationResult } from "../../util/passwordValidation";

interface PasswordFeedbackProps {
  password: string;
  passwordValidation: PasswordValidationResult | null;
}

function PasswordValidationFeedback({
  password,
  passwordValidation,
}: PasswordFeedbackProps) {
  const getPasswordRequirements = (password: string) => {
    return [
      {
        text: "At least 6 characters",
        met: password.length >= 6,
      },
      {
        text: "One uppercase letter",
        met: /[A-Z]/.test(password),
      },
      {
        text: "One lowercase letter",
        met: /[a-z]/.test(password),
      },
      {
        text: "One number",
        met: /\d/.test(password),
      },
      {
        text: "One special character",
        met: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
      },
    ];
  };
  if (!password || !passwordValidation) return null;

  return (
    <div className="mt-3 space-y-2">
      {/* Password Strength */}
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-600 dark:text-gray-300">
          Strength:
        </span>
        <span
          className={`text-sm font-medium ${getPasswordStrengthColor(
            passwordValidation.strength
          )}`}
        >
          {getPasswordStrengthText(passwordValidation.strength)}
        </span>

        {/* Strength Bar */}
        <div className="flex-1 max-w-20 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${
              passwordValidation.strength === "weak"
                ? "w-1/3 bg-red-500"
                : passwordValidation.strength === "medium"
                ? "w-2/3 bg-yellow-500"
                : "w-full bg-green-500"
            }`}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-1">
        {getPasswordRequirements(password).map((requirement, index) => (
          <div
            key={index}
            className={`text-xs flex items-center space-x-2 ${
              requirement.met
                ? "text-green-600 dark:text-green-400"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            <span className="text-xs">{requirement.met ? "✓" : "○"}</span>
            <span>{requirement.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PasswordValidationFeedback;
