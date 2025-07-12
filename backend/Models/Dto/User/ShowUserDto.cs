using backend.Models.Entity;
using backend.Models.Enum;

namespace backend.Models.Dto.User
{
    public class ShowUserDto
    {
        public int Uid { get; set; }

        public required string Name { get; set; }

        public required string Email { get; set; }


        public string University { get; set; } = "Universiry of Auckland";
        public string Major { get; set; } = "";
        public string Bio { get; set; } = "";
        public string Avatar { get; set; } = "👤";


        public List<string> Interests { get; set; } = new();
        public List<string> PreferredCuisines { get; set; } = new();

        public bool IsOnline { get; set; } = false;
        public DateTimeOffset LastSeen { get; set; } = DateTimeOffset.UtcNow;
    }
}
