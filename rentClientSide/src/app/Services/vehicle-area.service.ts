import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VehicleArea } from '../Models/vehicleArea.model';

// For put and post functions
const headers = new HttpHeaders().set('content-type', 'application/json').set('Access-Control-Allow-Origin', '*');

@Injectable({

  providedIn: 'root'
})

export class VehicleAreaService {


  // announcing httpclient module
  constructor(public httpClient: HttpClient) { }


  // Getting all vehicle area from db
  public getAllVehicleAreaAsync(): Observable<VehicleArea[]> {

    return this.httpClient.get<VehicleArea[]>("http://localhost:61264/AllVehicleArea");
  }

  // Posting new vehicle area at db
  public postNewVehicleAreaAsync(newVehicleArea: VehicleArea): Observable<VehicleArea> {

    return this.httpClient.post<VehicleArea>("http://localhost:61264/PostVehicleArea", newVehicleArea, { headers: headers });
  }

  // Editing vehicle area by sending the edited one
  public editVehicleAreaAsync(editVehicleArea: VehicleArea): Observable<VehicleArea> {

    return this.httpClient.put<VehicleArea>("http://localhost:61264/EditVehicleArea", editVehicleArea, { headers: headers });
  }

  // Delete vehicle area by id at db
  public delVehicleAreaByID(id: number): Observable<VehicleArea> {

    return this.httpClient.delete<VehicleArea>("http://localhost:61264/DeleteVehicleArea?vehicleAreaID=" + id);
  }

}
