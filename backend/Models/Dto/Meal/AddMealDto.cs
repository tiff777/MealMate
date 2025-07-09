namespace backend.Models.Dto.Meal
{
    public class AddMealDto
    {
        public required string Title { get; set; } = "";
        public required string Description { get; set; } = "";
        public required int MaxParticipant { get; set; }
        public required string RestaurantName { get; set; } = "";
        public required string RestaurantAddress { get; set; } = "";
        public DateTimeOffset MealDate { get; set; }
        public List<String>? Tags { get; set; }
        public int HostId { get; set; }
    }
}
