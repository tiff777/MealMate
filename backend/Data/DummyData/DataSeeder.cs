using backend.Models.Entity;
using backend.Models.Enum;

namespace backend.Data.DummyData
{
    public static class DataSeeder
    {
        public static async Task SeedAsync(ApplicationDbContext context)
        {
            // Clear existing data
            if (context.MealParticipants.Any())
            {
                context.MealParticipants.RemoveRange(context.MealParticipants);
            }
            if (context.Meals.Any())
            {
                context.Meals.RemoveRange(context.Meals);
            }
            if (context.Users.Any())
            {
                context.Users.RemoveRange(context.Users);
            }

            await context.SaveChangesAsync();

            // Seed Users
            var users = DummyUsers.GetUsers();
            context.Users.AddRange(users);
            await context.SaveChangesAsync();

            // Get the generated user IDs
            var sophia = users[0];
            var emma = users[1];
            var marcus = users[2];
            var sophie = users[3];
            var alex = users[4];
            var maya = users[5];

            // Seed Meals with proper hostId
            var meals = new List<Meal>
            {
                new Meal
                {
                    Title = "Korean BBQ Adventure",
                    Description = "Let's try the best Korean BBQ in town! Perfect for sharing and getting to know each other.",
                    hostId = sophia.Uid,
                    MaxParticipant = 6,
                    CurrentParticipant = 4,
                    RestaurantName = "Mukbang Korean BBQ & Soup Buffet Restaurant",
                    RestaurantAddress = "480 Queen Street, Auckland Central, Auckland 1010",
                    mealDate = DateTimeOffset.UtcNow.AddHours(3),
                    Tags = new string[] { "Korean Food", "Social", "Weekend" },
                    status = MealStatus.Confirmed,
                    CreatedAt = DateTimeOffset.UtcNow.AddDays(-1),
                    UpdatedAt = DateTimeOffset.UtcNow
                },
                new Meal
                {
                    Title = "Pizza & Study Session",
                    Description = "Combining lunch with study time! Let's order pizza and work on our CS assignments together.",
                    hostId = sophia.Uid,
                    MaxParticipant = 5,
                    CurrentParticipant = 2,
                    RestaurantName = "Pizza Club - Central",
                    RestaurantAddress = "16 Darby Street Cnr. of Darby St. &, Elliott Street, Auckland 1010",
                    mealDate = DateTimeOffset.UtcNow.AddDays(1),
                    Tags = new string[] { "Study", "CS Students", "Pizza" },
                    status = MealStatus.Upcoming,
                    CreatedAt = DateTimeOffset.UtcNow.AddHours(-12),
                    UpdatedAt = DateTimeOffset.UtcNow
                },
                new Meal
                {
                    Title = "Coffee & Code Review",
                    Description = "Morning coffee break with fellow developers. Bring your laptops!",
                    hostId = sophia.Uid,
                    MaxParticipant = 4,
                    CurrentParticipant = 3,
                    RestaurantName = "Starbucks Symonds Street",
                    RestaurantAddress = "Tenancy G01, The Forte Building, 37 Symonds Street, Auckland 1010",
                    mealDate = DateTimeOffset.UtcNow.AddDays(2).AddHours(10),
                    Tags = new string[] { "Coffee", "Programming", "Morning" },
                    status = MealStatus.Upcoming,
                    CreatedAt = DateTimeOffset.UtcNow.AddHours(-6),
                    UpdatedAt = DateTimeOffset.UtcNow
                },
                new Meal
                {
                    Title = "Lunch with friends",
                    Description = "Casual lunch at the student union. Open to anyone!",
                    hostId = emma.Uid,
                    MaxParticipant = 5,
                    CurrentParticipant = 3,
                    RestaurantName = "Campus Food Court",
                    RestaurantAddress = "level 2, Kate Edger Information Commons, 2 Alfred Street, Auckland Central, Auckland 1010",
                    mealDate = DateTimeOffset.UtcNow.AddHours(2),
                    Tags = new string[] { "Casual", "Friends", "Quick Lunch" },
                    status = MealStatus.Confirmed,
                    CreatedAt = DateTimeOffset.UtcNow.AddHours(-1),
                    UpdatedAt = DateTimeOffset.UtcNow
                },
                new Meal
                {
                    Title = "Healthy Bowl Exploration",
                    Description = "Let's try the new healthy bowl place!",
                    hostId = marcus.Uid,
                    MaxParticipant = 4,
                    CurrentParticipant = 2,
                    RestaurantName = "Healthy Bowls",
                    RestaurantAddress = "321 Forest Ave, Auckland",
                    mealDate = DateTimeOffset.UtcNow.AddDays(1).AddHours(17),
                    Tags = new string[] { "Healthy", "Vegetarian", "New Place" },
                    status = MealStatus.Upcoming,
                    CreatedAt = DateTimeOffset.UtcNow.AddHours(-2),
                    UpdatedAt = DateTimeOffset.UtcNow
                },
                new Meal
                {
                    Title = "Welcome Lunch",
                    Description = "Welcome lunch for new students!",
                    hostId = sophie.Uid,
                    MaxParticipant = 6,
                    CurrentParticipant = 4,
                    RestaurantName = "Campus Food Court",
                    RestaurantAddress = "level 2, Kate Edger Information Commons, 2 Alfred Street, Auckland Central, Auckland 1010",
                    mealDate = DateTimeOffset.UtcNow.AddDays(-1),
                    Tags = new string[] { "Welcome", "First Years", "Social" },
                    status = MealStatus.Completed,
                    CreatedAt = DateTimeOffset.UtcNow.AddDays(-2),
                    UpdatedAt = DateTimeOffset.UtcNow.AddDays(-1)
                }
            };

            context.Meals.AddRange(meals);
            await context.SaveChangesAsync();

            // Seed MealParticipants with proper MealId and UserId
            var mealParticipants = new List<MealParticipant>
            {
                // Korean BBQ (meals[0]) - 4 participants
                new MealParticipant
                {
                    MealId = meals[0].Mid,
                    UserId = sophia.Uid,
                    ParticipationStatus = MealParticipateStatus.joined,
                    JoinedAt = DateTimeOffset.UtcNow.AddDays(-1)
                },
                new MealParticipant
                {
                    MealId = meals[0].Mid,
                    UserId = emma.Uid,
                    ParticipationStatus = MealParticipateStatus.joined,
                    JoinedAt = DateTimeOffset.UtcNow.AddHours(-22)
                },
                new MealParticipant
                {
                    MealId = meals[0].Mid,
                    UserId = marcus.Uid,
                    ParticipationStatus = MealParticipateStatus.joined,
                    JoinedAt = DateTimeOffset.UtcNow.AddHours(-19)
                },
                new MealParticipant
                {
                    MealId = meals[0].Mid,
                    UserId = alex.Uid,
                    ParticipationStatus = MealParticipateStatus.joined,
                    JoinedAt = DateTimeOffset.UtcNow.AddHours(-17)
                },
                
                // Pizza Study (meals[1]) - 2 participants
                new MealParticipant
                {
                    MealId = meals[1].Mid,
                    UserId = sophia.Uid,
                    ParticipationStatus = MealParticipateStatus.joined,
                    JoinedAt = DateTimeOffset.UtcNow.AddHours(-12)
                },
                new MealParticipant
                {
                    MealId = meals[1].Mid,
                    UserId = maya.Uid,
                    ParticipationStatus = MealParticipateStatus.joined,
                    JoinedAt = DateTimeOffset.UtcNow.AddHours(-11)
                },
                
                // Coffee Code (meals[2]) - 3 participants
                new MealParticipant
                {
                    MealId = meals[2].Mid,
                    UserId = sophia.Uid,
                    ParticipationStatus = MealParticipateStatus.joined,
                    JoinedAt = DateTimeOffset.UtcNow.AddHours(-6)
                },
                new MealParticipant
                {
                    MealId = meals[2].Mid,
                    UserId = emma.Uid,
                    ParticipationStatus = MealParticipateStatus.joined,
                    JoinedAt = DateTimeOffset.UtcNow.AddHours(-5)
                },
                new MealParticipant
                {
                    MealId = meals[2].Mid,
                    UserId = marcus.Uid,
                    ParticipationStatus = MealParticipateStatus.pending,
                    JoinedAt = DateTimeOffset.UtcNow.AddHours(-5)
                },
                
                // Lunch with friends (meals[3]) - 3 participants
                new MealParticipant
                {
                    MealId = meals[3].Mid,
                    UserId = emma.Uid,
                    ParticipationStatus = MealParticipateStatus.joined,
                    JoinedAt = DateTimeOffset.UtcNow.AddHours(-1)
                },
                new MealParticipant
                {
                    MealId = meals[3].Mid,
                    UserId = sophie.Uid,
                    ParticipationStatus = MealParticipateStatus.joined,
                    JoinedAt = DateTimeOffset.UtcNow.AddMinutes(-50)
                },
                new MealParticipant
                {
                    MealId = meals[3].Mid,
                    UserId = alex.Uid,
                    ParticipationStatus = MealParticipateStatus.joined,
                    JoinedAt = DateTimeOffset.UtcNow.AddMinutes(-42)
                },
                
                // Healthy Bowls (meals[4]) - 2 participants
                new MealParticipant
                {
                    MealId = meals[4].Mid,
                    UserId = marcus.Uid,
                    ParticipationStatus = MealParticipateStatus.joined,
                    JoinedAt = DateTimeOffset.UtcNow.AddHours(-2)
                },
                new MealParticipant
                {
                    MealId = meals[4].Mid,
                    UserId = maya.Uid,
                    ParticipationStatus = MealParticipateStatus.pending,
                    JoinedAt = DateTimeOffset.UtcNow.AddHours(-1).AddMinutes(-40)
                },
                
                // Welcome Lunch (meals[5]) - 4 participants (completed)
                new MealParticipant
                {
                    MealId = meals[5].Mid,
                    UserId = sophie.Uid,
                    ParticipationStatus = MealParticipateStatus.joined,
                    JoinedAt = DateTimeOffset.UtcNow.AddDays(-2)
                },
                new MealParticipant
                {
                    MealId = meals[5].Mid,
                    UserId = alex.Uid,
                    ParticipationStatus = MealParticipateStatus.joined,
                    JoinedAt = DateTimeOffset.UtcNow.AddDays(-2).AddHours(2)
                },
                new MealParticipant
                {
                    MealId = meals[5].Mid,
                    UserId = maya.Uid,
                    ParticipationStatus = MealParticipateStatus.joined,
                    JoinedAt = DateTimeOffset.UtcNow.AddDays(-2).AddHours(3)
                },
                new MealParticipant
                {
                    MealId = meals[5].Mid,
                    UserId = emma.Uid,
                    ParticipationStatus = MealParticipateStatus.left,
                    JoinedAt = DateTimeOffset.UtcNow.AddDays(-2).AddHours(4)
                }
            };

            context.MealParticipants.AddRange(mealParticipants);
            await context.SaveChangesAsync();
        }
    }
}