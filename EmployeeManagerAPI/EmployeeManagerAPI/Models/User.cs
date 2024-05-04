using System.ComponentModel.DataAnnotations;

namespace EmployeeManagerAPI.Models
{
    public class User
    {
        [Key]

        [Required]
        public string Name { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public string Role { get; set; }
       
    }
}
