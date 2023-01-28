using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Blog.Business.Configuration
{
    public class ConfigManager:IConfigManager
    {
        private readonly IConfiguration _configuration;
        public ConfigManager(IConfiguration IConfiguration)
        {
            this._configuration = IConfiguration;
        }
    }
}
