import { Component, OnInit } from '@angular/core';
import { VehicleService } from 'src/app/Services/vehicle.service';
import { Vehicle } from 'src/app/Models/vehicle.model';
import { VehicleAreaService } from 'src/app/Services/vehicle-area.service';
import { CarRentInfoService } from 'src/app/Services/car-rent-info.service';
import { Router } from '@angular/router';
import { CarAreaService } from 'src/app/Services/car-area.service';

@Component({

  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})

export class VehiclesComponent implements OnInit {

  public allVehicleArea: any[]; // all vehicle area array
  public allVehicleTypes: Vehicle[]; // all vehicle types array
  public allVehicleTypesCopy: Vehicle[]; // copy all vehicle types array to use it for in other methods without losing the main vehicle types
  public allModels: any[]; // summons all the models of the vehicle type for search filter
  public allManufacturers: string[]; // summons all the manufacturers of the vehicle type for search filter
  public allYears: any[]; // summons all the years of the vehicle type for search filter
  public manuPicker: any = null; // ngModel property for filter
  public modelFilter: any = null; // ngModel property for filter
  public yearPicker: any = null; // ngModel property for filter
  public gearPicker: any = null; // ngModel property for filter
  public searchName: string; // property for filter with rental car pipe
  public sessionToSave: any;
  public sessionToShow: any[] = []
  // public VehicleTypeStorage: any[] = [];

  constructor(private vehicleService: VehicleService, private vehicleAreaService: VehicleAreaService, private carRentInfo: CarRentInfoService,
    private carAreaInfo: CarAreaService, private route: Router) { }


  public async ngOnInit() {

    this.sessionToSave = localStorage.getItem('VehicleTypeID')
    this.GetAllVehicleTypes(); // summons all vehicle types, using vehicle service
    this.GetAllVehicleArea(); // summons all vehicle areas, using vehicle area service
    this.GetAllManufacturers(); // summons all manufacturer, using vehicle service
    this.GetAllModels(); // summons all models, using vehicle service
    this.GetAllYears(); // summons all years, using vehicle service

    setTimeout(() => {
      this.showVehiclesFromSession()
    }, 5000);

  }

  // get array of all vehicle area
  public GetAllVehicleArea(): void {

    // using vehicle area service to get all vehicle area array
    this.vehicleAreaService.getAllVehicleAreaAsync().subscribe(vehicleArea => {

      // getting all vehicle areas with IsAvailabale property equals to NO to remove it from the array 
      this.allVehicleArea = vehicleArea.filter(v => v.IsAvailable.trim() != 'No');
      var tempArr = []; // temp array

      for (let i = 0; i < this.allVehicleArea.length; i++) {

        for (let j = 0; j < this.allVehicleTypes.length; j++) {
          // pusing vehicle type properties in to vehicle area array by vehicle type id, to display at vehicle component vehicle areas + their types (Details)
          if (this.allVehicleArea[i].VehicleTypeID == this.allVehicleTypes[j].VehicleTypeID) {

            tempArr.push(this.allVehicleTypes[j]);
            this.allVehicleArea[i].Details = tempArr;
            tempArr = [];
          }
        }
      }

    }, err => {

      alert("Error: " + err.message);
    });
  }

  // summons all vehicle types with vehicle service
  public GetAllVehicleTypes(): void {

    // subscribing to vehicle service
    this.vehicleService.getAllVehicleTypeAsync().subscribe(vehicles => {

      var tempArr = [] // temp array
      this.allVehicleTypesCopy = vehicles; // getting result into vehicle type array copy
      this.allVehicleTypes = vehicles; // getting result into vehicle type array

      // if vehicle area array is empty it summons all vehicle areas (refreshing)
      if (this.allVehicleArea.length == 0) {
        this.GetAllVehicleArea();
      } else { // pusing vehicle type properties in to vehicle area array by vehicle type id, to display at vehicle component vehicle areas + their types (Details)
        for (let i = 0; i < this.allVehicleArea.length; i++) {

          for (let j = 0; j < this.allVehicleTypes.length; j++) {

            if (this.allVehicleArea[i].VehicleTypeID == this.allVehicleTypes[j].VehicleTypeID) {

              tempArr.push(this.allVehicleTypes[j]);
              this.allVehicleArea[i].Details = tempArr;
              tempArr = [];
            }
          }
        }
      }
    }, err => {

      alert("Error: " + err.message);
    });
  }

  // summons all vehicle types manufacturers using vehicle service to use it as filter at vehicle component
  public GetAllManufacturers(): void {

    this.vehicleService.getAllManufacturersAsync().subscribe(manu => {

      this.allManufacturers = manu;
    }, err => {

      alert("Error: " + err.message);
    });
  }

