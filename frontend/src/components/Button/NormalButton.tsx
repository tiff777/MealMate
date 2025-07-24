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
      className={`
    w-full 
    py-2 
    rounded-lg 
    border-2 
    font-semibold 
    transition-all 
    duration-200 
    transform 
    focus:ring-2 
    ${
      disabled
        ?
          `
        border-gray-300 
        dark:border-gray-600 
        text-gray-400 
        dark:text-gray-500 
        bg-gray-100 
        dark:bg-gray-800 
        cursor-not-allowed 
        opacity-60
        `
        : 
          `
        border-orange-500 
        dark:border-orange-400 
        text-orange-500 
        dark:text-orange-400 
        hover:scale-105 
        hover:shadow-lg 
        hover:bg-orange-500 
        hover:text-white 
        dark:hover:bg-orange-400 
        dark:hover:text-white 
        focus:ring-orange-300
        cursor-pointer
        `
    }
  `}
      disabled={disabled}
    >
      {message}
    </button>
  );
}

export default NormalButton;
