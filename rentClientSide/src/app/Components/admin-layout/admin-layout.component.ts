import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { VehicleService } from 'src/app/Services/vehicle.service';
import { Vehicle } from 'src/app/Models/vehicle.model';
import { ToastrService } from 'ngx-toastr';
import { VehicleAreaService } from 'src/app/Services/vehicle-area.service';
import { VehicleArea } from 'src/app/Models/vehicleArea.model';
import { VehicleRentArea } from 'src/app/Models/vehicleRentArea.model';
import { VehicleRentAreaService } from 'src/app/Services/vehicle-rent-area.service';
import { BranchService } from 'src/app/Services/branch.service';
import { Branch } from 'src/app/Models/branch.model';
import { User } from 'src/app/Models/user.model';
import { UserService } from 'src/app/Services/user.service';
import { EmployeeService } from 'src/app/Services/employee.service';
import { Employee } from 'src/app/Models/employee.model';
import { AdminService } from 'src/app/Services/admin.service';
import { Admin } from 'src/app/Models/admin.model';
import { Router } from '@angular/router';

@Component({

  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})

export class AdminLayoutComponent implements OnInit {

  // ---------- Global Properties ---------- \\

  public imageUrl: string = "/assets/Images/Home Images/uploadImage.png";
  public fileToUpload: File = null;
  public imageHelper: string;
  public editImage: string;
  public currentVehicle: Vehicle[];
  public currentVehicleArea: VehicleArea[];

  // ---------- End Global Properties ---------- \\

  // Vehicle Type Properties
  public allVehicleTypes: Vehicle[];
  public allVehicleTypesCopy: Vehicle[];
  public editVehicle: string = '';
  public newVehicleType = new Vehicle();

  // Vehicle Area Properties
  public allVehicleArea: VehicleArea[];
  public newVehicleArea = new VehicleArea();
  public editVehicleArea: string = '';

  // Vehicle Rent Area Properties
  public allVehicleRentArea: VehicleRentArea[];
  public newVehicleRentArea = new VehicleRentArea();
  public editVehicleRentArea: string = '';

  // Branch properties
  public allBranches: Branch[];
  public newBranch = new Branch();
  public editBranch: string = '';

  // User properties
  public allUsers: User[];
  public newUser = new User();
  public editUser: string = '';

  // Employee properties
  public allEmployees: Employee[];
  public newEmployee = new Employee();
  public editEmployee: string = '';

  // Admin properties
  public allAdmins: Admin[];
  public newAdmin = new Admin();
  public editAdmin: string = '';

  // Constructor
  constructor(private route: Router, private vehicleService: VehicleService, private toastSrv: ToastrService, private vehicleAreaService: VehicleAreaService,
    private vehicleRentAreaService: VehicleRentAreaService, private branchService: BranchService, private userService: UserService,
    private employeeService: EmployeeService, private adminService: AdminService) { }

  // Calling functions on run time
  ngOnInit() {

    var authorization = sessionStorage.getItem('auth');
    if (authorization != 'admin') {
      this.route.navigate(['/home'])
    }
    this.GetAllBranches();
    this.GetAllVehiclesType();
    this.GetAllVehicleArea();
    this.GetAllVehicleRentArea();
    this.GetAllUsers();
    this.GetAllEmployees();
    this.GetAllAdmins();
  }

  // -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------\\

  // ---------- VehicleType Panel ---------- \\

  // Get all vehicle types
  public GetAllVehiclesType(): void {

    this.vehicleService.getAllVehicleTypeAsync().subscribe(vehicles => {

      setTimeout(() => this.allVehicleTypes = vehicles, 1500);

    }, err => {
      alert("Error: " + err.message);
    });

  }

  // Modal - upload image func + convertion to base64 - string
  public modalImageChange(event: any): void {

    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {

      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {

        this.newVehicleType.VehicleImage = reader.result.toString()
        this.imageUrl = reader.result.toString()
      }
    }
  }

  // Table - edit image upload + convertion to base64 - string
  public editImageUpload(event: any): void {

    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {

      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {

        this.editImage = reader.result.toString()
      }
    }
  }

  // Add new vehicle type method
  public postNewVehicleType(): void {

    this.newVehicleType.Manufacturer.trim()
    this.newVehicleType.Model.trim()
    this.newVehicleType.ModelYear
    this.newVehicleType.Gear.trim()
    this.newVehicleType.Class
    this.newVehicleType.DayCost
    this.newVehicleType.LateDayCost
    this.newVehicleType.VehicleImage

    this.vehicleService.postVehicleType(this.newVehicleType).subscribe(vehicleReturn => {

      if (vehicleReturn) {

        this.GetAllVehiclesType();
        this.toastSrv.success('Vehicle Added Successfuly!');
      }
    });
  }

  // Edit input function
  public edit(id: any): void {

    if (id != '') {
      this.editVehicle = id;
    }
    else {
      this.editVehicle = '';
    }
  }

