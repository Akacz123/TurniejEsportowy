using ETurniejeAPI.Middleware;

var builder = WebApplication.CreateBuilder(args); // ← tylko raz!

// Dodaj CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowVercel", policy =>
    {
        policy.WithOrigins(
            "https://eturniej.vercel.app",
            "http://localhost:3000"
        )
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials();
    });
});

builder.Services.AddControllers();

var app = builder.Build(); // ← tylko raz!

// Użyj CORS
app.UseCors("AllowVercel");

// Dodaj middleware API Key
app.UseMiddleware<ApiKeyMiddleware>();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();