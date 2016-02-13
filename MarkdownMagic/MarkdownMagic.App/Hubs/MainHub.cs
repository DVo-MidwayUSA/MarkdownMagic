using Microsoft.AspNet.SignalR;

namespace MarkdownMagic.App.Hubs
{
    public class MainHub : Hub
    {
        public void Hello()
        {
            Clients.All.hello();
        }
    }
}