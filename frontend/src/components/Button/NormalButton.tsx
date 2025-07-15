function NormalButton({
  message,
  onClick,
  disabled,
}: {
  message?: string;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        w-full
        py-2
        rounded-lg
        border-2
        border-rose-300
        bg-white
        bg-clip-padding
        bg-gradient-to-r from-rose-400 to-rose-300
        text-transparent
        bg-clip-text
        font-semibold
        transition-all transform
        hover:scale-105
        hover:shadow-lg
        hover:bg-gradient-to-r hover:from-rose-400 hover:to-rose-300
        focus:ring-2 focus:ring-rose-300
      "
      disabled={disabled}
    >
      {message}
    </button>
  );
}

export default NormalButton;
