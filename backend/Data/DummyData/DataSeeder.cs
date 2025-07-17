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
        Name = "Korean BBQ Adventure Chat",
        Description = "Discussion for Korean BBQ meetup at Mukbang Korean BBQ",
        HostId = sophia.Uid,
        IsPrivate = false,
        CreatedAt = DateTimeOffset.UtcNow.AddDays(-1),
        MealId = meals[0].Mid, 
        Members = new List<ChatRoomMember>
        {
            new ChatRoomMember { UserId = sophia.Uid, UserName = sophia.Name, IsHost = true,  JoinedAt = DateTimeOffset.UtcNow.AddDays(-1) },
            new ChatRoomMember { UserId = emma.Uid, UserName = emma.Name,  JoinedAt = DateTimeOffset.UtcNow.AddHours(-22) },
            new ChatRoomMember { UserId = marcus.Uid, UserName = marcus.Name, JoinedAt = DateTimeOffset.UtcNow.AddHours(-19) },
            new ChatRoomMember { UserId = alex.Uid, UserName = alex.Name,  JoinedAt = DateTimeOffset.UtcNow.AddHours(-17) }
        }
    },
    
    new ChatRoom
    {
        Name = "Pizza & Study Chat",
        Description = "Coordination for pizza study session",
        HostId = sophia.Uid,
        IsPrivate = false,
        CreatedAt = DateTimeOffset.UtcNow.AddHours(-12),
        MealId = meals[1].Mid,
        Members = new List<ChatRoomMember>
        {
            new ChatRoomMember { UserId = sophia.Uid, UserName = sophia.Name, IsHost = true,  JoinedAt = DateTimeOffset.UtcNow.AddHours(-12) },
            new ChatRoomMember { UserId = maya.Uid, UserName = maya.Name,  JoinedAt = DateTimeOffset.UtcNow.AddHours(-11) }
        }
    },
    
    new ChatRoom
    {
        Name = "Coffee & Code Chat",
        Description = "Morning coffee and code review discussion",
        HostId = sophia.Uid,
        IsPrivate = false,
        CreatedAt = DateTimeOffset.UtcNow.AddHours(-6),
        MealId = meals[2].Mid,
        Members = new List<ChatRoomMember>
        {
            new ChatRoomMember { UserId = sophia.Uid, UserName = sophia.Name, IsHost = true,  JoinedAt = DateTimeOffset.UtcNow.AddHours(-6) },
            new ChatRoomMember { UserId = emma.Uid, UserName = emma.Name, JoinedAt = DateTimeOffset.UtcNow.AddHours(-5) },
            new ChatRoomMember { UserId = marcus.Uid, UserName = marcus.Name,  JoinedAt = DateTimeOffset.UtcNow.AddHours(-5) }
        }
    },
    
    new ChatRoom
    {
        Name = "Casual Lunch Chat",
        Description = "Chat for our casual lunch meetup",
        HostId = emma.Uid,
        IsPrivate = false,
        CreatedAt = DateTimeOffset.UtcNow.AddHours(-1),
        MealId = meals[3].Mid,
        Members = new List<ChatRoomMember>
        {
            new ChatRoomMember { UserId = emma.Uid, UserName = emma.Name, IsHost = true, JoinedAt = DateTimeOffset.UtcNow.AddHours(-1) },
            new ChatRoomMember { UserId = sophie.Uid, UserName = sophie.Name,  JoinedAt = DateTimeOffset.UtcNow.AddMinutes(-50) },
            new ChatRoomMember { UserId = alex.Uid, UserName = alex.Name, JoinedAt = DateTimeOffset.UtcNow.AddMinutes(-42) }
        }
    },
    
    new ChatRoom
    {
        Name = "Healthy Bowls Discussion",
        Description = "Planning our healthy bowl adventure",
        HostId = marcus.Uid,
        IsPrivate = false,
        CreatedAt = DateTimeOffset.UtcNow.AddHours(-2),
        MealId = meals[4].Mid,
        Members = new List<ChatRoomMember>
        {
            new ChatRoomMember { UserId = marcus.Uid, UserName = marcus.Name, IsHost = true,  JoinedAt = DateTimeOffset.UtcNow.AddHours(-2) },
            new ChatRoomMember { UserId = maya.Uid, UserName = maya.Name, JoinedAt = DateTimeOffset.UtcNow.AddHours(-1).AddMinutes(-40) }
        }
    },
    
    new ChatRoom
    {
        Name = "Welcome Lunch Chat",
        Description = "Welcome lunch for new students - completed event",
        HostId = sophie.Uid,
        IsPrivate = false,
        CreatedAt = DateTimeOffset.UtcNow.AddDays(-2),
        MealId = meals[5].Mid,
        Members = new List<ChatRoomMember>
        {
            new ChatRoomMember { UserId = sophie.Uid, UserName = sophie.Name, IsHost = true,  JoinedAt = DateTimeOffset.UtcNow.AddDays(-2) },
            new ChatRoomMember { UserId = alex.Uid, UserName = alex.Name,  JoinedAt = DateTimeOffset.UtcNow.AddDays(-2).AddHours(2) },
            new ChatRoomMember { UserId = maya.Uid, UserName = maya.Name,  JoinedAt = DateTimeOffset.UtcNow.AddDays(-2).AddHours(3) },
            new ChatRoomMember { UserId = emma.Uid, UserName = emma.Name,  JoinedAt = DateTimeOffset.UtcNow.AddDays(-2).AddHours(4) }
        }
    },
    
    new ChatRoom
    {
        Name = "General Chat",
        Description = "General discussion for all students",
        HostId = sophia.Uid,
        IsPrivate = false,
        CreatedAt = DateTimeOffset.UtcNow.AddDays(-3),
        MealId = null, 
        Members = new List<ChatRoomMember>
        {
            new ChatRoomMember { UserId = sophia.Uid, UserName = sophia.Name, IsHost = true,  JoinedAt = DateTimeOffset.UtcNow.AddDays(-3) },
            new ChatRoomMember { UserId = emma.Uid, UserName = emma.Name,  JoinedAt = DateTimeOffset.UtcNow.AddDays(-3).AddHours(2) },
            new ChatRoomMember { UserId = marcus.Uid, UserName = marcus.Name, JoinedAt = DateTimeOffset.UtcNow.AddDays(-3).AddHours(4) },
            new ChatRoomMember { UserId = alex.Uid, UserName = alex.Name, JoinedAt = DateTimeOffset.UtcNow.AddDays(-2) }
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
        Content = "Hey everyone! Looking forward to our Korean BBQ adventure tomorrow! 🥩",
        Timestamp = DateTimeOffset.UtcNow.AddHours(-18)
    },
    new ChatMessage
    {
        ChatRoomId = chatRooms[0].Id,
        UserId = emma.Uid,
        UserName = emma.Name,
        Content = "Same here! Should we meet at the restaurant or somewhere else first?",
        Timestamp = DateTimeOffset.UtcNow.AddHours(-16)
    },
    
    new ChatMessage
    {
        ChatRoomId = chatRooms[1].Id,
        UserId = sophia.Uid,
        UserName = sophia.Name,
        Content = "Don't forget to bring your CS assignment! We can review each other's code 💻",
        Timestamp = DateTimeOffset.UtcNow.AddHours(-10)
    },
    new ChatMessage
    {
        ChatRoomId = chatRooms[1].Id,
        UserId = maya.Uid,
        UserName = maya.Name,
        Content = "Perfect! I'm stuck on the algorithm part, would love some help",
        Timestamp = DateTimeOffset.UtcNow.AddHours(-9)
    },
    
    new ChatMessage
    {
        ChatRoomId = chatRooms[2].Id,
        UserId = sophia.Uid,
        UserName = sophia.Name,
        Content = "Morning coffee and code review sounds perfect! What time should we start?",
        Timestamp = DateTimeOffset.UtcNow.AddHours(-5)
    },
    new ChatMessage
    {
        ChatRoomId = chatRooms[2].Id,
        UserId = marcus.Uid,
        UserName = marcus.Name,
        Content = "How about 10 AM? I'll bring my React project for review",
        Timestamp = DateTimeOffset.UtcNow.AddHours(-4)
    },
    
    new ChatMessage
    {
        ChatRoomId = chatRooms[3].Id,
        UserId = emma.Uid,
        UserName = emma.Name,
        Content = "Quick lunch at the food court! Anyone hungry? 🍽️",
        Timestamp = DateTimeOffset.UtcNow.AddMinutes(-45)
    },
    new ChatMessage
    {
        ChatRoomId = chatRooms[3].Id,
        UserId = alex.Uid,
        UserName = alex.Name,
        Content = "Count me in! I'll be there in 10 minutes",
        Timestamp = DateTimeOffset.UtcNow.AddMinutes(-40)
    },
    
    new ChatMessage
    {
        ChatRoomId = chatRooms[4].Id,
        UserId = marcus.Uid,
        UserName = marcus.Name,
        Content = "Excited to try this new healthy bowl place! Has anyone been there before?",
        Timestamp = DateTimeOffset.UtcNow.AddHours(-1).AddMinutes(-30)
    },
    new ChatMessage
    {
        ChatRoomId = chatRooms[4].Id,
        UserId = maya.Uid,
        UserName = maya.Name,
        Content = "No, but I heard they have amazing vegan options! 🥗",
        Timestamp = DateTimeOffset.UtcNow.AddHours(-1).AddMinutes(-20)
    },
    
    new ChatMessage
    {
        ChatRoomId = chatRooms[5].Id,
        UserId = sophie.Uid,
        UserName = sophie.Name,
        Content = "Welcome everyone to our lunch! Great to meet you all 😊",
        Timestamp = DateTimeOffset.UtcNow.AddDays(-1).AddHours(-2)
    },
    new ChatMessage
    {
        ChatRoomId = chatRooms[5].Id,
        UserId = emma.Uid,
        UserName = emma.Name,
        Content = "Thanks for organizing this! It was so much fun meeting everyone",
        Timestamp = DateTimeOffset.UtcNow.AddDays(-1).AddHours(-1)
    },
    
    new ChatMessage
    {
        ChatRoomId = chatRooms[6].Id,
        UserId = sophia.Uid,
        UserName = sophia.Name,
        Content = "Hey everyone! Welcome to our general chat room 👋",
        Timestamp = DateTimeOffset.UtcNow.AddDays(-2).AddHours(-3)
    },
    new ChatMessage
    {
        ChatRoomId = chatRooms[6].Id,
        UserId = marcus.Uid,
        UserName = marcus.Name,
        Content = "Thanks for setting this up! Great way to stay connected",
        Timestamp = DateTimeOffset.UtcNow.AddDays(-2).AddHours(-1)
    }
};

            context.ChatMessages.AddRange(chatMessages);
            await context.SaveChangesAsync();
        }

    }
}