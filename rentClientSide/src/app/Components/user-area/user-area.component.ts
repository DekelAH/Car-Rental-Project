import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { VehicleRentAreaService } from 'src/app/Services/vehicle-rent-area.service';
import { VehicleAreaService } from 'src/app/Services/vehicle-area.service';
import { VehicleArea } from 'src/app/Models/vehicleArea.model';
import { UserService } from 'src/app/Services/user.service';
import { User } from 'src/app/Models/user.model';

@Component({

  selector: 'app-user-area',
  templateUrl: './user-area.component.html',
  styleUrls: ['./user-area.component.css']
})

export class UserAreaComponent implements OnInit {

  public allVehicleRentArea: any[]; // all vehicle rent area array - type any (contain vehicle type properties)
  public allVehicleArea: VehicleArea[]; // all vehicle area array
  public userToShow: any; // user object that display in html
  public updateUser: User; // user to update
  public imageUrl: string = "";
  public editImage: string;

  constructor(private route: Router, private vehicleRentAreaService: VehicleRentAreaService, private vehicleAreaService: VehicleAreaService, private userService: UserService) { }

  ngOnInit() {

    var authorization = sessionStorage.getItem('auth'); // getting from session storage type of authorization
    if (authorization != 'user') { // if not type user redirect to home page

      this.route.navigate(['/home'])
    }

    this.GetAllVehicleRentArea();
    this.GetAllVehicleArea();
    this.getUserToShow();
  }

  // getting the right user by using find user by id method from user service
  public getUserToShow(): void {

    var UserID = Number(sessionStorage.getItem('UserID'));

    this.userService.getUsersByIDAsync(UserID).subscribe(u => {

      this.userToShow = u;
    });
  }

  // getting vehicle area and checking if he's suitable to vehicle rent area by vehicle area id +
  // implementing 2 properties from vehicle area into all vehicle rent area array.
  public GetAllVehicleArea(): void {

    this.vehicleAreaService.getAllVehicleAreaAsync().subscribe(vehicleArea => {

      this.allVehicleArea = vehicleArea

      for (let i = 0; i < this.allVehicleRentArea.length; i++) {
        for (let j = 0; j < this.allVehicleArea.length; j++) {
          if (this.allVehicleArea[j].VehicleAreaID == this.allVehicleRentArea[i].VehicleAreaID) {

            this.allVehicleRentArea[i].VehicleAreaImage = this.allVehicleArea[j].VehicleAreaImage;
            this.allVehicleRentArea[i].LicenseNum = this.allVehicleArea[j].LicenseNum;
          }
        }
      }
    });
  }

  // getting all vehicle rent areas and checking if user id match to user id property in vehicle rent area.
  public GetAllVehicleRentArea(): void {

    this.vehicleRentAreaService.getAllVehicleRentAreaAsync().subscribe(vehicleRentArea => {

      this.allVehicleRentArea = vehicleRentArea.filter(v => v.UserID == Number(sessionStorage.getItem('UserID')));

      for (let i = 0; i < this.allVehicleRentArea.length; i++) {
        for (let j = 0; j < this.allVehicleArea.length; j++) {
          if (this.allVehicleArea[j].VehicleAreaID == this.allVehicleRentArea[i].VehicleAreaID) {

            this.allVehicleRentArea[i].VehicleAreaImage = this.allVehicleArea[j].VehicleAreaImage;
            this.allVehicleRentArea[i].LicenseNum = this.allVehicleArea[j].LicenseNum;
          }
        }
      }
    });
  }

  // Connect from html to TS , 'string' value = html (#example)
  @ViewChild('fullName', { static: false }) fullName: ElementRef;
  @ViewChild('id', { static: false }) id: ElementRef;
  @ViewChild('userName', { static: false }) userName: ElementRef;
  @ViewChild('birthDate', { static: false }) birthDate: ElementRef;
  @ViewChild('gender', { static: false }) gender: ElementRef;
  @ViewChild('email', { static: false }) email: ElementRef;
  @ViewChild('password', { static: false }) password: ElementRef;
  @ViewChild('validPassword', { static: false }) validPassword: ElementRef;
  @ViewChild('userImage', { static: false }) userImage: ElementRef;

  public updateUserArea(receivedUpdatedUserID: number): void {

    var user = {

      UserID: receivedUpdatedUserID,
      FullName: this.fullName.nativeElement.value.trim(),
      ID: this.id.nativeElement.value.trim(),
      UserName: this.userName.nativeElement.value.trim(),
      BirthDate: this.birthDate.nativeElement.value,
      Gender: this.gender.nativeElement.value.trim(),
      Email: this.email.nativeElement.value.trim(),
      Password: this.password.nativeElement.value.trim(),
      ValidPassword: this.validPassword.nativeElement.value.trim(),
      UserImage: this.editImage
    }

    if (this.editImage == null || this.editImage == "") {
      var oldUser = this.userToShow;
      user.UserImage = oldUser.UserImage;
    }
    if (user.BirthDate == null || user.BirthDate == "") {
      var oldUser = this.userToShow;
      user.BirthDate = oldUser.BirthDate;
    }
    if (user.Gender == null || user.Gender == "") {
      var oldUser = this.userToShow;
      user.Gender = oldUser.Gender.trim();
    }

    this.userService.editUserAsync(user).subscribe(u => {

      this.getUserToShow();
    })
  }

  // converting image into base 64 (string) and setting into user image property.
  public modalUpdateUserImageChange(event: any): void {

    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {

      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {

        this.updateUser.UserImage = reader.result.toString()
        this.imageUrl = reader.result.toString()
      }
    }
  }

}