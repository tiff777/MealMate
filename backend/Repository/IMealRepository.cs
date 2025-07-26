using backend.Models.Dto.Meal;
using backend.Models.Entity;

namespace backend.Repository
{
    public interface IMealRepository : IRepository<Meal>
    {
        Task<IEnumerable<ShowMealDto>> GetAllMealsWithDetailsAsync(int page = 1, int pageSize = 10);
        Task<ShowMealDto?> GetMealWithDetailsAsync(int mealId);
        Task<IEnumerable<ShowMealDto>> GetLatestUpcomingMealsAsync(int count = 3);
        Task<IEnumerable<ShowMealDto>> GetHostedMealsAsync(int userId, int page = 1, int pageSize = 10);

        Task<int> GetTotalMealsCountAsync();
        Task<int> GetHostedMealsCountAsync(int userId);

        Task<Meal?> GetMealWithParticipantsAsync(int mealId);
        Task<bool> IsUserParticipantAsync(int mealId, int userId);
    }
}