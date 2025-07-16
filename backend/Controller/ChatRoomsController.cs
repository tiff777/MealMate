using backend.Attributes;
using backend.Data;
using backend.Extention;
using backend.Models.Dto;
using backend.Models.Dto.Chat;
using backend.Models.Dto.Meal;
using backend.Models.Entity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using System.Linq;

namespace backend.Controller
{
    
        [ApiController]
        [Route("api/chat")]
        public class ChatRoomController : ControllerBase
        {
            private ApplicationDbContext _db;

            public ChatRoomController (ApplicationDbContext db)
            {
                _db = db;
            }

            [HttpGet]
            [AuthorizeUser]
            public async Task<IActionResult> GetAllRooms ()
            {
                var userId= this.GetCurrentUserId();
                var rooms = await _db.ChatRoomMembers
                    .Where(m => m.UserId == userId)
                    .Select(m => new
                    {
                        RoomId = m.ChatRoom.Id,
                        Name = m.ChatRoom.Name,
                        Description = m.ChatRoom.Description,

                        LastMessage = m.ChatRoom.Messages
                        .OrderByDescending(msg => msg.Timestamp)
                        .Select(msg => new {
                         Content = msg.Content
                        })
                    .FirstOrDefault()
                    })
                    .ToListAsync();
                return Ok(rooms);
            }

            [HttpPost("meal")]
            [AuthorizeUser]
            public async Task<IActionResult> CreateRoom ([FromBody] CreateChatRoomDto dto)
            {
                var user = this.GetCurrentUser();
                var room = new ChatRoom
                {
                    Name = dto.Name,
                    Description = dto.Description,
                    IsPrivate = dto.IsPrivate,
                    HostId = user.Uid,
                    Members = new List<ChatRoomMember>
                    {
                        new ChatRoomMember
                        {
                            UserId = user.Uid,
                            UserName = user.Name,
                            IsHost = true,
                            JoinedAt = DateTime.UtcNow
                        }
                       }
                };

                _db.ChatRooms.Add(room);
                await _db.SaveChangesAsync();

                return Ok(room);
            }

            [HttpPost("private")]
            [AuthorizeUser]
            public async Task<IActionResult> CreatePrivateChatRoom ([FromBody] CreateChatRoomDto dto, int targetUserId, string targetUserName)
            {
                var user = this.GetCurrentUser();
                var room = new ChatRoom
                {
                    Name = targetUserName,
                    Description = dto.Description,
                    IsPrivate = true,
                    HostId = user.Uid,
                    Members = new List<ChatRoomMember>
                    {
                        new ChatRoomMember
                        {
                            UserId = user.Uid,
                            UserName = user.Name,
                            IsHost = true,
                            JoinedAt = DateTime.UtcNow
                        },
                        new ChatRoomMember
                        {
                            UserId = targetUserId,
                            UserName = targetUserName,
                            IsHost = false,
                            JoinedAt = DateTime.UtcNow
                        }
                    }
                };

                _db.ChatRooms.Add(room);
                await _db.SaveChangesAsync();

                return Ok(room);
            }

            [HttpPost("{roomId}/join")]
            [AuthorizeUser]
            public async Task<IActionResult> JoinRoom (int roomId)
            {
                var user = this.GetCurrentUser();
                var room = _db.ChatRooms.FindAsync(roomId);
                if (room == null) return NotFound("Room not found");

                if (!_db.ChatRoomMembers.Any(m => m.ChatRoomId == roomId && m.UserId == user.Uid))
                {
                    var member = new ChatRoomMember
                    {
                        ChatRoomId = roomId,
                        UserId = user.Uid,
                        UserName = user.Name,
                        IsHost = false
                    };
                    _db.ChatRoomMembers.Add(member);
                    await _db.SaveChangesAsync();
                }

                return Ok(room);
            }

            [HttpPost("{roomId}/leave")]
            [AuthorizeUser]
            public async Task<IActionResult> LeaveRoom (int roomId)
            {
                var userId = this.GetCurrentUserId();

                var member = await _db.ChatRoomMembers
                    .FirstOrDefaultAsync(m => m.ChatRoomId == roomId && m.UserId == userId);

                if (member == null) return NotFound("You are not a member of this room.");

                _db.ChatRoomMembers.Remove(member);
                await _db.SaveChangesAsync();

                return Ok();
            }

            [HttpGet("{roomId}/messages")]
            [AuthorizeUser]
            public async Task<IActionResult> GetMessages (int roomId)
            {
                var roomMessages = await _db.ChatMessages
                .Where(m => m.ChatRoomId == roomId)
                .OrderBy(m => m.Timestamp)
                .Select(m => new ChatMessageDto
                {
                    Id = m.Id,
                    Content = m.Content,
                    Timestamp = m.Timestamp,
                    UserId = m.UserId,
                    UserName = m.UserName,
                    ChatRoomId = m.ChatRoomId,
                })
                .ToListAsync();

                return Ok (roomMessages);
            }

            [HttpPost("{roomId}/messages")]
            [AuthorizeUser]
            public async Task<IActionResult> PostMessage (int roomId, [FromBody] ChatMessageDto dto)
            {

                dto.Timestamp = DateTime.UtcNow;
                dto.ChatRoomId = roomId;

                var messageEntity = new ChatMessage
                {
                    ChatRoomId = roomId,
                    Content = dto.Content,
                    UserName = dto.UserName,
                    UserId = dto.UserId,
                    Timestamp = dto.Timestamp
                };

                _db.ChatMessages.Add(messageEntity);
                await _db.SaveChangesAsync();

                return Ok(messageEntity);
            }
        }
    
}
