type NavButtonProps = {
  label: string;
  variant?: "outlined" | "filled";
  onClick?: () => void;
};

function NavButton({ label, variant = "filled", onClick }: NavButtonProps) {
  const base =
    "px-4 py-2 rounded-full font-medium hover:scale-105 hover:shadow-md transition-transform duration-300";

  const filled =
    "bg-pink-400 text-white dark:bg-purple-600 dark:text-[#f9fafb]";

  const outlined =
    "border bg-[#f9fafb] border-pink-500 text-rose-400 dark:bg-gray-700/90 dark:border-gray-700/90 dark:text-[#f9fafb]";

  return (
    <button
      onClick={onClick}
      className={`${base} ${variant === "outlined" ? outlined : filled}`}
    >
      {label}
    </button>
  );
}
export default NavButton;
