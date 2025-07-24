import { FiImage, FiHeart } from "react-icons/fi";
import { FaUniversity } from "react-icons/fa";
import { FiUser, FiMail, FiBookOpen } from "react-icons/fi";
import TagInput from "../Form/TagInout";
import type { User } from "../../types";

import TextInput from "../Form/TextInput";

import ButtonFactory from "../Button/ButtonFactory";
import UserAvatar from "./UserAvatar";

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
  const handleInputChange = (field: keyof User, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Update Personal Information
      </h2>

      <form onSubmit={onSubmit} className="space-y-6">
        {/* 頭像區塊 */}
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
              icon={<FiUser />}
            />
            <TextInput
              label="Email"
              placeholder="Enter your full name"
              value={formData.email}
              onChange={(val) => handleInputChange("email", val)}
              icon={<FiMail />}
              disabled={true}
            />
          </div>

          <div className="grid md:grid-row-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bio
              </label>
              <textarea
                value={formData.bio}
                onChange={(e) => handleInputChange("bio", e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="introduce yourself"
              />
            </div>
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
            />
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <TextInput
              label="Major"
              placeholder="Enter your full name"
              value={formData.major}
              onChange={(val) => handleInputChange("major", val)}
              icon={<FiBookOpen />}
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

        <ButtonFactory type="submit" message="Update Profile" />
      </form>
    </div>
  );
}

export default UserProfileEditForm;
