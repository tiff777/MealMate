using backend.Models.Dto.Meal;
using backend.Models.Dto.User;
using backend.Models.Entity;
using Microsoft.AspNetCore.Identity;

namespace backend.Extention
{
    public static class UserExtention
    {
        public static void UpdateFromUserDto (this User user, UpdateUserDto dto)
        {
            user.Name = dto.Name ?? user.Name;
            user.Email = dto.Email ?? user.Email;
            user.University = dto.University ?? user.University;
            user.Major = dto.Major ?? user.Major;
            user.Bio = dto.Bio ?? user.Bio;
            user.Interests = dto.Interests ?? user.Interests;
            user.PreferredCuisines = dto.PreferredCuisines ?? user.PreferredCuisines;

            user.UpdatedAt = DateTimeOffset.UtcNow;
        }
    }
}