  // summons all vehicle types models using vehicle service to use it as filter at vehicle component
  public GetAllModels(): void {

    this.vehicleService.getAllModelsAsync().subscribe(model => {

      this.allModels = model;
    }, err => {

      alert("Error: " + err.message);
    });
  }

  // summons all vehicle types years using vehicle service to use it as filter at vehicle component
  public GetAllYears(): void {

    this.vehicleService.getAllYearsAsync().subscribe(year => {

      this.allYears = year;
    }, err => {

      alert("Error: " + err.message);
    });
  }


  // this function creates the the filter and displaying the right vehicle area & type +
  // pusing vehicle type properties in to vehicle area array by vehicle type id, to display at vehicle component vehicle areas + their types (Details)
  public modelPicker(event: any, type: any): void {

    var tempArr = []
    for (let i = 0; i < this.allVehicleArea.length; i++) {

      for (let j = 0; j < this.allVehicleTypes.length; j++) {

        if (this.allVehicleArea[i].VehicleTypeID == this.allVehicleTypes[j].VehicleTypeID) {

          tempArr.push(this.allVehicleTypes[j]);
          this.allVehicleArea[i].Details = tempArr;
          tempArr = [];
        }
      }
    }

    // switch case that filters the select - option at vehicle component and gets the specific vehicle area + type
    switch (type) {
      case 'manufacturer':

        for (let i = 0; i < this.allVehicleArea.length; i++) {

          for (let j = 0; j < this.allVehicleArea[i].Details.length; j++) {

            this.allVehicleArea[i].Details = this.allVehicleArea[i].Details.filter(v => v.Manufacturer == event);
          }
        }
        break;
      case 'model':
        for (let i = 0; i < this.allVehicleArea.length; i++) {

          for (let j = 0; j < this.allVehicleArea[i].Details.length; j++) {

            this.allVehicleArea[i].Details = this.allVehicleArea[i].Details.filter(v => v.Model == event);
          }
        }
        break;
      case 'year':
        for (let i = 0; i < this.allVehicleArea.length; i++) {

          for (let j = 0; j < this.allVehicleArea[i].Details.length; j++) {

            this.allVehicleArea[i].Details = this.allVehicleArea[i].Details.filter(v => v.ModelYear == event);
          }
        }
        break;
      case 'gear':
        for (let i = 0; i < this.allVehicleArea.length; i++) {

          for (let j = 0; j < this.allVehicleArea[i].Details.length; j++) {

            this.allVehicleArea[i].Details = this.allVehicleArea[i].Details.filter(v => v.Gear.trim() == event);
          }
        }
        break;

      default: this.allVehicleArea;
    }
  }


  // show on page all vehicles types from local storage
  public showVehiclesFromSession() {

    this.sessionToSave = localStorage.getItem('VehicleTypeID'); // getting vehicle type id from local storage
    var tempArr = this.sessionToSave.split(','); // splits the string items & adding , between them for the following array
    var newArrToShow = [...new Set(tempArr)] // margin duplicated items

    for (let i = 0; i < newArrToShow.length; i++) {
      for (let j = 0; j < this.allVehicleTypes.length; j++) {

        if (Number(newArrToShow[i]) == this.allVehicleTypes[j].VehicleTypeID) {

          this.sessionToShow.push(this.allVehicleTypes[j]); // pushing vehicle type into sessionToShow array
        }
      }
    }
  }

  // refresh function for all filter tabs (select tabs + free search input)
  public refreshFunc(event: any): void {

    this.manuPicker = null;
    this.gearPicker = null;
    this.modelFilter = null;
    this.yearPicker = null;
    this.searchName = "";

    var tempArr = []
    for (let i = 0; i < this.allVehicleArea.length; i++) {

      for (let j = 0; j < this.allVehicleTypes.length; j++) {

        if (this.allVehicleArea[i].VehicleTypeID == this.allVehicleTypes[j].VehicleTypeID) {

          tempArr.push(this.allVehicleTypes[j]);
          this.allVehicleArea[i].Details = tempArr;
          tempArr = [];
        }
      }
    }

  }

  // sends the details about the chosen vehicle type + area to booking component,
  // by using the car area service + car rent info service methods.
  public sendToBooking(vehicleChosen: any, vehicleAreaChosen: any): void {

    if (this.sessionToSave != undefined) {
      localStorage.setItem('VehicleTypeID', this.sessionToSave + ',' + JSON.stringify(vehicleChosen.VehicleTypeID))
    } else {
      localStorage.setItem('VehicleTypeID', JSON.stringify(vehicleChosen.VehicleTypeID))
    }

    this.carRentInfo.updateCarData(vehicleChosen);

    this.carAreaInfo.updateCarAreaData(vehicleAreaChosen);
    this.route.navigate(['/booking']); // navigate to booking component.
  }

}
