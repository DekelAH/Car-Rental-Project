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
    public class VehicleRentAreaController : ApiController
    {
        VehicleRentAreaFunctions rentAreaMethods = new VehicleRentAreaFunctions();

        // Get all rent areas
        public IHttpActionResult GetAllRentAreas()
        {
            var result = rentAreaMethods.GetAllRentAreasMethod();

            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }

        // Post new rent area
        public IHttpActionResult PostNewRentArea(VehicleRentArea newRentAreaRepo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Not a valid model");
            }

            string result = rentAreaMethods.PostNewRentAreasMethod(newRentAreaRepo);

            if (result == "Error")
            {
                return BadRequest("Faild to save new rent area details");
            }

            return Ok(result);
        }

        // Put method - edit existing rent area
        public IHttpActionResult PutEditRentArea(VehicleRentArea editRentArea)
        {
            string result = rentAreaMethods.PutEditRentAreasMethod(editRentArea);

            if (result == "Error")
            {
                return BadRequest("Failed to save updates of chosen rent area");
            }

            return Ok(result);
        }

        // Delete rent area by id
        public IHttpActionResult DeleteRentAreaById(int rentAreaID)
        {
            if (rentAreaID <= 0)
            {
                return BadRequest("Not a valid user id");
            }

            var result = rentAreaMethods.DeleteRentAreaByIdMethod(rentAreaID);

            return Ok(result);
        }
    }
}
