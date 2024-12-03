using Microsoft.AspNetCore.Mvc;
using vmashinani.Server.Models;

namespace vmashinani.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MessagesController: ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public MessagesController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CreateMessage([FromBody] Message message)
        {
            if (message == null || string.IsNullOrWhiteSpace(message.Name) || string.IsNullOrWhiteSpace(message.Email) || string.IsNullOrWhiteSpace(message.Subject) || string.IsNullOrWhiteSpace(message.Content))
            {
                return BadRequest("Invalid message data.");
            }

            _context.Messages.Add(message);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(CreateMessage), new { id = message.Id }, message);
        }
    }
}
