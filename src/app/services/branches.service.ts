import { Injectable } from '@angular/core';
import { Branch } from '../models/branch.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

const apiUrl = 'https://mcdonalds-live-engage-api-stage-1.azurewebsites.net/stores.json';

@Injectable({
  providedIn: 'root'
})
export class BranchesService {

  constructor(private http: HttpClient) { }

  public getAllBranches(): Observable<Branch[]> {
    return this.http.get<Branch[]>(apiUrl);
  }
}