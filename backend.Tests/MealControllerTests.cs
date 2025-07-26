using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Moq;
using Xunit;
using backend.Controller;
using backend.Data;
using backend.Models.Entity;
using backend.Repository;
using backend.Models.Dto.Meal;

namespace backend.Tests
{
    public class MealControllerTests : IDisposable
    {
        private readonly ApplicationDbContext _context;
        private readonly Mock<IMealRepository> _mockMealRepository;
        private readonly Mock<IChatRoomRepository> _mockChatRoomRepository;
        private readonly MealController _controller;

        public MealControllerTests()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;

            _context = new ApplicationDbContext(options);
            _mockMealRepository = new Mock<IMealRepository>();
            _mockChatRoomRepository = new Mock<IChatRoomRepository>();
            _controller = new MealController(_mockMealRepository.Object, _mockChatRoomRepository.Object, _context);
        }

        [Fact]
        public async Task GetAllMeal_ReturnsOkResult_WithMeals()
        {
            // Arrange
            var meals = new List<ShowMealDto>
            {
                new ShowMealDto
                {
                    Mid = 1,
                    Title = "Test Meal 1",
                    RestaurantName = "Test Restaurant",
                    MaxParticipant = 4,
                    CurrentParticipant = 2
                },
                new ShowMealDto
                {
                    Mid = 2,
                    Title = "Test Meal 2",
                    RestaurantName = "Another Restaurant",
                    MaxParticipant = 6,
                    CurrentParticipant = 1
                }
            };

            _mockMealRepository.Setup(x => x.GetAllMealsWithDetailsAsync(1, 10))
                             .ReturnsAsync(meals);
            _mockMealRepository.Setup(x => x.GetTotalMealsCountAsync())
                             .ReturnsAsync(2);

            // Act
            var result = await _controller.GetAllMeal(1, 10);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.NotNull(okResult.Value);
        }

        [Fact]
        public async Task GetMeal_WithValidId_ReturnsMeal()
        {
            // Arrange
            var mealDto = new ShowMealDto
            {
                Mid = 1,
                Title = "Test Meal",
                Description = "Test Description",
                RestaurantName = "Test Restaurant",
                MaxParticipant = 4,
                CurrentParticipant = 1
            };

            _mockMealRepository.Setup(x => x.GetMealWithDetailsAsync(1))
                             .ReturnsAsync(mealDto);

            // Act
            var result = await _controller.GetMeal(1);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.NotNull(okResult.Value);
        }

        [Fact]
        public async Task GetMeal_WithInvalidId_ReturnsNotFound()
        {
            // Arrange
            _mockMealRepository.Setup(x => x.GetMealWithDetailsAsync(999))
                             .ReturnsAsync((ShowMealDto?)null);

            // Act
            var result = await _controller.GetMeal(999);

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public async Task GetLatestUpcomingMeals_ReturnsOkResult()
        {
            // Arrange
            var meals = new List<ShowMealDto>
            {
                new ShowMealDto
                {
                    Mid = 1,
                    Title = "Upcoming Meal 1",
                    RestaurantName = "Restaurant 1"
                },
                new ShowMealDto
                {
                    Mid = 2,
                    Title = "Upcoming Meal 2",
                    RestaurantName = "Restaurant 2"
                }
            };

            _mockMealRepository.Setup(x => x.GetLatestUpcomingMealsAsync(3))
                             .ReturnsAsync(meals);

            // Act
            var result = await _controller.GetLatestUpcomingMeals();

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.NotNull(okResult.Value);
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}