using Microsoft.AspNetCore.SignalR;

namespace Hexaware_project_6._0.Hubs
{
    public class NotificationHub : Hub
    {
        public async Task SendMessage(string user, string message)
        {
            Console.WriteLine($"Received message: {message}");
            await Clients.All.SendAsync("ReceiveMessage", user ,message);
        }
    }
}
