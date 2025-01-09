using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using vmashinani.Server.Models;

namespace vmashinani.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class ChatsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ChatsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetChats(string senderEmail, string receiverEmail)
        {
            if (string.IsNullOrEmpty(senderEmail) || string.IsNullOrEmpty(receiverEmail))
            {
                return BadRequest("Sender or Receiver email is missing.");
            }

            try
            {
                var chats = await _context.Chats
                    .Where(chat =>
                        (chat.SenderEmail == senderEmail && chat.ReceiverEmail == receiverEmail) ||
                        (chat.SenderEmail == receiverEmail && chat.ReceiverEmail == senderEmail))
                    .OrderBy(chat => chat.Timestamp)
                    .ToListAsync();

                return Ok(chats);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error retrieving chats: {ex.Message}");
                return StatusCode(500, "Internal server error.");
            }
        }
    }
}
