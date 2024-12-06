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

        public AdminController(
            ApplicationDbContext context,
            RoleManager<IdentityRole> roleManager,
            UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _roleManager = roleManager;
            _userManager = userManager;
        }

        [HttpPost]
        public async Task<IActionResult> CreateAdmin([FromBody] ApplicationUser newUser)
        {
            string roleAdministrator = "Administrator";

            // Check if the email exists in the Administrators table
            var isAdminEmailValid = _context.Administrators.Any(admin => admin.Email == newUser.Email);
            if (!isAdminEmailValid)
            {
                return BadRequest(new { message = "You are not allowed to register as an Admin!" });
            }

            // Ensure the "Administrator" role exists
            if (await _roleManager.FindByNameAsync(roleAdministrator) == null)
            {
                await _roleManager.CreateAsync(new IdentityRole(roleAdministrator));
            }

            // Check if the user already exists
            if (await _userManager.FindByNameAsync(newUser.Email) != null)
            {
                return Conflict(new { message = "User Account already exists!" });
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

            //Assign  the Password to the User
            await _userManager.CreateAsync(userAdmin, newUser.PasswordHash);

            // Assign the "Administrator" role
            await _userManager.AddToRoleAsync(userAdmin, roleAdministrator);

            // Save changes again after role assignment
            await _context.SaveChangesAsync();

            return Ok(new { message = "Admin Account created successfully!" });
        }  
    }
}