import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/employee';
import { DataSharingService } from '../services/data-sharing.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { Router, Scroll } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-employee-details-container',
  templateUrl: './employee-details-container.component.html',
  styleUrls: ['./employee-details-container.component.scss'],
})
export class EmployeeDetailsContainerComponent implements OnInit, OnDestroy {
  employees: Employee[] = []; // Property to hold the employee data
  emp?: Employee;
  noEmployeesMessage: string = 'No employees to display'; // Message to display when employees array is empty
  isAddMode?: boolean;
  isEditMode?: boolean;
  private routerSubscription: Subscription = new Subscription();

  constructor(
    private employeeService: EmployeeService,
    private dataShareService: DataSharingService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    // Fetch the initial employee data
    this.getEmployees();

    // Subscribe to employeeAdded$ event to update the list when a new employee is added
    this.employeeService.employeeAdded$.subscribe(() => {
      this.getEmployees();
    });

    // Subscribe to employeeUpdated$ event to update the list when an employee is updated
    this.employeeService.employeeUpdated$.subscribe(() => {
      this.getEmployees();
    });

    // Subscribe to the filtered employee data changes
    this.dataShareService.FilteredData$.subscribe((filteredData) => {
      this.employees = filteredData;
    });
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof Scroll) {
        const url = event.routerEvent.urlAfterRedirects;
        const parts = url.split('/');
        const id = parts[parts.length - 1];
        if (url.includes('/employees/edit/')) {
          // Retrieve the employee details based on the ID from the URL
          if (this.emp) {
            this.onClickOpenModal(this.emp);
          } else {
            this.employeeService.getEmployees().subscribe((res: any) => {
              this.employees = res.data;
              this.emp = this.employees.find((emp: Employee) => emp.id === id);
              if (this.emp) {
                this.onClickOpenModal(this.emp);
              }
            });
          }
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }
  // Open the modal dialog in edit mode
  onClickOpenModal(empData: Employee) {
    this.isAddMode = false;
    this.isEditMode = true;
    // Open the modal dialog and pass the necessary data
    this.dialog.open(ModalComponent, {
      data: {
        isAddMode: this.isAddMode,
        empData: empData,
        isEditMode: this.isEditMode,
      },
    });
  }

  // Fetch the employee data
  getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (res: any) => {
        this.employees = res.data;
      },
      (error: any) => {
        this.dataShareService.openSnackBar(error);
      }
    );
  }
}
