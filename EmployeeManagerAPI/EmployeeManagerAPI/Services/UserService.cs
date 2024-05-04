using AutoMapper;
using BCrypt.Net;
using EmployeeManagerAPI.Models;
using EmployeeManagerAPI.Models.DTO;
using EmployeeManagerAPI.Services.Interface;
using Microsoft.CodeAnalysis.Scripting;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

public class UserService : IUserService
{
    private readonly EmployeeContext _dbContext;
    private readonly IMapper _mapper;
    private readonly IBCrypt _bcrypt;

    public UserService(EmployeeContext dbContext, IMapper mapper, IBCrypt bcrypt)
    {
        _dbContext = dbContext;
        _mapper = mapper;
        _bcrypt = bcrypt;
    }

    public async Task<UserDto> AddUser(UserDto userDto)
    {

        string hashedPassword = _bcrypt.HashPassword(userDto.Password);

        var userEntity = new User
        {
            Name = userDto.Name,
            Email = userDto.Email,
            Username = userDto.Username,
            Password = hashedPassword,
            Role = userDto.Role,
        };

        _dbContext.Users.Add(userEntity);
        await _dbContext.SaveChangesAsync();

        return _mapper.Map<UserDto>(userEntity);
    }
    public async Task<UserDto> Authenticate(LoginDto loginDto)
    {
        var userEntity = await _dbContext.Users.FirstOrDefaultAsync(u => u.Email == loginDto.Email);

        if (userEntity != null && _bcrypt.VerifyPassword(loginDto.Password, userEntity.Password))
        {
            return _mapper.Map<UserDto>(userEntity);
        }

        return null;
    }
    public async Task<UserDto> GetUserByEmail(string email)
    {
        var userEntity = await _dbContext.Users.FirstOrDefaultAsync(u => u.Email == email);
        return _mapper.Map<UserDto>(userEntity);
    }

}
