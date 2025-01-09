using Microsoft.AspNetCore.SignalR;
using vmashinani.Server.Models;

namespace vmashinani.Server.SignalRHubs
{
    public class ChatHub : Hub
    {
        private readonly ApplicationDbContext _context;

        public ChatHub(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task SendMessage(string senderEmail, string receiverEmail, string content, DateTime timestamp)
        {
            try
            {
                var message = new Chat
                {
                    SenderEmail = senderEmail,
                    ReceiverEmail = receiverEmail,
                    Content = content,
                    Timestamp = timestamp
                };

                // Save the message to the database
                _context.Chats.Add(message);
                await _context.SaveChangesAsync();

                // Notify clients
                await Clients.User(senderEmail).SendAsync("ReceiveMessage", message);
                await Clients.User(receiverEmail).SendAsync("ReceiveMessage", message);
            }
            catch (Exception ex)
            {
                // Log the error and optionally notify the client
                Console.WriteLine($"Error in SendMessage: {ex.Message}");
            }
        }
    }
}
