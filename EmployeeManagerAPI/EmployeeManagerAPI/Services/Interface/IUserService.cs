using System.Threading.Tasks;
using EmployeeManagerAPI.Models;
using EmployeeManagerAPI.Models.DTO;

namespace EmployeeManagerAPI.Services.Interface
{
    public interface IUserService
    {
        Task<UserDto> AddUser(UserDto userDto);
        Task<UserDto> Authenticate(LoginDto loginDto);
        Task<UserDto> GetUserByEmail(string email);
    }
}
