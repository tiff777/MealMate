import type { UserProfile } from "../../types";
import formatDate from "../../util/dateUtils";
import ButtonFactory from "../Button/ButtonFactory";
import UserAvatar from "./UserAvatar";

function PublicUserProfile({ user }: { user: UserProfile }) {
  const handleMessage = () => {
    console.log("Send message");
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <UserAvatar
          avatar={user.avatar}
          userId={user.uid}
          isOnline={user.isOnline}
        />

        <div>
          <h2 className="text-2xl font-semibold">{user.name}</h2>
          <p className="text-gray-500">{user.bio}</p>
        </div>

        <ButtonFactory
          type="message"
          message="Message"
          onClick={() => handleMessage()}
        />
      </div>

      <div className="bg-white rounded-2xl p-6 mb-4 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-gray-900 mb-3">Interests</h3>
        <div className="flex flex-wrap gap-2">
          {user.interests.map((interest, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium"
            >
              {interest}
            </span>
          ))}
        </div>
      </div>

      {/* Cuisines */}
      <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-gray-900 mb-3">Preferred Cuisines</h3>
        <div className="grid grid-cols-2 gap-2">
          {user.preferredCuisines.map((cuisine, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
            >
              <span className="text-gray-700 font-medium">{cuisine}</span>
              <span className="text-orange-500">⭐</span>
            </div>
          ))}
        </div>
      </div>

      {/* Hosted Meals */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Hosted Meals</h3>
        <div className="space-y-2">
          {user.hostedMeals.length === 0 && (
            <p className="text-gray-500">No hosted meals yet.</p>
          )}
          {user.hostedMeals.map((meal) => (
            <div
              key={meal.mid}
              className="border p-2 rounded hover:bg-gray-50 flex justify-between"
            >
              <div>
                <p className="font-medium">{meal.title}</p>
                <p className="text-sm text-gray-500">
                  {formatDate(new Date(meal.mealDate))}
                </p>
              </div>
              <a
                href={`/meals/${meal.mid}`}
                className="text-blue-600 hover:underline"
              >
                View
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Joined Meals */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Joined Meals</h3>
        <div className="space-y-2">
          {user.joinedMeals.length === 0 && (
            <p className="text-gray-500">No joined meals yet.</p>
          )}
          {user.joinedMeals.map((meal) => (
            <div
              key={meal.mid}
              className="border p-2 rounded hover:bg-gray-50 flex justify-between"
            >
              <div>
                <p className="font-medium">{meal.title}</p>
                <p className="text-sm text-gray-500">
                  {formatDate(new Date(meal.mealDate))}
                </p>
              </div>
              <a
                href={`/meals/${meal.mid}`}
                className="text-blue-600 hover:underline"
              >
                View
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PublicUserProfile;
