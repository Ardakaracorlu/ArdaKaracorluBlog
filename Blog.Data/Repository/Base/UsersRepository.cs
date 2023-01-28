using Blog.Data.Context;
using Blog.Data.Entities;
using Blog.Data.Repository.Interface;

namespace Blog.Data.Repository.Base
{
    public class UsersRepository:BaseRepository<Users,DBContext>,IUsersRepository
    {
    }
}
