using Azure.Core;
using backend.Data;
using backend.Extention;
using backend.Models.Dto.Meal;
using backend.Models.Dto.User;
using backend.Models.Entity;
using backend.Repository;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using backend.Attributes;
using Microsoft.AspNetCore.Components.Web.Virtualization;


namespace backend.Controller
{
    [ApiController]
    [Route("api/user")]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly ApplicationDbContext _db;
        private readonly IAuthService _authService;
        
        public UserController(IUserRepository userRepository, ApplicationDbContext db, IAuthService authService)
        {
            _userRepository = userRepository;
            _db = db;
            _authService = authService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllUsers([FromQuery] int page = 1, [FromQuery] int pageSize = 20)
        {
            try
            {
                var users = await _userRepository.GetAllUsersAsync(page, pageSize);
                var totalCount = await _userRepository.GetTotalUsersCountAsync();

                return Ok(new 
                { 
                    users = users,
                    pagination = new 
                    {
                        currentPage = page,
                        pageSize = pageSize,
                        totalCount = totalCount,
                        totalPages = (int)Math.Ceiling((double)totalCount / pageSize)
                    }
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("profile/info")]
        [AuthorizeUser]
        public async Task<IActionResult> GetUserProfile()
        {
            var user = this.GetCurrentUser();
            var usersDto = new ShowUserDto
            {
                Uid = user.Uid,
                Name = user.Name,
                Email = user.Email,
                University = user.University,
                Major = user.Major,
                Bio = user.Bio,
                Avatar = user.Avatar,
                Interests = user.Interests,
                PreferredCuisines = user.PreferredCuisines,
                IsOnline = user.IsOnline,
                LastSeen = user.LastSeen,
            };

            return Ok(usersDto);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetUser(int id)
        {
            try
            {
                var dbUser = await _db.Users
            .Include(u => u.HostedMeals)
            .Include(u => u.ParticipatedMeals)
                .ThenInclude(p => p.Meal)
            .FirstOrDefaultAsync(u => u.Uid == id);

                if (dbUser == null)
                    return NotFound();

                var hostedMeals = dbUser.HostedMeals
                    .OrderByDescending(m => m.CreatedAt)
                    .Select(m => new
                    {
                        Mid = m.Mid,
                        Title = m.Title,
                        Description = m.Description,
                        MealDate = m.MealDate,
                        RestaurantName = m.RestaurantName,
                        RestaurantAddress = m.RestaurantAddress,
                        CurrentParticipant = m.CurrentParticipant,
                        MaxParticipant = m.MaxParticipant,
                        Status = m.Status
                    }).ToList();

                var joinedMeals = dbUser.ParticipatedMeals
                    .Where(p => p.Meal.HostId != dbUser.Uid)
                    .Select(p => new
                    {
                        Mid = p.Meal.Mid,
                        Title = p.Meal.Title,
                        Description = p.Meal.Description,
                        MealDate = p.Meal.MealDate,
                        RestaurantName = p.Meal.RestaurantName,
                        RestaurantAddress = p.Meal.RestaurantAddress,
                        CurrentParticipant = p.Meal.CurrentParticipant,
                        MaxParticipant = p.Meal.MaxParticipant,
                        Status = p.ParticipationStatus
                    }).ToList();

                var user = new
                {
                    Uid = dbUser.Uid,
                    Name = dbUser.Name,
                    Email = dbUser.Email,
                    University = dbUser.University,
                    Major = dbUser.Major,
                    Bio = dbUser.Bio,
                    Avatar = dbUser.Avatar,
                    Interests = dbUser.Interests,
                    PreferredCuisines = dbUser.PreferredCuisines,
                    IsOnline = dbUser.IsOnline,
                    HostedMeals = hostedMeals,
                    JoinedMeals = joinedMeals
                };

                return Ok(user);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("check-duplicate")]
        public async Task<IActionResult> CheckDuplicate([FromQuery] string field, [FromQuery] string value)
        {
            try
            {
                bool exists = field.ToLower() switch
                {
                    "email" => await _db.Users.AnyAsync(u => u.Email == value),
                    "name" => await _db.Users.AnyAsync(u => u.Name == value),
                    _ => false
                };

                return Ok(new { exists });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> RegisterUser([FromBody] AddUserDto newUser)
        {
            try
            {
                var existingUser = await _db.Users.FirstOrDefaultAsync(u => u.Email == newUser.Email);
                if (existingUser != null)
                {
                    return BadRequest(new { message = "User already exist" });
                }

                var user = new User()
                {
                    Name = newUser.Name,
                    Email = newUser.Email,
                    PasswordHash = _authService.HashPassword(newUser.Password),
                    University = newUser.University,
                    Major = newUser.Major,
                    Bio = newUser.Bio,
                    Avatar = newUser.Avatar,
                    Interests = newUser.Interests,
                    PreferredCuisines = newUser.PreferredCuisines,
                    IsOnline = newUser.IsOnline
                };

                _db.Users.Add(user);
                await _db.SaveChangesAsync();

                var token = _authService.GenerateToken(user);

                return Ok(new { message = "User created successfully", user, token });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Error in creating user: ", ex.Message });
            }
        }

        [HttpPost("upload-avatar")]
        public async Task<IActionResult> UploadAvatar(IFormFile file)
        {
            const long maxSize = 3 * 1024 * 1024; // 3MB

            if (file == null || file.Length == 0)
            {
                return BadRequest("No file uploaded.");
            }

            if (file.Length > maxSize)
            {
                return BadRequest("File size exceeds limit.");
            }


            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "avatars");
            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }

            var fileName = $"{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";
            var filePath = Path.Combine(uploadsFolder, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            var avatarUrl = $"/avatars/{fileName}";

            return Ok(new { avatarUrl });
        }

        [HttpPatch("{id}")]
        [AuthorizeUser]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] UpdateUserDto newUser)
        {
            try
            {
                var user = this.GetCurrentUser();
                Console.WriteLine(user.Name);

                user.UpdateFromUserDto(newUser);
                await _db.SaveChangesAsync();

                return Ok(new { message = "user updated successful", user });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Error in updating user: ", ex.Message });

            }
        }


        [HttpPost("password/verify")]
        [AuthorizeUser]
        public IActionResult CheckPassword([FromBody] CheckOldPasswordDto dto)
        {
            var user = this.GetCurrentUser();

            if (!BCrypt.Net.BCrypt.Verify(dto.OldPassword, user.PasswordHash))
            {
                return BadRequest(new { message = "Old password incorrect" });
            }
            return Ok();
        }

        [HttpPatch("password")]
        [AuthorizeUser]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDto dto)
        {
            var user = this.GetCurrentUser();

            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.NewPassword);
            user.UpdatedAt = DateTimeOffset.UtcNow;

            await _db.SaveChangesAsync();
            return Ok(new { message = "Password update successfully" });
        }

        [HttpPatch("{id}/avatar")]
        [AuthorizeUser]
        public async Task<IActionResult> ChangeAvatar([FromBody] UpdateAvatar dto)
        {
            try
            {
                var user = this.GetCurrentUser();
                user.Avatar = dto.Avatar;
                user.UpdatedAt = DateTimeOffset.Now;

                await _db.SaveChangesAsync();
                return Ok(new { message = "Avatar update successfully", avatar = user.Avatar });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Error in updating avatar: ", ex.Message });
            }

        }

        [HttpDelete]
        [AuthorizeUser]
        public async Task<IActionResult> DeleteUser()
        {
            try
            {
                var user = this.GetCurrentUser();

                user.IsDeleted = true;

                await _db.SaveChangesAsync();

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Error in deleting the user: ", ex.Message });
            }

        }

    }
}
