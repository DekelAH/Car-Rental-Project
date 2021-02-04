import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { VehicleRentAreaService } from 'src/app/Services/vehicle-rent-area.service';
import { VehicleRentArea } from 'src/app/Models/vehicleRentArea.model';
import { ToastrService } from 'ngx-toastr';
import { VehicleArea } from 'src/app/Models/vehicleArea.model';
import { VehicleAreaService } from 'src/app/Services/vehicle-area.service';
import { VehicleService } from 'src/app/Services/vehicle.service';
import { Vehicle } from 'src/app/Models/vehicle.model';
import { Router } from '@angular/router';

@Component({

  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})

export class EmployeeComponent implements OnInit {

  public allRents: any[]; // all vehicle rent area array
  public newRent = new VehicleRentArea(); // new rent that created by the user
  public editRent: string = "";
  public currentVehicleArea: VehicleArea[]; // created for details button to get vehicle area info
  public allVehicleTypes: Vehicle[];
  public allVehicleArea: VehicleArea[];
  public imageUrl: any;
  public rentSum: any; // sum of all rent process
  public showReceipt: Boolean = false // trigger to show receipt

  constructor(private route: Router, private vehicleRentAreaService: VehicleRentAreaService, private toastSrv: ToastrService, private vehicleAreaService: VehicleAreaService, private vehicleService: VehicleService) { }

  ngOnInit() {

    this.GetAllVehiclesType();
    this.GetAllVehicleRentArea();
    this.GetAllVehicleAreaForEmployee();

    var authorization = sessionStorage.getItem('auth');
    if (authorization != 'employee') {
      this.route.navigate(['/home'])
    }
  }

  // Get all vehicle area for employee table use
  public GetAllVehicleAreaForEmployee(): void {

    this.vehicleAreaService.getAllVehicleAreaAsync().subscribe(vehicleAreaForEmployee => {

      this.allVehicleArea = vehicleAreaForEmployee;
      for (let i = 0; i < this.allVehicleArea.length; i++) {
        for (let j = 0; j < this.allRents.length; j++) {
          if (this.allVehicleArea[i].VehicleAreaID == this.allRents[j].VehicleAreaID) {
            this.allRents[j].IsAvailable = this.allVehicleArea[i].IsAvailable;
            this.allRents[j].LicenseNum = this.allVehicleArea[i].LicenseNum;
          }

        }

      }
    });
  }
  public GetAllVehiclesType(): void {

    this.vehicleService.getAllVehicleTypeAsync().subscribe(vehicles => {
      this.allVehicleTypes = vehicles

    });

  }

  // Get all vehicle rent area objects
  public GetAllVehicleRentArea(): void {

    this.vehicleRentAreaService.getAllVehicleRentAreaAsync().subscribe(vehicleRentArea => {

      this.allRents = vehicleRentArea

    });
  }

  // Show Vehicle area Details at Vehicle Rent Area Table
  public modalDetails(event: any) {

    var id = event

    this.currentVehicleArea = this.allVehicleArea.filter(v => v.VehicleAreaID == id);
    this.imageUrl = this.currentVehicleArea[0].VehicleAreaImage;

  }

  // Add new vehicle rent area type method
  public postNewVehicleRentArea(): void {

    this.newRent.UserID;
    this.newRent.RentDate;
    this.newRent.ReturnDate;
    this.newRent.ActualReturnDate;
    this.newRent.VehicleAreaID;

    this.vehicleRentAreaService.postNewVehicleRentAreaAsync(this.newRent).subscribe(vehicleRentAreaReturn => {

      if (vehicleRentAreaReturn) {

        this.GetAllVehicleRentArea();
        this.toastSrv.success('Vehicle Rent Area Added Successfuly!');
      }
    });
  }

  // Edit input function
  public editVRentArea(id: any): void {

    if (id != '') {
      this.editRent = id;
    }
    else {
      this.editRent = '';
    }
  }

  // Connect from html to TS , 'string' value = html (#example)
  @ViewChild('userID', { static: false }) userID: ElementRef;
  @ViewChild('rentDate', { static: false }) rentDate: ElementRef;
  @ViewChild('returnDate', { static: false }) returnDate: ElementRef;
  @ViewChild('actualReturnDate', { static: false }) actualReturnDate: ElementRef;
  @ViewChild('vehicleAreaID', { static: false }) vehicleAreaID: ElementRef;

