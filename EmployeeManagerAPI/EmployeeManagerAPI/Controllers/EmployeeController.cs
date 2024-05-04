using AutoMapper;
using EmployeeManagerAPI.Models.DTO;
using EmployeeManagerAPI.Models;
using EmployeeManagerAPI.Services.Interface;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace EmployeeManagerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]

    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeService _employeeService;
        private readonly IMapper _mapper;
        private readonly ILogger<EmployeeController> _logger;

        public EmployeeController(IEmployeeService employeeService, IMapper mapper, ILogger<EmployeeController> logger)
        {
            _employeeService = employeeService;
            _mapper = mapper;
            _logger = logger;
        }

        [HttpGet]
        public async Task<GenericApiResponse<IEnumerable<Employee>>> GetEmployees()
        {
            _logger.LogInformation("Retrieving all employees.");
            
            var employeesDto = await _employeeService.GetEmployees();
            var employees = _mapper.Map<IEnumerable<Employee>>(employeesDto);
            
            _logger.LogInformation("Successfully retrieved all employees.");

            var response = new GenericApiResponse<IEnumerable<Employee>>().CreateApiResponse(true, HttpStatusCode.OK, employees);
            return response;
        }

        [HttpGet("{id}")]
        public async Task<GenericApiResponse<Employee>> GetEmployee(string id)
        {
            _logger.LogInformation("Retrieving employee with ID: {id}", id);

            var employee = await _employeeService.GetEmployee(id);
            if (employee == null)
            {
                _logger.LogWarning("Employee not found with ID: {id}", id);
                var notFoundResponse = new GenericApiResponse<Employee>().CreateApiResponse(false, HttpStatusCode.NotFound, null, "Employee not found.");
                return notFoundResponse;
            }

            _logger.LogInformation("Successfully retrieved employee with ID: {id}", id);

            var response = new GenericApiResponse<Employee>().CreateApiResponse(true, HttpStatusCode.OK, employee);
            return response;
        }

        [Authorize(Roles = "user1")]
        [HttpPost]
        public async Task<GenericApiResponse<Employee>> AddEmployee(Employee employee)
        {
            _logger.LogInformation("Adding a new employee.");

            var employeeDto = _mapper.Map<EmployeeDto>(employee);
            var addedEmployee = await _employeeService.AddEmployee(employeeDto);

            _logger.LogInformation("Successfully added a new employee.");

            var response = new GenericApiResponse<Employee>().CreateApiResponse(true, HttpStatusCode.Created, addedEmployee);
            return response;
        }

        [Authorize(Roles ="user")]
        [HttpPut("{id}")]
        public async Task<GenericApiResponse<Employee>> UpdateEmployee(string id, Employee employee)
        {
            _logger.LogInformation("Updating employee with ID: {id}", id);

            if (id != employee.Id)
            {
                _logger.LogWarning("Invalid employee ID provided in the request.");
                var badRequestResponse = new GenericApiResponse<Employee>().CreateApiResponse(false, HttpStatusCode.BadRequest, null, "Invalid employee ID.");
                return badRequestResponse;
            }

            var employeeDto = _mapper.Map<EmployeeDto>(employee);
            var updatedEmployee = await _employeeService.UpdateEmployee(id, employeeDto);
            if (updatedEmployee == null)
            {
                _logger.LogWarning("Employee not found with ID: {id}", id);
                var notFoundResponse = new GenericApiResponse<Employee>().CreateApiResponse(false, HttpStatusCode.NotFound, null, "Employee not found.");
                return notFoundResponse;
            }

            _logger.LogInformation("Successfully updated employee with ID: {id}", id);

            var response = new GenericApiResponse<Employee>().CreateApiResponse(true, HttpStatusCode.OK, updatedEmployee);
            return response;
        }
    }
}
