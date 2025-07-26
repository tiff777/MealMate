import { useState } from "react";

interface AvatarModalProps {
  onClose: () => void;
  onSave: (avatar: string | File) => void;
}

export default function AvatarModal({ onClose, onSave }: AvatarModalProps) {
  const [emoji, setEmoji] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleSave = () => {
    if (emoji.trim()) {
      onSave(emoji);
    } else if (file) {
      onSave(file);
    }
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-[400px] dark:text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Update Avatar</h2>
          <button
            onClick={onClose}
            className="text-gray-500 dark:text-gray-300 text-xl"
          >
            &times;
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter Emoji 😀 or upload file"
            value={emoji}
            onChange={(e) => {
              setEmoji(e.target.value);
              setFile(null);
            }}
            className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white "
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const selected = e.target.files?.[0] || null;
              setFile(selected);
              setEmoji("");
            }}
            className="w-full dark:text-white"
          />

          <button
            onClick={handleSave}
            className="w-full bg-orange-500 text-white py-2 rounded mt-4 hover:bg-orange-600 dark:bg-orange-500 dark:hover:bg-orange-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
