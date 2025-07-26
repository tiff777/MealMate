import { useContext } from "react";
import type { UserProfile } from "../../types";
import formatDate from "../../util/dateUtils";
import ButtonFactory from "../Button/ButtonFactory";
import UserAvatar from "./UserAvatar";
import { FiUser, FiHeart, FiCalendar, FiMapPin, FiStar } from "react-icons/fi";
import { AppContext } from "../../context/AppContext";

function PublicUserProfile({
  user,
  handleMessage,
}: {
  user: UserProfile;
  handleMessage: () => void;
}) {
  const { isAuthenticated, user: currentUser } = useContext(AppContext);
  return (
    <>
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Header Section - Responsive */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 transition-colors">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            {/* Avatar - Larger on desktop */}
            <div className="flex-shrink-0">
              <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28">
                <UserAvatar
                  avatar={user.avatar}
                  userId={user.uid}
                  isOnline={user.isOnline}
                  size="lg"
                />
              </div>
            </div>

            {/* User Info - Responsive layout */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {user.name}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
                    {user.bio}
                  </p>
                </div>

                {/* Message Button */}
                <div className="flex-shrink-0 w-full sm:w-auto">
                  {isAuthenticated && currentUser?.uid !== user.uid && (
                    <ButtonFactory
                      type="message"
                      message="Send Message"
                      onClick={() => handleMessage()}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid - Responsive 2-column layout on larger screens */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Interests Section */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 transition-colors">
              <div className="flex items-center gap-2 mb-4">
                <FiHeart className="w-5 h-5 text-orange-500" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Interests
                </h3>
              </div>

              {user.interests.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                  No interests shared yet
                </p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {user.interests.map((interest, index) => (
                    <span
                      key={index}
                      className="px-3 py-2 bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 text-orange-800 dark:text-orange-200 rounded-full text-sm font-medium hover:shadow-md transition-all duration-200 transform hover:scale-105"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Preferred Cuisines Section */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 transition-colors">
              <div className="flex items-center gap-2 mb-4">
                <FiStar className="w-5 h-5 text-orange-500" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Preferred Cuisines
                </h3>
              </div>

              {user.preferredCuisines.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                  No cuisine preferences set
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {user.preferredCuisines.map((cuisine, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                    >
                      <span className="text-gray-700 dark:text-gray-200 font-medium">
                        {cuisine}
                      </span>
                      <span className="text-orange-500 text-lg">⭐</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Hosted Meals Section */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 transition-colors">
              <div className="flex items-center gap-2 mb-4">
                <FiUser className="w-5 h-5 text-orange-500" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Hosted Meals
                </h3>
                <span className="ml-auto bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200 px-2 py-1 rounded-full text-sm font-medium">
                  {user.hostedMeals.length}
                </span>
              </div>

              <div className="space-y-3">
                {user.hostedMeals.length === 0 ? (
                  <div className="text-center py-8">
                    <FiCalendar className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                    <p className="text-gray-500 dark:text-gray-400">
                      No hosted meals yet
                    </p>
                  </div>
                ) : (
                  user.hostedMeals.map((meal) => (
                    <div
                      key={meal.mid}
                      className="border border-gray-200 dark:border-gray-600 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200 hover:shadow-md group"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors line-clamp-1">
                            {meal.title}
                          </h4>
                          <div className="flex items-center gap-2 mt-1">
                            <FiCalendar className="w-4 h-4 text-gray-400" />
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {formatDate(new Date(meal.mealDate))}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Joined Meals Section */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 transition-colors">
              <div className="flex items-center gap-2 mb-4">
                <FiMapPin className="w-5 h-5 text-orange-500" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Joined Meals
                </h3>
                <span className="ml-auto bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-2 py-1 rounded-full text-sm font-medium">
                  {user.joinedMeals.length}
                </span>
              </div>

              <div className="space-y-3">
                {user.joinedMeals.length === 0 ? (
                  <div className="text-center py-8">
                    <FiMapPin className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                    <p className="text-gray-500 dark:text-gray-400">
                      No joined meals yet
                    </p>
                  </div>
                ) : (
                  user.joinedMeals.map((meal) => (
                    <div
                      key={meal.mid}
                      className="border border-gray-200 dark:border-gray-600 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200 hover:shadow-md group"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors line-clamp-1">
                            {meal.title}
                          </h4>
                          <div className="flex items-center gap-2 mt-1">
                            <FiCalendar className="w-4 h-4 text-gray-400" />
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {formatDate(new Date(meal.mealDate))}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PublicUserProfile;
