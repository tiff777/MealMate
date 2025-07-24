function SubmitButton({ message }: { message?: string }) {
  return (
    <button
      type="submit"
      className="
  w-full 
  py-2 
  rounded-lg 
  bg-gradient-to-r from-orange-400 to-red-500
  dark:from-orange-500 dark:to-red-600
  hover:from-orange-600 hover:to-red-500
  dark:hover:from-orange-600 dark:hover:to-red-600
  text-white 
  font-semibold
  transition-all transform
  hover:scale-105
  hover:shadow-lg
  focus:ring-2 focus:ring-orange-400
"
    >
      {message}
    </button>
  );
}

export default SubmitButton;
