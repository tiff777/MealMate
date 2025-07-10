using backend.Models.Entity;

namespace backend.Services
{
    public interface IAuthService
    {
        string HashPassword (string password);
        bool VerifyPassword (string password, string hash);
        string GenerateToken (User user);
        int? GetUserIdFromToken (string authHeader);
    }
}
