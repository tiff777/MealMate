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
      {/* Sidebar */}
      <div className="w-1/4 bg-white dark:bg-gray-800 rounded-lg shadow p-2 space-y-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`w-full text-left px-4 py-2 rounded-md font-medium transition-colors ${
              activeTab === tab.id
                ? "bg-gradient-to-r from-rose-400 to-rose-300 text-white"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </>
  );
}

export default SettingNavBar;
