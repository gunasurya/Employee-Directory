using AutoMapper;
using EmployeeManagerAPI.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EmployeeManagerAPI.Models.DTO;
using EmployeeManagerAPI.Services.Interface;

namespace EmployeeManagerAPI.Services
{
    public class EmployeeService : IEmployeeService
    {
        private readonly EmployeeContext _dbContext;
        private readonly IMapper _mapper;

        public EmployeeService(EmployeeContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<IEnumerable<EmployeeDto>> GetEmployees()
        {
            var employees = await _dbContext.Employees.ToListAsync();
            return _mapper.Map<IEnumerable<EmployeeDto>>(employees);
        }

        public async Task<EmployeeDto> GetEmployee(string id)
        {
            var employee = await _dbContext.Employees.FindAsync(id);
            return _mapper.Map<EmployeeDto>(employee);
        }

        public async Task<EmployeeDto> AddEmployee(EmployeeDto employee)
        {
            var employeeEntity = _mapper.Map<Employee>(employee);
            _dbContext.Employees.Add(employeeEntity);
            await _dbContext.SaveChangesAsync();
            return _mapper.Map<EmployeeDto>(employeeEntity);
        }

        public async Task<EmployeeDto> UpdateEmployee(string id, EmployeeDto employee)
        {
            if (id != employee.Id)
            {
                return null;
            }

            var employeeEntity = await _dbContext.Employees.FindAsync(id);
            if (employeeEntity == null)
            {
                return null;
            }

            _mapper.Map(employee, employeeEntity);

            try
            {
                await _dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeExists(id))
                {
                    return null;
                }
                throw;
            }

            return _mapper.Map<EmployeeDto>(employeeEntity);
        }

        private bool EmployeeExists(string id)
        {
            return _dbContext.Employees.Any(e => e.Id == id);
        }
    }
}
