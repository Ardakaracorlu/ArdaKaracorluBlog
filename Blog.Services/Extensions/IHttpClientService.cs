using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
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
