function LoadingSpinner({
  message,
  size = "md",
}: {
  message: string;
  size?: "sm" | "md" | "lg" | "xl";
}) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-20 h-20",
  };

  const textSizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-4 transition-colors duration-300">
      <div className="text-center">
        <div
          className={`${sizeClasses[size]} border-4 border-orange-200 dark:border-gray-600 border-t-orange-500 dark:border-t-orange-400 rounded-full animate-spin mx-auto mb-4 transition-colors duration-300`}
        ></div>
        <p
          className={`text-gray-700 dark:text-gray-200 ${textSizes[size]} font-medium transition-colors duration-300`}
        >
          {message}
        </p>
      </div>
    </div>
  );
}

export default LoadingSpinner;
