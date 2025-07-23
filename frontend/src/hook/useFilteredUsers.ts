import { useMemo } from "react";
import type { User } from "../types";

type Filters = {
  interest: string;
  cuisine: string;
  searchText: string;
};

export function useFilteredUsers(users: User[], filters: Filters) {
  return useMemo(() => {
    return users.filter((user) => {
      // Interest
      if (filters.interest && !user.interests.includes(filters.interest)) {
        return false;
      }

      // Cuisine
      if (
        filters.cuisine &&
        !user.preferredCuisines.includes(filters.cuisine)
      ) {
        return false;
      }

      const text = filters.searchText.trim().toLowerCase();
      if (
        text &&
        !user.name.toLowerCase().includes(text) &&
        !user.major.toLowerCase().includes(text)
      ) {
        return false;
      }

      return true;
    });
  }, [users, filters]);
}
