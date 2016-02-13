using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(MarkdownMagic.App.Startup))]

namespace MarkdownMagic.App
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.MapSignalR();
        }
    }
}
