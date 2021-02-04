import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BranchService } from 'src/app/Services/branch.service';
import { Branch } from 'src/app/Models/branch.model';
import { DataTransferService } from 'src/app/Services/data-transfer.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  public allBranches: Branch[]; // all branches array
  public pickUpLocation: string = ""; // pick up location property, choosed by user (ngModel)
  public pickUpDate: Date; // pick up date property, choosed by user (ngModel)
  public dropOffDate: Date; // drop off property, choosed by user (ngModel)



  constructor(private toastSrv: ToastrService, private branchService: BranchService, private data: DataTransferService, private route: Router) { }

  ngOnInit() {

    this.GetAllBranches();
   
  }


  // validation for user choices - once good, navigate to vehicle component and send the data to booking component.
  public sendInfoToBooking(locationChosen: any, pickupChosen: any, dropoffChosen: any): void {

    if (locationChosen == "" || pickupChosen == undefined || dropoffChosen == undefined) {

      this.toastSrv.error("Please choose pick up location/ pick-up date/ drop-off date");

    } else {
      if (Date.parse(dropoffChosen) < Date.parse(pickupChosen)) {

        this.toastSrv.error("Pick-Up date is greater than Drop-Off date, choose wisely.");

      } else {

        this.route.navigate(['/vehicles']);

        var gettingRentInfo = {

          locationChosen,
          pickupChosen,
          dropoffChosen
        }
        this.data.updatePickUpInfoData(gettingRentInfo);
      }
    }
  }

  // Get all branches for locations
  public GetAllBranches(): void {

    this.branchService.getAllBranchesAsync().subscribe(branch => {

      this.allBranches = branch
    }, err => {
      alert("Error: " + err.message);

    });
  }





}






