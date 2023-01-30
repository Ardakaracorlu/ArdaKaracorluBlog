using Blog.Services.Services.Base;
using Blog.Services.Services.Interface;
using Microsoft.Extensions.DependencyInjection;

namespace Blog.Services.Extensions
{
    public static class ContextExtension
    {
        public static IServiceCollection ConfigureRepositories(this IServiceCollection services)
        {
            services.AddScoped<IUsersService,UsersService>();
            return services;
        }
    }
}
