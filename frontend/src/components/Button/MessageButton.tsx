import { FiMail } from "react-icons/fi";
function MessageButton({
  message,
  onClick,
  disabled,
}: {
  message: string;
  onClick?: () => void;
  disabled: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transform hover:scale-105 border-2 border-transparent
        ${
          disabled
            ? "bg-gray-400 dark:bg-gray-600 text-white dark:text-gray-300 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white hover:shadow-md focus:ring-blue-500"
        }
      `}
    >
      <FiMail />
      {message}
    </button>
  );
}

export default MessageButton;
