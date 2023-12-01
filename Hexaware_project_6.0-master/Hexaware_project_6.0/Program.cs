using FluentAssertions.Common;
using Hexaware_project___WEBAPI.Models;
using Hexaware_project_6._0.Hubs;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Serilog;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

var services = builder.Services;



Log.Logger = new LoggerConfiguration()
    .MinimumLevel.Information()
    .WriteTo.File("Log\\log.txt", rollingInterval : RollingInterval.Day)
    .CreateLogger();

// Add services to the container.
builder.Logging.AddSerilog();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(opt =>
{
    opt.SwaggerDoc("v1", new OpenApiInfo { Title = "MyAPI", Version = "v1" });
    opt.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Please enter token",
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        BearerFormat = "JWT",
        Scheme = "bearer"
    });

    opt.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type=ReferenceType.SecurityScheme,
                    Id="Bearer"
                }
            },
            new string[]{}
        }
    });
});
builder.Services.AddControllers().AddNewtonsoftJson();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
       builder => builder.WithOrigins("http://localhost:3000")
       .AllowAnyHeader()
       .AllowAnyMethod()
        .WithExposedHeaders("Cross-Origin-Opener-Policy"));
});
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(o =>
{
    o.TokenValidationParameters = new TokenValidationParameters
    {
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"])),
        ValidateIssuer = true,



        ValidateAudience = true,
        ValidateLifetime = false,
        ValidateIssuerSigningKey = true
    };
})
    .AddCookie()
    .AddGoogle(options =>
    {

        options.ClientId = "1023235377282-bv6h4e3lpbv3u0h7v92sft3h6t1ni7sk.apps.googleusercontent.com";
        options.ClientSecret = "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";
    });

builder.Services.AddSignalR();

var connectionString = builder.Configuration.GetConnectionString("Learn27");
builder.Services.AddDbContext<CTRMDBContext>(x =>
{
    x.UseSqlServer(connectionString);
});

builder.Services.AddAuthorization();






var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseDeveloperExceptionPage();
    app.UseCors(builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader()
               .SetIsOriginAllowed(origin => true);
               
    });

}

app.UseHttpsRedirection();
app.UseAuthentication();

app.UseAuthorization();
IConfiguration configuration = app.Configuration;
IWebHostEnvironment environment = app.Environment;

app.MapControllers();

app.Run();

app.UseHsts();


app.Use((context, next) =>
{
    context.Request.Host = new HostString("api.domain.com");
    context.Request.PathBase = new PathString("/identity"); 
    context.Request.Scheme = "https";
    return next();
});

app.UseEndpoints(endpoints =>
{
    endpoints.MapHub<NotificationHub>("/notificationHub");
    endpoints.MapControllers();
});

app.UseHttpsRedirection();


