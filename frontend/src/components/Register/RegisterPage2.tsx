import { useState } from "react";
import { FiImage, FiHeart } from "react-icons/fi";
import { LuUtensilsCrossed } from "react-icons/lu";
import type { RegisterUser } from "../../types";
import SubmitButton from "../Button/SubmitButton";
import NormalButton from "../Button/NormalButton";

interface Props {
  formData: RegisterUser;
  handleInputChange: (field: keyof RegisterUser, value: string) => void;
  handleArrayInputChange: (
    field: "interests" | "preferredCuisines",
    value: string
  ) => void;
  handleBack: () => void;
  setAvatarFile: React.Dispatch<React.SetStateAction<File | null>>;
}

function RegisterPage2({
  formData,
  handleInputChange,
  handleArrayInputChange,
  handleBack,
  setAvatarFile,
}: Props) {
  const [interestsText, setInterestsText] = useState(
    formData.interests.join(", ")
  );
  const [preferredCuisinesText, setPreferredCuisinesText] = useState(
    formData.preferredCuisines.join(", ")
  );
  return (
    <>
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
          Bio (Optional)
        </label>
        <textarea
          placeholder="Tell us a bit about yourself..."
          value={formData.bio}
          onChange={(e) => handleInputChange("bio", e.target.value)}
          rows={3}
          className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:border-transparent transition-colors text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 resize-none"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
          Interests (Optional)
        </label>
        <div className="relative">
          <FiHeart className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <textarea
            placeholder="e.g., Reading, Gaming, Music, Travel (separate with commas)"
            value={interestsText}
            onChange={(e) => setInterestsText(e.target.value)}
            onBlur={() => handleArrayInputChange("interests", interestsText)}
            rows={3}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:border-transparent transition-colors text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 resize-none"
          />
        </div>
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
          Preferred Cuisines (Optional)
        </label>
        <div className="relative">
          <LuUtensilsCrossed className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <textarea
            placeholder="e.g., Italian, Chinese, Mexican, Japanese (separate with commas)"
            value={preferredCuisinesText}
            onChange={(e) => setPreferredCuisinesText(e.target.value)}
            onBlur={() =>
              handleArrayInputChange("preferredCuisines", preferredCuisinesText)
            }
            rows={3}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:border-transparent transition-colors text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 resize-none"
          />
        </div>
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
          Avatar Emoji (Optional)
        </label>
        <div className="flex gap-2">
          {/* Emoji or URL input */}
          <div className="relative flex-1">
            <FiImage className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Emoji or URL"
              value={formData.avatar}
              onChange={(e) => handleInputChange("avatar", e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:border-transparent transition-colors text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>

          {/* Upload button */}
          <label className="px-4 py-2 rounded-lg bg-teal-500 text-white cursor-pointer hover:bg-teal-600 dark:bg-teal-400 dark:hover:bg-teal-500 text-sm">
            Upload
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setAvatarFile(file);
                  handleInputChange("avatar", file.name);
                }
              }}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <NormalButton message="Back" onClick={handleBack} />
        <SubmitButton message="Create Account" />
      </div>
    </>
  );
}

export default RegisterPage2;