  // Connect from html to TS , 'string' value = html (#example)
  @ViewChild('vehicleManu', { static: false }) vehicleManu: ElementRef;
  @ViewChild('vehicleModel', { static: false }) vehicleModel: ElementRef;
  @ViewChild('vehicleYear', { static: false }) vehicleYear: ElementRef;
  @ViewChild('vehicleGear', { static: false }) vehicleGear: ElementRef;
  @ViewChild('vehicleClass', { static: false }) vehicleClass: ElementRef;
  @ViewChild('vehicleDayCost', { static: false }) vehicleDayCost: ElementRef;
  @ViewChild('vehicleLateDayCost', { static: false }) vehicleLateDayCost: ElementRef;
  @ViewChild('vehicleImage', { static: false }) vehicleImage: ElementRef;

  // Update vehicle type method
  public updateVehicle(id: number): void {

    var vehicle = {

      VehicleTypeID: id,
      Manufacturer: this.vehicleManu.nativeElement.value.trim(),
      Model: this.vehicleModel.nativeElement.value.trim(),
      ModelYear: this.vehicleYear.nativeElement.value.trim(),
      Gear: this.vehicleGear.nativeElement.value.trim(),
      Class: this.vehicleClass.nativeElement.value.trim(),
      DayCost: this.vehicleDayCost.nativeElement.value.trim(),
      LateDayCost: this.vehicleLateDayCost.nativeElement.value.trim(),
      VehicleImage: this.editImage

    }

    if (this.editImage == null || this.editImage == "") {
      var oldVehicle = this.allVehicleTypes.find(v => v.VehicleTypeID == vehicle.VehicleTypeID);
      vehicle.VehicleImage = oldVehicle.VehicleImage;
    }

    // Disable space in input
    vehicle.Manufacturer = vehicle.Manufacturer.replace(/ +/g, "");
    vehicle.Model = vehicle.Model.replace(/ +/g, "");
    vehicle.ModelYear = vehicle.ModelYear.replace(/ +/g, "");
    vehicle.Gear = vehicle.Gear.replace(/ +/g, "");
    vehicle.Class = vehicle.Class.replace(/ +/g, "");
    vehicle.DayCost = vehicle.DayCost.replace(/ +/g, "");
    vehicle.LateDayCost = vehicle.LateDayCost.replace(/ +/g, "");

    // Calling edit function from service
    this.vehicleService.editVehicleType(vehicle).subscribe(updatedVehicle => {

      if (updatedVehicle) {

        for (let i = 0; i < this.allVehicleTypes.length; i++) {

          if (this.allVehicleTypes[i].VehicleTypeID == updatedVehicle.VehicleTypeID) {
            this.allVehicleTypes[i].Manufacturer = updatedVehicle.Manufacturer;
            this.allVehicleTypes[i].Model = updatedVehicle.Model;
            this.allVehicleTypes[i].ModelYear = updatedVehicle.ModelYear;
            this.allVehicleTypes[i].Gear = updatedVehicle.Gear;
            this.allVehicleTypes[i].Class = updatedVehicle.Class;
            this.allVehicleTypes[i].DayCost = updatedVehicle.DayCost;
            this.allVehicleTypes[i].LateDayCost = updatedVehicle.LateDayCost;
            this.allVehicleTypes[i].VehicleImage = updatedVehicle.VehicleImage;
          }
        }

        this.toastSrv.success('Vehicle Updated Successfuly!');
        this.edit('');

      }
    });
  }

  // Delete vehicle type from db + table
  public delVehicleTypeFunc(id: number): void {

    for (let i = 0; i < this.allVehicleTypes.length; i++) {

      if (id == this.allVehicleTypes[i].VehicleTypeID) {


        this.vehicleService.delVehicleTypeByID(id).subscribe(deletedVehicle => {

          this.GetAllVehiclesType();
          this.toastSrv.success('Vehicle Type Deleted Successfuly!');
        });
      }
    }
  }

  // ---------- End VehicleType Panel ---------- \\

  // -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------\\

  // ---------- Vehicle Area Panel ---------- \\

  // Get all vehicle areas - array
  public GetAllVehicleArea(): void {

    this.vehicleAreaService.getAllVehicleAreaAsync().subscribe(vehicleArea => {

      setTimeout(() => this.allVehicleArea = vehicleArea, 1500);



    }, err => {
      alert("Error: " + err.message);

    });
  }

  public modalVehicleAreaImageChange(event: any): void {

    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {

      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {

        this.newVehicleArea.VehicleAreaImage = reader.result.toString()
        this.imageUrl = reader.result.toString()
      }
    }
  }

  // Show Vehicle Type Details at Vehicle Area Table
  public modalDetails(event): void {

    var id = event

    this.currentVehicle = this.allVehicleTypes.filter(v => v.VehicleTypeID == id);
    this.imageUrl = this.currentVehicle[0].VehicleImage

  }

