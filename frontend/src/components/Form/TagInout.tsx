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

  const handleAdd = () => {
    const trimmed = input.trim();
    if (trimmed !== "" && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setInput("");
    }
  };

  const handleRemove = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder={placeholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 rounded border p-2"
        />
        <button
          type="button"
          onClick={handleAdd}
          className="bg-gray-200 px-3 py-1 rounded"
        >
          Add
        </button>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag, idx) => (
          <span
            key={idx}
            className="bg-pink-100 text-pink-700 px-2 py-0.5 rounded-full text-xs flex items-center gap-1"
          >
            {tag}
            <button
              type="button"
              onClick={() => handleRemove(tag)}
              className="text-pink-700 hover:text-pink-900 ml-1"
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
