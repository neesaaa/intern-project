using DomainLayer.Exceptions;
using DomainLayer.Models.identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Service_Abstraction;
using Shared.AuthDtos;
using System;
using System.Collections.Generic;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Service
{
    public class AuthenticationService(UserManager<ApplicationUser> _userManager, IConfiguration _conf) : IAuthinticationService
    {
        public async Task<UserDto> LoginAsync(LoginDto loginDto)
        {
            var user=await _userManager.FindByEmailAsync(loginDto.Email);
            if (user==null)
                throw new NotFoundEmail(loginDto.Email);
            var passwordokay = await _userManager.CheckPasswordAsync(user, loginDto.Password);
            if(!passwordokay)
                throw new UnauthorizedException("Invalid password");
            var roles = await _userManager.GetRolesAsync(user);
            var role = roles.FirstOrDefault();

            return new UserDto
            {
                Email = loginDto.Email,
                DisplayName = user.DisplayName,
                Token = await CreateTokenAsync(user),
                Role= role!
            };
        }

        public async Task<UserDto> RegisterAsync(SignupDto registerDto)
        {
            var user = new ApplicationUser
            {
                Email = registerDto.Email,
                DisplayName = registerDto.UserName,
                FirstName = registerDto.FirstName,
                LastName = registerDto.LastName,
                UserName = registerDto.UserName
            };
            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (result.Succeeded)
            {
                return new UserDto
                {
                    Email = user.Email,
                    DisplayName = user.DisplayName,
                    Token = await CreateTokenAsync(user)
                };
            }

            // Return detailed errors
            var errors = string.Join(", ", result.Errors.Select(e => e.Description));
            throw new Exception($"Problem creating user: {errors}");
        }
        private async Task<string> CreateTokenAsync(ApplicationUser user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email,user.Email),
                new Claim(ClaimTypes.Name,user.DisplayName),
                new Claim(ClaimTypes.NameIdentifier,user.Id.ToString())
            };
            var roles = await _userManager.GetRolesAsync(user);
            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }
            var secKey = _conf.GetSection("Jwt")["SecretKey"];
            var Key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secKey));
            var creds = new SigningCredentials(Key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                issuer: _conf.GetSection("Jwt")["Issuer"],
                audience: _conf.GetSection("Jwt")["Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: creds
            );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
