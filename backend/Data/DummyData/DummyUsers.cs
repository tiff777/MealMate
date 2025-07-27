using backend.Models.Entity;

namespace backend.Data.DummyData
{
    public static class DummyUsers
    {
        public static List<User> GetUsers(IConfiguration conifg)
        {
            return new List<User>
            {
                new User
                {
                    Name = "sophiacarter01",
                    Email = "sophia.carter@gmail.com",
                    PasswordHash = Environment.GetEnvironmentVariable("DUMMY_PASSWORD_USER1")
                                ?? conifg["dummyPassword:user1"]
                                ?? throw new InvalidOperationException("Missing password for user1"),
                    University = "University of Auckland",
                    Major = "Computer Science",
                    Bio = "Hey there! I'm a senior CS student who loves exploring new restaurants and meeting fellow students.",
                    Avatar = "👩‍💻",
                    Interests = new List<string> { "Programming", "Food Photography", "Rock Climbing", "Board Games", "Cooking", "Travel" },
                    PreferredCuisines = new List<string> { "Korean", "Japanese", "Italian", "Mexican" },
                    IsOnline = true,
                    LastSeen = DateTimeOffset.UtcNow,
                    CreatedAt = DateTimeOffset.Parse("2024-01-15T00:00:00Z"),
                    UpdatedAt = DateTimeOffset.UtcNow,
                    IsDeleted = false,
                },
                new User
                {
                    Name = "emma92",
                    Email = "emma.zhang@gmail.com",
                    PasswordHash = Environment.GetEnvironmentVariable("DUMMY_PASSWORD_USER2")
                                ?? conifg["dummyPassword:user2"]
                                ?? throw new InvalidOperationException("Missing password for user2"),
                    University = "Auckland University of Technology",
                    Major = "Computer Science",
                    Bio = "Love trying new cuisines and discussing tech over food! Always up for discovering hidden campus food gems.",
                    Avatar = "👩‍💻",
                    Interests = new List<string> { "React", "Gaming", "Anime", "Photography" },
                    PreferredCuisines = new List<string> { "Korean", "Chinese", "Japanese" },
                    IsOnline = false,
                    LastSeen = DateTimeOffset.UtcNow,
                    CreatedAt = DateTimeOffset.Parse("2024-02-01T00:00:00Z"),
                    UpdatedAt = DateTimeOffset.UtcNow,
                    IsDeleted = false,
                },
                new User
                {
                    Name = "Marcus123",
                    Email = "marcus.johnson@gmail.com",
                    PasswordHash = Environment.GetEnvironmentVariable("DUMMY_PASSWORD_USER3")
                                ?? conifg["dummyPassword:user3"]
                                ?? throw new InvalidOperationException("Missing password for user3"),
                    University = "University of Auckland",
                    Major = "Design",
                    Bio = "Design student who loves good coffee and creative conversations.",
                    Avatar = "👨‍🎨",
                    Interests = new List<string> { "UI/UX", "Coffee", "Art", "Music" },
                    PreferredCuisines = new List<string> { "Healthy", "Western", "Coffee" },
                    IsOnline = true,
                    LastSeen = DateTimeOffset.UtcNow.AddMinutes(-5),
                    CreatedAt = DateTimeOffset.Parse("2024-02-15T00:00:00Z"),
                    UpdatedAt = DateTimeOffset.UtcNow,
                    IsDeleted = false,
                },
                new User
                {
                    Name = "SophieC456",
                    Email = "sophie.chen@gmail.com",
                    PasswordHash = Environment.GetEnvironmentVariable("DUMMY_PASSWORD_USER4")
                                ?? conifg["dummyPassword:user4"]
                                ?? throw new InvalidOperationException("Missing password for user4"),
                    University = "Auckland University of Technology",
                    Major = "Medicine",
                    Bio = "Med student looking for quick lunch companions between study sessions.",
                    Avatar = "👩‍🔬",
                    Interests = new List<string> { "Medicine", "Fitness", "Travel", "Languages" },
                    PreferredCuisines = new List<string> { "Healthy", "Fast Food", "Asian" },
                    IsOnline = false,
                    LastSeen = DateTimeOffset.UtcNow.AddHours(-2),
                    CreatedAt = DateTimeOffset.Parse("2024-01-20T00:00:00Z"),
                    UpdatedAt = DateTimeOffset.UtcNow,
                    IsDeleted = false,
                },
                new User
                {
                    Name = "Alexkim77",
                    Email = "alex.kim@gmail.com",
                    PasswordHash = Environment.GetEnvironmentVariable("DUMMY_PASSWORD_USER5")
                                ?? conifg["dummyPassword:user5"]
                                ?? throw new InvalidOperationException("Missing password for user5"),
                    University = "University of Auckland",
                    Major = "Business",
                    Bio = "Business major who enjoys networking over good food.",
                    Avatar = "👨‍💼",
                    Interests = new List<string> { "Startup", "Investing", "Basketball", "Networking" },
                    PreferredCuisines = new List<string> { "Japanese", "Western", "Korean" },
                    IsOnline = true,
                    LastSeen = DateTimeOffset.UtcNow,
                    CreatedAt = DateTimeOffset.Parse("2024-01-10T00:00:00Z"),
                    UpdatedAt = DateTimeOffset.UtcNow,
                    IsDeleted = false,
                },
                new User
                {
                    Name = "MayaP165",
                    Email = "maya.patel@gmail.com",
                    PasswordHash = Environment.GetEnvironmentVariable("DUMMY_PASSWORD_USER6")
                                ?? conifg["dummyPassword:user6"]
                                ?? throw new InvalidOperationException("Missing password for user6"),
                    University = "Auckland University of Technology",
                    Major = "Engineering",
                    Bio = "New to campus and looking to make friends!",
                    Avatar = "👩‍🎓",
                    Interests = new List<string> { "Engineering", "Movies", "Cooking", "Hiking" },
                    PreferredCuisines = new List<string> { "Adventure", "Indian", "Mexican" },
                    IsOnline = true,
                    LastSeen = DateTimeOffset.UtcNow,
                    CreatedAt = DateTimeOffset.Parse("2024-03-01T00:00:00Z"),
                    UpdatedAt = DateTimeOffset.UtcNow,
                    IsDeleted = false,
                }
            };
        }
    }
}