using backend.Models.Enum;

namespace backend.Models.Dto.Meal
{
    public class ShowMealDto
    {
        public int Mid { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int MaxParticipant { get; set; }
        public int CurrentParticipant { get; set; }
        public string RestaurantName { get; set; } = string.Empty;
        public string RestaurantAddress { get; set; } = string.Empty;
        public DateTimeOffset MealDate { get; set; }
        public List<string>? Tags { get; set; }
        public MealStatus RealTimeStatus { get; set; }
        public DateTimeOffset CreatedAt { get; set; }
        public int HostId { get; set; }
        public int? ChatRoomId { get; set; }

        public List<ParticipantDto> Participants { get; set; } = new();
    }
}
