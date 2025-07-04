using backend.Models.Entity;

namespace backend.Data.DummyData
{
    public static class DummyUsers
    {
        public static List<User> GetUsers()
        {
            return new List<User>
            {
                new User
                {
                    Name = "Sophia Carter",
                    Email = "sophia.carter@aucklanduni.ac.nz",
                    PasswordHash = "hashedpassword1", // In real app, this would be properly hashed, current just for testing
                    University = "University of Auckland",
                    Major = "Computer Science",
                    Bio = "Hey there! I'm a senior CS student who loves exploring new restaurants and meeting fellow students.",
                    Avatar = "👩‍💻",
                    Interests = new string[] { "Programming", "Food Photography", "Rock Climbing", "Board Games", "Cooking", "Travel" },
                    PreferredCuisines = new string[] { "Korean", "Japanese", "Italian", "Mexican" },
                    IsOnline = true,
                    LastSeen = DateTimeOffset.UtcNow,
                    CreatedAt = DateTimeOffset.Parse("2024-01-15T00:00:00Z"),
                    UpdatedAt = DateTimeOffset.UtcNow
                },
                new User
                {
                    Name = "Emma Zhang",
                    Email = "emma.zhang@aucklanduni.ac.nz",
                    PasswordHash = "hashedpassword2",
                    University = "University of Auckland",
                    Major = "Computer Science",
                    Bio = "Love trying new cuisines and discussing tech over food! Always up for discovering hidden campus food gems.",
                    Avatar = "👩‍💻",
                    Interests = new string[] { "React", "Gaming", "Anime", "Photography" },
                    PreferredCuisines = new string[] { "Korean", "Chinese", "Japanese" },
                    IsOnline = false,
                    LastSeen = DateTimeOffset.UtcNow,
                    CreatedAt = DateTimeOffset.Parse("2024-02-01T00:00:00Z"),
                    UpdatedAt = DateTimeOffset.UtcNow
                },
                new User
                {
                    Name = "Marcus Johnson",
                    Email = "marcus.johnson@aucklanduni.ac.nz",
                    PasswordHash = "hashedpassword3",
                    University = "University of Auckland",
                    Major = "Design",
                    Bio = "Design student who loves good coffee and creative conversations.",
                    Avatar = "👨‍🎨",
                    Interests = new string[] { "UI/UX", "Coffee", "Art", "Music" },
                    PreferredCuisines = new string[] { "Healthy", "Western", "Coffee" },
                    IsOnline = true,
                    LastSeen = DateTimeOffset.UtcNow.AddMinutes(-5),
                    CreatedAt = DateTimeOffset.Parse("2024-02-15T00:00:00Z"),
                    UpdatedAt = DateTimeOffset.UtcNow
                },
                new User
                {
                    Name = "Sophie Chen",
                    Email = "sophie.chen@aucklanduni.ac.nz",
                    PasswordHash = "hashedpassword4",
                    University = "University of Auckland",
                    Major = "Medicine",
                    Bio = "Med student looking for quick lunch companions between study sessions.",
                    Avatar = "👩‍🔬",
                    Interests = new string[] { "Medicine", "Fitness", "Travel", "Languages" },
                    PreferredCuisines = new string[] { "Healthy", "Fast Food", "Asian" },
                    IsOnline = false,
                    LastSeen = DateTimeOffset.UtcNow.AddHours(-2),
                    CreatedAt = DateTimeOffset.Parse("2024-01-20T00:00:00Z"),
                    UpdatedAt = DateTimeOffset.UtcNow
                },
                new User
                {
                    Name = "Alex Kim",
                    Email = "alex.kim@aucklanduni.ac.nz",
                    PasswordHash = "hashedpassword5",
                    University = "University of Auckland",
                    Major = "Business",
                    Bio = "Business major who enjoys networking over good food.",
                    Avatar = "👨‍💼",
                    Interests = new string[] { "Startup", "Investing", "Basketball", "Networking" },
                    PreferredCuisines = new string[] { "Japanese", "Western", "Korean" },
                    IsOnline = true,
                    LastSeen = DateTimeOffset.UtcNow,
                    CreatedAt = DateTimeOffset.Parse("2024-01-10T00:00:00Z"),
                    UpdatedAt = DateTimeOffset.UtcNow
                },
                new User
                {
                    Name = "Maya Patel",
                    Email = "maya.patel@aucklanduni.ac.nz",
                    PasswordHash = "hashedpassword6",
                    University = "University of Auckland",
                    Major = "Engineering",
                    Bio = "New to campus and looking to make friends!",
                    Avatar = "👩‍🎓",
                    Interests = new string[] { "Engineering", "Movies", "Cooking", "Hiking" },
                    PreferredCuisines = new string[] { "Adventure", "Indian", "Mexican" },
                    IsOnline = true,
                    LastSeen = DateTimeOffset.UtcNow,
                    CreatedAt = DateTimeOffset.Parse("2024-03-01T00:00:00Z"),
                    UpdatedAt = DateTimeOffset.UtcNow
                }
            };
        }
    }
}