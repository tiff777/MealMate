using Azure.Core;
using backend.Data;
using backend.Extention;
using backend.Models.Dto.Meal;
using backend.Models.Dto.User;
using backend.Models.Entity;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using backend.Attributes;


namespace backend.Controller
{
    [ApiController]
    [Route("api/user")]
    public class UserController : ControllerBase
    {
        private ApplicationDbContext _db;
        private IAuthService _authService;
        public UserController(ApplicationDbContext db, IAuthService authService)
        {
            _db = db;
            _authService = authService;

        }

        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            try
            {
                var dbAllUsers = await _db.Users.ToListAsync();

                var users = dbAllUsers.Select(user => new ShowUserDto
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
                }).ToList();

                return Ok(users);
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
                var dbuser = await _db.Users.FindAsync(id);

                if (dbuser == null)
                {
                    return NotFound();
                }

                var user = new ShowUserDto
                {
                    Uid = dbuser.Uid,
                    Name = dbuser.Name,
                    Email = dbuser.Email,
                    University = dbuser.University,
                    Major = dbuser.Major,
                    Bio = dbuser.Bio,
                    Avatar = dbuser.Avatar,
                    Interests = dbuser.Interests,
                    PreferredCuisines = dbuser.PreferredCuisines,
                    IsOnline = dbuser.IsOnline,
                    LastSeen = dbuser.LastSeen,
                };
                return Ok(user);
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


        [HttpPatch("password")]
        [AuthorizeUser]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDto dto)
        {
            var user = this.GetCurrentUser();
            if (!BCrypt.Net.BCrypt.Verify(dto.OldPassword, user.PasswordHash))
                return BadRequest(new { message = "Old password incorrect" });

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

        [HttpDelete("{id}")]
        [AuthorizeUser]
        public async Task<IActionResult> DeleteUser(int id)
        {
            try
            {
                var user = this.GetCurrentUser();

                _db.Users.Remove(user);
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
