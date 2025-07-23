function JoinButton({
  message,
  onClick,
}: {
  message?: string;
  onClick?: () => void;
}) {
  return (
    <>
      <button
        type="button"
        onClick={onClick}
        className="px-4 py-2 rounded-md bg-red-400 hover:bg-red-500 text-white font-medium shadow-sm transition-colors dark:bg-rose-500"
      >
        🍽️ {message}
      </button>
    </>
  );
}

export default JoinButton;
