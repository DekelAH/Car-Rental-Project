import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Branch } from '../Models/branch.model';

// For put and post functions
const headers = new HttpHeaders().set('content-type', 'application/json').set('Access-Control-Allow-Origin', '*');

@Injectable({

  providedIn: 'root'
})

export class BranchService {

  // announcing httpclient module
  constructor(private httpClient: HttpClient) { }

  // Get all branches from db
  public getAllBranchesAsync(): Observable<Branch[]> {

    return this.httpClient.get<Branch[]>("http://localhost:61264/AllBranches");
  }

  // Posting new branch at db
  public postNewBranchAsync(newBranch: Branch): Observable<Branch> {

    return this.httpClient.post<Branch>("http://localhost:61264/PostBranch", newBranch, { headers: headers });
  }

  // Editing existing branch by send it the edited one to db
  public editBranchAsync(editBranch: Branch): Observable<Branch> {

    return this.httpClient.put<Branch>("http://localhost:61264/EditBranch", editBranch, { headers: headers });
  }

  // Delete branch by id at db
  public delBranchByIDAsync(id: number): Observable<Branch> {

    return this.httpClient.delete<Branch>("http://localhost:61264/DeleteBranch?branchID=" + id);
  }

}
