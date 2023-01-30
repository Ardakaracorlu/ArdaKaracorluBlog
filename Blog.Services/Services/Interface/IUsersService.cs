using AutoWrapper.Wrappers;
using Blog.Services.Extensions;

namespace Blog.Services.Services.Interface
{
    public interface IUsersService : IHttpClientService<ApiResponse>
    {
        Task<ApiResponse> UsersGetList();
    }
}
