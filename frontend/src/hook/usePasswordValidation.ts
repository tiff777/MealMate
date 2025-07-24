// hooks/usePasswordValidation.ts
import { useState, useEffect, useCallback } from "react";
import {
  validatePassword,
  validatePasswordMatch,
  validatePasswordForm,
  type PasswordValidationResult,
  type PasswordMatchResult,
} from "../util/passwordValidation";

interface UsePasswordValidationReturn {
  password: string;
  confirmPassword: string;
  passwordValidation: PasswordValidationResult | null;
  matchValidation: PasswordMatchResult | null;
  isFormValid: boolean;
  setPassword: (password: string) => void;
  setConfirmPassword: (confirmPassword: string) => void;
  handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleConfirmPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  validateForm: () => boolean;
  resetValidation: () => void;
}

export function usePasswordValidation(): UsePasswordValidationReturn {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [passwordValidation, setPasswordValidation] =
    useState<PasswordValidationResult | null>(null);
  const [matchValidation, setMatchValidation] =
    useState<PasswordMatchResult | null>(null);

  useEffect(() => {
    if (password) {
      const validation = validatePassword(password);
      setPasswordValidation(validation);
    } else {
      setPasswordValidation(null);
    }
  }, [password]);

  useEffect(() => {
    if (confirmPassword) {
      const matchResult = validatePasswordMatch(password, confirmPassword);
      setMatchValidation(matchResult);
    } else {
      setMatchValidation(null);
    }
  }, [password, confirmPassword]);

  const handlePasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement> | string) => {
      const value = typeof e === "string" ? e : e.target.value;
      setPassword(value);
    },
    []
  );

  const handleConfirmPasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement> | string) => {
      const value = typeof e === "string" ? e : e.target.value;
      setConfirmPassword(value);
    },
    []
  );

  const isFormValid = Boolean(
    passwordValidation?.isValid && matchValidation?.matches
  );

  const validateForm = useCallback(() => {
    const formValidation = validatePasswordForm(password, confirmPassword);
    setPasswordValidation(formValidation.password);
    setMatchValidation(formValidation.match);
    return formValidation.isFormValid;
  }, [password, confirmPassword]);

  const resetValidation = useCallback(() => {
    setPassword("");
    setConfirmPassword("");
    setPasswordValidation(null);
    setMatchValidation(null);
  }, []);

  return {
    password,
    confirmPassword,
    passwordValidation,
    matchValidation,
    isFormValid,
    setPassword,
    setConfirmPassword,
    handlePasswordChange,
    handleConfirmPasswordChange,
    validateForm,
    resetValidation,
  };
}
