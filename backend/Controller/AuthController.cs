using backend.Data;
using backend.Models.Dto.Auth;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Attributes;
using backend.Extention;
using backend.Models.Dto.User;
using backend.Models.Entity;

namespace backend.Controller
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController:ControllerBase
    {
        private ApplicationDbContext _db;
        private IAuthService _authService;
        public AuthController(ApplicationDbContext db, IAuthService authService) {
            _db = db;
            _authService = authService;
        }
        
        [HttpPost("login")]
        public async Task<IActionResult> Login ([FromBody] LoginDto dto)
        {
            Console.WriteLine("testing email: ", dto.Email);
            Console.WriteLine("testing password: ", dto.Email);
            var dbuser = await _db.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);
            if (dbuser == null || !_authService.VerifyPassword(dto.Password, dbuser.PasswordHash))
            {
                return Unauthorized(new { message = "Invalid credentials" });
            }

            var token = _authService.GenerateToken(dbuser);
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

            return Ok(new { token, user });
        }


        [HttpPost("logout")]
        [AuthorizeUser]
        public async Task<IActionResult> Logout()
        {
            try
            {
                var user = this.GetCurrentUser();

                user.IsOnline = false;
                user.LastSeen = DateTime.UtcNow;
                await _db.SaveChangesAsync();

                return Ok(new { message = "logout successful" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Fail to logout: ", ex.Message });
            }                        
        }

        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword ([FromBody] ForgotPasswordDto dto)
        {
            var user = await _db.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);
            if (user == null)
                return BadRequest(new { message = "Email not found." });

            var token = Guid.NewGuid().ToString();
            user.ResetPasswordToken = token;
            user.ResetPasswordTokenExpires = DateTime.UtcNow.AddMinutes(10);

            await _db.SaveChangesAsync();

            return Ok(token);
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword ([FromBody] ResetPasswordDto dto)
        {
            var dbuser = await _db.Users.FirstOrDefaultAsync(u =>
                u.ResetPasswordToken == dto.Token &&
                u.ResetPasswordTokenExpires > DateTime.UtcNow);

            if (dbuser == null)
                return BadRequest(new { message = "Invalid or expired token." });

            dbuser.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.NewPassword);
            dbuser.ResetPasswordToken = null;
            dbuser.ResetPasswordTokenExpires = null;

            await _db.SaveChangesAsync();

            var token = _authService.GenerateToken(dbuser);
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

            return Ok(new { token, user });
        }


    }
}