  // Add new vehicle area type method
  public postNewVehicleArea(): void {

    this.newVehicleArea.VehicleAreaID;
    this.newVehicleArea.VehicleTypeID;
    this.newVehicleArea.CurrentKMPH;
    this.newVehicleArea.IsAvailable;
    this.newVehicleArea.IsProper;
    this.newVehicleArea.LicenseNum;
    this.newVehicleArea.VehicleAreaImage;
    this.newVehicleArea.BranchID;

    this.vehicleAreaService.postNewVehicleAreaAsync(this.newVehicleArea).subscribe(vehicleAreaReturn => {

      if (vehicleAreaReturn) {

        this.GetAllVehicleArea();
        this.toastSrv.success('Vehicle Area Added Successfuly!');
      }
    });
  }

  // Edit input function
  public editVArea(id: any): void {

    if (id != '') {
      this.editVehicleArea = id;
    }
    else {
      this.editVehicleArea = '';
    }
  }

  // Connect from html to TS , 'string' value = html (#example)
  @ViewChild('editvehicleTypeID', { static: false }) editvehicleTypeID: ElementRef;
  @ViewChild('editcurrentKMPH', { static: false }) editcurrentKMPH: ElementRef;
  @ViewChild('editisAvailable', { static: false }) editisAvailable: ElementRef;
  @ViewChild('editisProper', { static: false }) editisProper: ElementRef;
  @ViewChild('editlicenseNum', { static: false }) editlicenseNum: ElementRef;
  @ViewChild('editbranchID', { static: false }) editbranchID: ElementRef;

  // Edit vehicle area
  public updateVehicleArea(id: number): void {

    var vehicleArea = {

      VehicleAreaID: id,
      VehicleTypeID: this.editvehicleTypeID.nativeElement.value.trim(),
      CurrentKMPH: this.editcurrentKMPH.nativeElement.value.trim(),
      IsAvailable: this.editisAvailable.nativeElement.value.trim(),
      IsProper: this.editisProper.nativeElement.value.trim(),
      LicenseNum: this.editlicenseNum.nativeElement.value.trim(),
      BranchID: this.editbranchID.nativeElement.value.trim(),
      VehicleAreaImage: this.editImage
    }

    if (this.editImage == null || this.editImage == "") {
      var oldVehicleArea = this.allVehicleArea.find(v => v.VehicleAreaID == vehicleArea.VehicleAreaID);
      vehicleArea.VehicleAreaImage = oldVehicleArea.VehicleAreaImage;
    }
    // Disable space in input
    vehicleArea.VehicleTypeID = vehicleArea.VehicleTypeID.replace(/ +/g, "");
    vehicleArea.CurrentKMPH = vehicleArea.CurrentKMPH.replace(/ +/g, "");
    vehicleArea.IsAvailable = vehicleArea.IsAvailable.replace(/ +/g, "");
    vehicleArea.IsProper = vehicleArea.IsProper.replace(/ +/g, "");
    vehicleArea.LicenseNum = vehicleArea.LicenseNum.replace(/ +/g, "");
    vehicleArea.BranchID = vehicleArea.BranchID.replace(/ +/g, "");

    // Calling edit function from service
    this.vehicleAreaService.editVehicleAreaAsync(vehicleArea).subscribe(updatedVehicleArea => {

      if (updatedVehicleArea) {

        for (let i = 0; i < this.allVehicleArea.length; i++) {

          if (this.allVehicleArea[i].VehicleAreaID == updatedVehicleArea.VehicleAreaID) {

            this.allVehicleArea[i].VehicleTypeID = updatedVehicleArea.VehicleTypeID;
            this.allVehicleArea[i].CurrentKMPH = updatedVehicleArea.CurrentKMPH;
            this.allVehicleArea[i].IsAvailable = updatedVehicleArea.IsAvailable;
            this.allVehicleArea[i].IsProper = updatedVehicleArea.IsProper;
            this.allVehicleArea[i].LicenseNum = updatedVehicleArea.LicenseNum;
            this.allVehicleArea[i].BranchID = updatedVehicleArea.BranchID;
            this.allVehicleArea[i].VehicleAreaImage = updatedVehicleArea.VehicleAreaImage;
          }
        }

        this.toastSrv.success('Vehicle Updated Successfuly!');
        this.editVArea('');
      }
    });
  }

  // Delete vehicle type from db + table
  public delVehicleAreaFunc(id: number): void {

    for (let i = 0; i < this.allVehicleArea.length; i++) {

      if (id == this.allVehicleArea[i].VehicleAreaID) {

        this.vehicleAreaService.delVehicleAreaByID(id).subscribe(deletedVehicleArea => {

          this.GetAllVehicleArea();
          this.toastSrv.success('Vehicle Area Deleted Successfuly!');
        });

      }
    }
  }

  // ---------- End Vehicle Area Panel ---------- \\

  // -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------\\

  // ---------- Vehicle Rent Area Panel ---------- \\

  // Get all vehicle rent area
  public GetAllVehicleRentArea(): void {

    this.vehicleRentAreaService.getAllVehicleRentAreaAsync().subscribe(vehicleRentArea => {

      setTimeout(() => this.allVehicleRentArea = vehicleRentArea, 1500);

    }, err => {
      alert("Error: " + err.message);

    });
  }

