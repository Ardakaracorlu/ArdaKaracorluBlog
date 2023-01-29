namespace Blog.Services.Extensions
{
    public interface IHttpClientService<T>
    {
        Task<List<T>> MethodPostList(object requestClass, string endpoint);
        Task<T> MethodPost(object requestClass, string endpoint);
        Task<T> MethodGet(string endpoint);
        Task<List<T>> MethodGetList(string endpoint);
    }
}
