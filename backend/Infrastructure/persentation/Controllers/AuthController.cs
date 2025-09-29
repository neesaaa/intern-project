using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using Service_Abstraction;
using Shared.AuthDtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace persentation.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController(IAuthinticationService _Auth) :ControllerBase
    {
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


    }
}
