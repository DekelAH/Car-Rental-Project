using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RentDataAccess.DataFunctions
{
    public class BranchFunctions
    {
        // Get all branches method
        public IEnumerable<Branch> GetAllBranchesMethod()
        {
            List<Branch> allBranches = null;

            using (var dbRental = new dbCarRentalEntities())
            {
                allBranches = dbRental.Branches.ToList();
            }

            return allBranches;
        }

        // Post new branch method
        public string PostNewBranchMethod(Branch newBranchRepo)
        {
            try
            {
                using (var dbRental = new dbCarRentalEntities())
                {
                    dbRental.Branches.Add(new Branch()
                    {
                        Address = newBranchRepo.Address,
                        Latitude = newBranchRepo.Latitude,
                        Longtitude = newBranchRepo.Longtitude,
                        BranchName = newBranchRepo.BranchName
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

        // Put (edit) branch method
        public string PutEditBranchMethod(Branch editBranch)
        {
            using (var dbRental = new dbCarRentalEntities())
            {
                var existingBranch = dbRental.Branches.Where(s => s.BranchID == editBranch.BranchID).FirstOrDefault();

                if (existingBranch != null)
                {
                    existingBranch.Address = editBranch.Address;
                    existingBranch.Latitude = editBranch.Latitude;
                    existingBranch.Longtitude = editBranch.Longtitude;
                    existingBranch.BranchName = editBranch.BranchName;

                    dbRental.SaveChanges();
                }
                else
                {
                    return "Can't match branch";
                }
            }
            return "Success";
        }

        // Delete by id method
        public string DeleteBranchByIdMethod(int branchID)
        {
            try
            {
                using (var dbRental = new dbCarRentalEntities())
                {
                    var chosenBranch = dbRental.Branches.Where(s => s.BranchID == branchID).FirstOrDefault();
                    dbRental.Entry(chosenBranch).State = System.Data.Entity.EntityState.Deleted;

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
