import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { Employee } from '../models/employee';


@Injectable({
  providedIn: 'root'
})
export class FilterService {
   apiUrl= "https://localhost:7011/api";
  constructor(private http: HttpClient) { }
   filterEmployees(criteria: any): Observable<any> {
    const url = `${this.apiUrl}/EmployeeFilter`; // Replace 'EmployeeFilter' with your Web API endpoint for filtering
    return this.http.post<Employee[]>(url, criteria);
  }
  getEmployeeCounts():Observable<any>{
    const url = `${this.apiUrl}/EmployeeFilter/count`;
    return this.http.get<any>(url);
  }
}
