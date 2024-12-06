using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using vmashinani.Server.Models;

namespace vmashinani.Server.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class PetOwnerController : ControllerBase
    {
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _env;
        private readonly IConfiguration _configuration;

        public PetOwnerController(
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
        public async Task<IActionResult> CreatePetOwner([FromBody] ApplicationUser newUser)
        {
            string rolePetOwner = "Pet Owner";

            // Ensure the "Pet Owner" role exists
            if (await _roleManager.FindByNameAsync(rolePetOwner) == null)
            {
                await _roleManager.CreateAsync(new IdentityRole(rolePetOwner));
            }

            // Check if the user already exists
            if (await _userManager.FindByNameAsync(newUser.Email) != null)
            {
                return Conflict(new { message = "User Account already exists!" });
            }

            // Create the new Pet Owner user
            var userPetOwner = new ApplicationUser
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
            await _userManager.CreateAsync(userPetOwner, newUser.PasswordHash);

            // Assign the "Pet Owner" role
            await _userManager.AddToRoleAsync(userPetOwner, rolePetOwner);

            // Save changes again after role assignment
            await _context.SaveChangesAsync();

            return Ok(new { message = "Pet Owner Account created successfully!", user = userPetOwner });
        }
    }
}
