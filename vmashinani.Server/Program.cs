using vmashinani.Server.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using vmashinani.Server.DTO;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

// Create a web application builder
var builder = WebApplication.CreateBuilder(args);

// Add ApplicationDbContext and SQL Server support
builder.Services.AddDbContext<ApplicationDbContext>(options =>
 options.UseSqlServer(
 builder.Configuration.GetConnectionString("DefaultConnection")
 )
);

// Add ASP.NET Core Identity support
builder.Services.AddIdentity<ApplicationUser, IdentityRole>(options =>
{
    options.SignIn.RequireConfirmedAccount = true;
    options.Password.RequireDigit = true;
    options.Password.RequireLowercase = true;
    options.Password.RequireUppercase = true;
    options.Password.RequireNonAlphanumeric = true;
    options.Password.RequiredLength = 8;
})
 .AddEntityFrameworkStores<ApplicationDbContext>();

// Add Authentication services & middlewares
builder.Services.AddAuthentication(opt =>
{
opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
options.TokenValidationParameters = new TokenValidationParameters
{
    RequireExpirationTime = true,
    ValidateIssuer = true,
    ValidateAudience = true,
    ValidateLifetime = true,
    ValidateIssuerSigningKey = true,
    ValidIssuer = builder.Configuration["JwtSettings:Issuer"],
    ValidAudience = builder.Configuration["JwtSettings:Audience"],
    IssuerSigningKey = new SymmetricSecurityKey(System.Text.Encoding.UTF8.
GetBytes(builder.Configuration["JwtSettings:SecurityKey"]!))
};
});

// Add support for API controllers
builder.Services.AddControllers();

// Configure CORS policy to allow all origins, methods, and headers
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

// Optional: Add Swagger for API documentation
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//JwtHandler added via Dependency Injection
builder.Services.AddScoped<JwtHandler>();

// Build the application
var app = builder.Build();

// Apply pending database migrations on startup
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var context = services.GetRequiredService<ApplicationDbContext>();
    context.Database.Migrate();
}

// Optional: Enable Swagger UI in development mode
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Serve default files (like index.html) in wwwroot
app.UseDefaultFiles();

// Serve static files (e.g., CSS, JS, images) from the wwwroot folder
app.UseStaticFiles();

// Force HTTPS redirection for secure connections
app.UseHttpsRedirection();

// Enable routing for the application
app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

// Use CORS policy defined earlier
app.UseCors("AllowAll");

// Map API controllers to routes
app.MapControllers();

// Fallback for Single Page Application (SPA) routes – serve index.html for unmatched routes
app.MapFallbackToFile("index.html");

// Run the application
app.Run();
