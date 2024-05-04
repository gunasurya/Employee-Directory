
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagerAPI.Models
{
    public class EmployeeContext :DbContext
    {

        public EmployeeContext(DbContextOptions<EmployeeContext> options):base(options)
        {
            
        }

        public DbSet<Employee> Employees { get; set;}
        public DbSet<User> Users { get; set; }

    }
}
