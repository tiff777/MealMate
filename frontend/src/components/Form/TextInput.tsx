import React from "react";

interface TextInputProps {
  label: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: (value: string) => void;
  icon: React.ReactNode;
  required?: boolean;
  disabled?: boolean;
  error?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  icon,
  required = false,
  disabled = false,
  onBlur,
  error,
}) => {
  const hasError = !!error;
  return (
    <div>
      <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
        {required && (
          <span className="text-red-500 dark:text-red-400 ml-1">*</span>
        )}
      </label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400">
          {icon}
        </span>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={(e) => onBlur?.(e.target.value)}
          className={`
            w-full pl-10 pr-4 py-2 rounded-lg transition-colors text-sm
            ${
              hasError
                ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
                : "bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-rose-500 dark:focus:ring-rose-400 focus:border-transparent text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
            }
            ${disabled ? "opacity-60 cursor-not-allowed" : ""}
          `}
          required={required}
          disabled={disabled}
        />
      </div>

      {hasError && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
          <span className="font-medium"></span> {error}
        </p>
      )}
    </div>
  );
};

export default TextInput;
