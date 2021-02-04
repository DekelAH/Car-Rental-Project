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
    public class AdminController : ApiController
    {
        AdminFunctions adminMethods = new AdminFunctions();

        // Get all admins
        public IHttpActionResult GetAllAdmins()
        {
            var result = adminMethods.GetAllAdminsMethod();

            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }

        // Sends email & password to check method and gets back the object that match
        public IHttpActionResult GetMatchAdmin(string receivedEmail, string receivedPassword)
        {
            var result = adminMethods.CheckIfAdminLoggedIn(receivedEmail, receivedPassword);

            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }

        // Post new admin
        public IHttpActionResult PostNewAdmin(Admin newAdmin)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Not a valid model");
            }

            string result = adminMethods.PostNewAdminsMethod(newAdmin);

            if (result == "Error")
            {
                return BadRequest("Failed to save new admin details");
            }

            return Ok(result);
        }

        // Put method - edit existing admin
        public IHttpActionResult PutEditAdmin(Admin editAdmin)
        {
            string result = adminMethods.PutEditAdminMethod(editAdmin);

            if (result == "Error")
            {
                return BadRequest("Failed to save updates of chosen admin");
            }

            return Ok(result);
        }

        // Delete admin by id
        public IHttpActionResult DeleteAdminById(int adminID)
        {
            if (adminID <= 0)
            {
                return BadRequest("Not a valid admin id");
            }

            var result = adminMethods.DeleteChosenAdminByIdMethod(adminID);

            return Ok(result);
        }
    }
}
