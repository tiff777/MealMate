using backend.Attributes;
using backend.Data;
using backend.Extention;
using backend.Hubs;
using backend.Models.Dto;
using backend.Models.Dto.Chat;
using backend.Models.Dto.Meal;
using backend.Models.Entity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
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
            private IHubContext<ChatHub> _hubContext;

            public ChatRoomController (ApplicationDbContext db,IHubContext<ChatHub> hubContext)
            {
                _db = db;
                _hubContext = hubContext;
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

                        memberCount= m.ChatRoom.Members.Count(),

                        LastMessage = m.ChatRoom.Messages
                        .OrderByDescending(msg => msg.Timestamp)
                        .Select(msg => new {
                         Content = msg.Content, 
                         TimeStamp = msg.Timestamp,
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
                    IsPrivate = false,
                    HostId = user.Uid,
                    Members = new List<ChatRoomMember>
                    {
                        new ChatRoomMember
                        {
                            UserId = user.Uid,
                            UserName = user.Name,
                            IsHost = true,
                            JoinedAt = DateTimeOffset.UtcNow
                        }
                       }
                };

                _db.ChatRooms.Add(room);
                await _db.SaveChangesAsync();

                return Ok(room);
            }

            [HttpPost("private")]
            [AuthorizeUser]
            public async Task<IActionResult> CreatePrivateChatRoom ([FromBody] CreatePrivateChatRoomDto dto)
            {
                var user = this.GetCurrentUser();

            try
            {
                var existingRoom = await _db.ChatRooms
                .Where(r => r.IsPrivate)
                .Where(r => r.Members.Any(m => m.UserId == user.Uid))
                .Where(r => r.Members.Any(m => m.UserId == dto.TargetUserId))
                .FirstOrDefaultAsync();

                if (existingRoom != null)
                {
                    return Ok(existingRoom.Id);
                }

                var room = new ChatRoom
                {
                    Name = dto.TargetUserName,
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
                            JoinedAt = DateTimeOffset.UtcNow
                        },
                        new ChatRoomMember
                        {
                            UserId = dto.TargetUserId,
                            UserName = dto.TargetUserName,
                            IsHost = false,
                            JoinedAt = DateTimeOffset.UtcNow
                        }
                    }
                };

                _db.ChatRooms.Add(room);
                await _db.SaveChangesAsync();



                return Ok(room.Id);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
                
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
            public async Task<IActionResult> PostMessage (int roomId, [FromBody] CreateMessageDto dto)
            {
            try
            {
                var user = this.GetCurrentUser();
                var room = await _db.ChatRooms.FindAsync(roomId);
                if (room == null)
                {
                    return NotFound(new { message = "Chat room not found" });
                }

                var isMember = await _db.ChatRoomMembers
                    .AnyAsync(m => m.ChatRoomId == roomId && m.UserId == user.Uid);

                if (!isMember)
                {
                    return Forbid("You are not a member of this room");
                }

                var messageEntity = new ChatMessage
                {
                    ChatRoomId = roomId,
                    Content = dto.Content,
                    UserName = user.Name,
                    UserId = user.Uid,
                    Timestamp = DateTimeOffset.UtcNow
                };

                _db.ChatMessages.Add(messageEntity);
                await _db.SaveChangesAsync();

                var messageDto = new ChatMessageDto
                {
                    Id = messageEntity.Id,
                    Content = messageEntity.Content,
                    UserName = messageEntity.UserName,
                    UserId = messageEntity.UserId,
                    Timestamp = messageEntity.Timestamp,
                    ChatRoomId = messageEntity.ChatRoomId
                };

                await _hubContext.Clients.Group(roomId.ToString())
                    .SendAsync("ReceiveMessage", messageDto);



                return Ok(messageDto);

            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Error in posting message: ", ex.Message });
            }
            
            }
        }
    
}
