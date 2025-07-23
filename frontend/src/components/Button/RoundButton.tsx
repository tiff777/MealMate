import React from "react";

type Variant = "primary" | "outline" | "secondary";

interface LandingButtonProps {
  message: string;
  onClick?: () => void;
  variant?: Variant;
  size?: "xs" | "sm" | "md" | "lg";
}

function RoundButton({
  message,
  onClick,
  variant = "primary",
  size = "md",
}: LandingButtonProps) {
  const baseClasses =
    "rounded-full font-semibold transition-all duration-200 transform hover:scale-105";

  const sizeClasses =
    size === "lg"
      ? "px-8 py-4 text-lg"
      : size === "md"
      ? "px-6 py-3 text-md"
      : size === "sm"
      ? "px-4 py-2 text-sm"
      : "px-3 py-1 text-sm";

  let variantClasses = "";
  switch (variant) {
    case "primary":
      variantClasses =
        "bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600";
      break;
    case "outline":
      variantClasses =
        "border-2 border-orange-500 text-orange-500 dark:text-orange-400 hover:bg-orange-500 hover:text-white";
      break;
    case "secondary":
      variantClasses = "bg-white text-orange-500 hover:bg-gray-100";
      break;
  }

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${sizeClasses} ${variantClasses}`}
    >
      {message}
    </button>
  );
}

export default RoundButton;
