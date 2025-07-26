import { useState, useContext, useEffect } from "react";
import SettingNavBar from "../../components/User/SettingNavBar";
import UserPasswordForm from "../../components/User/UserPasswordForm";
import UserDeleteForm from "../../components/User/UserDeleteForm";
import AvatarModal from "../../components/User/AvatraModal";
import type { UpdateUser, User } from "../../types";
import { AppContext } from "../../context/AppContext";
import UserProfileEditForm from "../../components/User/UserProfileEditForm";
import { authClient } from "../../hook/api";

type SettingsTab = "profile" | "password" | "account";

function SettingsPage() {
  const { user, updateUser, logoutUser, deleteUser, showSuccess, showError } =
    useContext(AppContext);
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");
  const [formData, setFormData] = useState<User>(user!);
  const [showAvatarModal, setShowAvatarModal] = useState(false);

  const handleUpdateUser = async () => {
    if (!user) {
      return;
    }
    const updatedFields: UpdateUser = {};

    if (formData.name !== user.name) updatedFields.name = formData.name;
    if (formData.university !== user.university)
      updatedFields.university = formData.university;
    if (formData.major !== user.major) updatedFields.major = formData.major;
    if (formData.bio !== user.bio) updatedFields.bio = formData.bio;
    if (JSON.stringify(formData.interests) !== JSON.stringify(user.interests))
      updatedFields.interests = formData.interests;
    if (
      JSON.stringify(formData.preferredCuisines) !==
      JSON.stringify(user.preferredCuisines)
    )
      updatedFields.preferredCuisines = formData.preferredCuisines;

    try {
      const response = await authClient.patch(
        `/user/${user.uid}`,
        updatedFields
      );
      if (!response) {
        showError("Cannot update user");
      }

      const updateUserData = response.data.user;
      updateUser(updateUserData);
      setFormData(updateUserData);
    } catch (error) {
      showError(`Error of updating user: ${user}`);
    }
  };

  const handleUpdateAvatar = async (avatar: string | File) => {
    let avatarValue: string;

    if (typeof avatar === "string") {
      avatarValue = avatar;
    } else {
      const formData = new FormData();
      formData.append("file", avatar);

      const avatarResponse = await authClient.post(
        "/user/upload-avatar",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (avatarResponse.status !== 200) {
        showError("Error in uploading avatar");
      }
      avatarValue = avatarResponse.data.avatarUrl;
    }

    const updateResponse = await authClient.patch(`/user/${user?.uid}/avatar`, {
      avatar: avatarValue,
    });

    if (updateResponse.status !== 200) {
      showError("Update avatar fail");
    } else {
      showSuccess("Avatar updated!");
      if (user) {
        updateUser({ ...user, avatar: avatarValue });
      }
    }
  };

  const handleOldPasswordCheck = async (oldPassword: string) => {
    const response = await authClient.post("/user/password/verify", {
      oldPassword,
    });

    return response.status === 200;
  };

  const handleChangePassword = async (newPassword: string) => {
    try {
      const response = await authClient.patch("user/password", { newPassword });
      if (response.status !== 200) {
        showError("Cannot change password");
        return;
      }

      showSuccess("Password update successful");

      setTimeout(() => {
        logoutUser();
      }, 500);
    } catch (error) {
      showError("Cannot change password");
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await authClient.delete("user");

      if (response.status !== 200) {
        showError("Delete unsuccessful");
      }

      showSuccess("Account deleted successfully");
      setTimeout(() => {
        deleteUser();
      }, 500);
    } catch (error) {
      showError("Cannot delete user");
    }
  };

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  if (!user || !formData) {
    return <div className="text-center mt-10 text-gray-500">Loading...</div>;
  }

  return (
    <div className="min-h-screen  transition-colors duration-200">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
            Settings
          </h1>
        </div>

        <div className="flex flex-col md:flex-row gap-6 lg:gap-8 max-w-7xl mx-auto">
          <SettingNavBar activeTab={activeTab} onTabChange={setActiveTab} />

          {/* Content */}
          <div className="flex-1 bg-white dark:bg-gray-800 rounded shadow p-3">
            {activeTab === "profile" && (
              <UserProfileEditForm
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleUpdateUser}
                onAvatarUpload={() => setShowAvatarModal(true)}
              />
            )}
            {activeTab === "password" && (
              <UserPasswordForm
                handleChangePassword={handleChangePassword}
                handleOldPasswordCheck={handleOldPasswordCheck}
              />
            )}
            {activeTab === "account" && (
              <UserDeleteForm handleDeleteAccount={handleDeleteAccount} />
            )}
          </div>
        </div>
        {showAvatarModal && (
          <AvatarModal
            onClose={() => setShowAvatarModal(false)}
            onSave={(newAvatar) => {
              handleUpdateAvatar(newAvatar);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default SettingsPage;