  // Add new vehicle rent area type method
  public postNewVehicleRentArea(): void {

    this.newVehicleRentArea.UserID;
    this.newVehicleRentArea.RentDate;
    this.newVehicleRentArea.ReturnDate;
    this.newVehicleRentArea.ActualReturnDate;
    this.newVehicleRentArea.VehicleAreaID;

    this.vehicleRentAreaService.postNewVehicleRentAreaAsync(this.newVehicleRentArea).subscribe(vehicleRentAreaReturn => {

      if (vehicleRentAreaReturn) {

        this.GetAllVehicleRentArea();
        this.toastSrv.success('Vehicle Rent Area Added Successfuly!');
      }
    });
  }

  // Edit input function
  public editVRentArea(id: any): void {

    if (id != '') {
      this.editVehicleRentArea = id;
    }
    else {
      this.editVehicleRentArea = '';
    }
  }

  // Connect from html to TS , 'string' value = html (#example)
  @ViewChild('userID', { static: false }) userID: ElementRef;
  @ViewChild('rentDate', { static: false }) rentDate: ElementRef;
  @ViewChild('returnDate', { static: false }) returnDate: ElementRef;
  @ViewChild('actualReturnDate', { static: false }) actualReturnDate: ElementRef;
  @ViewChild('vehicleAreaID', { static: false }) vehicleAreaID: ElementRef;

  // Edit vehicle rent area
  public updateVehicleRentArea(id: number): void {

    var vehicleRentArea = {

      VehicleRentAreaID: id,
      UserID: this.userID.nativeElement.value.trim(),
      RentDate: this.rentDate.nativeElement.value.trim(),
      ReturnDate: this.returnDate.nativeElement.value.trim(),
      ActualReturnDate: this.actualReturnDate.nativeElement.value.trim(),
      VehicleAreaID: this.vehicleAreaID.nativeElement.value.trim(),
    }

    if (vehicleRentArea.RentDate == null || vehicleRentArea.RentDate == "") {
      var oldRentArea = this.allVehicleRentArea.find(v => v.VehicleRentAreaID == vehicleRentArea.VehicleRentAreaID);
      vehicleRentArea.RentDate = oldRentArea.RentDate;
    }

    if (vehicleRentArea.ReturnDate == null || vehicleRentArea.ReturnDate == "") {
      var oldRentArea = this.allVehicleRentArea.find(v => v.VehicleRentAreaID == vehicleRentArea.VehicleRentAreaID);
      vehicleRentArea.ReturnDate = oldRentArea.ReturnDate;
    }

    if (vehicleRentArea.ActualReturnDate == null || vehicleRentArea.ActualReturnDate == "") {
      var oldRentArea = this.allVehicleRentArea.find(v => v.VehicleRentAreaID == vehicleRentArea.VehicleRentAreaID);
      vehicleRentArea.ActualReturnDate = oldRentArea.ActualReturnDate;
    }

    // Disable space in input
    vehicleRentArea.UserID = vehicleRentArea.UserID.replace(/ +/g, "");
    vehicleRentArea.RentDate = vehicleRentArea.RentDate.replace(/ +/g, "");
    vehicleRentArea.ReturnDate = vehicleRentArea.ReturnDate.replace(/ +/g, "");
    vehicleRentArea.ActualReturnDate = vehicleRentArea.ActualReturnDate.replace(/ +/g, "");
    vehicleRentArea.VehicleAreaID = vehicleRentArea.VehicleAreaID.replace(/ +/g, "");

    // Calling edit function from service
    this.vehicleRentAreaService.editVehicleRentAreaAsync(vehicleRentArea).subscribe(updatedVehicleRentArea => {

      if (updatedVehicleRentArea) {

        for (let i = 0; i < this.allVehicleRentArea.length; i++) {

          if (this.allVehicleRentArea[i].VehicleRentAreaID == updatedVehicleRentArea.VehicleRentAreaID) {

            this.allVehicleRentArea[i].UserID = updatedVehicleRentArea.UserID;
            this.allVehicleRentArea[i].RentDate = updatedVehicleRentArea.RentDate;
            this.allVehicleRentArea[i].ReturnDate = updatedVehicleRentArea.ReturnDate;
            this.allVehicleRentArea[i].ActualReturnDate = updatedVehicleRentArea.ActualReturnDate;
            this.allVehicleRentArea[i].VehicleAreaID = updatedVehicleRentArea.VehicleAreaID;
          }
        }

        this.toastSrv.success('Vehicle Rent Area Updated Successfuly!');
        this.editVRentArea('');
        this.GetAllVehicleRentArea();
      }
    });
  }

  // Delete vehicle type from db + table
  public delVehicleRentAreaFunc(id: number): void {

    for (let i = 0; i < this.allVehicleRentArea.length; i++) {

      if (id == this.allVehicleRentArea[i].VehicleRentAreaID) {

        this.vehicleRentAreaService.delVehicleRentAreaByID(id).subscribe(deletedVehicleRentArea => {

          this.GetAllVehicleRentArea();
          this.toastSrv.success('Vehicle Area Deleted Successfuly!');
        });

      }
    }
  }

  // ---------- End Vehicle Rent Area Panel ---------- \\

  // -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------\\

