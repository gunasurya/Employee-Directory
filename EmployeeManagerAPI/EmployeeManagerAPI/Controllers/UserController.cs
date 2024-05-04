using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using EmployeeManagerAPI.Models;
using EmployeeManagerAPI.Models.DTO;
using BCrypt.Net;
using Microsoft.CodeAnalysis.Scripting;
using EmployeeManagerAPI.Services.Interface;
using System.Net;
using AutoMapper;

namespace EmployeeManagerAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IBCrypt _bcrypt;
        private readonly IMapper _mapper;
        private readonly ITokenService _tokenService;
        private readonly IConfiguration _config;

        public UserController(IUserService userService, IMapper mapper, IBCrypt bcrypt, ITokenService tokenService, IConfiguration config)
        {
            _userService = userService;
            _bcrypt = bcrypt;
            _tokenService = tokenService;
            _config = config;
            _mapper = mapper;
        }

        [HttpPost("register")]
        public async Task<GenericApiResponse<User>> AddUser(User user)
        {
            // Check if the user already exists
            var existingUser = await _userService.GetUserByEmail(user.Email);
            if (existingUser != null)
            {
                return new GenericApiResponse<User>().CreateApiResponse(false, HttpStatusCode.BadRequest, null, "User already exists");
            }

            if (!ModelState.IsValid)
            {
                return new GenericApiResponse<User>().CreateApiResponse(false, HttpStatusCode.BadRequest, null, "Invalid user data");
            }

            var userDto = _mapper.Map<UserDto>(user);
            var addedUserDto = await _userService.AddUser(userDto);
            var addedUser = _mapper.Map<User>(addedUserDto);
            var response = new GenericApiResponse<User>().CreateApiResponse(true, HttpStatusCode.OK, addedUser);
            return response;
        }


        [HttpPost("login")]
        public async Task<GenericApiResponse<string>> Login(Login login)
        {
            var loginDto = _mapper.Map<LoginDto>(login);
            var authenticatedUser = await _userService.Authenticate(loginDto);

            if (authenticatedUser == null)
            {
                return new GenericApiResponse<string>().CreateApiResponse(false, HttpStatusCode.BadRequest, null, "User not Found");
            }
            var token = _tokenService.GenerateToken(
                  _config["Jwt:Issuer"],
                  _config["Jwt:Audience"],
                  _config["Jwt:Key"],
                  authenticatedUser
                  );
           
            return new GenericApiResponse<string>().CreateApiResponse(true, HttpStatusCode.OK,token);
        }

    }
}
