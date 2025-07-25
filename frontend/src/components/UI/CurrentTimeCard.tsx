import { useState, useEffect } from "react";

function CurrentTimeCard() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeString = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const dateString = now.toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="bg-gradient-to-r from-orange-400 to-red-400 dark:from-gray-700 dark:to-gray-600 text-white rounded-xl shadow dark:shadow-gray-900/30 p-4 text-center border dark:border-gray-600">
      <div className="text-2xl font-bold">{timeString}</div>
      <div className="text-lg font-semibold">{dateString}</div>
    </div>
  );
}

export default CurrentTimeCard;
