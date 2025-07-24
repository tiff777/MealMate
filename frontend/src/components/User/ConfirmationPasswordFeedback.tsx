import type { PasswordMatchResult } from "../../util/passwordValidation";

interface ConfirmPasswordFeedbackProps {
  confirmPassword: string;
  matchValidation: PasswordMatchResult | null;
}

function ConfirmPasswordFeedback({
  confirmPassword,
  matchValidation,
}: ConfirmPasswordFeedbackProps) {
  if (!confirmPassword) return null;

  const isMatch = matchValidation?.matches;

  return (
    <div className="mt-2">
      {isMatch ? (
        <div className="p-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <p className="text-xs text-green-600 dark:text-green-400 flex items-center space-x-1">
            <span>✓</span>
            <span>Passwords match</span>
          </p>
        </div>
      ) : (
        <div className="p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-xs text-red-600 dark:text-red-400 flex items-center space-x-1">
            <span>✗</span>
            <span>{matchValidation?.error || "Passwords do not match"}</span>
          </p>
        </div>
      )}
    </div>
  );
}

export default ConfirmPasswordFeedback;
