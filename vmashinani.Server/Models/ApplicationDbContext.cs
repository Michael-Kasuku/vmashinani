using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace vmashinani.Server.Models
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options): base(options){ }
        public DbSet<ApplicationUser> ApplicationUsers { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<Administrator> Administrators { get; set; }
        public DbSet<Veterinarian> Veterinarians { get; set; }
        public DbSet<Chat> Chats { get; set; }
    }
}
