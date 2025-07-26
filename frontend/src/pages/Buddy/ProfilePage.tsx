import { useParams } from "react-router-dom";
import type { UserProfile } from "../../types";
import { useContext, useEffect, useState } from "react";
import PublicUserProfile from "../../components/User/PublicUserProfile";
import { apiClient, authClient } from "../../hook/api";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

function PublicUserProfilePage() {
  const { id } = useParams();
  const [profileUser, setProfileUser] = useState<UserProfile>();
  const { setPendingId, showError } = useContext(AppContext);
  const navigate = useNavigate();

  const fetchProfileUser = async () => {
    if (!id) {
      showError("No id in params!");
      return;
    }

    try {
      const response = await apiClient.get(`/user/${id}`);

      if (response.status !== 200) {
        showError("Error in fetching profile user");
        return;
      }

      const profileUserData = response.data;
      setProfileUser(profileUserData);
    } catch (error) {
      showError("Error in fetching profile");
    }
  };

  const handleMessage = async (userId: number, userName: string) => {
    try {
      const response = await authClient.post("/chat/private", {
        TargetUserId: userId,
        TargetUserName: userName,
        Description: `Chat Room with ${userName}`,
      });

      if (response.status !== 200) {
        showError("Cannot send message to this user");
      }

      const roomId = response.data;
      setPendingId(roomId);
      navigate("/messages");
    } catch (error) {
      showError("Cannot send message to user");
    }
  };

  useEffect(() => {
    fetchProfileUser();
  }, [id]);

  if (!profileUser) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {profileUser && (
        <PublicUserProfile
          user={profileUser}
          handleMessage={() => handleMessage(profileUser.uid, profileUser.name)}
        />
      )}
    </>
  );
}

export default PublicUserProfilePage;
