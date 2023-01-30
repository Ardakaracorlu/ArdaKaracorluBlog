using AutoWrapper.Wrappers;
using Blog.Services.Extensions;
using Blog.Services.Services.Interface;

namespace Blog.Services.Services.Base
{
    public class UsersService : HttpClientService<ApiResponse>, IUsersService
    {


        public async Task<ApiResponse> UsersGetList()
        {
            return await this.MethodGet("https://localhost:7153/api/Users/UsersGetList");
        }
    }
}
