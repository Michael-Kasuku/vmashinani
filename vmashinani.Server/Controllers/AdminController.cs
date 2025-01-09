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
    public class AdminController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly JwtHandler _jwtHandler;
        private readonly RoleManager<IdentityRole> _roleManager;

        public AdminController(
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

            // Check if the user is in the "Administrator" role
            var isAdmin = await _userManager.IsInRoleAsync(user, "Administrator");
            if (!isAdmin)
            {
                return Unauthorized(new LoginResult()
                {
                    Success = false,
                    Message = "Access denied. You must be an Admin to log in."
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

        [HttpGet]
        public async Task<IActionResult> getAdmin()
        {
            string roleAdministrator = "Administrator";

            var users = await _context.ApplicationUsers.ToListAsync();

            // Retrieve all users and filter those who have the "Administrator" role
            var administrators = users
                .Where(u => _userManager.GetRolesAsync(u).Result.Contains(roleAdministrator))
                .Select(u => new
                {
                    Id = u.Id,
                    Name = u.FullName,
                    JobTitle = u.JobTitle,
                    Location = u.Location,
                    Email = u.Email
                })
                .ToList();

            return Ok(administrators);
        }
    }
}