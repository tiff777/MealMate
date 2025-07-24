import { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import type { ToastProps } from "../../types";

export default function SuccessToast({ message, onClose }: ToastProps) {
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
        flex items-center p-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 
        dark:bg-gray-800 dark:text-green-400 dark:border-green-800 shadow-lg
        transition-all duration-300 ease-in-out pointer-events-auto
        ${
          isVisible
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 -translate-y-2 scale-95"
        }
      `}
        role="alert"
      >
        <FaCheckCircle
          className="shrink-0 inline w-4 h-4 me-3"
          aria-hidden="true"
        />
        <span className="sr-only">Info</span>
        <div className="text-left">
          <span className="font-medium block">Success!</span>
          <span>{message}</span>
        </div>
      </div>
    </div>
  );
}
