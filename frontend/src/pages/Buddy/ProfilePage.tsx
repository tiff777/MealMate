import { useParams } from "react-router-dom";
import type { UserProfile } from "../../types";
import { useEffect, useState } from "react";
import PublicUserProfile from "../../components/User/PublicUserProfile";
import { apiClient } from "../../hook/api";

function PublicUserProfilePage() {
  const { id } = useParams();
  const [profileUser, setProfileUser] = useState<UserProfile>();

  const fetchProfileUser = async () => {
    console.log("in fetching");

    if (!id) {
      console.error("No id in params!");
      return;
    }

    try {
      const response = await apiClient.get(`/user/${id}`);
      console.log("Test response: ", response);

      if (response.status !== 200) {
        console.log("Error in fetching profile user");
        return;
      }
      console.log("Test response data: ", response.data);

      const profileUserData = response.data;
      console.log("Test user: ", profileUserData);
      setProfileUser(profileUserData);
    } catch (error) {
      console.log("Error in fetching profile");
    }
  };

  useEffect(() => {
    fetchProfileUser();
  }, [id]);

  if (!profileUser) {
    return <div>Loading...</div>;
  }

  return <>{profileUser && <PublicUserProfile user={profileUser} />}</>;
}

export default PublicUserProfilePage;
