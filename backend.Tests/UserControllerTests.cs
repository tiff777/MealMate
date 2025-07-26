using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Moq;
using Xunit;
using backend.Controller;
using backend.Data;
using backend.Models.Entity;
using backend.Repository;
using backend.Services;
using backend.Models.Dto.User;

namespace backend.Tests
{
    public class UserControllerTests : IDisposable
    {
        private readonly ApplicationDbContext _context;
        private readonly Mock<IUserRepository> _mockUserRepository;
        private readonly Mock<IAuthService> _mockAuthService;
        private readonly UserController _controller;

        public UserControllerTests()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;

            _context = new ApplicationDbContext(options);
            _mockUserRepository = new Mock<IUserRepository>();
            _mockAuthService = new Mock<IAuthService>();
            _controller = new UserController(_mockUserRepository.Object, _context, _mockAuthService.Object);
        }

        [Fact]
        public async Task GetAllUsers_ReturnsOkResult_WithUsers()
        {
            // Arrange
            var users = new List<ShowUserDto>
            {
                new ShowUserDto { Uid = 1, Name = "User 1", Email = "user1@test.com" },
                new ShowUserDto { Uid = 2, Name = "User 2", Email = "user2@test.com" }
            };

            _mockUserRepository.Setup(x => x.GetAllUsersAsync(1, 20))
                             .ReturnsAsync(users);
            _mockUserRepository.Setup(x => x.GetTotalUsersCountAsync())
                             .ReturnsAsync(2);

            // Act
            var result = await _controller.GetAllUsers(1, 20);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.NotNull(okResult.Value);
        }

        [Fact]
        public async Task GetAllUsers_WithInvalidPage_ReturnsEmptyList()
        {
            // Arrange
            _mockUserRepository.Setup(x => x.GetAllUsersAsync(999, 20))
                             .ReturnsAsync(new List<ShowUserDto>());
            _mockUserRepository.Setup(x => x.GetTotalUsersCountAsync())
                             .ReturnsAsync(2);

            // Act
            var result = await _controller.GetAllUsers(999, 20);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.NotNull(okResult.Value);
        }

        [Fact]
        public async Task GetUser_WithValidId_ReturnsUser()
        {
            // Arrange
            var user = new User
            {
                Uid = 1,
                Name = "Test User",
                Email = "test@example.com",
                PasswordHash = "hashedpassword",
                IsOnline = true
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            // Act
            var result = await _controller.GetUser(1);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.NotNull(okResult.Value);
        }

        [Fact]
        public async Task GetUser_WithInvalidId_ReturnsNotFound()
        {
            // Act
            var result = await _controller.GetUser(999);

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}