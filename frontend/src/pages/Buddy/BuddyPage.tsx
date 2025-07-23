import { useContext, useState, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { apiClient, authClient } from "../../hook/api";
import UserCard from "../../components/User/UserCard";
import BuddyFilterSidebar from "../../components/User/BuddyFilter";
import type { User } from "../../types";
import { useNavigate } from "react-router-dom";
import { useFilteredUsers } from "../../hook/useFilteredUsers";

function BuddyPage() {
  const { setLoading, setPendingId } = useContext(AppContext);
  const [users, setUsers] = useState<User[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [filters, setFilters] = useState({
    interest: "",
    cuisine: "",
    searchText: "",
  });

  const navigate = useNavigate();

  async function fetchUsers() {
    setLoading(true);
    try {
      const response = await apiClient.get("/user");
      //   console.log("Test response: ", response);

      const usersData = response.data;
      //   console.log(usersData);
      setUsers(usersData);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleMessage = async (userId: number, userName: string) => {
    try {
      console.log(`Message with ${userId}`);

      const response = await authClient.post("/chat/private", {
        TargetUserId: userId,
        TargetUserName: userName,
        Description: `Chat Room with ${userName}`,
      });

      if (response.status !== 200) {
        console.log("Cannot send message to this user");
      }

      const roomId = response.data;
      console.log("Test room id: ", roomId);

      setPendingId(roomId);
      navigate("/messages");
    } catch (error) {
      console.log("Cannot send message to user");
    }
  };

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const filteredUsers = useFilteredUsers(users, filters);

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-4 bg-gray-150 rounded-xl shadow-md flex gap-4">
      {/* 左邊 Sidebar */}
      <BuddyFilterSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        filters={filters}
        onFilterChange={handleFilterChange}
      />

      {/* 右邊內容 */}
      <div className="flex-1 space-y-4">
        <div className="flex justify-between items-center mb-4">
          <div className="text-2xl font-semibold flex items-center gap-2 text-gray-900 dark:text-[#f9fafb] mb-4">
            🍕 Available for Lunch
          </div>
          <div className="flex gap-4 text-sm text-gray-600 dark:text-[#f9fafb]">
            <span>28 students online</span>
          </div>
        </div>

        <hr />

        {filteredUsers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredUsers.map((user) => (
              <UserCard
                key={user.uid}
                user={user}
                handleMessage={handleMessage}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">No users available</p>
        )}
      </div>
    </div>
  );
}

export default BuddyPage;
