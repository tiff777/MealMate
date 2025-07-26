function JoinButton({
  message,
  onClick,
  disabled,
}: {
  message?: string;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <>
      <button
        type="button"
        onClick={onClick}
        className={`px-4 py-2 rounded-lg font-medium shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${
          disabled
            ? "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed shadow-none"
            : "bg-gradient-to-r from-orange-400 to-red-400 hover:from-orange-500 hover:to-red-500 text-white hover:shadow-lg transform hover:scale-105 focus:ring-orange-500 dark:from-orange-500 dark:to-red-500 dark:hover:from-orange-600 dark:hover:to-red-600"
        }`}
        disabled={disabled}
      >
        {message}
      </button>
    </>
  );
}

export default JoinButton;
