using Blog.Business.Configuration;
using Blog.Business.Users.Base;
using Blog.Business.Users.Interface;
using Microsoft.Extensions.DependencyInjection;

namespace Blog.Business.Extension
{
    public static class DbContextExtensions
    {
        public static IServiceCollection ConfigureRepositories(this IServiceCollection services)
        {
            services.AddSingleton<IConfigManager, ConfigManager>();
            services = Blog.Data.Extension.DbContextExtensions.ConfigureRepositories(services);
            services.AddScoped<IUsersBusiness, UsersBusiness>();
            return services;
        }
    }
}
