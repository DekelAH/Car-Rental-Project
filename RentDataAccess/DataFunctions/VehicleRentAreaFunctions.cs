using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RentDataAccess.DataFunctions
{
    public class VehicleRentAreaFunctions
    {
        // Get all rent areas method
        public IEnumerable<VehicleRentArea> GetAllRentAreasMethod()
        {
            List<VehicleRentArea> allRentAreas = null;

            using (var dbRental = new dbCarRentalEntities())
            {
                allRentAreas = dbRental.VehicleRentAreas.ToList();
            }

            return allRentAreas;
        }

        // Post new rent area method
        public string PostNewRentAreasMethod(VehicleRentArea newRentAreaRepo)
        {
            try
            {
                using (var dbRental = new dbCarRentalEntities())
                {
                    dbRental.VehicleRentAreas.Add(new VehicleRentArea()
                    {
                        UserID = newRentAreaRepo.UserID,
                        RentDate = newRentAreaRepo.RentDate,
                        ReturnDate = newRentAreaRepo.ReturnDate,
                        ActualReturnDate = newRentAreaRepo.ActualReturnDate,
                        VehicleAreaID = newRentAreaRepo.VehicleAreaID,                       
                        
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

        // Put (edit) rent area method
        public string PutEditRentAreasMethod(VehicleRentArea editRentArea)
        {
            using (var dbRental = new dbCarRentalEntities())
            {
                var existingRentArea = dbRental.VehicleRentAreas.Where(s => s.VehicleAreaID == editRentArea.VehicleAreaID).FirstOrDefault();

                if (existingRentArea != null)
                {
                    existingRentArea.UserID = editRentArea.UserID;
                    existingRentArea.RentDate = editRentArea.RentDate;
                    existingRentArea.ReturnDate = editRentArea.ReturnDate;
                    existingRentArea.ActualReturnDate = editRentArea.ActualReturnDate;
                    existingRentArea.VehicleAreaID = editRentArea.VehicleAreaID;
                    
                    dbRental.SaveChanges();
                }
                else
                {
                    return "Can't match rent area";
                }
            }
            return "Success";
        }

        // Delete rent area by id method
        public string DeleteRentAreaByIdMethod(int rentAreaID)
        {
            try
            {
                using (var dbRental = new dbCarRentalEntities())
                {
                    var chosenRentArea = dbRental.VehicleRentAreas.Where(s => s.VehicleRentAreaID == rentAreaID).FirstOrDefault();
                    dbRental.Entry(chosenRentArea).State = System.Data.Entity.EntityState.Deleted;

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
