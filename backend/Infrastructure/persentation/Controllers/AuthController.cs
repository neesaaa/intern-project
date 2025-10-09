using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Service_Abstraction;
using Shared.AuthDtos;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace persentation.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController :ControllerBase
    {
        private readonly IAuthinticationService _Auth;

        public AuthController(IAuthinticationService auth)
        {
            _Auth = auth;
        }
        [HttpPost("Login")]
        public async Task<ActionResult<UserDto>> LoginAsync(LoginDto loginDto)
        {
            var user = await _Auth.LoginAsync(loginDto);
            return Ok(user);

        }

        [HttpPost("Signup")]
        public async Task<ActionResult<UserDto>> SignupAsync(SignupDto signupDto)
        {
            var user = await _Auth.RegisterAsync(signupDto);
            return Ok(user);
        }

        [HttpPost("AdminLogin")]
        public async Task<ActionResult<UserDto>> AdminLoginAsync(LoginDto loginDto)
        {
            var user = await _Auth.LoginAsync(loginDto);

            if (user == null || user.Role != "Admin")
                return Unauthorized("Access denied: not an admin");

            return Ok(user);
        }


    }
}
