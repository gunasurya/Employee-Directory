using EmployeeManagerAPI.Models.DTO;

namespace EmployeeManagerAPI.Services.Interface
{
    public interface IEmployeeService
    {
        Task<IEnumerable<EmployeeDto>> GetEmployees();
        Task<EmployeeDto> GetEmployee(string id);
        Task<EmployeeDto> AddEmployee(EmployeeDto employee);
        Task<EmployeeDto> UpdateEmployee(string id, EmployeeDto employee);
    }
}
