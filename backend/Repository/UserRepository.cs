using backend.Data;
using backend.Models.Dto.User;
using backend.Models.Entity;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        public UserRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<ShowUserDto>> GetAllUsersAsync(int page = 1, int pageSize = 20)
        {
            return await _context.Users
                .OrderBy(u => u.Name)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(user => new ShowUserDto
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
                })
                .ToListAsync();
        }

        public async Task<int> GetTotalUsersCountAsync()
        {
            return await _context.Users.CountAsync();
        }
    }
}