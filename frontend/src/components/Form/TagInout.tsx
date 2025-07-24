import { useState } from "react";

interface TagInputProps {
  label?: string;
  icon?: React.ReactNode;
  tags: string[];
  setTags: (tags: string[]) => void;
  placeholder?: string;
}

const TagInput: React.FC<TagInputProps> = ({
  label = "Tags",
  icon,
  tags,
  setTags,
  placeholder = "Add a tag",
}) => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const hasError = tags.length >= 10;

  const handleAdd = () => {
    const trimmed = input.trim();
    if (trimmed !== "" && !tags.includes(trimmed) && !hasError) {
      setTags([...tags, trimmed]);
      setInput("");
      setError(""); // clear error if previously shown
    } else if (hasError) {
      setError("You can only add up to 10 tags.");
    }
  };

  const handleRemove = (tagToRemove: string) => {
    const newTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(newTags);
    if (newTags.length < 10) {
      setError(""); // clear error once below limit
    }
  };

  return (
    <div>
      <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <div className="relative flex gap-2 mb-4">
        {icon && (
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-orange-400 dark:text-gray-400">
            {icon}
          </span>
        )}
        <input
          type="text"
          placeholder={placeholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          className={`flex-1 py-2 pr-4 rounded-lg pl-${
            icon ? "10" : "4"
          } transition-colors text-sm
        bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600
        focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 focus:border-transparent
        text-gray-900 dark:text-gray-100 placeholder-gray-700 dark:placeholder-gray-400`}
        />
        <button
          type="button"
          onClick={handleAdd}
          disabled={hasError}
          className={`px-3 py-1 rounded text-sm text-white ${
            hasError
              ? "bg-orange-300 cursor-not-allowed"
              : "bg-orange-500 hover:bg-orange-600"
          }`}
        >
          Add
        </button>
      </div>

      {hasError && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
          <span className="font-medium"></span> {error}
        </p>
      )}

      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag, idx) => (
          <span
            key={idx}
            className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full text-xs flex items-center gap-1 dark:bg-orange-200 dark:text-orange-800"
          >
            {tag}
            <button
              type="button"
              onClick={() => handleRemove(tag)}
              className="text-orange-700 hover:text-orange-900 ml-1"
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default TagInput;
