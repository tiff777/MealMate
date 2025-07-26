using backend.Data;
using backend.Models.Dto.Chat;
using backend.Models.Entity;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository
{
    public class ChatRoomRepository : Repository<ChatRoom>, IChatRoomRepository
    {
        public ChatRoomRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<ChatMessage>> GetRoomMessagesAsync(int roomId, int page = 1, int pageSize = 50)
        {
            return await _context.ChatMessages
                .Where(m => m.ChatRoomId == roomId)
                .OrderByDescending(m => m.Timestamp)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .OrderBy(m => m.Timestamp)
                .ToListAsync();
        }
    }
}