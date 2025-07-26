using backend.Models.Dto.Chat;
using backend.Models.Entity;

namespace backend.Repository
{
    public interface IChatRoomRepository : IRepository<ChatRoom>
    {
        Task<IEnumerable<ChatMessage>> GetRoomMessagesAsync(int roomId, int page = 1, int pageSize = 50);
    }
}