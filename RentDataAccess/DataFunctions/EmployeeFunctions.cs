using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RentDataAccess.DataFunctions
{
    public class EmployeeFunctions
    {
        // Get all employees method
        public IEnumerable<Employee> GetAllEmployeesMethod()
        {
            List<Employee> allEmployees = null;

            using (var dbRental = new dbCarRentalEntities())
            {
                allEmployees = dbRental.Employees.ToList();
            }

            return allEmployees;
        }

        // Checks if password & email are match to employee and sends back the employee object
        public Employee CheckIfEmployeeLoggedIn(string receivedEmail, string receivedPassword)
        {
            Employee employeeCheck = null;
           
                if (receivedEmail != "" && receivedPassword != "")
                {
                    using (var dbRental = new dbCarRentalEntities())
                    {

                        employeeCheck = dbRental.Employees.Where(x => x.EmployeeEmail == receivedEmail && x.EmployeePassword == receivedPassword).FirstOrDefault();

                    }
                }
                return employeeCheck;
            
           
        }

        // Post new employee method
        public string PostNewEmployeesMethod(Employee newEmployeeRepo)
        {
            try
            {
                using (var dbRental = new dbCarRentalEntities())
                {
                    dbRental.Employees.Add(new Employee()
                    {
                        EmployeeFullName = newEmployeeRepo.EmployeeFullName,
                        PrivateEmployeeID = newEmployeeRepo.PrivateEmployeeID,
                        EmployeeEmail = newEmployeeRepo.EmployeeEmail,
                        EmployeeBirthDate = newEmployeeRepo.EmployeeBirthDate,
                        EmployeeGender = newEmployeeRepo.EmployeeGender,
                        EmployeePassword = newEmployeeRepo.EmployeePassword,
                        EmployeeValidPassword = newEmployeeRepo.EmployeeValidPassword,
                        EmployeeImage = newEmployeeRepo.EmployeeImage,
                    });

                    dbRental.SaveChanges();
                }
                return "Success";
            }
            catch (Exception)
            {
                return "Error";
            }
        }

        // Put (edit) employee method
        public string PutEditEmployeeMethod(Employee editEmployee)
        {
            using (var dbRental = new dbCarRentalEntities())
            {
                var existingEmployee = dbRental.Employees.Where(s => s.EmployeeID == editEmployee.EmployeeID).FirstOrDefault();

                if (existingEmployee != null)
                {
                    existingEmployee.EmployeeFullName = editEmployee.EmployeeFullName;
                    existingEmployee.PrivateEmployeeID = editEmployee.PrivateEmployeeID;
                    existingEmployee.EmployeeUserName = editEmployee.EmployeeUserName;
                    existingEmployee.EmployeeBirthDate = editEmployee.EmployeeBirthDate;
                    existingEmployee.EmployeeGender = editEmployee.EmployeeGender;
                    existingEmployee.EmployeeEmail = editEmployee.EmployeeEmail;
                    existingEmployee.EmployeePassword = editEmployee.EmployeePassword;
                    existingEmployee.EmployeeValidPassword = editEmployee.EmployeeValidPassword;
                    existingEmployee.EmployeeImage = editEmployee.EmployeeImage;

                    dbRental.SaveChanges();
                }
                else
                {
                    return "Can't match employee";
                }
            }
            return "Success";
        }

        // Delete by id method
        public string DeleteEmployeeByIdMethod(int employeeID)
        {
            try
            {
                using (var dbRental = new dbCarRentalEntities())
                {
                    var chosenEmployee = dbRental.Employees.Where(s => s.EmployeeID == employeeID).FirstOrDefault();
                    dbRental.Entry(chosenEmployee).State = System.Data.Entity.EntityState.Deleted;

                    dbRental.SaveChanges();
                }
                return "Success";
            }
            catch (Exception)
            {
                return "Error";
            }
        }
    }
}
