function SubmitButton({
  message,
  disabled,
}: {
  message?: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="submit"
      className="
 w-full 
        py-2 
        rounded-lg 
        font-semibold
        transition-all 
        transform
        focus:outline-none
        
        /* Enabled styles */
        bg-gradient-to-r from-orange-400 to-red-500
        dark:from-orange-500 dark:to-red-600
        hover:from-orange-600 hover:to-red-500
        dark:hover:from-orange-600 dark:hover:to-red-600
        text-white 
        hover:scale-105
        hover:shadow-lg
        focus:ring-2 focus:ring-orange-400
        cursor-pointer
        
        /* Disabled styles */
        disabled:bg-none
        disabled:bg-gray-400 
        disabled:dark:bg-gray-600
        disabled:text-gray-200 
        disabled:dark:text-gray-400
        disabled:cursor-not-allowed
        disabled:opacity-60
        disabled:transform-none
        disabled:hover:scale-100
        disabled:hover:shadow-none
        disabled:focus:ring-0
"
      disabled={disabled}
    >
      {message}
    </button>
  );
}

export default SubmitButton;
