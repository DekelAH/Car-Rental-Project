import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarRentInfoService {

  // this service is created to transfer data between vehicle(to send vehicle area info) component to booking component.

  // Creating private property as dataTrader and implementing to him behavior subject to transfer
  // data between independent components.
  private dataTrader = new BehaviorSubject<any>("Error");

  // Signing into carAreaDataShare - dataTrader as observable so receiving component can subscribe to him.
  public carDataShare = this.dataTrader.asObservable();

  constructor() { }

  // this function is used to delivered the data from the sender component to receiving component
  // that subscribe to him.
  public updateCarData(carData: any): void {

    this.dataTrader.next(carData);

  }
}
