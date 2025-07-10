using Azure.Core;
using backend.Attributes;
using backend.Data;
using backend.Extention;
using backend.Models.Entity;
using backend.Models.Enum;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controller
{
    [ApiController]
    [Route("api/participant")]
    public class ParticipantController:ControllerBase
    {
        private ApplicationDbContext _db;

        public ParticipantController (ApplicationDbContext db)
        {
            _db = db;
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
                        Name = p.User.Name,
                        Email = p.User.Email,
                        Avatar = p.User.Avatar,
                        Bio = p.User.Bio
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
                    .Include(p => p.Meal)
                    .Where(p => p.UserId == userId)
                    .Select(p => new
                    {
                        MealId = p.Meal.Mid,
                        Title = p.Meal.Title,
                        Description = p.Meal.Description,
                        Date = p.Meal.MealDate,
                        Address = p.Meal.RestaurantAddress
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
