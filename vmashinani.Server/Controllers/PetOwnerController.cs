using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using vmashinani.Server.DTO;
using vmashinani.Server.Models;

namespace vmashinani.Server.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class PetOwnerController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly JwtHandler _jwtHandler;
        private readonly RoleManager<IdentityRole> _roleManager;

        public PetOwnerController(
            ApplicationDbContext context,
            RoleManager<IdentityRole> roleManager,
            UserManager<ApplicationUser> userManager,
            JwtHandler jwtHandler)
        {
            _context = context;
            _roleManager = roleManager;
            _userManager = userManager;
            _jwtHandler = jwtHandler;
        }

        [HttpPost]
        public async Task<IActionResult> Login(LoginRequest loginRequest)
        {
            var user = await _userManager.FindByNameAsync(loginRequest.Email);
            if (user == null || !await _userManager.CheckPasswordAsync(user, loginRequest.Password))
            {
                return Unauthorized(new LoginResult()
                {
                    Success = false,
                    Message = "Invalid Email or Password."
                });
            }

            // Check if the user is in the "Pet Owner" role
            var isPetOwner = await _userManager.IsInRoleAsync(user, "Pet Owner");
            if (!isPetOwner)
            {
                return Unauthorized(new LoginResult()
                {
                    Success = false,
                    Message = "Access denied. You must be a Pet Owner to log in."
                });
            }

            var secToken = await _jwtHandler.GetTokenAsync(user);
            var jwt = new JwtSecurityTokenHandler().WriteToken(secToken);
            return Ok(new LoginResult()
            {
                Success = true,
                Message = "Login successful",
                Token = jwt
            });
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

            return Ok(new { message = "Pet Owner Account created successfully!" });
        }

        [HttpGet]
        public async Task<IActionResult> getPetOwner()
        {
            string rolePetOwner = "Pet Owner";

            var users = await _context.ApplicationUsers.ToListAsync();

            // Retrieve all users and filter those who have the "Administrator" role
            var petOwner = users
                .Where(u => _userManager.GetRolesAsync(u).Result.Contains(rolePetOwner))
                .Select(u => new
                {
                    Id = u.Id,
                    Name = u.FullName,
                    JobTitle = u.JobTitle,
                    Location = u.Location,
                    Email = u.Email
                })
                .ToList();

            return Ok(petOwner);
        }
    }
}
