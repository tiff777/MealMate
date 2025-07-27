import { apiClient } from "../hook/api";
import type { User } from "../types";

// Result of any single field validation
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

// Validation results for the full user form
export interface UserValidationResults {
  name: ValidationResult;
  email: ValidationResult;
  university: ValidationResult;
  major: ValidationResult;
  bio: ValidationResult;
  isFormValid: boolean;
  allErrors: string[];
}

// Shape of user input data for registration/edit forms
export interface UserFormData {
  name: string;
  email: string;
  university: string;
  major: string;
  bio: string;
  avatar: string;
  interests: string[];
  preferredCuisines: string[];
}

// Patterns considered invalid for user name
const INVALID_NAME_PATTERNS = [
  { pattern: /^[0-9]+$/, message: "Name cannot be only numbers" },
  {
    pattern: /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/,
    message: "Name cannot be only special characters",
  },
  {
    pattern: /test|admin|user|guest|null|undefined/i,
    message: "Please enter a real name",
  },
];

// Validate user's full name with optional duplicate check
export async function validateName(
  name: string,
  user?: User
): Promise<ValidationResult> {
  const errors: string[] = [];
  const trimmedName = name.trim();

  if (!trimmedName) {
    errors.push("Name is required");
    return { isValid: false, errors };
  }

  if (trimmedName.length > 100) {
    errors.push("Name cannot exceed 100 characters");
  }

  if (trimmedName.length < 2) {
    errors.push("Name must be at least 2 characters long");
  }

  if (
    !/^[a-zA-Z0-9\s\u4e00-\u9fff\u0100-\u017f\u0180-\u024f\u1e00-\u1eff'-]+$/.test(
      trimmedName
    )
  ) {
    errors.push(
      "Name can only contain letters, numbers, spaces, hyphens, and apostrophes"
    );
  }

  for (const { pattern, message } of INVALID_NAME_PATTERNS) {
    if (pattern.test(trimmedName)) {
      return { isValid: false, errors: [message] };
    }
  }

  if (!user || trimmedName !== user.name.trim()) {
    const isDuplicate = await checkDuplicate("name", trimmedName);
    if (isDuplicate) {
      errors.push("This name is already taken");
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

// Validate email with format, character rules, and uniqueness check
export async function validateEmail(email: string): Promise<ValidationResult> {
  const errors: string[] = [];
  const trimmedEmail = email.trim().toLowerCase();

  if (!trimmedEmail) {
    errors.push("Email is required");
    return { isValid: false, errors };
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(trimmedEmail)) {
    errors.push("Invalid email format");
  }

  if (trimmedEmail.length > 254) {
    errors.push("Email address is too long");
  }

  if (trimmedEmail.includes("..")) {
    errors.push("Email cannot contain consecutive dots");
  }

  if (trimmedEmail.startsWith(".") || trimmedEmail.endsWith(".")) {
    errors.push("Email cannot start or end with a dot");
  }

  const isDuplicate = await checkDuplicate("email", trimmedEmail);
  if (isDuplicate) {
    errors.push("This email is already registered");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

// Validate university field (length and character rules)
export function validateUniversity(university: string): ValidationResult {
  const errors: string[] = [];
  const trimmedUniversity = university.trim();

  if (trimmedUniversity.length > 200) {
    errors.push("University name cannot exceed 200 characters");
  }

  if (trimmedUniversity && trimmedUniversity.length < 2) {
    errors.push("University name must be at least 2 characters long");
  }

  if (
    trimmedUniversity &&
    !/^[a-zA-Z0-9\s\u4e00-\u9fff\u0100-\u017f\u0180-\u024f\u1e00-\u1eff'&.-]+$/.test(
      trimmedUniversity
    )
  ) {
    errors.push("University name contains invalid characters");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

// Validate major field (length and character rules)
export function validateMajor(major: string): ValidationResult {
  const errors: string[] = [];
  const trimmedMajor = major.trim();

  if (trimmedMajor.length > 100) {
    errors.push("Major cannot exceed 100 characters");
  }

  if (trimmedMajor && trimmedMajor.length < 2) {
    errors.push("Major must be at least 2 characters long");
  }

  if (
    trimmedMajor &&
    !/^[a-zA-Z0-9\s\u4e00-\u9fff\u0100-\u017f\u0180-\u024f\u1e00-\u1eff'&.-]+$/.test(
      trimmedMajor
    )
  ) {
    errors.push("Major contains invalid characters");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

// Validate bio (length and anti-spam patterns)
export function validateBio(bio: string): ValidationResult {
  const errors: string[] = [];
  const trimmedBio = bio.trim();

  if (trimmedBio.length > 500) {
    errors.push("Bio cannot exceed 500 characters");
  }

  if (trimmedBio && /^(.)\1{20,}$/.test(trimmedBio)) {
    errors.push("Bio cannot consist of repeated characters");
  }

  if (/[!?.,]{5,}/.test(trimmedBio)) {
    errors.push("Bio contains too many consecutive punctuation marks");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

// Validate the entire user form and return individual + aggregated results
export async function validateUserForm(
  userData: UserFormData,
  user?: User
): Promise<UserValidationResults> {
  const nameValidation = await validateName(userData.name, user);
  const emailValidation = await validateEmail(userData.email);
  const universityValidation = validateUniversity(userData.university);
  const majorValidation = validateMajor(userData.major);
  const bioValidation = validateBio(userData.bio);

  const allErrors = [
    ...nameValidation.errors,
    ...emailValidation.errors,
    ...universityValidation.errors,
    ...majorValidation.errors,
    ...bioValidation.errors,
  ];

  const isFormValid = allErrors.length === 0;

  return {
    name: nameValidation,
    email: emailValidation,
    university: universityValidation,
    major: majorValidation,
    bio: bioValidation,
    isFormValid,
    allErrors,
  };
}

export async function validateField(
  fieldName: keyof UserFormData,
  value: any,
  user?: User
): Promise<ValidationResult> {
  switch (fieldName) {
    case "name":
      return await validateName(value as string, user);
    case "email":
      return await validateEmail(value as string);
    case "university":
      return validateUniversity(value as string);
    case "major":
      return validateMajor(value as string);
    case "bio":
      return validateBio(value as string);
    default:
      return { isValid: true, errors: [] };
  }
}

async function checkDuplicate(field: "email" | "name", value: string) {
  try {
    const response = await apiClient.get("/user/check-duplicate", {
      params: { field, value },
    });
    return response.data.exists;
  } catch (error) {
    return false;
  }
}
