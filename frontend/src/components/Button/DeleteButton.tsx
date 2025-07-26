import { FiTrash2 } from "react-icons/fi";
function DeleteButton({
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
        onClick={onClick}
        disabled={disabled}
        className={`
        flex items-center justify-center gap-2 w-full
        py-2 px-4
        rounded-lg
        font-semibold
        border-2
        transition-all duration-200 transform
        focus:ring-2 focus:ring-red-300
        ${
          disabled
            ? "bg-red-300 text-white cursor-not-allowed opacity-60"
            : "bg-red-500 text-white hover:bg-red-600 hover:scale-105 hover:shadow-lg cursor-pointer border-red-500 hover:border-red-600"
        }
      `}
      >
        <FiTrash2 size={18} className="inline align-middle" /> {message}
      </button>
    </>
  );
}

export default DeleteButton;
