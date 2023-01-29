using Microsoft.Extensions.DependencyInjection;

namespace Blog.Services.Extensions
{
    public static class ContextExtension
    {
        public static IServiceCollection ConfigureRepositories(this IServiceCollection services)
        {
            services.AddMemoryCache();
            return services;
        }
    }
}
