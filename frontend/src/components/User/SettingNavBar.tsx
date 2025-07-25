interface SettingsTabNavProps {
  activeTab: "profile" | "password" | "account";
  onTabChange: (tab: "profile" | "password" | "account") => void;
}

function SettingNavBar({ activeTab, onTabChange }: SettingsTabNavProps) {
  const tabs = [
    { id: "profile", label: "Profile" },
    { id: "password", label: "Modify Password" },
    { id: "account", label: "Account" },
  ] as const;

  return (
    <>
      <div className="block md:hidden mb-6">
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-1 transition-colors duration-200">
          <div className="flex space-x-1 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md"
                    : "text-gray-600 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="hidden md:block w-full md:w-1/4 lg:w-1/5">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm dark:shadow-gray-900/20 border border-gray-200 dark:border-gray-700 p-3 space-y-3 transition-colors duration-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-200 group ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md transform scale-[1.02]"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white hover:translate-x-1"
              }`}
            >
              <span className="flex items-center justify-between">
                {tab.label}
                {activeTab === tab.id && (
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                )}
              </span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export default SettingNavBar;
