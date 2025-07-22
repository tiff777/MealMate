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
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 w-[400px]"
        onClick={(e) => e.stopPropagation()} // ⭐️ 阻止事件冒泡
      >
        {/* header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Update Avatar</h2>
          <button onClick={onClose} className="text-gray-500 text-xl">
            &times;
          </button>
        </div>

        {/* content */}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter Emoji 😀"
            value={emoji}
            onChange={(e) => {
              setEmoji(e.target.value);
              setFile(null); // 如果輸入 emoji，清空 file
            }}
            className="w-full px-3 py-2 border rounded"
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const selected = e.target.files?.[0] || null;
              setFile(selected);
              setEmoji(""); // 如果選了圖片，清空 emoji
            }}
            className="w-full"
          />

          <button
            onClick={handleSave}
            className="w-full bg-blue-600 text-white py-2 rounded mt-4 hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
