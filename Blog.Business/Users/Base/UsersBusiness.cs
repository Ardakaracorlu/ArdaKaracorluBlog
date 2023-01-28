using AutoWrapper.Wrappers;
using Blog.Business.Users.Interface;
using Blog.Data.Repository.Interface;
using System.Diagnostics;
using System.Net;
using System.Reflection;

namespace Blog.Business.Users.Base
{
    public class UsersBusiness:IUsersBusiness
    {
        private readonly IUsersRepository _usersRepository;

        ApiResponse apiResponse = null;
        string path = FileVersionInfo.GetVersionInfo(Assembly.GetExecutingAssembly().Location).ProductVersion;

        public UsersBusiness(IUsersRepository UsersRepository)
        {
            _usersRepository = UsersRepository;
        }

        public ApiResponse UsersGetList()
        {
            apiResponse = new ApiResponse("", "", (int)HttpStatusCode.OK, path);
            apiResponse.IsError = false;
            try
            {
                apiResponse.Result = _usersRepository.GetList();
            }
            catch (Exception ex)
            {
                apiResponse.IsError = true;
                apiResponse.StatusCode = (int)HttpStatusCode.InternalServerError;
                apiResponse.Message = ex.Message;
            }

            return apiResponse;
        }
    }
}
