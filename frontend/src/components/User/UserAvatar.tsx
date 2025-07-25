type AvatarProps = {
  userId: number;
  isOnline: boolean;
  avatar: string;
  alt?: string;
  size?: "xs" | "sm" | "md" | "lg";
};

function UserAvatar({
  avatar,
  userId,
  alt = "avatar",
  isOnline,
  size = "md",
}: AvatarProps) {
  const isEmoji = !avatar.startsWith("/avatars");
  const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5050";
  const avatarUrl = avatar.startsWith("/") ? `${baseUrl}${avatar}` : avatar;
  const statusDotColor = isOnline ? "bg-green-400" : "bg-red-400";

  const sizeClasses =
    size === "lg"
      ? "w-16 h-16"
      : size === "md"
      ? "w-12 h-12"
      : size === "sm"
      ? "w-10 h-10"
      : "w-8 h-8";

  return (
    <div className={`relative ${sizeClasses}`}>
      {isEmoji ? (
        <span
          className={`inline-flex items-center justify-center ${sizeClasses} rounded-full text-lg bg-gray-200 dark:bg-gray-700 text-white border border-white shadow`}
          role="img"
          aria-label={alt}
          key={userId}
        >
          {avatar}
        </span>
      ) : (
        <img
          src={avatarUrl}
          key={userId}
          alt={alt}
          className={`${sizeClasses} rounded-full border border-gray-300 dark:border-gray-600 object-cover `}
        />
      )}

      {/* Online/offline dot */}
      <span
        className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white dark:border-gray-800 ${statusDotColor}`}
      ></span>
    </div>
  );
}

export default UserAvatar;
