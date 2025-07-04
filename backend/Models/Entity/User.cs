using System.ComponentModel.DataAnnotations;

namespace backend.Models.Entity
{
    public class User
    {
        public int Uid { get; set; }

        public required string Name { get; set; }

        public required string Email { get; set; }

        public required string PasswordHash { get; set; }

        public string University { get; set; } = "Universiry of Auckland";
        public string Major { get; set; } = "";
        public string Bio { get; set; } = "";
        public string Avatar { get; set; } = "👤";


        public string[] Interests { get; set; } = new string[0];
        public string[] PreferredCuisines { get; set; } = new string[0];
        public string BudgetRange { get; set; } = "10-20";

        public bool IsOnline { get; set; } = false;
        public DateTimeOffset LastSeen { get; set; } = DateTimeOffset.UtcNow;

        public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
        public DateTimeOffset UpdatedAt { get; set; } = DateTimeOffset.UtcNow;

        public virtual ICollection<Meal> HostedMeals { get; set; } = new List<Meal>();
        public virtual ICollection<MealParticipant> ParticipatedMeals { get; set; } = new List<MealParticipant>();
    }
}
