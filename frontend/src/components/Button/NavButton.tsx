type NavButtonProps = {
  label: string;
  variant?: "outlined" | "filled";
  onClick?: () => void;
};

function NavButton({ label, variant = "filled", onClick }: NavButtonProps) {
  const base =
    "px-4 py-2 rounded-full font-semibold transition-all duration-200 transform hover:scale-105";

  const filled =
    "bg-orange-500 dark:bg-orange-400 text-white dark:text-gray-900 hover:bg-orange-600 dark:hover:bg-orange-300";

  const outlined =
    "bg-white dark:bg-gray-800 text-orange-500 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-gray-700  dark:border-orange-500";

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
