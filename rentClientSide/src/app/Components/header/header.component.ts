import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public authorization: string; // used to set the available window for the logged in user if its admin/user/employee

  constructor() { }

  ngOnInit() {

    // checks if the logged in user if its admin/user/employee
    var authorization = sessionStorage.getItem('auth');
    if (authorization == 'admin') {
      this.authorization = 'admin'
    }

    if (authorization == 'employee') {
      this.authorization = 'employee'
    }

    if (authorization == 'user') {
      this.authorization = 'user'
    }



  }

  // clearing session storage & refreshing the component so login button will apear.
  public logOut() {

    sessionStorage.clear();
    location = location;

  }

}
