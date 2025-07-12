type AvatarProps = {
  userId: string;
  avatar: string;
  alt?: string;
};

function MealParticipantAvatar({
  avatar,
  userId,
  alt = "avatar",
}: AvatarProps) {
  const isEmoji = /\p{Emoji}/u.test(avatar);

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

  return (
    <img
      src={avatar}
      key={userId}
      alt={alt}
      className="w-6 h-6 rounded-full border border-gray-300 dark:border-gray-600"
    />
  );
}

export default MealParticipantAvatar;
