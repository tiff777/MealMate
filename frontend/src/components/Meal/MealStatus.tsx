function MealStatus({ status }: { status: number }) {
  type MealStatus = "upcoming" | "confirmed" | "completed" | "cancelled";
  const statusKeyMap: Record<number, string> = {
    0: "upcoming",
    1: "confirmed",
    2: "completed",
    3: "cancelled",
  };

  const statusColors: Record<MealStatus, string> = {
    confirmed:
      "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/20",
    upcoming:
      "text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20",
    completed:
      "text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/20",
    cancelled: "text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/20",
  };

  const statusKey = statusKeyMap[status] as MealStatus;
  return (
    <span
      className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[statusKey]}`}
    >
      {statusKey}
    </span>
  );
}

export default MealStatus;
