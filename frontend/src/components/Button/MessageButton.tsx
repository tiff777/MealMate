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
      className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md font-medium shadow-sm transition-colors
        ${
          disabled
            ? "bg-gray-400 text-white cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600 text-white"
        }
        dark:bg-blue-600 dark:hover:bg-blue-700
      `}
    >
      <FiMail />
      {message}
    </button>
  );
}

export default MessageButton;
