using System.ComponentModel.DataAnnotations;

namespace backend.Models.Dto.User
{
    public class UpdateAvatar
    {
        [Required]
        public string Avatar { get; set; } = "";
    }
}
