using AutoMapper;
using CourseApp.Core.DTOs;
using CourseApp.Core.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace CourseApp.Web.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        public UserManager<User> UserManager { get; }
        public SignInManager<User> SignInManager { get; }
        public IConfiguration Configuration { get; }
        public IMapper Mapper { get; }

        public AuthController(UserManager<User> userManager,
            SignInManager<User> signInManager,
            IConfiguration configuration,
            IMapper mapper)
        {
            UserManager = userManager;
            SignInManager = signInManager;
            Configuration = configuration;
            Mapper = mapper;
        }

        [HttpPost, Route("register")]
        public async Task<IActionResult> RegisterAsync(UserRegistrationDTO userRegistrationDTO)
        {
            var user = Mapper.Map<User>(userRegistrationDTO);
            var idetityResult = await UserManager.CreateAsync(user, userRegistrationDTO.Password);

            if (!idetityResult.Succeeded)
            {
                return BadRequest(idetityResult.Errors);
            }

            return Ok();
        }

        [HttpPost, Route("login")]
        public async Task<IActionResult> LoginAsync(LoginDTO loginDTO)
        {
            var signInResult = await SignInManager.PasswordSignInAsync(loginDTO.Username, loginDTO.Password, false, false);

            if (!signInResult.Succeeded)
            {
                return Unauthorized();
            }

            string token = GetJwtToken();
            return Ok(new { Token = token });
        }

        [HttpPost, Route("logout")]
        public async Task<IActionResult> LogoutAsync()
        {
            await SignInManager.SignOutAsync();
            return Ok();
        }

        [HttpGet, Route("getuser")]
        public async Task<ActionResult<UserDTO>> GetUser()
        {
            var principal = HttpContext.User;
            var user = await UserManager.GetUserAsync(principal);
            var userDTO = Mapper.Map<UserDTO>(user);
            return Ok(userDTO);
        }

        private string GetJwtToken()
        {
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration.GetValue<string>("secretKey")));
            var signingCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

            var tokenOptions = new JwtSecurityToken(
                issuer: "https://localhost:5001",
                audience: "https://localhost:5001",
                claims: new List<Claim>(),
                expires: DateTime.Now.AddMinutes(5),
                signingCredentials: signingCredentials);

            var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);
            return tokenString;
        }
    }
}