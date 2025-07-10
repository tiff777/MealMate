using System.ComponentModel.DataAnnotations;

namespace backend.Models.Dto.User
{
    public class AddUserDto
    {
        [Required(ErrorMessage = "Name is required")]
        [StringLength(100, ErrorMessage = "Name cannot exceed 100 characters")]
        public string Name { get; set; } = "";

        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email format")]
        public string Email { get; set; } = "";

        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; } = "";

        public string University { get; set; } = "";
        public string Major { get; set; } = "";
        public string Bio { get; set; } = "";
        public string Avatar { get; set; } ="" ?? "👤";

        [MaxLength(10, ErrorMessage = "Cannot have more than 10 interests")]
        public List<String> Interests { get; set; } = new ();

        [MaxLength(10, ErrorMessage = "Cannot have more than 10 interests")]
        public List<String> PreferredCuisines { get; set; } = new ();

        public bool IsOnline { get; set; } = true;
    }
}
