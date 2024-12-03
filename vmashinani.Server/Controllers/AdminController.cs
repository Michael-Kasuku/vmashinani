using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using vmashinani.Server.Models;

namespace vmashinani.Server.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _env;
        private readonly IConfiguration _configuration;

        public AdminController(
            ApplicationDbContext context,
            RoleManager<IdentityRole> roleManager,
            UserManager<ApplicationUser> userManager,
            IWebHostEnvironment env,
            IConfiguration configuration)
        {
            _context = context;
            _roleManager = roleManager;
            _userManager = userManager;
            _env = env;
            _configuration = configuration;
        }

        [HttpPost]
        public async Task<IActionResult> CreateAdmin([FromBody] ApplicationUser newUser)
        {
            string roleAdministrator = "Administrator";

            // Ensure the "Administrator" role exists
            if (await _roleManager.FindByNameAsync(roleAdministrator) == null)
            {
                await _roleManager.CreateAsync(new IdentityRole(roleAdministrator));
            }

            // Check if the user already exists
            if (await _userManager.FindByNameAsync(newUser.Email) != null)
            {
                return Conflict(new { message = "User already exists." });
            }

            // Create the new admin user
            var userAdmin = new ApplicationUser
            {
                SecurityStamp = Guid.NewGuid().ToString(),
                FullName = newUser.FullName,
                UserName = newUser.Email,
                Email = newUser.Email,
                JobTitle = newUser.JobTitle,
                Location = newUser.Location,
                EmailConfirmed = true,
                LockoutEnabled = false
            };

            var result = await _userManager.CreateAsync(userAdmin, newUser.PasswordHash);

            // Assign the "Administrator" role
            await _userManager.AddToRoleAsync(userAdmin, roleAdministrator);

            // Save changes again after role assignment
            await _context.SaveChangesAsync();

            return Ok(new { message = "Admin created successfully", user = userAdmin });
        }
    }
}
