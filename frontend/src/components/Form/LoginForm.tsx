import { Link } from "react-router-dom";
import React, { useState } from "react";
import { FaUtensils } from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi";
import ButtonFactory from "../Button/ButtonFactory";

type LoginFormProps = {
  onSubmit: (email: string, password: string) => void;
};

function LoginForm({ onSubmit }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showpassword, setShowPassword] = useState(false);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    console.log("Login attempt with email in form:", email);
    console.log("Login attempt with password in form:", password);

    onSubmit(email, password);
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
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-rose-300 focus:border-transparent bg-white dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showpassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full border rounded-lg px-3 py-2 pr-10 focus:ring-2 focus:ring-orange-300 focus:border-transparent bg-white dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showpassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showpassword ? (
                    <FiEyeOff className="w-4 h-4" />
                  ) : (
                    <FiEye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
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
