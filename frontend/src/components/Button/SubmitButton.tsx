function SubmitButton({ message }: { message?: string }) {
  return (
    <button
      type="submit"
      className="
  w-full 
  py-2 
  rounded-lg 
  bg-gradient-to-r from-rose-400 to-rose-300
   hover:from-rose-300 hover:to-rose-400
  text-white 
  font-semibold
  transition-all transform
  hover:scale-105
  hover:shadow-lg
  focus:ring-2 focus:ring-rose-300
"
    >
      {message}
    </button>
  );
}

export default SubmitButton;
