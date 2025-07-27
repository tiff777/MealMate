using Azure.Core;
using backend.Attributes;
using backend.Data;
using backend.Extention;
using backend.Models.Dto;
using backend.Models.Dto.Meal;
using backend.Models.Entity;
using backend.Models.Enum;
using backend.Repository;
using backend.Services;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using System.Security.Cryptography;

namespace backend.Controller
{
    [ApiController]
    [Route("api/meal")]
    public class MealController : ControllerBase
    {
        private readonly IMealRepository _mealRepository;
        private readonly IChatRoomRepository _chatRoomRepository;
        private readonly ApplicationDbContext _db;

        public MealController(IMealRepository mealRepository, IChatRoomRepository chatRoomRepository, ApplicationDbContext db)
        {
            _mealRepository = mealRepository;
            _chatRoomRepository = chatRoomRepository;
            _db = db;
        }

                [HttpGet]
        public async Task<IActionResult> GetAllMeal([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            try
            {
                var mealDtos = await _mealRepository.GetAllMealsWithDetailsAsync(page, pageSize);
                var totalCount = await _mealRepository.GetTotalMealsCountAsync();
                
                return Ok(new 
                { 
                    meals = mealDtos,
                    pagination = new 
                    {
                        currentPage = page,
                        pageSize = pageSize,
                        totalCount = totalCount,
                        totalPages = (int)Math.Ceiling((double)totalCount / pageSize)
                    }
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }          
            
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetMeal(int id)
        {
            try
            {
                var mealDto = await _mealRepository.GetMealWithDetailsAsync(id);

                if (mealDto == null)
                {
                    return NotFound();
                }

                return Ok(mealDto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("latest")]
        public async Task<IActionResult> GetLatestUpcomingMeals()
        {
            try
            {
                var meals = await _mealRepository.GetLatestUpcomingMealsAsync(3);
                return Ok(meals);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Error retrieving latest upcoming meals", error = ex.Message });
            }
        }


        [HttpPost]
        [AuthorizeUser]
        public async Task<IActionResult> AddMeal([FromBody] AddMealDto newMeal)
        {
            var userId = this.GetCurrentUserId();
            try
            {
                var meal = new Meal()
                {
                    Title = newMeal.Title,
                    Description = newMeal.Description,
                    MaxParticipant = newMeal.MaxParticipant,
                    RestaurantName = newMeal.RestaurantName,
                    RestaurantAddress = newMeal.RestaurantAddress,
                    MealDate = newMeal.MealDate,
                    HostId = userId,
                    Tags = newMeal.Tags,
                    CurrentParticipant = 1
                };

                _db.Meals.Add(meal);
                await _db.SaveChangesAsync();

                var participant = new MealParticipant
                {
                    MealId = meal.Mid,
                    UserId = userId,
                    JoinedAt = DateTimeOffset.UtcNow,
                    ParticipationStatus = MealParticipateStatus.host
                };

                _db.MealParticipants.Add(participant);
                await _db.SaveChangesAsync();

                var chatRoom = new ChatRoom
                {
                    Name = $"{meal.Title} Chat",
                    Description = $"Discussion for {meal.Title}",
                    HostId = userId,
                    IsPrivate = false,
                    CreatedAt = DateTimeOffset.UtcNow,
                    MealId = meal.Mid,
                    Members = new List<ChatRoomMember>
            {
                new ChatRoomMember
                {
                    UserId = userId,
                    UserName = this.GetCurrentUser().Name,
                    IsHost = true,
                    JoinedAt = DateTimeOffset.UtcNow,
                }
            }
                };

                _db.ChatRooms.Add(chatRoom);
                await _db.SaveChangesAsync();

                var mealDto = new ShowMealDto
                {
                    Mid = meal.Mid,
                    Title = meal.Title,
                    Description = meal.Description,
                    MealDate = meal.MealDate,
                    MaxParticipant = meal.MaxParticipant,
                    RestaurantName = meal.RestaurantName,
                    RestaurantAddress = meal.RestaurantAddress,
                    Tags = meal.Tags,
                    RealTimeStatus = meal.GetRealTimeStatus(),
                    CreatedAt = meal.CreatedAt,
                    HostId = meal.HostId,

                    Participants = meal.Participants.Select(p => new ParticipantDto
                    {
                        UserId = p.UserId,
                        Avatar = p.User.Avatar
                    }).ToList()
                };

                return Ok(new { message = "Meal created successfully", meal = mealDto });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Error in creating meal: ", ex.Message });
            }
        }

        [HttpPatch("{id}")]
        [AuthorizeUser]
        public async Task<IActionResult> UpdateMeal(int id, [FromBody] UpdateMealDto newMeal)
        {
            try
            {
                var userId = this.GetCurrentUserId();

                var meal = await _db.Meals.FindAsync(id);
                if (meal == null)
                {
                    return NotFound();
                }

                if (userId != meal.HostId)
                {
                    return Forbid();
                }

                meal.UpdateFromMealDto(newMeal);
                await _db.SaveChangesAsync();

                var mealDto = new ShowMealDto
                {
                    Mid = meal.Mid,
                    Title = meal.Title,
                    Description = meal.Description,
                    MealDate = meal.MealDate,
                    MaxParticipant = meal.MaxParticipant,
                    CurrentParticipant = meal.CurrentParticipant,
                    RestaurantName = meal.RestaurantName,
                    RestaurantAddress = meal.RestaurantAddress,
                    Tags = meal.Tags,
                    RealTimeStatus = meal.GetRealTimeStatus(),
                    CreatedAt = meal.CreatedAt,
                    HostId = meal.HostId,
                };


                return Ok(new { message = "Meal updated successful", mealDto });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Error in updating meal: ", ex.Message });

            }
        }

        [HttpDelete("{id}")]
        [AuthorizeUser]
        public async Task<IActionResult> DeleteMeal(int id)
        {
            var userId = this.GetCurrentUserId();
            try
            {
                var meal = await _db.Meals.FindAsync(id);
                if (meal == null)
                {
                    return NotFound();
                }

                if (userId != meal.HostId)
                {
                    return Forbid();
                }

                var chatRoom = await _db.ChatRooms
            .Include(c => c.Members)
            .Include(c => c.Messages)
            .FirstOrDefaultAsync(c => c.MealId == id);

                if (chatRoom != null)
                {
                    _db.ChatMessages.RemoveRange(chatRoom.Messages);

                    _db.ChatRoomMembers.RemoveRange(chatRoom.Members);

                    _db.ChatRooms.Remove(chatRoom);
                }

                _db.Meals.Remove(meal);
                await _db.SaveChangesAsync();

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Error in deleting meal: ", ex.Message });
            }

        }

        [HttpGet("hostedmeals")]
        [AuthorizeUser]
        public async Task<IActionResult> GetMyHostedMeals([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            try
            {
                var userId = this.GetCurrentUserId();
                Console.WriteLine($"id: {userId}");
                var myHostedMeals = await _mealRepository.GetHostedMealsAsync(userId, page, pageSize);
                var totalCount = await _mealRepository.GetHostedMealsCountAsync(userId);

                return Ok(new
                {
                    message = "My hosted meals retrieved successfully",
                    meals = myHostedMeals,
                    pagination = new 
                    {
                        currentPage = page,
                        pageSize = pageSize,
                        totalCount = totalCount,
                        totalPages = (int)Math.Ceiling((double)totalCount / pageSize)
                    }
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Error retrieving my hosted meals", error = ex.Message });
            }
        }

    }
}
