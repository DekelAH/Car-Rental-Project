import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { VehiclesComponent } from './Components/vehicles/vehicles.component';
import { ContactUsComponent } from './Components/contact-us/contact-us.component';
import { AboutComponent } from './Components/about/about.component';
import { Page404Component } from './Components/page404/page404.component';
import { BookingComponent } from './Components/booking/booking.component';
import { AdminLayoutComponent } from './Components/admin-layout/admin-layout.component';
import { RegistrationComponent } from './Components/registration/registration.component';
import { EmployeeComponent } from './Components/employee/employee.component';
import { UserAreaComponent } from './Components/user-area/user-area.component';



const routes: Routes = [

  { path: "home", component: HomeComponent },
  { path: "vehicles", component: VehiclesComponent },
  { path: "contactUs", component: ContactUsComponent },
  { path: "about", component: AboutComponent },
  { path: "booking", component: BookingComponent },
  { path: "adminPanel", component: AdminLayoutComponent },
  { path: "employeePanel", component: EmployeeComponent },
  { path: "userPanel", component: UserAreaComponent },
  { path: "registration", component: RegistrationComponent },
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "**", component: Page404Component },

];




@NgModule({
  
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
