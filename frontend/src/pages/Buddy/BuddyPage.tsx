import { useContext, useState, useEffect, use } from "react";
import { AppContext } from "../../context/AppContext";
import { apiClient }  from "../../hook/api";
import UserCard from "../../components/User/UserCard";
import type { User } from "../../types";

function BuddyPage() {
  const { setLoading } = useContext(AppContext);
  const [users, setUsers] = useState<User[]>([]);

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

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-4 space-y-4 bg-gray-150 rounded-xl shadow-md">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4"></h1>

      <div className="flex justify-between items-center mb-4">
        <div className="text-2xl font-semibold flex items-center gap-2 text-gray-900 dark:text-[#f9fafb] mb-4">
          🍕 Available for Lunch
        </div>
        <div className="flex gap-4 text-sm text-gray-600 dark:text-[#f9fafb]  ">
          <span>28 students online</span>
        </div>
      </div>

      <hr />

      {users.length > 0 ? (
        <div className="flex flex-col gap-4">
          {users.map((user) => (
            <UserCard key={user.uid} user={user} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">No meals available</p>
      )}
    </div>
  );
}

export default BuddyPage;
