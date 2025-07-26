using backend.Models.Dto.Meal;
using backend.Models.Entity;
using backend.Models.Enum;

namespace backend.Extention
{
    public static class MealExtention
    {
        public static void UpdateFromMealDto (this Meal meal, UpdateMealDto dto)
        {
            meal.Title = dto.Title ?? meal.Title;
            meal.Description = dto.Description ?? meal.Description;
            meal.MaxParticipant = dto.MaxParticipant ?? meal.MaxParticipant;
            meal.RestaurantName = dto.RestaurantName ?? meal.RestaurantName;
            meal.RestaurantAddress = dto.RestaurantAddress ?? meal.RestaurantAddress;
            meal.MealDate = dto.MealDate ?? meal.MealDate;
            meal.Tags = dto.Tags ?? meal.Tags;
            
            meal.UpdatedAt = DateTimeOffset.UtcNow;
        }

        public static MealStatus GetRealTimeStatus (this Meal meal)
        {
            if (meal.Status == MealStatus.Completed || meal.Status == MealStatus.Cancelled)
                return meal.Status;
;
            if (meal.MealDate < DateTime.UtcNow)
                return MealStatus.Completed;

            return meal.Status;
        }

        public static bool IsExpired (this Meal meal)
        {
            return meal.MealDate < DateTime.UtcNow;
        }
    }
}