  // ---------- Branch Panel ---------- \\

  // Get all branches
  public GetAllBranches(): void {

    this.branchService.getAllBranchesAsync().subscribe(branch => {

      this.allBranches = branch;

    }, err => {
      alert("Error: " + err.message);

    });
  }

  public PostNewBranch(): void {

    this.newBranch.Address;
    this.newBranch.Latitude;
    this.newBranch.Longtitude;
    this.newBranch.BranchName;

    this.branchService.postNewBranchAsync(this.newBranch).subscribe(branchReturned => {

      if (branchReturned) {

        this.GetAllBranches();
        this.toastSrv.success('Branch Added Successfuly!');
      }
    });
  }

  // Edit input function
  public editBranchFunc(id: any): void {

    if (id != '') {
      this.editBranch = id;
    }
    else {
      this.editBranch = '';
    }
  }

  // Connect from html to TS , 'string' value = html (#example)
  @ViewChild('address', { static: false }) address: ElementRef;
  @ViewChild('latitude', { static: false }) latitude: ElementRef;
  @ViewChild('longtitude', { static: false }) longtitude: ElementRef;
  @ViewChild('branchName', { static: false }) branchName: ElementRef;

  // Edit/Update branch
  public UpdateBranch(id: number): void {

    var branch = {

      BranchID: id,
      Address: this.address.nativeElement.value.trim(),
      Latitude: this.latitude.nativeElement.value.trim(),
      Longtitude: this.longtitude.nativeElement.value.trim(),
      BranchName: this.branchName.nativeElement.value.trim()
    }

    // Disable space in input
    branch.Address = branch.Address.replace(/ +/g, "");
    branch.Latitude = branch.Latitude.replace(/ +/g, "");
    branch.Longtitude = branch.Longtitude.replace(/ +/g, "");
    branch.BranchName = branch.BranchName.replace(/ +/g, "");

    // Calling edit function from service
    this.branchService.editBranchAsync(branch).subscribe(updatedBranch => {

      if (updatedBranch) {

        for (let i = 0; i < this.allBranches.length; i++) {

          if (this.allBranches[i].BranchID == updatedBranch.BranchID) {

            this.allBranches[i].Address = updatedBranch.Address;
            this.allBranches[i].Latitude = updatedBranch.Latitude;
            this.allBranches[i].Longtitude = updatedBranch.Longtitude;
            this.allBranches[i].BranchName = updatedBranch.BranchName;
          }
        }

        this.toastSrv.success('Branch Updated Successfuly!');
        this.editBranchFunc('');
        this.GetAllBranches();
      }
    });
  }

  // Delete branch from db + table
  public DeleteBranchFunc(id: number): void {

    for (let i = 0; i < this.allBranches.length; i++) {

      if (this.allBranches[i].BranchID == id) {

        this.branchService.delBranchByIDAsync(id).subscribe(deletedBranch => {

          this.GetAllBranches();
          this.toastSrv.success('Branch Deleted Successfuly!');
        });
      }
    }
  }

  // ---------- End Branch Panel ---------- \\

  // ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- \\

  // ---------- User Panel ---------- \\

  // Get all users
  public GetAllUsers(): void {

    this.userService.getAllUsersAsync().subscribe(user => {

      setTimeout(() => this.allUsers = user, 1500);

    }, err => {
      alert("Error: " + err.message);

    });
  }

  // Post new user
  public PostNewUser(): void {

    this.newUser.FullName;
    this.newUser.ID;
    this.newUser.UserName;
    this.newUser.BirthDate;
    this.newUser.Gender;
    this.newUser.Email;
    this.newUser.Password;
    this.newUser.ValidPassword;
    this.newUser.UserImage;

    this.userService.postNewUserAsync(this.newUser).subscribe(userReturned => {

      if (userReturned) {

        this.GetAllUsers();
        this.toastSrv.success('User Added Successfuly!');
      }
    });
  }

  // Modal - upload image func + convertion to base64 - string + adding image to db
  public modalUserImageChange(event): void {

    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {

      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {

        this.newUser.UserImage = reader.result.toString()
        this.imageUrl = reader.result.toString()
      }
    }
  }

