import { useState } from "react";

interface TagInputProps {
  label?: string;
  icon?: React.ReactNode;
  tags: string[];
  setTags: (tags: string[]) => void;
  placeholder?: string;
}

function TagInput({
  label = "Tags",
  icon,
  tags,
  setTags,
  placeholder = "Add a tag",
}: TagInputProps) {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [hasError, setHasError] = useState(false);

  const MAX_TAGS = 10;
  const MAX_TAG_LENGTH = 20;
  const MIN_TAG_LENGTH = 1;

  const hasTooManyTags = tags.length >= MAX_TAGS;

  const handleAdd = () => {
    const trimmed = input.trim();

    if (hasTooManyTags) {
      setError(`You can only add up to ${MAX_TAGS} tags.`);
      setHasError(true);
    } else if (
      trimmed.length < MIN_TAG_LENGTH ||
      trimmed.length > MAX_TAG_LENGTH
    ) {
      setError(
        `Each tag must be between ${MIN_TAG_LENGTH}-${MAX_TAG_LENGTH} characters.`
      );
      setHasError(true);
    } else if (tags.includes(trimmed)) {
      setError("Duplicate tag is not allowed.");
      setHasError(true);
    } else {
      setTags([...tags, trimmed]);
      setInput("");
      setError("");
      setHasError(false);
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
          onChange={(e) => {
            setInput(e.target.value);
            setError("");
            setHasError(false);
          }}
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
}

export default TagInput;
