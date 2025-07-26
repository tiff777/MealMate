using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Moq;
using Xunit;
using backend.Controller;
using backend.Data;
using backend.Models.Entity;
using backend.Repository;
using backend.Models.Dto.Chat;
using Microsoft.AspNetCore.SignalR;
using backend.Hubs;
using Microsoft.AspNetCore.Http;

namespace backend.Tests
{
    public class ChatRoomControllerTests : IDisposable
    {
        private readonly ApplicationDbContext _context;
        private readonly Mock<IChatRoomRepository> _mockChatRoomRepository;
        private readonly Mock<IHubContext<ChatHub>> _mockHubContext;
        private readonly ChatRoomController _controller;

        public ChatRoomControllerTests()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;

            _context = new ApplicationDbContext(options);
            _mockChatRoomRepository = new Mock<IChatRoomRepository>();
            _mockHubContext = new Mock<IHubContext<ChatHub>>();
            _controller = new ChatRoomController(_mockChatRoomRepository.Object, _context, _mockHubContext.Object);
            
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
        public async Task GetMessages_WithValidRoomId_ReturnsOkResult()
        {
            // Arrange
            var chatRoom = new ChatRoom
            {
                Id = 1,
                Name = "Test Room",
                Description = "Test Description",
                CreatedAt = DateTimeOffset.Now,
                HostId = 1,
                IsPrivate = false
            };

            _context.ChatRooms.Add(chatRoom);
            await _context.SaveChangesAsync();

            var messages = new List<ChatMessage>
            {
                new ChatMessage
                {
                    Id = 1,
                    Content = "Test message 1",
                    UserId = 1,
                    UserName = "User 1",
                    Timestamp = DateTimeOffset.Now,
                    ChatRoomId = 1
                },
                new ChatMessage
                {
                    Id = 2,
                    Content = "Test message 2",
                    UserId = 2,
                    UserName = "User 2",
                    Timestamp = DateTimeOffset.Now,
                    ChatRoomId = 1
                }
            };

            _mockChatRoomRepository.Setup(x => x.GetRoomMessagesAsync(1, 1, 50))
                                 .ReturnsAsync(messages);

            // Act
            var result = await _controller.GetMessages(1, 1, 50);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.NotNull(okResult.Value);
        }

        [Fact]
        public async Task GetMessages_WithInvalidRoomId_ReturnsEmptyResult()
        {
            // Arrange
            _mockChatRoomRepository.Setup(x => x.GetRoomMessagesAsync(999, 1, 50))
                                 .ReturnsAsync(new List<ChatMessage>());

            // Act
            var result = await _controller.GetMessages(999, 1, 50);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.NotNull(okResult.Value);
        }

        [Fact]
        public void CreateChatRoomDto_HasCorrectProperties()
        {
            // Arrange & Act
            var dto = new CreateChatRoomDto
            {
                Name = "Test Room",
                Description = "Test Description"
            };

            // Assert
            Assert.Equal("Test Room", dto.Name);
            Assert.Equal("Test Description", dto.Description);
        }

        [Fact]
        public async Task ChatRoom_HasCorrectPrimaryKey()
        {
            // Arrange
            var chatRoom = new ChatRoom
            {
                Id = 1,
                Name = "Test Room",
                Description = "Test Description",
                HostId = 1
            };

            _context.ChatRooms.Add(chatRoom);
            await _context.SaveChangesAsync();

            // Act
            var savedRoom = await _context.ChatRooms.FindAsync(1);

            // Assert
            Assert.NotNull(savedRoom);
            Assert.Equal(1, savedRoom.Id);
            Assert.Equal("Test Room", savedRoom.Name);
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}