import { Link } from "react-router-dom";
import React, { useState } from "react";
import { FaUtensils } from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi";
import ButtonFactory from "../Button/ButtonFactory";
import TextInput from "./TextInput";
import PasswordInput from "./PasswordInput";

type LoginFormProps = {
  onSubmit: (email: string, password: string, isRemember: boolean) => void;
};

function LoginForm({ onSubmit }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showpassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    let valid = true;

    if (email.trim() === "") {
      setEmailError("This field is required");
      valid = false;
    } else {
      setEmailError("");
    }

    if (password.trim() === "") {
      setPasswordError("This field is required");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (!valid) return;

    console.log("Login attempt with email in form:", email);
    console.log("Login attempt with password in form:", password);

    onSubmit(email, password, rememberMe);
  }

  return (
    <div className="h-[calc(100vh-5rem)] flex bg-gradient-to-br from-pink-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-md">
          <div className="text-center mb-4">
            <div className="flex justify-center items-center space-x-3 cursor-pointer transition-opacity duration-200">
              <div className="w-8 h-8 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center">
                <FaUtensils className="w-5 h-5 text-orange-500" />
              </div>
              <span className="self-center text-2xl font-bold whitespace-nowrap text-[#213547] dark:text-white">
                MealMate
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Welcome back! Sign in to your account
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <TextInput
              label="Email Address"
              placeholder="Enter your email"
              value={email}
              onChange={setEmail}
              onBlur={() => {
                if (email.trim() === "")
                  setEmailError("This field is required");
                else setEmailError("");
              }}
              icon={<FaUtensils />}
              required
              error={emailError}
            />

            <div>
              <PasswordInput
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChange={setPassword}
                show={showpassword}
                setShow={setShowPassword}
                onBlur={() => {
                  if (password.trim() === "")
                    setPasswordError("This field is required");
                  else setPasswordError("");
                }}
              />
              {passwordError && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-500">
                  {passwordError}
                </p>
              )}
            </div>

            <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Remember me
              </label>
              <Link
                to="/forgot-password"
                className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Forgot password?
              </Link>
            </div>

            <ButtonFactory type="submit" message="Sign In" />

            <p className="text-sm text-center text-gray-500 dark:text-gray-400">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-pink-500 font-medium hover:text-pink-600 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Sign up here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
