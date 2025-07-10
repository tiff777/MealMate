using System.ComponentModel.DataAnnotations;

namespace backend.Models.Dto.User
{
    public class UpdateUserDto
    {
        [StringLength(100, ErrorMessage = "Name cannot exceed 100 characters")]
        public string? Name { get; set; }

        [EmailAddress(ErrorMessage = "Invalid email format")]
        public string? Email { get; set; }

        public string? PasswordHash { get; set; }

        public string? University { get; set; }
        public string? Major { get; set; } 
        public string? Bio { get; set; } 
        public string? Avatar { get; set; }

        [MaxLength(10, ErrorMessage = "Cannot have more than 10 interests")]
        public List<String>? Interests { get; set; } 
        [MaxLength(10, ErrorMessage = "Cannot have more than 10 interests")]
        public List<String>? PreferredCuisines { get; set; }

    }
}
