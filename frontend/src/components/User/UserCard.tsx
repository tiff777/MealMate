import type { User } from "../../types";
import ButtonFactory from "../Button/ButtonFactory";
import UserAvatar from "./UserAvatar";
import { useNavigate } from "react-router-dom";
import { FiMapPin, FiUser, FiHeart } from "react-icons/fi";
import TagListDisplay from "../UI/TagListDisplay";

function UserCard({
  user,
  handleMessage,
}: {
  user: User;
  handleMessage: (userId: number, userName: string) => void;
}) {
  const navigate = useNavigate();

  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/30 overflow-hidden hover:shadow-2xl dark:hover:shadow-gray-900/50 transition-all duration-300 transform hover:scale-[1.02] cursor-pointer w-full">
      {/* Top gradient bar */}
      <div className="absolute top-0 left-0 right-0 h-1 rounded-t-xl bg-gradient-to-r from-[#FF7F7F] to-[#FFA07A] dark:from-[#0F0F23] dark:via-[#1A1A2E] dark:to-[#16213E]"></div>

      <div className="p-4 sm:p-6">
        {/* Header section - responsive layout */}
        <div className="flex items-start gap-3 sm:gap-4 mb-4">
          <div className="relative flex-shrink-0">
            <div className="w-12 h-12 sm:w-14 sm:h-14">
              <UserAvatar
                avatar={user.avatar}
                userId={user.uid}
                alt={user.name}
                isOnline={user.isOnline}
              />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-300 leading-tight">
                  {user.name}
                </h2>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
                  <FiUser className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="truncate">{user.major}</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-500 mt-1">
                  <FiMapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="truncate">{user.university}</span>
                </div>
              </div>

              {/* Status badge - responsive */}
              <div
                className={`px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ${
                  user.isOnline
                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                    : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
                }`}
              >
                <span className="hidden sm:inline">
                  {user.isOnline ? "Online" : "Offline"}
                </span>
                <span className="sm:hidden">
                  {user.isOnline ? "Online" : "Offline"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bio section - responsive text */}
        <div className="mb-4">
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed line-clamp-2 sm:line-clamp-3 break-words min-h-[5rem]">
            {user.bio ||
              "Hey there! I'm looking forward to meeting new people and exploring great food together! 🍽️"}
          </p>
        </div>

        {/* Interests tags - responsive display */}
        {user.interests.length > 0 && (
          <TagListDisplay tags={user.interests} maxCharsPerRow={35} />
        )}

        {/* Preferred cuisines - responsive */}
        <div className="mb-4 sm:mb-6">
          <div className="flex items-start sm:items-center gap-2 p-2.5 sm:p-3 bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 border border-rose-200 dark:border-rose-800/30 rounded-lg">
            <FiHeart className="w-3 h-3 sm:w-4 sm:h-4 text-rose-500 flex-shrink-0 mt-0.5 sm:mt-0" />
            <div className="min-w-0 flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <span className="text-xs sm:text-sm font-medium text-rose-700 dark:text-rose-300 flex-shrink-0">
                  Preferred:
                </span>
                <span className="text-xs sm:text-sm text-rose-600 dark:text-rose-400 truncate">
                  {user.preferredCuisines.length > 0
                    ? user.preferredCuisines.join(", ")
                    : "Open to anything! 🌟"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <ButtonFactory
            type="view"
            message="View Profile"
            onClick={() => navigate(`/profile/${user.uid}`)}
          />
          <ButtonFactory
            type="message"
            message="Message"
            onClick={() => handleMessage(user.uid, user.name)}
          />
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-3 right-3 w-2 h-2 bg-orange-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute inset-0 rounded-2xl transition-colors duration-300 pointer-events-none"></div>
    </div>
  );
}

export default UserCard;
