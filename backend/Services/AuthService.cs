using backend.Models.Entity;
using Microsoft.IdentityModel.Tokens;
using BCrypt.Net;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace backend.Services
{
    public class AuthService:IAuthService

    {
        private readonly IConfiguration _config;

        public AuthService (IConfiguration config)
        {
            _config = config;
        }

        public string HashPassword (string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password);
        }

        public bool VerifyPassword (string password, string hash)
        {
            return BCrypt.Net.BCrypt.Verify(password, hash);
        }

        public string GenerateToken (User user)
        {
                var jwtKey = Environment.GetEnvironmentVariable("JWT_KEY") 
                            ?? _config["JwtSettings:Key"];
                var jwtIssuer = Environment.GetEnvironmentVariable("JWT_ISSUER") 
                            ?? _config["JwtSettings:Issuer"];
                var jwtAudience = Environment.GetEnvironmentVariable("JWT_AUDIENCE") 
                             ?? _config["JwtSettings:Audience"];

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim("userId", user.Uid.ToString()),
                new Claim("email", user.Email),
                new Claim("name", user.Name),
                new Claim(JwtRegisteredClaimNames.Sub, user.Uid.ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var token = new JwtSecurityToken(
                issuer: jwtIssuer,
                audience: jwtAudience,
                claims: claims,
                expires: DateTime.UtcNow.AddDays(7),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public int? GetUserIdFromToken (string? authHeader)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(authHeader) || !authHeader.StartsWith("Bearer "))
                {
                    return null;
                }

                var token = authHeader.Replace("Bearer ", "").Trim();
                var handler = new JwtSecurityTokenHandler();
                var jsonToken = handler.ReadJwtToken(token);
                var userIdClaim = jsonToken.Claims.FirstOrDefault(x => x.Type == "userId");

                return userIdClaim != null ? int.Parse(userIdClaim.Value) : null;
            }
            catch
            {
                return null;
            }
        }
    }
}
