import type { User } from "../../types";
import JoinButton from "../Button/JoinButton";
import ButtonFactory from "../Button/ButtonFactory";
import UserAvatar from "./UserAvatar";
import { useNavigate } from "react-router-dom";

function UserCard({
  user,
  handleMessage,
}: {
  user: User;
  handleMessage: (userId: number, userName: string) => void;
}) {
  const navigate = useNavigate();
  return (
    <>
      <div
        className={`relative bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-900/20 p-4 dark:border-gray-700 space-y-2 transition-colors overflow-hidden`}
      >
        <div className="absolute top-0 left-0 right-0 h-1 rounded-t-xl bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 dark:from-pink-500/30 dark:via-purple-500/30 dark:to-blue-500/30"></div>
        <div className="flex gap-4">
          <UserAvatar avatar={user.avatar} userId={user.uid} alt={user.name} />

          <div className="flex-1">
            <div className="flex justify-between">
              <div>
                <div className="font-medium text-gray-900 dark:text-[#f9fafb] ">
                  {user.name}
                </div>
                <div className="text-sm text-gray-500">{user.major}</div>
                <div className="text-sm text-gray-500">{user.university}</div>
              </div>
            </div>

            <p className="mt-2 text-sm text-gray-700 dark:text-[#f9fafb]">
              {user.bio}
            </p>

            {user.interests.length > 0 && (
              <div className="flex gap-1 mt-2 flex-wrap">
                {user.interests.map((interest, i) => (
                  <span
                    key={i}
                    className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-2 text-sm border rounded p-2 text-rose-500 border-rose-300">
              Preferred: {user.preferredCuisines.join(", ") || "Not specified"}
            </div>

            <div className="flex gap-2 mt-2">
              <ButtonFactory
                type="join"
                onClick={() => navigate(`/profile/${user.uid}`)}
                message="View More"
              />
              <ButtonFactory
                type="message"
                onClick={() => handleMessage(user.uid, user.name)}
                message="Message"
              />
              {/* <JoinButton message="Invite Lunch" /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserCard;
