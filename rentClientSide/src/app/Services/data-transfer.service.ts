import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {

  // this service is created to transfer data between home(to send location & dates info) component to booking component.

  // Creating private property as dataTrader and implementing to him behavior subject to transfer
  // data between independent components.
  private dataTrader = new BehaviorSubject<any>("Error");

  // Signing into carAreaDataShare - dataTrader as observable so receiving component can subscribe to him.
  public pickUpDataShare = this.dataTrader.asObservable();


  constructor() { }

  // this function is used to delivered the data from the sender component to receiving component
  // that subscribe to him.
  public updatePickUpInfoData(pickUpData: any): void {

    this.dataTrader.next(pickUpData);
  }


}
