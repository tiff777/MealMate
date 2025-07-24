import { useEffect, useState } from "react";
import { FaExclamationCircle } from "react-icons/fa";
import type { ToastProps } from "../../types";

function ErrorToast({ message, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);

      setTimeout(() => {
        onClose();
      }, 300);
    }, 2000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50">
      <div
        className={`
        flex items-center p-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 
        dark:bg-gray-800 dark:text-red-400 dark:border-red-800 shadow-lg
        transition-all duration-300 ease-in-out pointer-events-auto
        ${
          isVisible
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 -translate-y-2 scale-95"
        }
      `}
        role="alert"
      >
        <FaExclamationCircle
          className="shrink-0 inline w-4 h-4 me-3"
          aria-hidden="true"
        />
        <span className="sr-only">Info</span>
        <div className="text-left">
          <span className="font-medium block">Error!</span>
          <span>{message}</span>
        </div>
      </div>
    </div>
  );
}

export default ErrorToast;
