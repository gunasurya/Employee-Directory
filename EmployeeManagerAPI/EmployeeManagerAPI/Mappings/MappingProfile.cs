using AutoMapper;
using EmployeeManagerAPI.Models.DTO;
using EmployeeManagerAPI.Models;

namespace EmployeeManagerAPI.Mappings
{
    public class MappingProfile: Profile
    {
        public MappingProfile()
        {
            CreateMap<EmployeeDto, Employee>();
            CreateMap<Employee, EmployeeDto>();
            CreateMap<UserDto, User>();
            CreateMap<User, UserDto>();
            CreateMap<LoginDto,Login>();
            CreateMap<Login, LoginDto>();
        }
    }
}
