import React, { useState } from "react";

interface TextBoxInputProps {
  title: string;
  value: string;
  rows: number;
  onChange: (value: string) => void;
  onBlur?: (value: string) => void;
  error?: string;
}

function TextBoxInput({
  title,
  value,
  rows,
  onChange,
  onBlur,
  error,
}: TextBoxInputProps) {
  const hasError = !!error;
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div>
      <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
        {title}
      </label>
      <textarea
        placeholder="Tell us a bit about yourself..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={(e) => {
          onBlur?.(e.target.value);
          setIsFocused(false);
        }}
        onFocus={() => setIsFocused(true)}
        rows={rows}
        className={`w-full px-4 py-2 rounded-lg resize-none text-sm transition-colors
          ${
            hasError
              ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
              : "bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-rose-500 dark:focus:ring-rose-400 focus:border-transparent text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
          }
          ${isFocused ? "ring-2 ring-rose-500 dark:ring-rose-400" : ""}
        `}
      />

      {hasError && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500">{error}</p>
      )}
    </div>
  );
}

export default TextBoxInput;
