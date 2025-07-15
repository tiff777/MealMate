import { FiTrash2 } from "react-icons/fi";
function DeleteButton({
  message,
  onClick,
}: {
  message?: string;
  onClick?: () => void;
}) {
  return (
    <>
      <button
        onClick={onClick}
        // disabled={loading}
        className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50"
      >
        <FiTrash2 size={18} /> {message}
      </button>
    </>
  );
}

export default DeleteButton;
