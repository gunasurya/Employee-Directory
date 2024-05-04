using System.ComponentModel.DataAnnotations;

namespace EmployeeManagerAPI.Models.DTO
{
    public class LoginDto
    {

        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

    }
}
