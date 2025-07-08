using backend.Models.Dto.Meal;
using backend.Models.Entity;

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
            meal.mealDate = dto.MealDate ?? meal.mealDate;
            meal.Tags = dto.Tags ?? meal.Tags;
            
            meal.UpdatedAt = DateTimeOffset.UtcNow;
        }
    }
}
