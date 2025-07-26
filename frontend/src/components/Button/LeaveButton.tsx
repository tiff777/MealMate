function LeaveButton({
  message,
  onClick,
}: {
  message?: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-4 py-2 rounded-lg font-medium shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 bg-white dark:bg-gray-800 text-orange-600 dark:text-orange-400 border-2 border-orange-300 dark:border-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:border-orange-400 dark:hover:border-orange-500 hover:shadow-md transform hover:scale-105 focus:ring-orange-500"
    >
      {message}
    </button>
  );
}

export default LeaveButton;
