import { useState, useEffect } from "react";
import { FiImage, FiHeart } from "react-icons/fi";
import { LuUtensilsCrossed } from "react-icons/lu";
import type { RegisterUser } from "../../types";
import SubmitButton from "../Button/SubmitButton";
import NormalButton from "../Button/NormalButton";
import TextBoxInput from "../Form/TextBoxInput";
import type { UserFormData } from "../../util/userValidation";
import TagInput from "../Form/TagInput";
import ButtonFactory from "../Button/ButtonFactory";

interface Props {
  formData: RegisterUser;
  handleInputChange: (field: keyof RegisterUser, value: string) => void;
  handleArrayInputChange: (
    field: "interests" | "preferredCuisines",
    value: string
  ) => void;
  handleBack: () => void;
  setAvatarFile: React.Dispatch<React.SetStateAction<File | null>>;
  updateUserField: (field: keyof UserFormData, value: string) => Promise<void>;
  userErrors: Record<string, string>;
  isUserFormValid: boolean;
}

function RegisterPreferences({
  formData,
  handleInputChange,
  handleArrayInputChange,
  handleBack,
  setAvatarFile,
  updateUserField,
  userErrors,
  isUserFormValid,
}: Props) {
  const [interests, setInterests] = useState(formData.interests);
  const [preferredCuisines, setPreferredCuisines] = useState(
    formData.preferredCuisines
  );

  useEffect(() => {
    handleArrayInputChange("interests", interests.join(","));
  }, [interests]);

  useEffect(() => {
    handleArrayInputChange("preferredCuisines", preferredCuisines.join(","));
  }, [preferredCuisines]);
  return (
    <>
      <TextBoxInput
        title="Bio (Optional)"
        value={formData.bio}
        onChange={(value) => handleInputChange("bio", value)}
        onBlur={(value) => updateUserField("bio", value)}
        rows={3}
        error={userErrors.bio}
      />

      <TagInput
        label="Interests (Optional)"
        icon={<FiHeart className="w-4 h-4 text-gray-400" />}
        tags={interests}
        setTags={setInterests}
        placeholder="e.g., Reading, Gaming, Music"
      />

      <TagInput
        label="Preferred Cuisines (Optional)"
        icon={<LuUtensilsCrossed className="w-4 h-4 text-gray-400" />}
        tags={preferredCuisines}
        setTags={setPreferredCuisines}
        placeholder="e.g., Italian, Chinese, Japanese"
      />

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
          Avatar Emoji (Optional)
        </label>

        <div className="flex items-center gap-2">
          {/* Emoji or URL input */}
          <div className="relative flex-1">
            <FiImage className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-400" />
            <input
              type="text"
              placeholder="Emoji or URL"
              value={formData.avatar}
              onChange={(e) => handleInputChange("avatar", e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 focus:border-transparent transition-colors text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400"
            />
          </div>

          {/* Upload button */}
          <label className="px-4 py-2 h-[42px] flex items-center justify-center rounded-lg bg-orange-500 text-white cursor-pointer hover:bg-orange-600 dark:bg-orange-400 dark:hover:bg-orange-500 text-sm transition">
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
        <ButtonFactory type="view" message="Back" onClick={handleBack} />
        <ButtonFactory
          type="submit"
          message="Create Account"
          disabled={!isUserFormValid}
        />
      </div>
    </>
  );
}

export default RegisterPreferences;
