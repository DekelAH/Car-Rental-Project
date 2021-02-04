using RentDataAccess;
using RentDataAccess.DataFunctions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Car_Rental_Project.Controllers
{
    [EnableCors(origins: "*", methods: "*", headers: "*")]
    public class EmployeeController : ApiController
    {
        EmployeeFunctions employeeMethods = new EmployeeFunctions();

        // Get all employees
        public IHttpActionResult GetAllEmployees()
        {
            var result = employeeMethods.GetAllEmployeesMethod();

            if (result == null)
            {
                return BadRequest("error");
            }

            return Ok(result);
        }

        // Sends email & password to check method and gets back the object that match
        public IHttpActionResult GetMatchEmployee(string receivedEmail, string receivedPassword)
        {
            var result = employeeMethods.CheckIfEmployeeLoggedIn(receivedEmail, receivedPassword);

            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }

        // Post new employee
        public IHttpActionResult PostNewEmployee(Employee newEmployee)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Not a valid model");
            }

            string result = employeeMethods.PostNewEmployeesMethod(newEmployee);

            if (result == "Error")
            {
                return BadRequest("Failed to save new employee details");
            }

            return Ok(result);
        }

        // Put method - edit existing employee
        public IHttpActionResult PutEditEmployee(Employee editEmployee)
        {
            string result = employeeMethods.PutEditEmployeeMethod(editEmployee);

            if (result == "Error")
            {
                return BadRequest("Failed to save updates of chosen employee");
            }

            return Ok(result);
        }

        // Delete employee by id
        public IHttpActionResult DeleteEmployeeById(int employeeID)
        {
            if (employeeID <= 0)
            {
                return BadRequest("Not a valid employee id");
            }

            var result = employeeMethods.DeleteEmployeeByIdMethod(employeeID);

            return Ok(result);
        }
    }
}
