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
    [EnableCors(origins:"*", methods: "*", headers: "*")]
    public class UserController : ApiController
    {
        UserFunctions userMethods = new UserFunctions();

        // Get all users
        public IHttpActionResult GetAllUsers()
        {
            var result = userMethods.GetAllUsersMethod();

            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }

        // Get User by id
        public IHttpActionResult GetUserByID(int id)
        {
            var result = userMethods.GetUserByIDMethod(id);

            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }

        // Sends email & password to check method and gets back the object that match
        public IHttpActionResult GetMatchUser(string receivedEmail, string receivedPassword)
        {
            var result = userMethods.CheckIfUserLoggedIn(receivedEmail, receivedPassword);

            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }

        // Post new user
        public IHttpActionResult PostNewUser(User newUser)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Not a valid model");
            }

            string result = userMethods.PostNewUserMethod(newUser);

            if (result == "Error")
            {
                return BadRequest("Failed to save new user details");
            }

            return Ok(result);
        }

        // Put method - edit existing user
        public IHttpActionResult PutEditUser(User editUser)
        {
            string result = userMethods.PutEditUserMethod(editUser);

            if (result == "Error")
            {
                return BadRequest("Failed to save updates of chosen user");
            }

            return Ok(result);
        }

        // Delete user by id
        public IHttpActionResult DeleteUserById(int userID)
        {
            if (userID <= 0)
            {
                return BadRequest("Not a valid user id");
            }

            var result = userMethods.DeleteUserByIdMethod(userID);

            return Ok(result);
        }
    }
}
