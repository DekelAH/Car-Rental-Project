import { Injectable } from '@angular/core';
import { User } from '../Models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// For put and post functions
const headers = new HttpHeaders().set('content-type', 'application/json').set('Access-Control-Allow-Origin', '*');

@Injectable({

  providedIn: 'root'
})

export class UserService {

  // announcing httpclient module
  constructor(private httpClient: HttpClient) { }

  // get all users from db
  public getAllUsersAsync(): Observable<User[]> {

    return this.httpClient.get<User[]>("http://localhost:61264/AllUsers");
  }

  // get user by id from db
  public getUsersByIDAsync(userID: number): Observable<User[]> {

    return this.httpClient.get<User[]>("http://localhost:61264/UserByID?id=" + userID);
  }

  // post new user to db
  public postNewUserAsync(newUser: User): Observable<User> {

    return this.httpClient.post<User>("http://localhost:61264/PostUser", newUser, { headers: headers });
  }

  // receiving edited user and sending him to db
  public editUserAsync(editUser: User): Observable<User> {

    return this.httpClient.put<User>("http://localhost:61264/EditUser", editUser, { headers: headers });
  }

  // delete user by id in db
  public delUserByIDAsync(id: number): Observable<User> {

    return this.httpClient.delete<User>("http://localhost:61264/DelUser?userID=" + id);
  }

  // getting user by email & password
  public getUserByEmailAndPassword(email: string, password: string): Observable<User> {

    return this.httpClient.get<User>("http://localhost:61264/CheckUser?receivedEmail=" + email + "&&receivedPassword=" + password);
  }
}
