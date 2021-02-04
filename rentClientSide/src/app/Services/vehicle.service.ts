import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vehicle } from '../Models/vehicle.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// For put and post functions
const headers = new HttpHeaders().set('content-type', 'application/json').set('Access-Control-Allow-Origin', '*');

@Injectable({

  providedIn: 'root'
})

export class VehicleService {

  constructor(public httpClient: HttpClient) { }

  // get all vehicle types function
  public getAllVehicleTypeAsync(): Observable<Vehicle[]> {

    return this.httpClient.get<Vehicle[]>("http://localhost:61264/AllVehicleTypes");
  }

  // get all vehicle types manufacturers function
  public getAllManufacturersAsync(): Observable<string[]> {

    return this.httpClient.get<string[]>("http://localhost:61264/AllManufacturers");
  }

  // get all vehicle types models function
  public getAllModelsAsync(): Observable<string[]> {

    return this.httpClient.get<string[]>("http://localhost:61264/AllModels");
  }

  // get all vehicle types years function
  public getAllYearsAsync(): Observable<string[]> {

    return this.httpClient.get<string[]>("http://localhost:61264/AllYears");
  }

  // del vehicle type by id function
  public delVehicleTypeByID(id: number): Observable<Vehicle> {

    return this.httpClient.delete<Vehicle>("http://localhost:61264/DelVehicleType?vehicleID=" + id);
  }

  // edit vehicle type function that get vehicle object and sends him to server side for update
  public editVehicleType(vehicle: Vehicle): Observable<Vehicle> {

    return this.httpClient.put("http://localhost:61264/EditVehicleType", vehicle, { headers: headers });
  }

  // posting new vehicle type object function that get new vehicle object
  public postVehicleType(newVehicle: Vehicle): Observable<Vehicle> {
    
    return this.httpClient.post("http://localhost:61264/PostVehicleType", newVehicle, { headers: headers });
  }

}
