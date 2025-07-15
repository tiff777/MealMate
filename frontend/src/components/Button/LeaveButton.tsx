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
      className="px-4 py-2 rounded-md bg-white text-red-500 border border-red-400 hover:bg-red-500 hover:text-white font-medium shadow-sm transition-colors"
    >
      🙅 {message}
    </button>
  );
}

export default LeaveButton;
