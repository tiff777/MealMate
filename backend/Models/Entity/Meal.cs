using System.ComponentModel.DataAnnotations;
using System.Reflection;
using System.Collections.Generic;
using backend.Models.Enum;


namespace backend.Models.Entity
{
    public class Meal
    {
        public int Mid { get; set; }
        public required string Title { get; set; }
        public required string Description { get; set; }
        public required int MaxParticipant { get; set; }
        public int CurrentParticipant { get; set; } = 1;

        public required string RestaurantName { get; set; }
        public required string RestaurantAddress { get; set; }

        public DateTimeOffset MealDate { get; set; }

        public List<String>? Tags { get; set; }
        public MealStatus Status { get; set; } = MealStatus.Upcoming;

        public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
        public DateTimeOffset UpdatedAt { get; set; } = DateTimeOffset.UtcNow;

        // Store the host user information
        public required int HostId { get; set; }
        public virtual User Host { get; set; } = null!;
        public virtual ICollection<MealParticipant> Participants { get; set; } = new List<MealParticipant>();
    }
}
