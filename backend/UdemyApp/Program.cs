
using DomainLayer.Contracts;
using DomainLayer.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using persistence.Data;
using Service;
using Service.profiles;
using Service_Abstraction;
using Shared.CourseDtos;
using System.Reflection;


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
                       // Preserve PascalCase in the JSON output
                       options.JsonSerializerOptions.PropertyNamingPolicy = null;
                   });
            var loggerFactory = LoggerFactory.Create(builder =>
            {
                builder.AddConsole();
            });


            // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
            builder.Services.AddOpenApi();
            builder.Services.AddDbContext<StoreDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));


            builder.Services.AddAutoMapper(cfg =>
            {
                cfg.AddProfile<CourseCardProfile>();
            });

            builder.Services.AddScoped<IUnitOfWork,UnitOfWork>();
            builder.Services.AddScoped<ICourseService, CourseService>();

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("Allow All", policy =>
                {
                    policy.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader();
                });
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.MapOpenApi();
            }

            app.UseHttpsRedirection();

            app.UseCors("Allow All");

            app.UseAuthorization();
            app.UseStaticFiles();


            app.MapControllers();

            app.Run();
        }
    }
}
