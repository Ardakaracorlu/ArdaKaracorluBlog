using Microsoft.AspNetCore.Mvc;

namespace Blog.Site.UI.Controllers
{
    public class BlogController : Controller
    {
        public IActionResult BlogList()
        {
            return View();
        }
    }
}
