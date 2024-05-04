import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Employee } from '../models/employee';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class DataSharingService {
  constructor(private _snackBar: MatSnackBar) {}

  private FilteredSource = new BehaviorSubject<Employee[]>([]);

  FilteredData$ = this.FilteredSource.asObservable(); // Observable for subscribing to paginated filtered data updates

  /**
   * Updates the paginated filtered data with the provided array of employees.
   * @param data The updated array of employees.
   */
  updateFilteredData(data: Employee[]) {
    this.FilteredSource.next(data);
  }

  /**
   * Displays a snackbar with the specified message and action.
   * @param message The message to be displayed in the snackbar.
   * @param action The action text to be displayed in the snackbar (default: 'ok').
   */
  openSnackBar(message: string, action: string = 'ok') {
    this._snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'top',
    });
  }
}
