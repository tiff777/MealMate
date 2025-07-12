import { Link } from "react-router-dom";
import React, { useState } from "react";
import SubmitButton from "../Button/SubmitButton";

type LoginFormProps = {
  onSubmit: (email: string, password: string) => void;
};

function LoginForm({ onSubmit }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    console.log("Login attempt with email in form:", email);
    console.log("Login attempt with password in form:", password);

    onSubmit(email, password);
  }

  return (
    <div className="h-[calc(100vh-4.5rem)] flex bg-gradient-to-br from-pink-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-md">
          <div className="text-center mb-4">
            <div className="flex justify-center mb-2">
              <div className="w-12 h-12 rounded-lg bg-gray-200 dark:bg-gray-700 text-white text-2xl flex items-center justify-center">
                🍽️
              </div>
            </div>
            <h1 className="text-2xl font-semibold text-gray-700 dark:text-gray-100">
              MealMate
            </h1>
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
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-rose-300 focus:border-transparent bg-white dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100"
              />
            </div>

            <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Remember me
              </label>
              <button
                type="button"
                className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Forgot password?
              </button>
            </div>

            <SubmitButton message="Sign In" />

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
