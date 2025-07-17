type AvatarProps = {
  userId: number;
  avatar: string;
  alt?: string;
};

function MealParticipantAvatar({
  avatar,
  userId,
  alt = "avatar",
}: AvatarProps) {
  const isEmoji = !avatar.startsWith("/avatars");

  if (isEmoji) {
    return (
      <span
        className="inline-flex items-center justify-center w-8 h-8 rounded-full text-lg  bg-gray-200 dark:bg-gray-700 border border-white dark:border-gray-800"
        role="img"
        aria-label={alt}
        key={userId}
      >
        {avatar}
      </span>
    );
  }

  const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5050";
  const avatarUrl = avatar.startsWith("/") ? `${baseUrl}${avatar}` : avatar;
  return (
    <img
      src={avatarUrl}
      key={userId}
      alt={alt}
      className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600"
    />
  );
}

export default MealParticipantAvatar;
