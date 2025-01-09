namespace vmashinani.Server.Models
{
    public class Chat
    {
        public int Id { get; set; }
        public string? SenderEmail { get; set; } // Email of the sender
        public string? ReceiverEmail { get; set; } // Email of the receiver
        public string? Content { get; set; } // Message text
        public DateTime Timestamp { get; set; } = DateTime.UtcNow; // Message sent time
    }
}
