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
    public class VetController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly JwtHandler _jwtHandler;
        private readonly RoleManager<IdentityRole> _roleManager;

        public VetController(
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
            // Check if the user is in the "Veterinarian" role
            var isVet = await _userManager.IsInRoleAsync(user, "Veterinarian");
            if (!isVet)
            {
                return Unauthorized(new LoginResult()
                {
                    Success = false,
                    Message = "Access denied. You must be a Vet to log in."
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

        [HttpGet]
        public async Task<IActionResult> getVet()
        {
            string roleVeterinarian = "Veterinarian";

            var users = await _context.ApplicationUsers.ToListAsync();

            // Retrieve all users and filter those who have the "Administrator" role
            var vets = users
                .Where(u => _userManager.GetRolesAsync(u).Result.Contains(roleVeterinarian))
                .Select(u => new
                {
                    Id = u.Id,
                    Name = u.FullName,
                    JobTitle = u.JobTitle,
                    Location = u.Location,
                    Email = u.Email
                })
                .ToList();

            return Ok(vets);
        }

    }
}
