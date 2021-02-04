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
    public class BranchController : ApiController
    {
        BranchFunctions branchMethods = new BranchFunctions();

        // Get all branches
        public IHttpActionResult GetAllBranches()
        {
            var result = branchMethods.GetAllBranchesMethod();

            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }

        // Post new branch
        public IHttpActionResult PostNewBranch(Branch newBranchRepo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Not a valid model");
            }

            string result = branchMethods.PostNewBranchMethod(newBranchRepo);

            if (result == "Error")
            {
                return BadRequest("Failed to save new branch details");
            }

            return Ok(result);
        }

        // Put method - edit existing branch
        public IHttpActionResult PutEditBranch(Branch editBranchRepo)
        {
            string result = branchMethods.PutEditBranchMethod(editBranchRepo);

            if (result == "Error")
            {
                return BadRequest("Failed to save updates of chosen branch");
            }

            return Ok(result);
        }

        // Delete branch by id
        public IHttpActionResult DeleteBranchById(int branchID)
        {
            if (branchID <= 0)
            {
                return BadRequest("Not a valid branch id");
            }

            var result = branchMethods.DeleteBranchByIdMethod(branchID);

            return Ok(result);
        }
    }
}
