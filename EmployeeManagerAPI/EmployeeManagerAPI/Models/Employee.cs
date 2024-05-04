using EmployeeManagerAPI.Models.DTO;

namespace EmployeeManagerAPI.Models
{
    public class Employee
    {
        public string? Id { get; set; }
        public string? Department { get; set; }
        public string? Email { get; set; }
        public string? FirstName { get; set; }
        public string? Image { get; set; }
        public string? LastName { get; set; }
        public string? Office { get; set; }
        public string? PhoneNumber { get; set; }
        public string? SkypeId { get; set; }
        public string? JobTitle { get; set; }

        public static implicit operator Employee(EmployeeDto v)
        {
            throw new NotImplementedException();
        }
    }

}
