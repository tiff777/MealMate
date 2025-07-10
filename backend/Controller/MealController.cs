using Azure.Core;
using backend.Attributes;
using backend.Data;
using backend.Extention;
using backend.Models.Dto.Meal;
using backend.Models.Entity;
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
    public class MealController:ControllerBase
    {
        private ApplicationDbContext _db;

        public MealController (ApplicationDbContext db)
        {
            _db = db;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllMeal()
        {
            try
            {
                var allMeals = await _db.Meals.ToListAsync();
                return Ok(new
                {
                    data = allMeals,
                    count = allMeals.Count
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
                var meal = await _db.Meals.FindAsync(id);

                if (meal == null)
                {
                    return NotFound();
                }
                return Ok(meal);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [AuthorizeUser]
        public async Task<IActionResult> AddMeal ([FromBody]AddMealDto newMeal)
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

                var mealDto = new ShowMealDto
                {
                    Mid= meal.Mid,
                    Title = meal.Title,
                    Description = meal.Description,
                    MealDate = meal.MealDate,
                    MaxParticipant=meal.MaxParticipant,
                    RestaurantName = meal.RestaurantName,
                    RestaurantAddress = meal.RestaurantAddress,
                    Tags = meal.Tags,
                    Status = meal.Status,
                    CreatedAt=meal.CreatedAt,
                    HostId=meal.HostId,
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
        public async Task<IActionResult> UpdateMeal (int id, [FromBody]UpdateMealDto newMeal)
        {
            try
            {
                var userId = this.GetCurrentUserId();

                var meal=await _db.Meals.FindAsync(id);
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
                    Status = meal.Status,
                    CreatedAt = meal.CreatedAt,
                    HostId = meal.HostId,
                };


                return Ok(new {message = "Meal updated successful", mealDto });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Error in updating meal: ", ex.Message });

            }
        }

        [HttpDelete ("{id}")]
        [AuthorizeUser]
        public async Task<IActionResult> DeleteMeal (int id )
        {
            var userId= this.GetCurrentUserId();
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
        public async Task<IActionResult> GetMyHostedMeals ()
        {
            try
            {
                var userId = this.GetCurrentUserId();

                var myHostedMeals = await _db.Meals
                    .Where(m => m.HostId == userId)
                    .OrderByDescending(m => m.CreatedAt)
                    .Select(m => new ShowMealDto
                    {

                        Mid = m.Mid,
                        Title = m.Title,
                        Description = m.Description,
                        MealDate = m.MealDate,
                        MaxParticipant = m.MaxParticipant,
                        CurrentParticipant = m.CurrentParticipant,
                        RestaurantName = m.RestaurantName,
                        RestaurantAddress = m.RestaurantAddress,
                        Tags = m.Tags,
                        Status = m.Status,
                        CreatedAt = m.CreatedAt,
                        HostId = m.HostId,
                    })
                    .ToListAsync();

                return Ok(new
                {
                    message = "My hosted meals retrieved successfully",
                    count = myHostedMeals.Count,
                    meals = myHostedMeals
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Error retrieving my hosted meals", error = ex.Message });
            }
        }

    }
}
