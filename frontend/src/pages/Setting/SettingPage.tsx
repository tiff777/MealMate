import { useState, useContext, useEffect, use } from "react";
import SettingNavBar from "../../components/User/SettingNavBar";
import UserPasswordForm from "../../components/User/UserPasswordForm";
import UserDeleteForm from "../../components/User/UserDeleteForm";
import type { UpdateUser, User } from "../../types";
import { AppContext } from "../../context/AppContext";
import UserProfileEditForm from "../../components/User/UserProfileEditForm";
import { authClient } from "../../hook/api";

type SettingsTab = "profile" | "password" | "account";

function SettingsPage() {
  const { user, updateUser, logoutUser } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");
  const [formData, setFormData] = useState<User>(user!);

  const handleUpdateUser = async () => {
    console.log("Test update: ", formData);
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
        console.log("Cannot update user");
      }

      const updateUserData = response.data.user;
      updateUser(updateUserData);
      console.log("Update user: ", updateUser);

      setFormData(updateUserData);
    } catch (error) {
      console.log("Error of updating user: ", user);
    }
  };

  const handleOldPasswordCheck = async (oldPassword: string) => {
    const response = await authClient.post("/user/password/verify", {
      oldPassword,
    });

    return response.status === 200;
  };

  const handleChangePassword = async (newPassword: string) => {
    const response = await authClient.patch("user/password", { newPassword });
    if (response.status !== 200) {
      console.log("Cannot change password");
      return;
    }

    logoutUser();
  };

  const handleDeleteAccount = () => {
    console.log("Delete Account");
  };

  useEffect(() => {
    if (user) {
      setFormData(user);
      console.log("Test user: ", user);
    }
  }, [user]);

  if (!user || !formData) {
    return <div className="text-center mt-10 text-gray-500">Loading...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-2">Settings</h1>
      <p className="text-center text-gray-500 mb-6">
        Manage your account and personalize your MealMate experience
      </p>

      <div className="flex gap-6">
        <SettingNavBar activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Content */}
        <div className="flex-1 bg-white rounded shadow p-6">
          {activeTab === "profile" && (
            <UserProfileEditForm
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleUpdateUser}
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
    </div>
  );
}

export default SettingsPage;
