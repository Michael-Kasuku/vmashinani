using Microsoft.AspNetCore.Identity;

namespace vmashinani.Server.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string? FullName {  get; set; }
        public string? JobTitle { get; set; }
        public string? Location { get; set; }
        public byte[]? ProfilePicture { get; set; } // For storing profile pictures as a byte array
    }
}
