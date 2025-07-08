using Azure.Core;
using backend.Data;
using backend.Extention;
using backend.Models.Dto.Meal;
using backend.Models.Entity;
using backend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controller
{
    [ApiController]
    [Route("api/meal")]    
    public class MealController:ControllerBase
    {
        private ApplicationDbContext _db;
        //private IAuthService _authService;
        public MealController (ApplicationDbContext db)
        {
            _db = db;
            // _authService = authService;

        }

        [HttpGet]
        public async Task<IActionResult> GetAllMeal()
        {
            try
            {
                var allMeals = await _db.Meals.ToListAsync();
                return Ok(allMeals);
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
        public async Task<IActionResult> AddMeal ([FromBody]AddMealDto newMeal)
        {
            try
            {
                var meal = new Meal()
                {
                    Title = newMeal.Title,
                    Description = newMeal.Description,
                    MaxParticipant = newMeal.MaxParticipant,
                    RestaurantName = newMeal.RestaurantName,
                    RestaurantAddress = newMeal.RestaurantAddress,
                    mealDate = newMeal.MealDate,
                    hostId = newMeal.HostId, // Modify later
                    CurrentParticipant = 1
                };

                _db.Meals.Add(meal);
                await _db.SaveChangesAsync();

                return Ok(new { message = "Meal created successfully", meal });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Error in creating meal: ", ex.Message });
            }            
        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> UpdateMeal (int id, [FromBody]UpdateMealDto newMeal)
        {
            try
            {
                var meal=await _db.Meals.FindAsync(id);
                if (meal == null)
                {
                    return NotFound();
                }

                meal.UpdateFromMealDto(newMeal);
                await _db.SaveChangesAsync();

                return Ok(new {message = "Meal updated successful", meal});
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Error in updating meal: ", ex.Message });

            }
        }




        [HttpDelete ("{id}")]
        public async Task<IActionResult> DeleteMeal (int id )
        {
            var meal = await _db.Meals.FindAsync(id);
            if (meal == null)
            {
                return NotFound();
            }

            _db.Meals.Remove(meal);
            await _db.SaveChangesAsync();

            return Ok();
        }

    }
}
