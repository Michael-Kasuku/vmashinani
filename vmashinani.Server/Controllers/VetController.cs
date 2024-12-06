using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using vmashinani.Server.Models;

namespace vmashinani.Server.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class VetController : ControllerBase
    {
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ApplicationDbContext _context;

        public VetController(
            ApplicationDbContext context,
            RoleManager<IdentityRole> roleManager,
            UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _roleManager = roleManager;
            _userManager = userManager;
        }

        [HttpPost]
        public async Task<IActionResult> CreateVet([FromBody] ApplicationUser newUser)
        {
            string roleVeterinarian = "Veterinarian";

            // Check if the email exists in the Veterinarians table
            var isVetEmailValid = _context.Veterinarians.Any(vet => vet.Email == newUser.Email);
            if (!isVetEmailValid)
            {
                return BadRequest(new { message = "You are not allowed to register as a Vet!" });
            }

            // Ensure the "Veterinarian" role exists
            if (await _roleManager.FindByNameAsync(roleVeterinarian) == null)
            {
                await _roleManager.CreateAsync(new IdentityRole(roleVeterinarian));
            }

            // Check if the user already exists
            if (await _userManager.FindByNameAsync(newUser.Email) != null)
            {
                return Conflict(new { message = "User already exists!" });
            }

            // Create the new Vet user
            var userVet = new ApplicationUser
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
            await _userManager.CreateAsync(userVet, newUser.PasswordHash);

            // Assign the "Veterinarian" role
            await _userManager.AddToRoleAsync(userVet, roleVeterinarian);

            // Save changes again after role assignment
            await _context.SaveChangesAsync();

            return Ok(new { message = "Vet Account created successfully!" });
        }
    }
}
