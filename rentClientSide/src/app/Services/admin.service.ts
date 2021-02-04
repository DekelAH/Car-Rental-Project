import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Admin } from '../Models/admin.model';

// For put and post functions
const headers = new HttpHeaders().set('content-type', 'application/json').set('Access-Control-Allow-Origin', '*');

@Injectable({

  providedIn: 'root'
})

export class AdminService {

  // announcing httpclient module
  constructor(private httpClient: HttpClient) { }

  // Get all admins from db
  public getAllAdminsAsync(): Observable<Admin[]> {

    return this.httpClient.get<Admin[]>("http://localhost:61264/AllAdmins");
  }

  // Posting new admin at db
  public postNewAdminAsync(newAdmin: Admin): Observable<Admin> {

    return this.httpClient.post<Admin>("http://localhost:61264/PostAdmin", newAdmin, { headers: headers });
  }

  // Editing existing admin by send it the edited one to db
  public editAdminAsync(editAdmin: Admin): Observable<Admin> {

    return this.httpClient.put<Admin>("http://localhost:61264/EditAdmin", editAdmin, { headers: headers });
  }

  // Delete admin by id at db
  public delAdminByIDAsync(id: number): Observable<Admin> {

    return this.httpClient.delete<Admin>("http://localhost:61264/DelAdmin?adminID=" + id);
  }

  // Get admin by email & password for registration component
  public getAdminByEmailAndPassword(email: string, password: string): Observable<Admin> {

    return this.httpClient.get<Admin>("http://localhost:61264/CheckAdmin?receivedEmail=" + email + "&&receivedPassword=" + password);
  }
}