  // Edit vehicle area
  public updateVehicleRentArea(id: number, IsAvailable: string): void {


    var vehicleRentArea = {

      VehicleRentAreaID: id,
      RentDate: this.rentDate.nativeElement.value.trim(),
      ReturnDate: this.returnDate.nativeElement.value.trim(),
      ActualReturnDate: this.actualReturnDate.nativeElement.value.trim(),
      VehicleAreaID: this.vehicleAreaID.nativeElement.value.trim(),
      UserID:0,
    }

    for (let i = 0; i < this.allRents.length; i++) {
    if(this.allRents[i].VehicleRentAreaID == vehicleRentArea.VehicleRentAreaID ) {
      vehicleRentArea.UserID = Number(this.allRents[i].UserID)
    }
      
    }

    if (vehicleRentArea.RentDate == null || vehicleRentArea.RentDate == "") {
      var oldVehicleRent = this.allRents.find(v => v.VehicleRentAreaID == vehicleRentArea.VehicleRentAreaID);
      vehicleRentArea.RentDate = oldVehicleRent.RentDate;
    }
    if (vehicleRentArea.ReturnDate == null || vehicleRentArea.ReturnDate == "") {
      var oldVehicleRent = this.allRents.find(v => v.VehicleRentAreaID == vehicleRentArea.VehicleRentAreaID);
      vehicleRentArea.ReturnDate = oldVehicleRent.ReturnDate;
    }
    if (vehicleRentArea.ActualReturnDate == null || vehicleRentArea.ActualReturnDate == "") {
      var oldVehicleRent = this.allRents.find(v => v.VehicleRentAreaID == vehicleRentArea.VehicleRentAreaID);
      vehicleRentArea.ActualReturnDate = oldVehicleRent.ActualReturnDate;
    }

    if (vehicleRentArea.ActualReturnDate) {

      var vehicleArea = this.allVehicleArea.find(v => v.VehicleAreaID == vehicleRentArea.VehicleAreaID)
      vehicleArea.IsAvailable = 'Yes'

      this.vehicleAreaService.editVehicleAreaAsync(vehicleArea).subscribe(vehicle => {

        this.GetAllVehicleRentArea();
        this.GetAllVehicleAreaForEmployee();
      })
    }



    // Calling edit function from service
    this.vehicleRentAreaService.editVehicleRentAreaAsync(vehicleRentArea).subscribe(updatedVehicleRentArea => {

      if (updatedVehicleRentArea) {

        this.toastSrv.success('Vehicle Rent Area Updated Successfuly!');
        this.editVRentArea('');
        this.GetAllVehicleRentArea();
        this.GetAllVehicleAreaForEmployee();
      }
    });
  }

  // shows sum of prices
  public printReceipt(id: any) {

    var tempVehicleArea = this.allVehicleArea.find(v => v.VehicleAreaID == id); // finds the vehicle area ID
    var tempVehicleType = this.allVehicleTypes.find(v => v.VehicleTypeID == tempVehicleArea.VehicleTypeID); // finds the vehicle area id that maches to vehicle area - vehicletypeid
    var tempVehicleRent = this.allRents.find(v => v.VehicleAreaID == tempVehicleArea.VehicleAreaID); // finds the vehicle area ID that maches to vehicle area id in all rents array

    var rentDate = new Date(tempVehicleRent.RentDate); // gets the rent date from rent and placing it into rentDate as new date
    var returnDate = new Date(tempVehicleRent.ReturnDate); // gets the return from rent date and placing it into returnDate as new date
    var actualReturnDate = new Date(tempVehicleRent.ActualReturnDate); // gets the actual return date from rent and placing it into actualreturndate

    // calcaulates the number of days between dates + 1 (the pick up day)
    var day = Math.floor((Date.UTC(returnDate.getFullYear(), returnDate.getMonth(), returnDate.getDate()) - Date.UTC(rentDate.getFullYear(), rentDate.getMonth(), rentDate.getDate())) / (1000 * 60 * 60 * 24));
    var totalDays = Number((day + 1));
    var price = totalDays * tempVehicleType.DayCost; // calculates the price

    // calcaulates the number of days between actualreturnday and return day + 1 (the return day)
    var lateDay = Math.floor((Date.UTC(actualReturnDate.getFullYear(), actualReturnDate.getMonth(), actualReturnDate.getDate()) - Date.UTC(returnDate.getFullYear(), returnDate.getMonth(), returnDate.getDate())) / (1000 * 60 * 60 * 24));
    var totalLateDays = Number((lateDay + 1));
    var latePrice = totalLateDays * tempVehicleType.LateDayCost // total late days * late day cost
    var totalPrice = price + latePrice; // total price

    // rentSum getting all the properties of the rent process to show the employee to user
    this.rentSum = {

      rentDate: tempVehicleRent.RentDate,
      returnDate: tempVehicleRent.ReturnDate,
      actualReturnDate: tempVehicleRent.ActualReturnDate,
      price: price,
      latePrice: latePrice,
      totalPrice: totalPrice,
    }

    this.showReceipt = true;
  }

  // for search input - filter the table according license number
  public filterCarByNum(ev: any): void {

    var LicenseNum = ev.target.value;
    if (LicenseNum != '') {
      this.allRents = this.allRents.filter(v => v.LicenseNum == LicenseNum);

    } else {

      this.GetAllVehicleRentArea();
      this.GetAllVehicleAreaForEmployee();
    }

  }

}
