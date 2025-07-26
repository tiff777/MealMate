// Type representing the result of password validation
export interface PasswordValidationResult {
  isValid: boolean;
  errors: string[];
  strength: "weak" | "medium" | "strong";
}

// Type representing the result of password match validation
export interface PasswordMatchResult {
  matches: boolean;
  error?: string;
}

// Validate a password based on required criteria
export function validatePassword(password: string): PasswordValidationResult {
  const errors: string[] = [];
  let strength: "weak" | "medium" | "strong" = "weak";

  if (password.length < 6) {
    errors.push("Password must be at least 6 characters long");
  }

  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter");
  }

  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter");
  }

  if (!/\d/.test(password)) {
    errors.push("Password must contain at least one number");
  }

  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push("Password must contain at least one special character");
  }

  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
  const isLongEnough = password.length >= 8;
  const isVeryLong = password.length >= 12;

  const strengthScore = [
    hasLower,
    hasUpper,
    hasNumber,
    hasSpecial,
    isLongEnough,
    isVeryLong,
  ].filter(Boolean).length;

  if (strengthScore >= 5) {
    strength = "strong";
  } else if (strengthScore >= 3) {
    strength = "medium";
  } else {
    strength = "weak";
  }

  return {
    isValid: errors.length === 0,
    errors,
    strength,
  };
}

// Check whether password and confirmation match
export function validatePasswordMatch(
  password: string,
  confirmPassword: string
): PasswordMatchResult {
  if (!confirmPassword) {
    return {
      matches: false,
      error: "Please confirm your password",
    };
  }

  if (password !== confirmPassword) {
    return {
      matches: false,
      error: "Passwords do not match",
    };
  }

  return {
    matches: true,
  };
}

// Validate full password form: includes both rules and matching check
export function validatePasswordForm(
  password: string,
  confirmPassword: string
) {
  const passwordValidation = validatePassword(password);
  const matchValidation = validatePasswordMatch(password, confirmPassword);

  return {
    password: passwordValidation,
    match: matchValidation,
    isPasswordValid: passwordValidation.isValid && matchValidation.matches,
  };
}

// Return Tailwind CSS class color based on password strength
export function getPasswordStrengthColor(
  strength: "weak" | "medium" | "strong"
): string {
  switch (strength) {
    case "weak":
      return "text-red-500";
    case "medium":
      return "text-yellow-500";
    case "strong":
      return "text-green-500";
    default:
      return "text-gray-400";
  }
}

// Return text label based on password strength
export function getPasswordStrengthText(
  strength: "weak" | "medium" | "strong"
): string {
  switch (strength) {
    case "weak":
      return "Weak";
    case "medium":
      return "Medium";
    case "strong":
      return "Strong";
    default:
      return "";
  }
}
