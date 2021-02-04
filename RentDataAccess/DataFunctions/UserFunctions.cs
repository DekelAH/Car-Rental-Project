using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RentDataAccess.DataFunctions
{
    public class UserFunctions
    {
        // Get all users method
        public IEnumerable<User> GetAllUsersMethod() 
        {
            List<User> allUsers = null;

            using (var dbRental = new dbCarRentalEntities())
            {
                allUsers = dbRental.Users.ToList();
            }

            return allUsers;
        }

        // Get User by id and returns founded user
        public User GetUserByIDMethod(int id)
        {
            User user;

            using (var dbRental = new dbCarRentalEntities())
            {
                user = dbRental.Users.Where(u => u.UserID == id).FirstOrDefault();
            }

            return user;
        }

        // Checks if password & email are match to user and sends back the user object
        public User CheckIfUserLoggedIn(string receivedEmail, string receivedPassword)
        {
            User userCheck = null;
            try
            {
                if (receivedEmail != "" && receivedPassword != "")
                {
                    using (var dbRental = new dbCarRentalEntities())
                    {

                        userCheck = dbRental.Users.Where(x => x.Email == receivedEmail && x.Password == receivedPassword).FirstOrDefault();

                    }
                }
                return userCheck;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        // Post new User method
        public string PostNewUserMethod(User newUserRepo)
        {
            try
            {
                using (var dbRental = new dbCarRentalEntities())
                {
                    dbRental.Users.Add(new User()
                    {
                        FullName = newUserRepo.FullName,
                        ID = newUserRepo.ID,
                        UserName = newUserRepo.UserName,
                        BirthDate = newUserRepo.BirthDate,
                        Gender = newUserRepo.Gender,
                        Email = newUserRepo.Email,
                        Password = newUserRepo.Password,
                        ValidPassword = newUserRepo.ValidPassword,
                        UserImage = newUserRepo.UserImage
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

        // Put (edit) user method
        public string PutEditUserMethod(User editUser)
        {
            using (var dbRental = new dbCarRentalEntities())
            {
                var existingUser = dbRental.Users.Where(s => s.UserID == editUser.UserID).FirstOrDefault();

                if (existingUser != null)
                {
                    existingUser.FullName = editUser.FullName;
                    existingUser.ID = editUser.ID;
                    existingUser.UserName = editUser.UserName;
                    existingUser.BirthDate = editUser.BirthDate;
                    existingUser.Gender = editUser.Gender;
                    existingUser.Email = editUser.Email;
                    existingUser.Password = editUser.Password;
                    existingUser.ValidPassword = editUser.ValidPassword;
                    existingUser.UserImage = editUser.UserImage;

                    dbRental.SaveChanges();
                }
                else
                {
                    return "Can't match user";
                }
            }
            return "Success";
        }

        // Delete by id method
        public string DeleteUserByIdMethod(int userID)
        {
            try
            {
                using (var dbRental = new dbCarRentalEntities())
                {
                    var chosenUser = dbRental.Users.Where(s => s.UserID == userID).FirstOrDefault();
                    dbRental.Entry(chosenUser).State = System.Data.Entity.EntityState.Deleted;

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
