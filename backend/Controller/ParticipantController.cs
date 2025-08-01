﻿using Azure.Core;
using backend.Attributes;
using backend.Data;
using backend.Extention;
using backend.Hubs;
using backend.Models.Entity;
using backend.Models.Enum;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace backend.Controller
{
    [ApiController]
    [Route("api/participant")]
    public class ParticipantController:ControllerBase
    {
        private ApplicationDbContext _db;
        private readonly IHubContext<ChatHub> _chatHub;


        public ParticipantController (ApplicationDbContext db, IHubContext<ChatHub> chatHub)
        {
            _db = db;
            _chatHub = chatHub;
        }

        [HttpPost("join/{mealId}")]
        [AuthorizeUser]
        public async Task<IActionResult> JoinMeal(int mealId)
        {
            var userId = this.GetCurrentUserId();
            try
            {
                var meal = await _db.Meals.FindAsync(mealId);
                if (meal == null)
                {
                    return NotFound();
                }

                if (meal.CurrentParticipant == meal.MaxParticipant)
                {
                    return StatusCode(409, new { message = "Meal is already full" });
                }

                if (await _db.MealParticipants.AnyAsync(p => p.MealId == mealId && p.UserId == userId))
                {
                    return StatusCode(422, new { message = "User already joined this meal." });
                }

                var participant = new MealParticipant
                {
                    MealId = mealId,
                    UserId = userId,
                    ParticipationStatus = MealParticipateStatus.joined,
                    JoinedAt = DateTimeOffset.UtcNow
                };

                _db.MealParticipants.Add(participant);
                await _db.SaveChangesAsync();

                var username = this.GetCurrentUser().Name;

                var chatRoom = await _db.ChatRooms.FirstOrDefaultAsync(c => c.MealId == meal.Mid);
                chatRoom.Members.Add(new ChatRoomMember
                    {
                    UserId = userId,
                    UserName = username,
                    IsHost = false,
                    JoinedAt = DateTimeOffset.UtcNow,
                    });

                meal.CurrentParticipant++;

                await _db.SaveChangesAsync();

                if (chatRoom != null)
                {
                    await _chatHub.Clients.Group(chatRoom.Id.ToString())
                        .SendAsync("UserJoined", username, $"{username} joined the room");
                }


                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Error in joining meal: ", ex.Message });
            }
        }

        [HttpDelete("leave/{mealId}")]
        [AuthorizeUser]
        public async Task<IActionResult> LeaveMeal (int mealId)
        {
            var userId = this.GetCurrentUserId();
            try
            {
                var participant = await _db.MealParticipants
                    .FirstOrDefaultAsync(mp => mp.MealId == mealId && mp.UserId == userId);

                if (participant == null)
                {
                    return NotFound(new { message = "Not a participant of this meal" });
                }

                _db.MealParticipants.Remove(participant);

                var meal = await _db.Meals.FindAsync(mealId);
                if (meal != null)
                {
                    meal.CurrentParticipant = Math.Max(1, meal.CurrentParticipant - 1);
                }

                await _db.SaveChangesAsync();

                var chatRoom = await _db.ChatRooms
                .Include(c => c.Members)
                .FirstOrDefaultAsync(c => c.MealId == mealId);

                if (chatRoom != null)
                {
                    var chatMember = chatRoom.Members.FirstOrDefault(m => m.UserId == userId);
                    if (chatMember != null)
                    {
                        chatRoom.Members.Remove(chatMember);
                    }
                }
                await _db.SaveChangesAsync();

                var username = this.GetCurrentUser().Name;
                if (chatRoom != null)
                {
                    await _chatHub.Clients.Group(chatRoom.Id.ToString())
                        .SendAsync("UserLeft", username, $"{username} left the room");
                }

                return Ok(new { message = "Successfully left meal" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Error in leaving the meal: ", ex.Message });
            }
        }

        [HttpPatch("status/{mealId}/{userId}")]
        public async Task<IActionResult> UpdateParticipantStatus (int mealId, int userId, [FromBody] MealParticipateStatus status)
        {
            try
            {
                var participant = await _db.MealParticipants
                    .FirstOrDefaultAsync(mp => mp.MealId == mealId && mp.UserId == userId);

                if (participant == null)
                {
                    return NotFound(new { message = "Participant not found" });
                }

                participant.ParticipationStatus = status;                    
                await _db.SaveChangesAsync();

                return Ok(new { message = "Participant status updated", status = status.ToString() });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error updating status", error = ex.Message });
            }
        }

        [HttpGet("meal/{mealId}")]
        public async Task<IActionResult> GetParticipantsForMeal (int mealId)
        {
            try
            {
                var participants = await _db.MealParticipants
                    .Include(p => p.User)
                    .Where(p => p.MealId == mealId)
                    .Select(p => new
                    {
                        UserId = p.User.Uid,
                        Avatar = p.User.Avatar,
                    })
                    .ToListAsync();

                return Ok(participants);

            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Error in getting participants of a meal: ", ex.Message });
            }
        }

        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetMealForUser (int userId)
        {
            try
            {
                var meals = await _db.MealParticipants
     .Where(p => p.UserId == userId && p.Meal.HostId != userId)
     .Include(p => p.Meal)
         .ThenInclude(m => m.Participants)
             .ThenInclude(mp => mp.User)
     .GroupJoin(
         _db.ChatRooms,
         p => p.Meal.Mid,
         chat => chat.MealId,
         (p, chatRooms) => new { p, chatRoom = chatRooms.FirstOrDefault() }
     )
     .Select(x => new
     {
         Mid = x.p.Meal.Mid,
         Title = x.p.Meal.Title,
         Description = x.p.Meal.Description,
         MealDate = x.p.Meal.MealDate,
         RestaurantName = x.p.Meal.RestaurantName,
         RestaurantAddress = x.p.Meal.RestaurantAddress,
         CurrentParticipant = x.p.Meal.CurrentParticipant,
         MaxParticipant = x.p.Meal.MaxParticipant,
         Tags = x.p.Meal.Tags,
         Status = x.p.ParticipationStatus,
         ChatRoomId = x.chatRoom != null ? x.chatRoom.Id : (int?)null,

         Participants = x.p.Meal.Participants.Select(mp => new
         {
             UserId = mp.User.Uid,
             Name = mp.User.Name,
             Avatar = mp.User.Avatar
         }).ToList()
     })
     .ToListAsync();

                return Ok(meals);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Error in getting meals of a user: ", ex.Message });
            }
        }
    }
}
