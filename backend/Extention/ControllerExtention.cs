using backend.Models.Entity;
using Microsoft.AspNetCore.Mvc;

namespace backend.Extention
{
    public static class ControllerExtention
    {

        public static int GetCurrentUserId (this ControllerBase controller)
        {
            var userId = controller.HttpContext.Items["CurrentUserId"];
            if (userId == null)
            {
                throw new UnauthorizedAccessException("User not authenticated");
            }
            return (int)userId;
        }

        public static User GetCurrentUser (this ControllerBase controller)
        {
            var user = controller.HttpContext.Items["CurrentUser"] as User;
            if (user == null)
            {
                throw new UnauthorizedAccessException("User not authenticated");
            }
            return user;
        }
    }
}
