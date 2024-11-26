// Create a web application builder
var builder = WebApplication.CreateBuilder(args);

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

// Build the application
var app = builder.Build();


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

// Use CORS policy defined earlier
app.UseCors("AllowAll");

// Map API controllers to routes
app.MapControllers();

// Fallback for Single Page Application (SPA) routes – serve index.html for unmatched routes
app.MapFallbackToFile("index.html");

// Run the application
app.Run();