  // Edit input function
  public editUserFunc(id: any): void {

    if (id != '') {
      this.editUser = id;
    }
    else {
      this.editUser = '';
    }
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

  // Update user method
  public updateUser(recievedID: number): void {

    var user = {

      UserID: recievedID,
      FullName: this.fullName.nativeElement.value.trim(),
      ID: this.id.nativeElement.value.trim(),
      UserName: this.userName.nativeElement.value.trim(),
      BirthDate: this.birthDate.nativeElement.value.trim(),
      Gender: this.gender.nativeElement.value.trim(),
      Email: this.email.nativeElement.value.trim(),
      Password: this.password.nativeElement.value.trim(),
      ValidPassword: this.validPassword.nativeElement.value.trim(),
      UserImage: this.editImage
    }

    if (this.editImage == null || this.editImage == "") {
      var oldUser = this.allUsers.find(v => v.UserID == user.UserID);
      user.UserImage = oldUser.UserImage;
    }
    if (user.BirthDate == null || user.BirthDate == "") {
      var oldUser = this.allUsers.find(v => v.UserID == user.UserID);
      user.BirthDate = oldUser.BirthDate;
    }
    if (user.Gender == null || user.Gender == "") {
      var oldUser = this.allUsers.find(v => v.UserID == user.UserID);
      user.Gender = oldUser.Gender;
    }

    // Disable space in input
    user.FullName = user.FullName.replace(/ +/g, "");
    user.ID = user.ID.replace(/ +/g, "");
    user.UserName = user.UserName.replace(/ +/g, "");
    user.BirthDate = user.BirthDate.replace(/ +/g, "");
    user.Gender = user.Gender.replace(/ +/g, "");
    user.Email = user.Email.replace(/ +/g, "");
    user.Password = user.Password.replace(/ +/g, "");
    user.ValidPassword = user.ValidPassword.replace(/ +/g, "");

    // Calling edit function from service
    this.userService.editUserAsync(user).subscribe(updatedUser => {

      if (updatedUser) {

        for (let i = 0; i < this.allUsers.length; i++) {

          if (this.allUsers[i].UserID == updatedUser.UserID) {
            this.allUsers[i].FullName = updatedUser.FullName;
            this.allUsers[i].ID = updatedUser.ID;
            this.allUsers[i].UserName = updatedUser.UserName;
            this.allUsers[i].BirthDate = updatedUser.BirthDate;
            this.allUsers[i].Gender = updatedUser.Gender;
            this.allUsers[i].Email = updatedUser.Email;
            this.allUsers[i].Password = updatedUser.Password;
            this.allUsers[i].ValidPassword = updatedUser.ValidPassword;
            this.allUsers[i].UserImage = updatedUser.UserImage;
          }
        }

        this.toastSrv.success('User Updated Successfuly!');
        this.editUserFunc('');
        this.GetAllUsers();
      }
    });
  }

  // Delete user from db + table
  public DeleteUserFunc(id: number): void {

    for (let i = 0; i < this.allUsers.length; i++) {

      if (this.allUsers[i].UserID == id) {

        this.userService.delUserByIDAsync(id).subscribe(deletedUser => {

          this.GetAllUsers();
          this.toastSrv.success('User Deleted Successfuly!');
        });
      }
    }
  }

  // ---------- End User Panel ---------- \\

  // ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- \\

  // ---------- Employee Panel ---------- \\

  // Get all employees
  public GetAllEmployees(): void {

    this.employeeService.getAllEmployeesAsync().subscribe(employee => {

      setTimeout(() => this.allEmployees = employee, 1500);

    }, err => {
      alert("Error: " + err.message);

    });
  }

  // Post new employee
  public PostNewEmployee(): void {

    this.newEmployee.EmployeeFullName;
    this.newEmployee.PrivateEmployeeID;
    this.newEmployee.EmployeeUserName;
    this.newEmployee.EmployeeBirthDate;
    this.newEmployee.EmployeeGender;
    this.newEmployee.EmployeeEmail;
    this.newEmployee.EmployeePassword;
    this.newEmployee.EmployeeValidPassword;
    this.newEmployee.EmployeeImage;

    this.employeeService.postNewEmployeeAsync(this.newEmployee).subscribe(employeeReturned => {

      if (employeeReturned) {

        this.GetAllEmployees();
        this.toastSrv.success('Employee Added Successfuly!');
      }
    });
  }

  // Modal - upload image func + convertion to base64 - string + adding image to db
  public modalEmployeeImageChange(event: any): void {

    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {

      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {

        this.newEmployee.EmployeeImage = reader.result.toString()
        this.imageUrl = reader.result.toString()
      }
    }
  }

  // Edit input function
  public editEmployeeFunc(id: any): void {

    if (id != '') {
      this.editEmployee = id;
    }
    else {
      this.editEmployee = '';
    }
  }

  // Connect from html to TS , 'string' value = html (#example)
  @ViewChild('employeeFullName', { static: false }) employeeFullName: ElementRef;
  @ViewChild('privateEmployeeID', { static: false }) privateEmployeeID: ElementRef;
  @ViewChild('employeeUserName', { static: false }) employeeUserName: ElementRef;
  @ViewChild('employeeBirthDate', { static: false }) employeeBirthDate: ElementRef;
  @ViewChild('employeeGender', { static: false }) employeeGender: ElementRef;
  @ViewChild('employeeEmail', { static: false }) employeeEmail: ElementRef;
  @ViewChild('employeePassword', { static: false }) employeePassword: ElementRef;
  @ViewChild('employeeValidPassword', { static: false }) employeeValidPassword: ElementRef;
  @ViewChild('employeeImage', { static: false }) employeeImage: ElementRef;

  // Update employee method
  public updateEmployee(recievedID: number): void {

    var employee = {

      EmployeeID: recievedID,
      EmployeeFullName: this.employeeFullName.nativeElement.value.trim(),
      PrivateEmployeeID: this.privateEmployeeID.nativeElement.value.trim(),
      EmployeeUserName: this.employeeUserName.nativeElement.value.trim(),
      EmployeeBirthDate: this.employeeBirthDate.nativeElement.value.trim(),
      EmployeeGender: this.employeeGender.nativeElement.value.trim(),
      EmployeeEmail: this.employeeEmail.nativeElement.value.trim(),
      EmployeePassword: this.employeePassword.nativeElement.value.trim(),
      EmployeeValidPassword: this.employeeValidPassword.nativeElement.value.trim(),
      EmployeeImage: this.editImage
    }

    if (this.editImage == null || this.editImage == "") {
      var oldEmployee = this.allEmployees.find(v => v.EmployeeID == employee.EmployeeID);
      employee.EmployeeImage = oldEmployee.EmployeeImage;
    }
    if (employee.EmployeeBirthDate == null || employee.EmployeeBirthDate == "") {
      var oldEmployee = this.allEmployees.find(v => v.EmployeeID == employee.EmployeeID);
      employee.EmployeeBirthDate = oldEmployee.EmployeeBirthDate;
    }
    if (employee.EmployeeGender == null || employee.EmployeeGender == "") {
      var oldEmployee = this.allEmployees.find(v => v.EmployeeID == employee.EmployeeID);
      employee.EmployeeGender = oldEmployee.EmployeeGender;
    }

    // Disable space in input
    employee.EmployeeFullName = employee.EmployeeFullName.replace(/ +/g, "");
    employee.PrivateEmployeeID = employee.PrivateEmployeeID.replace(/ +/g, "");
    employee.EmployeeUserName = employee.EmployeeUserName.replace(/ +/g, "");
    employee.EmployeeBirthDate = employee.EmployeeBirthDate.replace(/ +/g, "");
    employee.EmployeeGender = employee.EmployeeGender.replace(/ +/g, "");
    employee.EmployeeEmail = employee.EmployeeEmail.replace(/ +/g, "");
    employee.EmployeePassword = employee.EmployeePassword.replace(/ +/g, "");
    employee.EmployeeValidPassword = employee.EmployeeValidPassword.replace(/ +/g, "");

    // Calling edit function from service
    this.employeeService.editEmployeeAsync(employee).subscribe(updatedEmployee => {

      if (updatedEmployee) {

        for (let i = 0; i < this.allEmployees.length; i++) {

          if (this.allEmployees[i].EmployeeID == updatedEmployee.EmployeeID) {
            this.allEmployees[i].EmployeeFullName = updatedEmployee.EmployeeFullName;
            this.allEmployees[i].PrivateEmployeeID = updatedEmployee.PrivateEmployeeID;
            this.allEmployees[i].EmployeeUserName = updatedEmployee.EmployeeUserName;
            this.allEmployees[i].EmployeeBirthDate = updatedEmployee.EmployeeBirthDate;
            this.allEmployees[i].EmployeeGender = updatedEmployee.EmployeeGender;
            this.allEmployees[i].EmployeeEmail = updatedEmployee.EmployeeEmail;
            this.allEmployees[i].EmployeePassword = updatedEmployee.EmployeePassword;
            this.allEmployees[i].EmployeeValidPassword = updatedEmployee.EmployeeValidPassword;
            this.allEmployees[i].EmployeeImage = updatedEmployee.EmployeeImage;
          }
        }

        this.toastSrv.success('Employee Updated Successfuly!');
        this.editEmployeeFunc('');
        this.GetAllEmployees();
      }
    });
  }


  // Delete employee from db + table
  public DeleteEmployeeFunc(id: number): void {

    for (let i = 0; i < this.allEmployees.length; i++) {

      if (this.allEmployees[i].EmployeeID == id) {

        this.employeeService.delEmployeeByIDAsync(id).subscribe(deletedEmployee => {

          this.GetAllEmployees();
          this.toastSrv.success('Employee Deleted Successfuly!');
        });
      }
    }
  }

  // ---------- End Employee Panel ---------- \\

  // ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- \\

  // ---------- Admin Panel ---------- \\

  // Get all admins
  public GetAllAdmins(): void {

    this.adminService.getAllAdminsAsync().subscribe(admin => {

      setTimeout(() => this.allAdmins = admin, 1500);

    }, err => {
      alert("Error: " + err.message);

    });
  }

  // Post new admin
  public PostNewAdmin(): void {

    this.newAdmin.AdminFullName.trim();
    this.newAdmin.PrivateAdminID;
    this.newAdmin.AdminUserName.trim();
    this.newAdmin.AdminBirthDate;
    this.newAdmin.AdminGender.trim();
    this.newAdmin.AdminEmail.trim();
    this.newAdmin.AdminPassword.trim();
    this.newAdmin.AdminValidPassword.trim();
    this.newAdmin.AdminImage;
    this.newAdmin.AdminAuthorization = 'admin';

    this.adminService.postNewAdminAsync(this.newAdmin).subscribe(adminReturned => {

      if (adminReturned) {

        this.GetAllAdmins();
        this.toastSrv.success('Admin Added Successfuly!');
      }
    });
  }

  // Modal - upload image func + convertion to base64 - string + adding image to db
  public modalAdminImageChange(event: any): void {

    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {

      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {

        this.newAdmin.AdminImage = reader.result.toString()
        this.imageUrl = reader.result.toString()
      }
    }
  }

  // Edit input function
  public editAdminFunc(id: any): void {

    if (id != '') {
      this.editAdmin = id;
    }
    else {
      this.editAdmin = '';
    }
  }

  // Connect from html to TS , 'string' value = html (#example)
  @ViewChild('adminFullName', { static: false }) adminFullName: ElementRef;
  @ViewChild('privateAdminID', { static: false }) privateAdminID: ElementRef;
  @ViewChild('adminUserName', { static: false }) adminUserName: ElementRef;
  @ViewChild('adminBirthDate', { static: false }) adminBirthDate: ElementRef;
  @ViewChild('adminGender', { static: false }) adminGender: ElementRef;
  @ViewChild('adminEmail', { static: false }) adminEmail: ElementRef;
  @ViewChild('adminPassword', { static: false }) adminPassword: ElementRef;
  @ViewChild('adminValidPassword', { static: false }) adminValidPassword: ElementRef;
  @ViewChild('adminImage', { static: false }) adminImage: ElementRef;

  // Update admin method
  public updateAdmin(recievedID: number): void {

    var admin = {

      AdminID: recievedID,
      AdminFullName: this.adminFullName.nativeElement.value.trim(),
      PrivateAdminID: this.privateAdminID.nativeElement.value.trim(),
      AdminUserName: this.adminUserName.nativeElement.value.trim(),
      AdminBirthDate: this.adminBirthDate.nativeElement.value.trim(),
      AdminGender: this.adminGender.nativeElement.value.trim(),
      AdminEmail: this.adminEmail.nativeElement.value.trim(),
      AdminPassword: this.adminPassword.nativeElement.value.trim(),
      AdminValidPassword: this.adminValidPassword.nativeElement.value.trim(),
      AdminImage: this.editImage
    }

    if (this.editImage == null || this.editImage == "") {
      var oldadmin = this.allAdmins.find(v => v.AdminID == admin.AdminID);
      admin.AdminImage = oldadmin.AdminImage;
    }
    if (admin.AdminBirthDate == null || admin.AdminBirthDate == "") {
      var oldadmin = this.allAdmins.find(v => v.AdminID == admin.AdminID);
      admin.AdminBirthDate = oldadmin.AdminBirthDate;
    }
    if (admin.AdminGender == null || admin.AdminGender == "") {
      var oldadmin = this.allAdmins.find(v => v.AdminID == admin.AdminID);
      admin.AdminGender = oldadmin.AdminGender;
    }

    // Disable space in input
    admin.AdminFullName = admin.AdminFullName.replace(/ +/g, "");
    admin.PrivateAdminID = admin.PrivateAdminID.replace(/ +/g, "");
    admin.AdminUserName = admin.AdminUserName.replace(/ +/g, "");
    admin.AdminBirthDate = admin.AdminBirthDate.replace(/ +/g, "");
    admin.AdminGender = admin.AdminGender.replace(/ +/g, "");
    admin.AdminEmail = admin.AdminEmail.replace(/ +/g, "");
    admin.AdminPassword = admin.AdminPassword.replace(/ +/g, "");
    admin.AdminValidPassword = admin.AdminValidPassword.replace(/ +/g, "");

    // Calling edit function from service
    this.adminService.editAdminAsync(admin).subscribe(updatedAdmin => {

      if (updatedAdmin) {

        for (let i = 0; i < this.allAdmins.length; i++) {

          if (this.allAdmins[i].AdminID == updatedAdmin.AdminID) {
            this.allAdmins[i].AdminFullName = updatedAdmin.AdminFullName;
            this.allAdmins[i].PrivateAdminID = updatedAdmin.PrivateAdminID;
            this.allAdmins[i].AdminUserName = updatedAdmin.AdminUserName;
            this.allAdmins[i].AdminBirthDate = updatedAdmin.AdminBirthDate;
            this.allAdmins[i].AdminGender = updatedAdmin.AdminGender;
            this.allAdmins[i].AdminEmail = updatedAdmin.AdminEmail;
            this.allAdmins[i].AdminPassword = updatedAdmin.AdminPassword;
            this.allAdmins[i].AdminValidPassword = updatedAdmin.AdminValidPassword;
            this.allAdmins[i].AdminImage = updatedAdmin.AdminImage;
          }
        }

        this.toastSrv.success('Admin Updated Successfuly!');
        this.editAdminFunc('');
        this.GetAllAdmins();
      }
    });
  }

  // Delete admin from db + table
  public DeleteAdminFunc(id: number): void {

    for (let i = 0; i < this.allAdmins.length; i++) {

      if (this.allAdmins[i].AdminID == id) {

        this.adminService.delAdminByIDAsync(id).subscribe(deletedAdmin => {

          this.GetAllAdmins();
          this.toastSrv.success('Admin Deleted Successfuly!');
        });
      }
    }
  }

  // ---------- End Admin Panel ---------- \\
}


