import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { VehicleRentArea } from '../Models/vehicleRentArea.model';
import { Observable } from 'rxjs';

// For put and post functions
const headers = new HttpHeaders().set('content-type', 'application/json').set('Access-Control-Allow-Origin', '*');

@Injectable({

  providedIn: 'root'
})

export class VehicleRentAreaService {

  // declairing httpclient property for his methods
  constructor(private httpClient: HttpClient) { }

  // gets all vehicle rent area from db
  public getAllVehicleRentAreaAsync(): Observable<VehicleRentArea[]> {

    return this.httpClient.get<VehicleRentArea[]>("http://localhost:61264/AllVehicleRentArea");
  }

  // posting new rent and updating db
  public postNewVehicleRentAreaAsync(newVehicleRentArea: VehicleRentArea): Observable<VehicleRentArea> {

    return this.httpClient.post<VehicleRentArea>("http://localhost:61264/PostVehicleRentArea", newVehicleRentArea, { headers: headers });
  }

  // edit rent and updating db
  public editVehicleRentAreaAsync(editVehicleRentArea: VehicleRentArea): Observable<VehicleRentArea> {

    return this.httpClient.put<VehicleRentArea>("http://localhost:61264/EditVehicleRentArea", editVehicleRentArea, { headers: headers });
  }

  // delete rent and updating db
  public delVehicleRentAreaByID(id: number): Observable<VehicleRentArea> {

    return this.httpClient.delete<VehicleRentArea>("http://localhost:61264/DeleteVehicleRentArea?rentAreaID=" + id);
  }

}
