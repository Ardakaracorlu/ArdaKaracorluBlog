using AutoWrapper.Wrappers;
using Blog.Services.Extensions;
using Blog.Services.Services.Interface;

namespace Blog.Services.Services.Base
{
    public class UsersService: HttpClientService<ApiResponse>, IUsersService
    {
    }
}
