import { useMemo } from "react";
import type { MealWithParticipants } from "../types";

type Filters = {
  availability: string;
  tag: string;
  searchText: string;
};

export function useFilteredMeals(
  meals: MealWithParticipants[],
  filters: Filters
) {
  return useMemo(() => {
    return meals.filter((meal) => {
      console.log("Test meal in filter: ", meal);

      if (filters.availability === "available") {
        if (
          meal.currentParticipant >= meal.maxParticipant ||
          meal.realTimeStatus !== 0
        )
          return false;
      }

      if (filters.availability === "soon") {
        if (meal.realTimeStatus !== 0) return false;
      }

      if (filters.availability === "completed") {
        if (meal.realTimeStatus !== 2) return false;
      }

      // Tag
      if (filters.tag && !meal.tags.includes(filters.tag)) {
        return false;
      }

      const text = filters.searchText.trim().toLowerCase();
      if (text && !meal.title.toLowerCase().includes(text)) {
        return false;
      }

      return true;
    });
  }, [meals, filters]);
}
