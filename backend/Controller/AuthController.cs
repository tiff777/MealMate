using backend.Data;
using backend.Models.Dto.Auth;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Attributes;
using backend.Extention;

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
            Console.WriteLine("testing: ", dto);
            var user = await _db.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);
            if (user == null || !_authService.VerifyPassword(dto.Password, user.PasswordHash))
            {
                return Unauthorized(new { message = "Invalid credentials" });
            }

            var token = _authService.GenerateToken(user);

            return Ok(new { token });
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

    }
}
