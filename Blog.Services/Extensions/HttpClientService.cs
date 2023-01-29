using Newtonsoft.Json;

namespace Blog.Services.Extensions
{
    public class HttpClientService<T> : IHttpClientService<T>
    {
        public async Task<List<T>> MethodPostList(object requestClass, string endpoint)
        {
            using (HttpClient HttpClient = new HttpClient())
            {
                HttpClient.Timeout = TimeSpan.FromMinutes(10);
                var request = new StringContent(JsonConvert.SerializeObject(requestClass), System.Text.Encoding.UTF8, "application/json");
                var response = await HttpClient.PostAsync(endpoint, request);
                string T = await response.Content.ReadAsStringAsync();
                return JsonConvert.DeserializeObject<List<T>>(T);
            }
        }
        public async Task<T> MethodPost(object requestClass, string endpoint)
        {
            using (HttpClient HttpClient = new HttpClient())
            {
                HttpClient.Timeout = TimeSpan.FromMinutes(10);
                var d = JsonConvert.SerializeObject(requestClass);
                var request = new StringContent(JsonConvert.SerializeObject(requestClass), System.Text.Encoding.UTF8, "application/json");
                var response = await HttpClient.PostAsync(endpoint, request);
                string T = await response.Content.ReadAsStringAsync();
                return JsonConvert.DeserializeObject<T>(T);
            }
        }
        public async Task<T> MethodGet(string endpoint)
        {
            using (HttpClient HttpClient = new HttpClient())
            {
                HttpClient.Timeout = TimeSpan.FromMinutes(10);
                var response = await HttpClient.GetAsync(endpoint);
                string T = await response.Content.ReadAsStringAsync();
                return JsonConvert.DeserializeObject<T>(T);
            }
        }
        public async Task<List<T>> MethodGetList(string endpoint)
        {
            using (HttpClient HttpClient = new HttpClient())
            {
                HttpClient.Timeout = TimeSpan.FromMinutes(10);
                var response = await HttpClient.GetAsync(endpoint);
                string T = await response.Content.ReadAsStringAsync();
                return JsonConvert.DeserializeObject<List<T>>(T);
            }
        }
    }
}
