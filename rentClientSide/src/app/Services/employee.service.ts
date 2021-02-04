import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../Models/employee.model';

// For put and post functions
const headers = new HttpHeaders().set('content-type', 'application/json').set('Access-Control-Allow-Origin', '*');

@Injectable({

  providedIn: 'root'
})

export class EmployeeService {

  // announcing httpclient module
  constructor(private httpClient: HttpClient) { }

  // Get all employees from db
  public getAllEmployeesAsync(): Observable<Employee[]> {

    return this.httpClient.get<Employee[]>("http://localhost:61264/AllEmployees");
  }

  // Posting new employee at db
  public postNewEmployeeAsync(newEmployee: Employee): Observable<Employee> {

    return this.httpClient.post<Employee>("http://localhost:61264/PostEmployee", newEmployee, { headers: headers });
  }

  // Editing existing employee by send it the edited one to db
  public editEmployeeAsync(editEmployee: Employee): Observable<Employee> {

    return this.httpClient.put<Employee>("http://localhost:61264/EditEmployee", editEmployee, { headers: headers });
  }

  // Delete employee by id at db
  public delEmployeeByIDAsync(id: number): Observable<Employee> {

    return this.httpClient.delete<Employee>("http://localhost:61264/DelEmployee?employeeID=" + id);
  }

  // Get employee by email & password for registration component
  public getEmployeeByEmailAndPassword(email: string, password: string): Observable<Employee> {

    return this.httpClient.get<Employee>("http://localhost:61264/CheckEmployee?receivedEmail=" + email + "&&receivedPassword=" + password);
  }
}
