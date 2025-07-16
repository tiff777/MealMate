using System.ComponentModel.DataAnnotations;

namespace backend.Models.Dto.User
{
    public class ChangePasswordDto
    {
        [Required]
        public string NewPassword { get; set; } = string.Empty;
    }
}
