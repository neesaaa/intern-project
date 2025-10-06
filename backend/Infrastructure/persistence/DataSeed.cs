using DomainLayer.Models.identity;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace persistence
{
    public class DataSeed(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole<int>> roleManager)
    {
        public async Task SeedAdminAsync()
        {
            if (!await roleManager.RoleExistsAsync("Admin"))
            {
                await roleManager.CreateAsync(new IdentityRole<int>("Admin"));
            }

            var adminEmail = "Admin@gmail.com";
            var existingUser = await userManager.FindByEmailAsync(adminEmail);

            if (existingUser == null)
            {
                var adminUser = new ApplicationUser
                {
                    UserName = "Admin",
                    Email = adminEmail,
                    DisplayName = "Admin",
                    FirstName = "Nassar",
                    LastName = "Khaled",
                    EmailConfirmed = true
                };

                var result = await userManager.CreateAsync(adminUser, "zxcvbnmasD11@");

                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(adminUser, "Admin");
                }
                else
                {
                    throw new System.Exception("Failed to create admin: " +
                        string.Join(", ", result.Errors.Select(e => e.Description)));
                }
            }
        }
    }
}
