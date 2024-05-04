using EmployeeManagerAPI.Models;

namespace EmployeeManagerAPI.Services.Interface
{
    public interface ITokenService
    {
        string GenerateToken(string issuer, string audience, string key, UserDto authenticatedUser);
    }
}
