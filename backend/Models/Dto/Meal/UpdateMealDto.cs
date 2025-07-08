namespace backend.Models.Dto.Meal
{
    public class UpdateMealDto
    {
        public string? Title { get; set; }
        public string? Description { get; set; }
        public int? MaxParticipant { get; set; }
        public string? RestaurantName { get; set; }
        public string? RestaurantAddress { get; set; }
        public DateTimeOffset? MealDate { get; set; }
        public string[]? Tags { get; set; }
    }
}
