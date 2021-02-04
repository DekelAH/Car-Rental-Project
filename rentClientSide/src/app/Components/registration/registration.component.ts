import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Models/user.model';
import { UserService } from 'src/app/Services/user.service';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from 'src/app/Services/employee.service';
import { AdminService } from 'src/app/Services/admin.service';
import { Employee } from 'src/app/Models/employee.model';
import { Admin } from 'src/app/Models/admin.model';
import { Router } from '@angular/router';

@Component({

  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit {

  public signUpUser = new User(); // new user property type of user
  public imageUrl: string = ""; // image address
  public loggedInUser: User; // user that try to log in
  public loggedInEmployee: Employee; // employee that try to log in
  public loggedInAdmin: Admin; // admin that try to log in
  public userType: string

  constructor(private userService: UserService, private employeeService: EmployeeService, private adminService: AdminService,
    private toastSrv: ToastrService, private route: Router) { }

  ngOnInit() {

  }

  // login to any type of user function
  public loginUser(email: string, password: string, validPassword: string) {

    // Checks if email, password & valid password are empty or not
    if (email == undefined || password == undefined || validPassword == undefined || email == undefined && password == undefined && validPassword == undefined) {

      // Error message
      this.toastSrv.error("Please insert email/password.");

    } else { // Checks if password & valid password are equal
      if (password != validPassword) {

        this.toastSrv.error('Passwords do not match, try again.')
      } else {

        switch (this.userType) {

          case 'admin': // checks any matching admin by email & password
            this.adminService.getAdminByEmailAndPassword(email, password).subscribe(admin => {
              if (admin) { // if match - assign into loggedInAdmin property type of admin - the matching admin.
                this.loggedInAdmin = admin
                location = location; // refresing the page
                sessionStorage.setItem('auth', 'admin') // setting in session storage


              }
            });
            break;
          case 'user': // checks any matching user by email & password
            this.userService.getUserByEmailAndPassword(email, password).subscribe(user => {

              if (user) { // if match - assign into loggedInUser property type of user - the matching user.
                this.loggedInUser = user;
                location = location; // refresing the page
                sessionStorage.setItem('auth', 'user') // setting in session storage
                sessionStorage.setItem('UserID', JSON.stringify(user.UserID))

              }
            });
            break;
          case 'employee': // checks any matching employee by email & password
            this.employeeService.getEmployeeByEmailAndPassword(email, password).subscribe(employee => {
              if (employee) { // if match - assign into loggedInUser property type of employee - the matching user.
                this.loggedInEmployee = employee
                location = location; // refresing the page
                sessionStorage.setItem('auth', 'employee') // setting in session storage

              }
            });
            break;

          default:
            break;
        }
      }
    }
  }

  // posting new user after registration
  public PostSignUpUser(): void {

    this.signUpUser.FullName;
    this.signUpUser.ID;
    this.signUpUser.UserName;
    this.signUpUser.BirthDate;
    this.signUpUser.Gender;
    this.signUpUser.Email;
    this.signUpUser.Password;
    this.signUpUser.ValidPassword;
    this.signUpUser.UserImage;

    this.userService.postNewUserAsync(this.signUpUser).subscribe(signUpUserReturned => { // using user service - to post new user to db

      if (signUpUserReturned) {

        this.toastSrv.success('You have been registered Successfuly!');
        this.toastSrv.success('Please login.');
        this.route.navigate['/home'];
      }
    });
  }

  // converting the image into base64 format and implementing it.
  public modalSignUpUserImageChange(event: any): void { 

    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {

      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {

        this.signUpUser.UserImage = reader.result.toString()
        this.imageUrl = reader.result.toString()
      }
    }
  }
}
