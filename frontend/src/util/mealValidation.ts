import type { ValidationResult } from "./userValidation";
import type { RawMealFormInput } from "../types";

// Interface representing validation results for each meal form field
export interface MealValidationResults {
  title: ValidationResult;
  description: ValidationResult;
  maxParticipant: ValidationResult;
  restaurantName: ValidationResult;
  restaurantAddress: ValidationResult;
  mealDate: ValidationResult;
  isFormValid: boolean;
  allErrors: string[];
}

// Validate the title field
export function validateTitle(title: string): ValidationResult {
  const errors: string[] = [];
  const trimmed = title.trim();
  if (!trimmed) errors.push("Title is required");
  if (trimmed.length > 100) errors.push("Title cannot exceed 100 characters");
  return { isValid: errors.length === 0, errors };
}

// Validate the description field
export function validateDescription(desc: string): ValidationResult {
  const errors: string[] = [];
  const trimmed = desc.trim();
  if (!trimmed) errors.push("Description is required");
  if (trimmed.length > 500)
    errors.push("Description cannot exceed 500 characters");
  return { isValid: errors.length === 0, errors };
}

// Validate maxParticipant: must be an integer between 1 and 15
export function validateMaxParticipant(num: number): ValidationResult {
  const errors: string[] = [];
  if (!Number.isInteger(num)) errors.push("Max participant must be an integer");
  if (num < 1 || num > 15)
    errors.push("Max participant must be between 1 and 15");
  return { isValid: errors.length === 0, errors };
}

// Validate restaurant name field
export function validateRestaurantName(name: string): ValidationResult {
  const errors: string[] = [];
  const trimmed = name.trim();
  if (!trimmed) errors.push("Restaurant name is required");
  if (trimmed.length > 200)
    errors.push("Restaurant name cannot exceed 200 characters");
  return { isValid: errors.length === 0, errors };
}

// Validate restaurant address field
export function validateRestaurantAddress(addr: string): ValidationResult {
  const errors: string[] = [];
  const trimmed = addr.trim();
  if (!trimmed) errors.push("Restaurant address is required");
  if (trimmed.length > 300)
    errors.push("Restaurant address cannot exceed 300 characters");
  return { isValid: errors.length === 0, errors };
}

// Validate meal date: must be a valid date string
export function validateMealDate(date: string): ValidationResult {
  const errors: string[] = [];
  const parsed = new Date(date);
  if (!date || isNaN(parsed.getTime()))
    errors.push("Valid meal date is required");
  return { isValid: errors.length === 0, errors };
}

// Main function to validate the entire form and return the result for each field
export async function validateMealForm(
  data: RawMealFormInput
): Promise<MealValidationResults> {
  const title = validateTitle(data.title);
  const description = validateDescription(data.description);
  const maxParticipant = validateMaxParticipant(data.maxParticipant);
  const restaurantName = validateRestaurantName(data.restaurantName);
  const restaurantAddress = validateRestaurantAddress(data.restaurantAddress);
  const mealDate = validateMealDate(data.mealDate);

  const allErrors = [
    ...title.errors,
    ...description.errors,
    ...maxParticipant.errors,
    ...restaurantName.errors,
    ...restaurantAddress.errors,
    ...mealDate.errors,
  ];

  const isFormValid = allErrors.length === 0;

  return {
    title,
    description,
    maxParticipant,
    restaurantName,
    restaurantAddress,
    mealDate,
    isFormValid,
    allErrors,
  };
}
