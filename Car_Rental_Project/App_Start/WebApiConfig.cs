using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace Car_Rental_Project
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services
            config.EnableCors();
            // Web API routes
            config.MapHttpAttributeRoutes();

            // template
            config.Routes.MapHttpRoute(
             name: "DefaultApi",
             routeTemplate: "api/{controller}/{id}",
             defaults: new { id = RouteParameter.Optional }
         );
            //================================================================================================================================\\

            //-------VehicleType-------//

            // Get all VehicleTypes
            config.Routes.MapHttpRoute(
             name: "AllVehicleTypes",
             routeTemplate: "AllVehicleTypes",
             defaults: new { controller = "VehicleType", action = "GetAllVehicleTypes" }
         );

            // Get all years
            config.Routes.MapHttpRoute(
             name: "AllYears",
             routeTemplate: "AllYears",
             defaults: new { controller = "VehicleType", action = "GetAllYears" }
         );

            // Get all manufacturers
            config.Routes.MapHttpRoute(
             name: "AllManufacturers",
             routeTemplate: "AllManufacturers",
             defaults: new { controller = "VehicleType", action = "GetAllManufacturers" }
         );

            // Get all models
            config.Routes.MapHttpRoute(
             name: "AllModels",
             routeTemplate: "AllModels",
             defaults: new { controller = "VehicleType", action = "GetAllModels" }
         );

            // Delete vehicle type by id
            config.Routes.MapHttpRoute(
             name: "DelVehicleType",
             routeTemplate: "DelVehicleType",
             defaults: new { controller = "VehicleType", action = "DeleteVehicleTypeById" }
         );

            // Edit vehicle type by id
            config.Routes.MapHttpRoute(
             name: "EditVehicleType",
             routeTemplate: "EditVehicleType",
             defaults: new { controller = "VehicleType", action = "PutEditVehicleType" }
         );

            // Post new vehicle type
            config.Routes.MapHttpRoute(
             name: "PostVehicleType",
             routeTemplate: "PostVehicleType",
             defaults: new { controller = "VehicleType", action = "PostNewVehicleType" }
         );

            //-------End VehicleTypes-------//

            //================================================================================================================================\\

            //-------VehicleArea-------//

            //Get all vehicleArea
            config.Routes.MapHttpRoute(
             name: "AllVehicleArea",
             routeTemplate: "AllVehicleArea",
             defaults: new { controller = "VehicleArea", action = "GetAllVehiclesArea" }
         );

            // Post new vehicle area
            config.Routes.MapHttpRoute(
             name: "PostVehicleArea",
             routeTemplate: "PostVehicleArea",
             defaults: new { controller = "VehicleArea", action = "PostNewVehicleArea" }
         );

            // Edit vehicle area by id
            config.Routes.MapHttpRoute(
             name: "EditVehicleArea",
             routeTemplate: "EditVehicleArea",
             defaults: new { controller = "VehicleArea", action = "PutEditVehicleArea" }
         );

            // Delete vehicle area by id
            config.Routes.MapHttpRoute(
             name: "DeleteVehicleArea",
             routeTemplate: "DeleteVehicleArea",
             defaults: new { controller = "VehicleArea", action = "DeleteVehicleAreaByID" }
         );

            //-------End VehicleArea-------//

            //================================================================================================================================\\

            //-------VehicleRentArea-------//

            // Get all vehicle rent area
            config.Routes.MapHttpRoute(
             name: "AllVehicleRentArea",
             routeTemplate: "AllVehicleRentArea",
             defaults: new { controller = "VehicleRentArea", action = "GetAllRentAreas" }
         );

            // Post vehicle rent area
            config.Routes.MapHttpRoute(
             name: "PostVehicleRentArea",
             routeTemplate: "PostVehicleRentArea",
             defaults: new { controller = "VehicleRentArea", action = "PostNewRentArea" }
         );

            // Edit vehicle rent area
            config.Routes.MapHttpRoute(
             name: "EditVehicleRentArea",
             routeTemplate: "EditVehicleRentArea",
             defaults: new { controller = "VehicleRentArea", action = "PutEditRentArea" }
         );

            // Delete vehicle rent area
            config.Routes.MapHttpRoute(
             name: "DeleteVehicleRentArea",
             routeTemplate: "DeleteVehicleRentArea",
             defaults: new { controller = "VehicleRentArea", action = "DeleteRentAreaById" }
         );

            //-------End VehicleRentArea-------//

            //================================================================================================================================\\

            //-------Branch-------//

            // Get all branches
            config.Routes.MapHttpRoute(
             name: "AllBranches",
             routeTemplate: "AllBranches",
             defaults: new { controller = "Branch", action = "GetAllBranches" }
         );

            // Post branch
            config.Routes.MapHttpRoute(
             name: "PostBranch",
             routeTemplate: "PostBranch",
             defaults: new { controller = "Branch", action = "PostNewBranch" }
         );

            // Edit branch
            config.Routes.MapHttpRoute(
             name: "EditBranch",
             routeTemplate: "EditBranch",
             defaults: new { controller = "Branch", action = "PutEditBranch" }
         );

            // Delete branch
            config.Routes.MapHttpRoute(
             name: "DeleteBranch",
             routeTemplate: "DeleteBranch",
             defaults: new { controller = "Branch", action = "DeleteBranchById" }
         );

            //-------End Branch-------//

            //================================================================================================================================\\

            //-------User-------//
            
            // Get all Users
            config.Routes.MapHttpRoute(
              name: "AllUsers",
              routeTemplate: "AllUsers",
              defaults: new { controller = "User", action = "GetAllUsers" }
          );

            // Get all Users
            config.Routes.MapHttpRoute(
              name: "UserByID",
              routeTemplate: "UserByID",
              defaults: new { controller = "User", action = "GetUserByID" }
          );

            // Checks User password & email
            config.Routes.MapHttpRoute(
              name: "CheckUser",
              routeTemplate: "CheckUser",
              defaults: new { controller = "User", action = "GetMatchUser" }
         );

            // Edit User
            config.Routes.MapHttpRoute(
              name: "EditUser",
              routeTemplate: "EditUser",
              defaults: new { controller = "User", action = "PutEditUser" }
          );

            // Post User
            config.Routes.MapHttpRoute(
             name: "PostUser",
             routeTemplate: "PostUser",
             defaults: new { controller = "User", action = "PostNewUser" }
         );

            // Delete User
            config.Routes.MapHttpRoute(
             name: "DelUser",
             routeTemplate: "DelUser",
             defaults: new { controller = "User", action = "DeleteUserById" }
         );

            //-------End User-------//

            //================================================================================================================================\\

            //-------Employee-------//

            // Get all Employees
            config.Routes.MapHttpRoute(
              name: "AllEmployees",
              routeTemplate: "AllEmployees",
              defaults: new { controller = "Employee", action = "GetAllEmployees" }
         );

            // Edit Employee
            config.Routes.MapHttpRoute(
              name: "EditEmployee",
              routeTemplate: "EditEmployee",
              defaults: new { controller = "Employee", action = "PutEditEmployee" }
         );

            // Checks Employee password & email
            config.Routes.MapHttpRoute(
              name: "CheckEmployee",
              routeTemplate: "CheckEmployee",
              defaults: new { controller = "Employee", action = "GetMatchEmployee" }
         );

            // Post Employee
            config.Routes.MapHttpRoute(
             name: "PostEmployee",
             routeTemplate: "PostEmployee",
             defaults: new { controller = "Employee", action = "PostNewEmployee" }
         );

            // Delete Employee
            config.Routes.MapHttpRoute(
             name: "DelEmployee",
             routeTemplate: "DelEmployee",
             defaults: new { controller = "Employee", action = "DeleteEmployeeById" }
         );

            //-------End Employee-------//

            //================================================================================================================================\\

            //-------Admin-------//

            // Get all Admins
            config.Routes.MapHttpRoute(
              name: "AllAdmins",
              routeTemplate: "AllAdmins",
              defaults: new { controller = "Admin", action = "GetAllAdmins" }
         );

            // Edit Admin
            config.Routes.MapHttpRoute(
              name: "EditAdmin",
              routeTemplate: "EditAdmin",
              defaults: new { controller = "Admin", action = "PutEditAdmin" }
         );

            // Checks Admin password & email
            config.Routes.MapHttpRoute(
              name: "CheckAdmin",
              routeTemplate: "CheckAdmin",
              defaults: new { controller = "Admin", action = "GetMatchAdmin" }
         );

            // Post Admin
            config.Routes.MapHttpRoute(
             name: "PostAdmin",
             routeTemplate: "PostAdmin",
             defaults: new { controller = "Admin", action = "PostNewAdmin" }
         );

            // Delete Admin
            config.Routes.MapHttpRoute(
             name: "DelAdmin",
             routeTemplate: "DelAdmin",
             defaults: new { controller = "Admin", action = "DeleteAdminById" }
         );

            //-------End Admin-------//

        }
    }
}
