using System.ComponentModel.DataAnnotations;

namespace backend.Models.Dto.Meal
{
    public class UpdateMealDto
    {
        [StringLength(100, ErrorMessage = "Title cannot exceed 100 characters")]
        public string? Title { get; set; }

        [StringLength(500, ErrorMessage = "Description cannot exceed 500 characters")]
        public string? Description { get; set; }

        [Range(1, 100, ErrorMessage = "MaxParticipant must be between 1 and 100")]
        public int? MaxParticipant { get; set; }

        [StringLength(200, ErrorMessage = "Restaurant name cannot exceed 200 characters")]
        public string? RestaurantName { get; set; }

        [StringLength(300, ErrorMessage = "Restaurant address cannot exceed 300 characters")]
        public string? RestaurantAddress { get; set; }
        public DateTimeOffset? MealDate { get; set; }
        public List<String>? Tags { get; set; }
    }
}
