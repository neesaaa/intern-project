
using DomainLayer.Contracts;
using DomainLayer.Models;
using DomainLayer.Models.identity;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using persistence;
using persistence.Data.Identity;
using Service;
using Service.profiles;
using Service_Abstraction;
using Shared.CourseDtos;
using StackExchange.Redis;
using System.Reflection;
using System.Security.Authentication;
using System.Text.Json.Serialization;
using UdemyApp.CustomMidlleWare;


namespace UdemyApp
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers()
                   .AddJsonOptions(options =>
                   {
                   options.JsonSerializerOptions.PropertyNamingPolicy = null;
                   options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
                       options.JsonSerializerOptions.ReferenceHandler =ReferenceHandler.IgnoreCycles;

                   }
            );
            var loggerFactory = LoggerFactory.Create(builder =>
            {
                builder.AddConsole();
            });


            builder.Services.AddOpenApi();
            builder.Services.AddDbContext<StoreDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
            builder.Services.AddDbContext<JWTIdentityDbContext>(options =>
            {
                options.UseSqlServer(builder.Configuration.GetConnectionString("IdentityConnection"));
            });


            builder.Services.AddAutoMapper(cfg =>
            {
                cfg.AddProfile<CourseCardProfile>();
                cfg.AddProfile<BasketProfile>();
                cfg.AddProfile<OrderProfile>();
            });

            builder.Services.AddScoped<IUnitOfWork,UnitOfWork>();
            builder.Services.AddScoped<ICourseService, CourseService>();
            builder.Services.AddScoped<IAuthinticationService, AuthenticationService>();
            builder.Services.AddScoped<IBasketRepo, BasketRepo>();
            builder.Services.AddScoped<IBasketService, BasketService>();
            builder.Services.AddScoped<IOrderService, OrderService>();
            builder.Services.AddScoped<IFileService, FileService>();
            builder.Services.AddHttpContextAccessor();
            builder.Services.AddScoped<DataSeed>();
                builder.Services.AddSingleton<IConnectionMultiplexer>(sp =>
                {
                    var options = new ConfigurationOptions
                    {
                        EndPoints = { "redis-17600.c16.us-east-1-3.ec2.redns.redis-cloud.com:17600" }, 
                        User = "default",                        
                        Password = "hSt70XVJgcLy8bk9JO9aKciooBWyjC34", 
                    };
                    return ConnectionMultiplexer.Connect(options);
                });

            builder.Services.AddIdentity<ApplicationUser, IdentityRole<int>>(options =>
            {
                options.User.RequireUniqueEmail = true;
            })
            .AddEntityFrameworkStores<JWTIdentityDbContext>();

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("Allow All", policy =>
                {
                    policy.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader();
                });
            });
            builder.Services.AddAuthentication((options) =>
            {
                options.DefaultAuthenticateScheme = "Bearer";
                options.DefaultChallengeScheme = "Bearer";
            }).AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = builder.Configuration["Jwt:Issuer"],
                    ValidAudience = builder.Configuration["Jwt:Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(builder.Configuration["Jwt:SecretKey"])),

                };
            });

            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "UdemyApp API",
                    Version = "v1",
                    Description = "My API"
                });
            });
            builder.Services.AddSwaggerGen();

            var app = builder.Build();
            app.UseMiddleware<CustomException>();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.MapOpenApi();
                app.UseSwagger();
                app.UseSwaggerUI(c =>
                {
                    c.SwaggerEndpoint("/swagger/v1/swagger.json", "UdemyApp API v1");
                });
            }
            using var scope = app.Services.CreateScope();
            var services = scope.ServiceProvider;

            var seedObj = services.GetRequiredService<DataSeed>();
            seedObj.SeedAdminAsync();




            app.UseHttpsRedirection();

            app.UseCors("Allow All");

            app.UseAuthentication();
            app.UseAuthorization();
            app.UseStaticFiles();


            app.MapControllers();

            app.Run();
        }
    }
}
