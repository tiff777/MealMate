using backend.Models.Dto.User;
using backend.Models.Entity;

namespace backend.Repository
{
    public interface IUserRepository : IRepository<User>
    {
        Task<IEnumerable<ShowUserDto>> GetAllUsersAsync(int page = 1, int pageSize = 20);
        Task<int> GetTotalUsersCountAsync();
    }
}