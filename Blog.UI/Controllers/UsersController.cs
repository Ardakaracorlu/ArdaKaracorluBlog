using Microsoft.AspNetCore.Mvc;

namespace Blog.UI.Controllers
{
    public class UsersController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
