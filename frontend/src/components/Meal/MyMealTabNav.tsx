interface MyMealTabNavProps {
  createLength: number;
  joinedLength: number;
  activeTab: "created" | "joined";
  onTabChange: (tab: "created" | "joined") => void;
}

function MyMealTabNav({
  createLength,
  joinedLength,
  activeTab,
  onTabChange,
}: MyMealTabNavProps) {
  const tabs = [
    { id: "created", label: "My Created Meals", count: createLength },
    { id: "joined", label: "Meals I Joined", count: joinedLength },
  ] as const;

  return (
    <div className="w-full shadow rounded-lg">
      <div className="relative bg-white dark:bg-gray-700 rounded-lg px-1.5 py-1.5 mb-6">
        <div
          className="absolute  top-2 bottom-2  bg-gradient-to-r from-orange-400 to-red-500  dark:from-gray-600 dark:to-gray-700 text-white shadow-md border dark:border-gray-500 rounded-md transition-all duration-300 ease-in-out"
          style={{
            transform: `translateX(${
              tabs.findIndex((t) => t.id === activeTab) * 100
            }%)`,
            width: `calc(${100 / tabs.length}% - 8px)`,
          }}
        />
        {/* Tab buttons */}
        <div className="relative flex gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors relative z-10
                ${
                  activeTab === tab.id
                    ? "text-white"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                }`}
            >
              {tab.label}
              <span
                className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                  activeTab === tab.id
                    ? "bg-white/20 text-white"
                    : "bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-300"
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyMealTabNav;
