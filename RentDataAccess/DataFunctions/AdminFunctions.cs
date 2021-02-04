using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RentDataAccess.DataFunctions
{
    public class AdminFunctions
    {
        // Get all admins method
        public IEnumerable<Admin> GetAllAdminsMethod()
        {
            List<Admin> allAdmins = null;

            using (var dbRental = new dbCarRentalEntities())
            {
                allAdmins = dbRental.Admins.ToList();
            }

            return allAdmins;
        }

        // Checks if password & email are match to admin and sends back the admin object
        public Admin CheckIfAdminLoggedIn(string receivedEmail, string receivedPassword)
        {
            Admin adminCheck = null;
            try
            {
                if (receivedEmail != "" && receivedPassword != "")
                {
                    using (var dbRental = new dbCarRentalEntities())
                    {

                        adminCheck = dbRental.Admins.Where(x => x.AdminEmail == receivedEmail && x.AdminPassword == receivedPassword).FirstOrDefault();

                    }            
                }
                return adminCheck;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        // Post new admin method
        public string PostNewAdminsMethod(Admin newAdminRepo)
        {
            try
            {
                using (var dbRental = new dbCarRentalEntities())
                {
                    dbRental.Admins.Add(new Admin()
                    {
                        AdminFullName = newAdminRepo.AdminFullName,
                        PrivateAdminID = newAdminRepo.PrivateAdminID,
                        AdminEmail = newAdminRepo.AdminEmail,
                        AdminBirthDate = newAdminRepo.AdminBirthDate,
                        AdminGender = newAdminRepo.AdminGender,
                        AdminPassword = newAdminRepo.AdminPassword,
                        AdminValidPassword = newAdminRepo.AdminValidPassword,
                        AdminImage = newAdminRepo.AdminImage,
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

        // Put (edit) admin method
        public string PutEditAdminMethod(Admin editAdmin)
        {
            using (var dbRental = new dbCarRentalEntities())
            {
                var existingAdmin = dbRental.Admins.Where(s => s.AdminID == editAdmin.AdminID).FirstOrDefault();

                if (existingAdmin != null)
                {
                    existingAdmin.AdminFullName = editAdmin.AdminFullName;
                    existingAdmin.PrivateAdminID = editAdmin.PrivateAdminID;
                    existingAdmin.AdminUserName = editAdmin.AdminUserName;
                    existingAdmin.AdminBirthDate = editAdmin.AdminBirthDate;
                    existingAdmin.AdminGender = editAdmin.AdminGender;
                    existingAdmin.AdminEmail = editAdmin.AdminEmail;
                    existingAdmin.AdminPassword = editAdmin.AdminPassword;
                    existingAdmin.AdminValidPassword = editAdmin.AdminValidPassword;
                    existingAdmin.AdminImage = editAdmin.AdminImage;

                    dbRental.SaveChanges();
                }
                else
                {
                    return "Can't match admin";
                }
            }
            return "Success";
        }

        // Delete admin by id method
        public string DeleteChosenAdminByIdMethod(int adminID)
        {
            try
            {
                using (var dbRental = new dbCarRentalEntities())
                {
                    var chosenAdmin = dbRental.Admins.Where(s => s.AdminID == adminID).FirstOrDefault();
                    dbRental.Entry(chosenAdmin).State = System.Data.Entity.EntityState.Deleted;

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
