using ETurniejeAPI.Middleware;

var builder = WebApplication.CreateBuilder(args);

// Dodaj CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowVercel", policy =>
    {
        policy.WithOrigins(
            "https://eturniej.vercel.app",
            "http://localhost:3000",
            "http://localhost:5173" // jeśli używasz Vite
        )
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials();
    });
});

builder.Services.AddControllers();

var app = builder.Build();

app.UseCors("AllowVercel");
app.UseMiddleware<ApiKeyMiddleware>();
app.UseAuthorization();
app.MapControllers();

app.Run();