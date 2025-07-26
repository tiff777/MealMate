using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Moq;
using Xunit;
using backend.Controller;
using backend.Data;
using backend.Models.Entity;
using Microsoft.AspNetCore.SignalR;
using backend.Hubs;
using backend.Models.Enum;
using Microsoft.AspNetCore.Http;

namespace backend.Tests
{
    public class ParticipantControllerTests : IDisposable
    {
        private readonly ApplicationDbContext _context;
        private readonly Mock<IHubContext<ChatHub>> _mockHubContext;
        private readonly ParticipantController _controller;

        public ParticipantControllerTests()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;

            _context = new ApplicationDbContext(options);
            _mockHubContext = new Mock<IHubContext<ChatHub>>();
            _controller = new ParticipantController(_context, _mockHubContext.Object);

            // Setup mock HTTP context
            var httpContext = new Mock<HttpContext>();
            var items = new Dictionary<object, object?>
            {
                { "CurrentUserId", 1 }
            };
            httpContext.Setup(x => x.Items).Returns(items);
            _controller.ControllerContext = new ControllerContext
            {
                HttpContext = httpContext.Object
            };
        }

        [Fact]
        public async Task JoinMeal_WithNonExistentMeal_ReturnsNotFound()
        {
            // Act - Attempt to join a non-existent meal
            var result = await _controller.JoinMeal(999);

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public async Task JoinMeal_WithFullMeal_ReturnsConflict()
        {
            // Arrange - Create a meal that is already full
            var meal = new Meal
            {
                Mid = 1,
                Title = "Full Meal",
                Description = "A full meal",
                MaxParticipant = 2,
                CurrentParticipant = 2, // Already full
                RestaurantName = "Test Restaurant",
                RestaurantAddress = "Test Address",
                HostId = 1
            };

            _context.Meals.Add(meal);
            await _context.SaveChangesAsync();

            // Act
            var result = await _controller.JoinMeal(1);

            // Assert - Should return 409 Conflict
            var statusResult = Assert.IsType<ObjectResult>(result);
            Assert.Equal(409, statusResult.StatusCode);
        }

        [Fact]
        public async Task LeaveMeal_WithNonExistentParticipant_ReturnsNotFound()
        {
            // Arrange - Create a meal but no participant
            var meal = new Meal
            {
                Mid = 1,
                Title = "Test Meal",
                Description = "Test Description",
                MaxParticipant = 4,
                RestaurantName = "Test Restaurant",
                RestaurantAddress = "Test Address",
                HostId = 1
            };

            _context.Meals.Add(meal);
            await _context.SaveChangesAsync();

            // Act - Attempt to leave a meal the user never joined
            var result = await _controller.LeaveMeal(1);

            // Assert
            var notFoundResult = Assert.IsType<NotFoundObjectResult>(result);
            Assert.NotNull(notFoundResult.Value);
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}