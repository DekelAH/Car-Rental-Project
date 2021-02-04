using RentDataAccess;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Car_Rental_Project.Controllers
{
    [EnableCors(origins: "*", methods: "*", headers: "*")]
    public class VehicleTypeController : ApiController
    {
        // Gett all vehicles types
        public IHttpActionResult GetAllVehicleTypes()
        {
            List<VehicleType> allVehicleTypes = null;

            using (var dbRental = new dbCarRentalEntities())
            {
                allVehicleTypes = dbRental.VehicleTypes.ToList();
            }

            if (allVehicleTypes.Count == 0)
            {
                return NotFound();
            }

            return Ok(allVehicleTypes);

        }

        // Get vehicle by id
        public IHttpActionResult GetVehicleTypeByID(int vehicleID)
        {
            List<VehicleType> vehicleTypeList = null;

            if (vehicleID <= 0)
            {
                return NotFound();
            }

            using (var dbRental = new dbCarRentalEntities())
            {
                vehicleTypeList = (from s in dbRental.VehicleTypes
                                   where s.VehicleTypeID == vehicleID
                                   select s).ToList();
            }

            if (vehicleTypeList.Count == 0)
            {
                return NotFound();
            }

            return Ok(vehicleTypeList);
        }

        // Get vehicles by model
        public IHttpActionResult GetVehicleTypeByModel(string vehicleModel)
        {
            List<VehicleType> vehicleModelList = null;

            if (string.IsNullOrEmpty(vehicleModel))
            {
                return NotFound();
            }

            using (var dbRental = new dbCarRentalEntities())
            {
                vehicleModelList = (from s in dbRental.VehicleTypes
                                   where s.Model == vehicleModel
                                   select s).ToList();
            }

            if (vehicleModelList.Count == 0)
            {
                return NotFound();
            }

            return Ok(vehicleModelList);
        }

        // Get all years
        public IHttpActionResult GetAllYears()
        {
            var dbRental = new dbCarRentalEntities();

            var vehicleManuList = (from s in dbRental.VehicleTypes
                                   group s by s.ModelYear into g
                                   select new { ModelYear = g.Key }).ToList();

            if (vehicleManuList.Count == 0)
            {
                return NotFound();
            }

            return Ok(vehicleManuList);
        }

        public IHttpActionResult GetAllManufacturers()
        {
            var dbRental = new dbCarRentalEntities();
   
            var vehicleManuList = (from s in dbRental.VehicleTypes
                                   group s by s.Manufacturer into g
                                   select new { Manufacturer = g.Key }).ToList();

            if (vehicleManuList.Count == 0)
            {
                return NotFound();
            }

            return Ok(vehicleManuList);
        }

        // Get all models
        public IHttpActionResult GetAllModels()
        {
            var dbRental = new dbCarRentalEntities();

            var vehicleManuList = (from s in dbRental.VehicleTypes
                                   group s by s.Model into g
                                   select new { Model = g.Key }).ToList();

            if (vehicleManuList.Count == 0)
            {
                return NotFound();
            }

            return Ok(vehicleManuList);
        }

        // Post new vehicle type
        public IHttpActionResult PostNewVehicleType(VehicleType newVehicleType)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Not a valid model");
            }

            using (var dbRental = new dbCarRentalEntities())
            {
                dbRental.VehicleTypes.Add(new VehicleType()
                {
                    VehicleTypeID = newVehicleType.VehicleTypeID,
                    Manufacturer = newVehicleType.Manufacturer,
                    Model = newVehicleType.Model,
                    DayCost = newVehicleType.DayCost,
                    LateDayCost = newVehicleType.LateDayCost,
                    ModelYear = newVehicleType.ModelYear,
                    Gear = newVehicleType.Gear,
                    Class = newVehicleType.Class,
                    VehicleImage = newVehicleType.VehicleImage
                });
                
                dbRental.SaveChanges();
                return Ok(newVehicleType);
            }        
        }

        // Put method - edit existing vehicle type
        public IHttpActionResult PutEditVehicleType(VehicleType editVehicleType)
        {
            using (var dbRental = new dbCarRentalEntities())
            {
                var existingVehicleType = dbRental.VehicleTypes.Where(s => s.VehicleTypeID == editVehicleType.VehicleTypeID).FirstOrDefault();

                if (existingVehicleType != null)
                {
                    existingVehicleType.Manufacturer = editVehicleType.Manufacturer;
                    existingVehicleType.Model = editVehicleType.Model;
                    existingVehicleType.DayCost = editVehicleType.DayCost;
                    existingVehicleType.LateDayCost = editVehicleType.LateDayCost;
                    existingVehicleType.ModelYear = editVehicleType.ModelYear;
                    existingVehicleType.Gear = editVehicleType.Gear;
                    existingVehicleType.Class = editVehicleType.Class;
                    existingVehicleType.VehicleImage = editVehicleType.VehicleImage;

                    dbRental.SaveChanges();
                    return Ok(existingVehicleType);
                }
                else
                {
                    return NotFound();
                }
            }           
        }

        // Delete vehicle type by id
        public IHttpActionResult DeleteVehicleTypeById(int vehicleID)
        {
            if (vehicleID <= 0)
            {
                return BadRequest("Not a valid vehicle type id");
            }

            using (var dbRental = new dbCarRentalEntities())
            {
                var chosenVehicleType = dbRental.VehicleTypes.Where(s => s.VehicleTypeID == vehicleID).FirstOrDefault();
                dbRental.Entry(chosenVehicleType).State = System.Data.Entity.EntityState.Deleted;

                dbRental.SaveChanges();
                return Ok(chosenVehicleType);
            }
          
        }
    }
}
