function SubmitButton({ message }: { message?: string }) {
  return (
    <button
      type="submit"
      className="w-full bg-gradient-to-r from-rose-400 to-rose-300 text-white py-2 rounded-lg hover:scale-105 transition-colors"
    >
      {message}
    </button>
  );
}

export default SubmitButton;
