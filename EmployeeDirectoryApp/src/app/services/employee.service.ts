import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../models/employee';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  baseUrl = 'https://localhost:7011/api/Employee';

  private employeeAddedSource = new Subject<void>(); // Subject for employee added events
  private employeeUpdatedSource = new Subject<void>(); // Subject for employee updated events

  employeeAdded$ = this.employeeAddedSource.asObservable(); // Observable for subscribing to employee added events
  employeeUpdated$ = this.employeeUpdatedSource.asObservable(); // Observable for subscribing to employee updated events

  constructor(private http: HttpClient) {}

  /**
   * Retrieves a list of employees from the server.
   * @returns Observable<Employee[]> An array of Employee objects.
   */
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.baseUrl).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle the error here, you can log, show an error message, or perform any other action
        console.error('Error fetching employees:',error);
        const errorMessage = 'Error fetching employees';
        return throwError(errorMessage);
      })
    );
  }

  addEmployee(employee: Employee): Observable<any> {
    return this.http.post<Employee>(this.baseUrl, employee).pipe(
      catchError((error: HttpErrorResponse) => {
        // Return a custom error message or the error object itself
        if(error.status === 403){
          const errorMessage = 'You are not Authorized to do this Operation.';
          return throwError(errorMessage);
        }
        const errorMessage = 'Failed to add employee. Please try again later.';
        return throwError(errorMessage);
      })
    );
  }

  updateEmployee(id: string, employee: Employee): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.put<any>(url, employee).pipe(
      catchError((error: HttpErrorResponse) => {
        if(error.status === 403){
          const errorMessage = 'You are not Authorized to do this Operation.';
          return throwError(errorMessage);
        }
        const errorMessage = 'Failed to update employee. Please try again later.';
        return throwError(errorMessage);
      })
    );
  }

  // /**
  //  * Deletes an employee from the server.
  //  * @param id The ID of the employee to be deleted.
  //  * @returns Observable<any> The response from the server.
  //  */
  // deleteEmployee(id: number): Observable<any> {
  //   const url = `${this.baseUrl}/${id}`;
  //   return this.http.delete(url);
  // }
  
  /**
   * Notifies subscribers when an employee is added.
   */
  notifyEmployeeAdded() {
    this.employeeAddedSource.next();
  }

  /**
   * Notifies subscribers when an employee is updated.
   */
  notifyEmployeeUpdated() {
    this.employeeUpdatedSource.next();
  }
}
