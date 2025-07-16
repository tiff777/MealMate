using backend.Models.Entity;
using backend.Models.Enum;

namespace backend.Data.DummyData
{
    public static class DataSeeder
    {
        public static async Task SeedAsync(ApplicationDbContext context, IConfiguration configuration)
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
            var users = DummyUsers.GetUsers(configuration);
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
                    HostId = sophia.Uid,
                    MaxParticipant = 6,
                    CurrentParticipant = 4,
                    RestaurantName = "Mukbang Korean BBQ & Soup Buffet Restaurant",
                    RestaurantAddress = "480 Queen Street, Auckland Central, Auckland 1010",
                    MealDate = DateTimeOffset.UtcNow.AddHours(3),
                    Tags = new List<string> { "Korean Food", "Social", "Weekend" },
                    Status = MealStatus.Confirmed,
                    CreatedAt = DateTimeOffset.UtcNow.AddDays(-1),
                    UpdatedAt = DateTimeOffset.UtcNow
                },
                new Meal
                {
                    Title = "Pizza & Study Session",
                    Description = "Combining lunch with study time! Let's order pizza and work on our CS assignments together.",
                    HostId = sophia.Uid,
                    MaxParticipant = 5,
                    CurrentParticipant = 2,
                    RestaurantName = "Pizza Club - Central",
                    RestaurantAddress = "16 Darby Street Cnr. of Darby St. &, Elliott Street, Auckland 1010",
                    MealDate = DateTimeOffset.UtcNow.AddDays(1),
                    Tags = new List<string> { "Study", "CS Students", "Pizza" },
                    Status = MealStatus.Upcoming,
                    CreatedAt = DateTimeOffset.UtcNow.AddHours(-12),
                    UpdatedAt = DateTimeOffset.UtcNow
                },
                new Meal
                {
                    Title = "Coffee & Code Review",
                    Description = "Morning coffee break with fellow developers. Bring your laptops!",
                    HostId = sophia.Uid,
                    MaxParticipant = 4,
                    CurrentParticipant = 3,
                    RestaurantName = "Starbucks Symonds Street",
                    RestaurantAddress = "Tenancy G01, The Forte Building, 37 Symonds Street, Auckland 1010",
                    MealDate = DateTimeOffset.UtcNow.AddDays(2).AddHours(10),
                    Tags = new List<string> { "Coffee", "Programming", "Morning" },
                    Status = MealStatus.Upcoming,
                    CreatedAt = DateTimeOffset.UtcNow.AddHours(-6),
                    UpdatedAt = DateTimeOffset.UtcNow
                },
                new Meal
                {
                    Title = "Lunch with friends",
                    Description = "Casual lunch at the student union. Open to anyone!",
                    HostId = emma.Uid,
                    MaxParticipant = 5,
                    CurrentParticipant = 3,
                    RestaurantName = "Campus Food Court",
                    RestaurantAddress = "level 2, Kate Edger Information Commons, 2 Alfred Street, Auckland Central, Auckland 1010",
                    MealDate = DateTimeOffset.UtcNow.AddHours(2),
                    Tags = new List<string> { "Casual", "Friends", "Quick Lunch" },
                    Status = MealStatus.Confirmed,
                    CreatedAt = DateTimeOffset.UtcNow.AddHours(-1),
                    UpdatedAt = DateTimeOffset.UtcNow
                },
                new Meal
                {
                    Title = "Healthy Bowl Exploration",
                    Description = "Let's try the new healthy bowl place!",
                    HostId = marcus.Uid,
                    MaxParticipant = 4,
                    CurrentParticipant = 2,
                    RestaurantName = "Healthy Bowls",
                    RestaurantAddress = "321 Forest Ave, Auckland",
                    MealDate = DateTimeOffset.UtcNow.AddDays(1).AddHours(17),
                    Tags = new List<string> { "Healthy", "Vegetarian", "New Place" },
                    Status = MealStatus.Upcoming,
                    CreatedAt = DateTimeOffset.UtcNow.AddHours(-2),
                    UpdatedAt = DateTimeOffset.UtcNow
                },
                new Meal
                {
                    Title = "Welcome Lunch",
                    Description = "Welcome lunch for new students!",
                    HostId = sophie.Uid,
                    MaxParticipant = 6,
                    CurrentParticipant = 4,
                    RestaurantName = "Campus Food Court",
                    RestaurantAddress = "level 2, Kate Edger Information Commons, 2 Alfred Street, Auckland Central, Auckland 1010",
                    MealDate = DateTimeOffset.UtcNow.AddDays(-1),
                    Tags = new List<string> { "Welcome", "First Years", "Social" },
                    Status = MealStatus.Completed,
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
                    ParticipationStatus = MealParticipateStatus.host,
                    JoinedAt = DateTimeOffset.UtcNow.AddDays(-2).AddHours(4)
                }
            };

            context.MealParticipants.AddRange(mealParticipants);
            await context.SaveChangesAsync();

            var chatRooms = new List<ChatRoom>
    {
        new ChatRoom
        {
            Name = "General Chat",
            Description = "A place to talk about anything",
            HostId = sophia.Uid,
            IsPrivate = false,
            CreatedAt = DateTime.UtcNow.AddDays(-2),
            Members = new List<ChatRoomMember>
            {
                new ChatRoomMember { UserId = sophia.Uid, UserName = sophia.Name, IsHost = true },
                new ChatRoomMember { UserId = emma.Uid, UserName = emma.Name },
                new ChatRoomMember { UserId = marcus.Uid, UserName = marcus.Name }
            }
        },
        new ChatRoom
        {
            Name = "Study Group",
            Description = "For collaborative studying",
            HostId = emma.Uid,
            IsPrivate = false,
            CreatedAt = DateTime.UtcNow.AddDays(-1),
            Members = new List<ChatRoomMember>
            {
                new ChatRoomMember { UserId = emma.Uid, UserName = emma.Name, IsHost = true },
                new ChatRoomMember { UserId = sophie.Uid, UserName = sophie.Name },
                new ChatRoomMember { UserId = maya.Uid, UserName = maya.Name }
            }
        },
        new ChatRoom
        {
            Name = "React Enthusiasts",
            Description = "All about React development",
            HostId = marcus.Uid,
            IsPrivate = false,
            CreatedAt = DateTime.UtcNow.AddDays(-3),
            Members = new List<ChatRoomMember>
            {
                new ChatRoomMember { UserId = marcus.Uid, UserName = marcus.Name, IsHost = true },
                new ChatRoomMember { UserId = sophia.Uid, UserName = sophia.Name }
            }
        },
        new ChatRoom
        {
            Name = "1-on-1 with Emma",
            Description = "Private chat",
            HostId = sophia.Uid,
            IsPrivate = true,
            CreatedAt = DateTime.UtcNow.AddDays(-1),
            Members = new List<ChatRoomMember>
            {
                new ChatRoomMember { UserId = sophia.Uid, UserName = sophia.Name, IsHost = true },
                new ChatRoomMember { UserId = emma.Uid, UserName = emma.Name }
            }
        }
    };

            context.ChatRooms.AddRange(chatRooms);
            await context.SaveChangesAsync();

            var chatMessages = new List<ChatMessage>
    {
        new ChatMessage
        {
            ChatRoomId = chatRooms[0].Id,
            UserId = sophia.Uid,
            UserName = sophia.Name,
            Content = "Hey everyone! Welcome to the general chat.",
            Timestamp = DateTime.UtcNow.AddHours(-5)
        },
        new ChatMessage
        {
            ChatRoomId = chatRooms[0].Id,
            UserId = emma.Uid,
            UserName = emma.Name,
            Content = "Thanks Sophia! Glad to join.",
            Timestamp = DateTime.UtcNow.AddHours(-4)
        },
        new ChatMessage
        {
            ChatRoomId = chatRooms[1].Id,
            UserId = emma.Uid,
            UserName = emma.Name,
            Content = "Let's start by reviewing Chapter 3.",
            Timestamp = DateTime.UtcNow.AddHours(-2)
        },
        new ChatMessage
        {
            ChatRoomId = chatRooms[1].Id,
            UserId = maya.Uid,
            UserName = maya.Name,
            Content = "Got it, I have some notes prepared.",
            Timestamp = DateTime.UtcNow.AddHours(-1)
        },
        new ChatMessage
        {
            ChatRoomId = chatRooms[2].Id,
            UserId = marcus.Uid,
            UserName = marcus.Name,
            Content = "React 18 has some cool features!",
            Timestamp = DateTime.UtcNow.AddHours(-3)
        },
        new ChatMessage
        {
            ChatRoomId = chatRooms[3].Id,
            UserId = sophia.Uid,
            UserName = sophia.Name,
            Content = "Hey Emma, just wanted to talk about tomorrow's plan.",
            Timestamp = DateTime.UtcNow.AddHours(-6)
        },
        new ChatMessage
        {
            ChatRoomId = chatRooms[3].Id,
            UserId = emma.Uid,
            UserName = emma.Name,
            Content = "Sure, I’m free after 3 PM.",
            Timestamp = DateTime.UtcNow.AddHours(-5)
        }
    };

            context.ChatMessages.AddRange(chatMessages);
            await context.SaveChangesAsync();
        }

    }
}