import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { LayoutComponent } from './Components/layout/layout.component';
import { FooterComponent } from './Components/footer/footer.component';
import { HomeComponent } from './Components/home/home.component';
import { HeaderComponent } from './Components/header/header.component';
import { VehiclesComponent } from './Components/vehicles/vehicles.component';
import { ContactUsComponent } from './Components/contact-us/contact-us.component';
import { AboutComponent } from './Components/about/about.component';
import { Page404Component } from './Components/page404/page404.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { RentalCarFilterPipe } from './Pipes/rental-car-filter.pipe';
import { BookingComponent } from './Components/booking/booking.component';
import { AdminLayoutComponent } from './Components/admin-layout/admin-layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { MatTabsModule } from '@angular/material/tabs';
import { RegistrationComponent } from './Components/registration/registration.component';
import { EmployeeComponent } from './Components/employee/employee.component';
import { UserAreaComponent } from './Components/user-area/user-area.component';




@NgModule({
  declarations: [
    LayoutComponent,
    FooterComponent,
    HomeComponent,
    HeaderComponent,
    VehiclesComponent,
    ContactUsComponent,
    AboutComponent,
    Page404Component,
    RentalCarFilterPipe,
    BookingComponent,
    AdminLayoutComponent,
    RegistrationComponent,
    EmployeeComponent,
    UserAreaComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatTabsModule,
  ],

  providers: [],
  bootstrap: [LayoutComponent]
})

export class AppModule { }
