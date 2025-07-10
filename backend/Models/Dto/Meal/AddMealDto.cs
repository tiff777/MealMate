using System.ComponentModel.DataAnnotations;

namespace backend.Models.Dto.Meal
{
    public class AddMealDto
    {
        [Required(ErrorMessage = "Title is required")]
        [StringLength(100, ErrorMessage = "Title cannot exceed 100 characters")]
        public required string Title { get; set; } = "";

        [Required(ErrorMessage = "Description is required")]
        [StringLength(500, ErrorMessage = "Description cannot exceed 500 characters")]
        public required string Description { get; set; } = "";

        [Required(ErrorMessage = "MaxParticipant is required")]
        [Range(1, 15, ErrorMessage = "MaxParticipant must be between 1 and 15")]
        public required int MaxParticipant { get; set; }

        [Required(ErrorMessage = "RestaurantName is required")]
        [StringLength(200, ErrorMessage = "Restaurant name cannot exceed 200 characters")]
        public required string RestaurantName { get; set; } = "";

        [Required(ErrorMessage = "RestaurantAddress is required")]
        [StringLength(300, ErrorMessage = "Restaurant address cannot exceed 300 characters")]
        public required string RestaurantAddress { get; set; } = "";
        public DateTimeOffset MealDate { get; set; }
        public List<String>? Tags { get; set; }
    }
}
