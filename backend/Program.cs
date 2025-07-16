using backend.Data;
using backend.Data.DummyData;
using backend.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.EntityFrameworkCore;
using System.Text;
using backend.Hubs;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();

builder.Services.AddSignalR();

builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<IAuthService, AuthService>();

var jwtKey = builder.Configuration["JwtSettings:Key"];
var jwtIssuer = builder.Configuration["JwtSettings:Issuer"];
var jwtAudience = builder.Configuration["JwtSettings:Audience"];
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = jwtIssuer,
            ValidAudience = jwtAudience,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey))
        };
    });

builder.Services.AddAuthorization();

// CORS (for your frontend)
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.SetIsOriginAllowed(origin => new Uri(origin).Host == "localhost")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors();
app.UseAuthentication();
app.UseAuthorization();

using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    var config = scope.ServiceProvider.GetRequiredService<IConfiguration>();

    await context.Database.EnsureCreatedAsync();
    //await DataSeeder.SeedAsync(context, config);
}

app.MapControllers();
app.MapHub<ChatHub>("/chathub");

Console.WriteLine("Starting application...");
Console.WriteLine("API available at: http://localhost:5050/api/");
Console.WriteLine("Swagger available at: http://localhost:5050/swagger");

app.Run();