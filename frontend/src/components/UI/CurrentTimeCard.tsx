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
    <div className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-xl shadow p-4 text-center">
      <div className="text-2xl font-bold">{timeString}</div>
      <div className="text-lg font-semibold">{dateString}</div>
    </div>
  );
}

export default CurrentTimeCard;
