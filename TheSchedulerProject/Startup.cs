using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(TheSchedulerProject.Startup))]
namespace TheSchedulerProject
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
