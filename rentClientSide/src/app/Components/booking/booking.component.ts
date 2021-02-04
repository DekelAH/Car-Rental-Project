import { Component, OnInit, Input } from '@angular/core';
import { DataTransferService } from 'src/app/Services/data-transfer.service';
import { CarRentInfoService } from 'src/app/Services/car-rent-info.service';
import { VehicleRentArea } from 'src/app/Models/vehicleRentArea.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { VehicleRentAreaService } from 'src/app/Services/vehicle-rent-area.service';
import { CarAreaService } from 'src/app/Services/car-area.service';
import { VehicleAreaService } from 'src/app/Services/vehicle-area.service';

@Component({

  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})

export class BookingComponent implements OnInit {

  public receivedChosenLocation: any; // this property is used to implemet into him the data(location pick up) that received from home component
  public receivedChosenVehicleType: any; // this property is used to implemet into him the data(vehicle type) that received from vehicle component
  public recievedChosenVehicleArea: any; // this property is used to implemet into him the data(vehicle area) that received from vehicle component
  public totalPrice: number; // sum of all rates
  public totalDays: number; // sum of all days
  public temp: Date; // temp property for date
  public newRes = new VehicleRentArea(); // new reservation type of vehicle rent area
  public authorization: string; // authorization to check user access

  constructor(private data: DataTransferService, private carData: CarRentInfoService, private toastr: ToastrService, private route: Router,
    private rentService: VehicleRentAreaService, private carAreaData: CarAreaService, private vehicleAreaService: VehicleAreaService) { }

  ngOnInit() {

    // checking which type of user loged in to the website
    var authorization = sessionStorage.getItem('auth');
    if (authorization == 'admin') {
      this.authorization = 'admin';
    }

    if (authorization == 'employee') {
      this.authorization = 'employee';
    }

    if (authorization == 'user') {
      this.authorization = 'user';
    }

    // Subscribe to data transfer service from home component & vehicle component
    this.data.pickUpDataShare.subscribe(x => this.receivedChosenLocation = x);
    this.carData.carDataShare.subscribe(y => this.receivedChosenVehicleType = y);
    this.carAreaData.carAreaDataShare.subscribe(z => this.recievedChosenVehicleArea = z);
    this.Calculation();


  }

  // Calculate the number of days & days * daily cost
  public Calculation(): void {

    var dropOfDate = new Date(this.receivedChosenLocation.dropoffChosen);
    var pickUpDate = new Date(this.receivedChosenLocation.pickupChosen);

    var day = Math.floor((Date.UTC(dropOfDate.getFullYear(), dropOfDate.getMonth(), dropOfDate.getDate()) - Date.UTC(pickUpDate.getFullYear(), pickUpDate.getMonth(), pickUpDate.getDate())) / (1000 * 60 * 60 * 24));
    this.totalDays = Number((day + 1));
    this.totalPrice = this.totalDays * this.receivedChosenVehicleType.DayCost;
  }

  // Create a reservation and send it to db
  public ReservationCreator(): void {
    // Check if user is logged in

    if (this.authorization == 'admin' || this.authorization == 'employee' || this.authorization == 'user') {

      // Checks if user picked wanted pickup details & car, if not send him back to home page
      if (this.receivedChosenLocation == "Error" || this.receivedChosenVehicleType == "Error") {

        this.toastr.error("You have to choose location/ pick-up date/ drop-off date or a vehicle");
        this.route.navigate(['/home']);
      }
      else {

        this.newRes.RentDate = this.receivedChosenLocation.pickupChosen;
        this.newRes.ReturnDate = this.receivedChosenLocation.dropoffChosen;
        this.newRes.VehicleAreaID = this.recievedChosenVehicleArea.VehicleAreaID;
        this.newRes.UserID = Number(sessionStorage.getItem('UserID')); // checking which user made the reservation
        this.recievedChosenVehicleArea.IsAvailable = 'No'; // removing vehicle area from vehicle component by changing his IsAvailable property.
        delete this.recievedChosenVehicleArea.Details;

        this.vehicleAreaService.editVehicleAreaAsync(this.recievedChosenVehicleArea).subscribe(vehicle => {

        });

        // posting new reservation into db
        this.rentService.postNewVehicleRentAreaAsync(this.newRes).subscribe(rentReturned => {

          if (rentReturned) {

            this.toastr.success('You have rented successfuly one of our vehicles!');

            setTimeout(() => {
              this.route.navigate(['/home']);
            }, 1500);
          }
        });


      }

    } else {
      this.toastr.error('You must log in first')

      setTimeout(() => {
        this.route.navigate(['/registration'])
      }, 1500);
      
    }




  }




}
