using backend.Models.Enum;
using System.ComponentModel.DataAnnotations;

namespace backend.Models.Entity
{
    public class MealParticipant
    {
        public int Pid { get; set; }

        public required int MealId { get; set; }

        public required int UserId { get; set; }

        public DateTimeOffset JoinedAt { get; set; } = DateTimeOffset.UtcNow;

        public MealParticipateStatus ParticipationStatus { get; set; } = MealParticipateStatus.joined;

        public virtual Meal Meal { get; set; } = null!;
        public virtual User User { get; set; } = null!;
    }
}
