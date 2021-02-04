using RentDataAccess;
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
    public class VehicleAreaController : ApiController
    {
        // Get all vehicles fields
        public IHttpActionResult GetAllVehiclesArea()
        {
            List<VehicleArea> vehicleAreaList = null;

            using (var dbRental = new dbCarRentalEntities())
            {
                vehicleAreaList = dbRental.VehicleAreas.ToList();
            }

            if(vehicleAreaList.Count == 0)
            {
                return NotFound();
            }

            return Ok(vehicleAreaList);
        }

        // Post new vehicle area
        public IHttpActionResult PostNewVehicleArea(VehicleArea vehicleAreaRepo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Not a valid model");
            }

            using (var dbRental = new dbCarRentalEntities())
            {
                dbRental.VehicleAreas.Add(new VehicleArea()
                {
                    VehicleTypeID = vehicleAreaRepo.VehicleTypeID,
                    CurrentKMPH = vehicleAreaRepo.CurrentKMPH,
                    VehicleAreaImage = vehicleAreaRepo.VehicleAreaImage,
                    IsProper = vehicleAreaRepo.IsProper,
                    IsAvailable = vehicleAreaRepo.IsAvailable,
                    LicenseNum = vehicleAreaRepo.LicenseNum,
                    BranchID= vehicleAreaRepo.BranchID
                });

                dbRental.SaveChanges();
                return Ok(vehicleAreaRepo);
            }            
        }

        // Put method - edit existing vehicle for rent by id
        public IHttpActionResult PutEditVehicleArea(VehicleArea vehicleAreaUpdate)
        {
            using (var dbRental = new dbCarRentalEntities())
            {
                var existingVehicleArea = dbRental.VehicleAreas.Where(s => s.VehicleAreaID == vehicleAreaUpdate.VehicleAreaID).FirstOrDefault();

                if (existingVehicleArea != null)
                {
                    existingVehicleArea.VehicleTypeID = vehicleAreaUpdate.VehicleTypeID;
                    existingVehicleArea.CurrentKMPH = vehicleAreaUpdate.CurrentKMPH;
                    existingVehicleArea.VehicleAreaImage = vehicleAreaUpdate.VehicleAreaImage;
                    existingVehicleArea.IsProper = vehicleAreaUpdate.IsProper;
                    existingVehicleArea.IsAvailable = vehicleAreaUpdate.IsAvailable;
                    existingVehicleArea.LicenseNum = vehicleAreaUpdate.LicenseNum;
                    existingVehicleArea.Branch = vehicleAreaUpdate.Branch;

                    dbRental.SaveChanges();
                    return Ok(vehicleAreaUpdate);
                }
                else
                {
                    return NotFound();
                }
            }

        }

        // Delete vehicle area by id
        public IHttpActionResult DeleteVehicleAreaByID(int vehicleAreaID)
        {
            if (vehicleAreaID <= 0)
            {
                return BadRequest("Not a valid vehicle license number");
            }

            using (var dbRental = new dbCarRentalEntities())
            {
                var chosenLicense = dbRental.VehicleAreas.Where(s => s.VehicleAreaID == vehicleAreaID).FirstOrDefault();
                dbRental.Entry(chosenLicense).State = System.Data.Entity.EntityState.Deleted;

                dbRental.SaveChanges();
                return Ok(vehicleAreaID);
            }
        }
    }
}
