using backend.Data;
using backend.Extention;
using backend.Models.Dto;
using backend.Models.Dto.Meal;
using backend.Models.Entity;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository
{
    public class MealRepository : Repository<Meal>, IMealRepository
    {
        public MealRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<ShowMealDto>> GetAllMealsWithDetailsAsync(int page = 1, int pageSize = 10)
        {
            return await _context.Meals
                .Include(m => m.Participants)
                    .ThenInclude(p => p.User)
                .GroupJoin(
                    _context.ChatRooms,
                    meal => meal.Mid,
                    chatRoom => chatRoom.MealId,
                    (meal, chatRooms) => new { meal, chatRoom = chatRooms.FirstOrDefault() }
                )
                .OrderByDescending(x => x.meal.CreatedAt)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(x => new ShowMealDto
                {
                    Mid = x.meal.Mid,
                    Title = x.meal.Title,
                    Description = x.meal.Description,
                    MaxParticipant = x.meal.MaxParticipant,
                    CurrentParticipant = x.meal.CurrentParticipant,
                    RestaurantName = x.meal.RestaurantName,
                    RestaurantAddress = x.meal.RestaurantAddress,
                    MealDate = x.meal.MealDate,
                    Tags = x.meal.Tags,
                    RealTimeStatus = x.meal.GetRealTimeStatus(),
                    CreatedAt = x.meal.CreatedAt,
                    HostId = x.meal.HostId,
                    ChatRoomId = x.chatRoom != null ? x.chatRoom.Id : (int?)null,
                    Participants = x.meal.Participants.Select(p => new ParticipantDto
                    {
                        UserId = p.UserId,
                        Avatar = p.User.Avatar
                    }).ToList()
                })
                .ToListAsync();
        }

        public async Task<ShowMealDto?> GetMealWithDetailsAsync(int mealId)
        {
            var result = await _context.Meals
                .Include(m => m.Participants)
                    .ThenInclude(p => p.User)
                .GroupJoin(
                    _context.ChatRooms,
                    meal => meal.Mid,
                    chatRoom => chatRoom.MealId,
                    (meal, chatRooms) => new { meal, chatRoom = chatRooms.FirstOrDefault() }
                )
                .Where(x => x.meal.Mid == mealId)
                .Select(x => new ShowMealDto
                {
                    Mid = x.meal.Mid,
                    Title = x.meal.Title,
                    Description = x.meal.Description,
                    MaxParticipant = x.meal.MaxParticipant,
                    CurrentParticipant = x.meal.CurrentParticipant,
                    RestaurantName = x.meal.RestaurantName,
                    RestaurantAddress = x.meal.RestaurantAddress,
                    MealDate = x.meal.MealDate,
                    Tags = x.meal.Tags,
                    RealTimeStatus = x.meal.GetRealTimeStatus(),
                    CreatedAt = x.meal.CreatedAt,
                    HostId = x.meal.HostId,
                    ChatRoomId = x.chatRoom != null ? x.chatRoom.Id : (int?)null,
                    Participants = x.meal.Participants.Select(p => new ParticipantDto
                    {
                        UserId = p.UserId,
                        Avatar = p.User.Avatar
                    }).ToList()
                })
                .FirstOrDefaultAsync();

            return result;
        }

        public async Task<IEnumerable<ShowMealDto>> GetLatestUpcomingMealsAsync(int count = 3)
        {
            return await _context.Meals
                .Where(m => m.Status == 0)
                .OrderByDescending(m => m.CreatedAt)
                .Take(count)
                .Select(m => new ShowMealDto
                {
                    Mid = m.Mid,
                    Title = m.Title,
                    Description = m.Description,
                    MealDate = m.MealDate,
                    MaxParticipant = m.MaxParticipant,
                    CurrentParticipant = m.CurrentParticipant,
                    RestaurantName = m.RestaurantName,
                    RestaurantAddress = m.RestaurantAddress,
                    Tags = m.Tags,
                    RealTimeStatus = m.GetRealTimeStatus(),
                    CreatedAt = m.CreatedAt,
                    HostId = m.HostId
                })
                .ToListAsync();
        }

        public async Task<IEnumerable<ShowMealDto>> GetHostedMealsAsync(int userId, int page = 1, int pageSize = 10)
        {
            return await _context.Meals
                .Where(m => m.HostId == userId)
                .Include(m => m.Participants)
                    .ThenInclude(p => p.User)
                .GroupJoin(
                    _context.ChatRooms,
                    meal => meal.Mid,
                    chat => chat.MealId,
                    (meal, chatRooms) => new { meal, chatRoom = chatRooms.FirstOrDefault() }
                )
                .OrderByDescending(x => x.meal.CreatedAt)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(x => new ShowMealDto
                {
                    Mid = x.meal.Mid,
                    Title = x.meal.Title,
                    Description = x.meal.Description,
                    MealDate = x.meal.MealDate,
                    MaxParticipant = x.meal.MaxParticipant,
                    CurrentParticipant = x.meal.CurrentParticipant,
                    RestaurantName = x.meal.RestaurantName,
                    RestaurantAddress = x.meal.RestaurantAddress,
                    Tags = x.meal.Tags,
                    RealTimeStatus = x.meal.GetRealTimeStatus(),
                    CreatedAt = x.meal.CreatedAt,
                    HostId = x.meal.HostId,
                    ChatRoomId = x.chatRoom != null ? x.chatRoom.Id : (int?)null,
                    Participants = x.meal.Participants.Select(p => new ParticipantDto
                    {
                        UserId = p.UserId,
                        Avatar = p.User.Avatar
                    }).ToList()
                })
                .ToListAsync();
        }

        public async Task<int> GetTotalMealsCountAsync()
        {
            return await _context.Meals.CountAsync();
        }

        public async Task<int> GetHostedMealsCountAsync(int userId)
        {
            return await _context.Meals.CountAsync(m => m.HostId == userId);
        }

        public async Task<Meal?> GetMealWithParticipantsAsync(int mealId)
        {
            return await _context.Meals
                .Include(m => m.Participants)
                    .ThenInclude(p => p.User)
                .FirstOrDefaultAsync(m => m.Mid == mealId);
        }

        public async Task<bool> IsUserParticipantAsync(int mealId, int userId)
        {
            return await _context.MealParticipants
                .AnyAsync(p => p.MealId == mealId && p.UserId == userId);
        }
    }
}