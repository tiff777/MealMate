import { useContext, useState, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { apiClient, authClient } from "../../hook/api";
import UserCard from "../../components/User/UserCard";
import BuddyFilterSidebar from "../../components/User/BuddyFilter";
import type { User } from "../../types";
import { useNavigate } from "react-router-dom";
import { useFilteredUsers } from "../../hook/useFilteredUsers";
import { FiUsers } from "react-icons/fi";
import PageHeader from "../../components/UI/PageHeader";

function BuddyPage() {
  const { setLoading, setPendingId, user, showError } = useContext(AppContext);
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
      const usersData = response.data.users || response.data;

      if (user) {
        const filteredUsers = usersData.filter((u: any) => u.uid !== user.uid);
        setUsers(filteredUsers);
        return;
      }
      setUsers(usersData);
    } catch (error) {
      showError(`Error fetching users: ${error}`);
    } finally {
      setLoading(false);
    }
  }

  const handleMessage = async (userId: number, userName: string) => {
    try {
      const response = await authClient.post("/chat/private", {
        TargetUserId: userId,
        TargetUserName: userName,
        Description: `Chat Room with ${userName}`,
      });

      if (response.status !== 200) {
        showError("Cannot send message to this user");
      }

      const roomId = response.data;

      setPendingId(roomId);
      navigate("/messages");
    } catch (error) {
      showError("Cannot send message to this user");
    }
  };

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));

    setSidebarOpen(false);
  };

  const filteredUsers = useFilteredUsers(users, filters);

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.interest !== "") count++;
    if (filters.cuisine !== "") count++;
    if (filters.searchText) count++;
    return count;
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-4 bg-gray-150 rounded-xl shadow-md flex gap-4 ">
      <BuddyFilterSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        filters={filters}
        onFilterChange={handleFilterChange}
      />

      <div className="flex-1 space-y-4">
        <PageHeader
          title="Find Buddy"
          icon={<FiUsers className="w-6 h-6" />}
          subtitle="Connect with amazing people who share your interests"
          onFilterClick={() => setSidebarOpen(true)}
          activeFiltersCount={getActiveFiltersCount()}
          borderType="bottomAccent"
        />

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
