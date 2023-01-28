using AutoWrapper.Wrappers;
using Blog.Business.Users.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Blog.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {

        private readonly IUsersBusiness _usersBusiness;

        public UsersController(IUsersBusiness UsersBusiness)
        {
            _usersBusiness = UsersBusiness;
        }

        [HttpGet("UsersGetList")]
        public ApiResponse UserGetlist()
        {
            return _usersBusiness.UsersGetList();
        }
    }
}
