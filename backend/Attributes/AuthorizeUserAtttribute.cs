using backend.Data;
using backend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace backend.Attributes
{
    public class AuthorizeUserAttribute : Attribute, IAsyncAuthorizationFilter
    {
        public async Task OnAuthorizationAsync (AuthorizationFilterContext context)
        {
            var authService = context.HttpContext.RequestServices.GetRequiredService<IAuthService>();
            var dbContext = context.HttpContext.RequestServices.GetRequiredService<ApplicationDbContext>();

            try
            {
                var authHeader = context.HttpContext.Request.Headers["Authorization"].ToString();

                var jwtUserId = authService.GetUserIdFromToken(authHeader);
                if (jwtUserId == null)
                {
                    context.Result = new UnauthorizedObjectResult(new { message = "Invalid token" });
                    return;
                }

                var user = await dbContext.Users.FindAsync(jwtUserId.Value);
                if (user == null)
                {
                    context.Result = new NotFoundObjectResult(new { message = "User not found" });
                    return;
                }

                context.HttpContext.Items["CurrentUser"] = user;
                context.HttpContext.Items["CurrentUserId"] = jwtUserId.Value;
            }
            catch (Exception ex)
            {
                context.Result = new UnauthorizedObjectResult(new { message = "Authentication failed", error = ex.Message });
            }
        }
    }
}
