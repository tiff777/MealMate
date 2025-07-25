import { FiImage, FiHeart } from "react-icons/fi";
import { FaUniversity } from "react-icons/fa";
import { FiUser, FiMail, FiBookOpen } from "react-icons/fi";
import TagInput from "../Form/TagInout";
import type { User } from "../../types";
import { useSimpleUserValidation } from "../../hook/useUserValidation";
import type { UserFormData } from "../../util/userValidation";
import TextInput from "../Form/TextInput";
import TextBoxInput from "../Form/TextBoxInput";
import ButtonFactory from "../Button/ButtonFactory";
import UserAvatar from "./UserAvatar";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "../../context/AppContext";

interface Props {
  formData: User;
  setFormData: React.Dispatch<React.SetStateAction<User>>;
  onSubmit: () => void;
  onAvatarUpload: () => void;
}

function UserProfileEditForm({
  formData,
  setFormData,
  onSubmit,
  onAvatarUpload,
}: Props) {
  const { user } = useContext(AppContext);
  const {
    errors: userErrors,
    updateField: updateUserField,
    validateAll,
    isFormValid: isUserFormValid,
  } = useSimpleUserValidation(
    {
      name: formData.name,
      email: formData.email,
      university: formData.university,
      major: formData.major,
      bio: formData.bio,
    },
    user ?? undefined
  );

  const [initialFormData, setInitialFormData] = useState<User>(formData);
  const [isModified, setIsModified] = useState(false);

  const handleInputChange = (field: keyof User, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFieldCheck = async (field: keyof User, value: string) => {
    if (
      field === "name" ||
      field === "email" ||
      field === "university" ||
      field === "major" ||
      field === "bio"
    ) {
      await updateUserField(field as keyof UserFormData, value);
    }
  };

  const isUserDataModified = (original: User, current: User): boolean => {
    return (
      original.name !== current.name ||
      original.bio !== current.bio ||
      original.university !== current.university ||
      original.major !== current.major ||
      JSON.stringify(original.interests) !==
        JSON.stringify(current.interests) ||
      JSON.stringify(original.preferredCuisines) !==
        JSON.stringify(current.preferredCuisines)
    );
  };

  useEffect(() => {
    setIsModified(isUserDataModified(initialFormData, formData));
  }, [formData, initialFormData]);

  return (
    <div className="space-y-6 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 dark:text-gray-100 ">
        Update Personal Information
      </h2>

      <form onSubmit={onSubmit} className="space-y-6">
        <div className="flex flex-row items-center gap-2">
          <UserAvatar
            avatar={formData.avatar}
            userId={formData.uid}
            isOnline={formData.isOnline}
          />

          <div className="flex flex-col gap-2">
            <p>{formData.name}</p>
            <button
              type="button"
              onClick={onAvatarUpload}
              className="px-4 py-1 bg-blue-600 text-white rounded shadow hover:bg-blue-700 text-sm"
            >
              Upload
            </button>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <TextInput
              label="Name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(val) => handleInputChange("name", val)}
              onBlur={(val) => handleFieldCheck("name", val)}
              icon={<FiUser />}
              error={userErrors.name}
            />
            <TextInput
              label="Email"
              placeholder="Enter your full name"
              value={formData.email}
              onChange={(val) => handleInputChange("email", val)}
              icon={<FiMail />}
              disabled={true}
              error={userErrors.email}
            />
          </div>

          <div className="grid md:grid-row-2 gap-6">
            <TextBoxInput
              title="Bio (Optional)"
              value={formData.bio}
              onChange={(value) => handleInputChange("bio", value)}
              onBlur={(value) => updateUserField("bio", value)}
              rows={3}
              error={userErrors.bio}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <TextInput
              label="University"
              placeholder="Enter your full name"
              value={formData.university}
              onChange={(val) => handleInputChange("university", val)}
              icon={<FaUniversity />}
              error={userErrors.university}
            />
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <TextInput
              label="Major"
              placeholder="Enter your full name"
              value={formData.major}
              onChange={(val) => handleInputChange("major", val)}
              icon={<FiBookOpen />}
              error={userErrors.major}
            />
          </div>
        </div>

        <TagInput
          label="Interests"
          tags={formData.interests}
          setTags={(newTags) =>
            setFormData({ ...formData, interests: newTags })
          }
          placeholder="Add Interest"
          icon={<FiHeart />}
        />

        <TagInput
          label="Preferred Cusines "
          tags={formData.preferredCuisines}
          setTags={(newTags) =>
            setFormData({ ...formData, preferredCuisines: newTags })
          }
          placeholder="Add Cuisines"
          icon={<FiHeart />}
        />

        <ButtonFactory
          type="submit"
          message="Update Profile"
          disabled={!isModified || !isUserFormValid}
        />
      </form>
    </div>
  );
}

export default UserProfileEditForm;
