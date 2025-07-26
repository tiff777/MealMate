using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Moq;
using Xunit;
using backend.Controller;
using backend.Data;
using backend.Models.Dto.Auth;
using backend.Models.Entity;
using backend.Services;

namespace backend.Tests
{
    public class AuthControllerTests : IDisposable
    {
        private readonly ApplicationDbContext _context;
        private readonly Mock<IAuthService> _mockAuthService;
        private readonly AuthController _controller;

        public AuthControllerTests()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;

            _context = new ApplicationDbContext(options);
            _mockAuthService = new Mock<IAuthService>();
            _controller = new AuthController(_context, _mockAuthService.Object);
        }

        [Fact]
        public async Task Login_WithValidCredentials_ReturnsOkResult()
        {
            // Arrange
            var user = new User
            {
                Uid = 1,
                Email = "test@example.com",
                Name = "Test User",
                PasswordHash = "hashedpassword"
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            var loginDto = new LoginDto
            {
                Email = "test@example.com",
                Password = "password123"
            };

            _mockAuthService.Setup(x => x.VerifyPassword("password123", "hashedpassword"))
                          .Returns(true);
            _mockAuthService.Setup(x => x.GenerateToken(It.IsAny<User>()))
                          .Returns("fake-jwt-token");

            // Act
            var result = await _controller.Login(loginDto);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.NotNull(okResult.Value);
        }

        [Fact]
        public async Task Login_WithInvalidEmail_ReturnsUnauthorized()
        {
            // Arrange
            var loginDto = new LoginDto
            {
                Email = "nonexistent@example.com",
                Password = "wrongpassword"
            };

            // Act
            var result = await _controller.Login(loginDto);

            // Assert
            var unauthorizedResult = Assert.IsType<UnauthorizedObjectResult>(result);
            Assert.NotNull(unauthorizedResult.Value);
        }

        [Fact]
        public async Task Login_WithInvalidPassword_ReturnsUnauthorized()
        {
            // Arrange
            var user = new User
            {
                Uid = 1,
                Email = "test@example.com",
                Name = "Test User",
                PasswordHash = "hashedpassword"
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            var loginDto = new LoginDto
            {
                Email = "test@example.com",
                Password = "wrongpassword"
            };

            _mockAuthService.Setup(x => x.VerifyPassword("wrongpassword", "hashedpassword"))
                          .Returns(false);

            // Act
            var result = await _controller.Login(loginDto);

            // Assert
            Assert.IsType<UnauthorizedObjectResult>(result);
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}