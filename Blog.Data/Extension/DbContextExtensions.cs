using Blog.Data.Repository.Base;
using Blog.Data.Repository.Interface;
using Microsoft.Extensions.DependencyInjection;

namespace Blog.Data.Extension
{
    public static class DbContextExtensions
    {
        public static IServiceCollection ConfigureRepositories(this IServiceCollection services)
        {
            services.AddScoped<IUsersRepository, UsersRepository>();
            return services;
        }

    }
}
