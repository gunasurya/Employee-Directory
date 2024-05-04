import { Component, OnInit,OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { EmployeeService } from '../services/employee.service';
import { Employee, FilterOption } from '../models/employee';
import { DataSharingService } from '../services/data-sharing.service';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main-section',
  templateUrl: './main-section.component.html',
  styleUrls: ['./main-section.component.scss'],
})
export class MainSectionComponent implements OnInit,OnDestroy{
  chars: string[] = [];
  isAddMode = true;
  selectedChar?: string;
  selectedFilter!: FilterOption;
  paginationFilteredEmpData: Employee[] = [];
  searchFilteredEmpData: Employee[] = [];
  isEditMode?: boolean;
  filterOptions: string[] = [];
  employees!: Employee[];
  private routerSubscription!: Subscription;


  constructor(
    public dialog: MatDialog,
    private employeeService: EmployeeService,
    private dataShareService: DataSharingService,
    public router: Router
  ) {
    // Generate an array of character codes from A to Z
    for (let charCode = 65; charCode <= 90; charCode++) {
      this.chars.push(String.fromCharCode(charCode));
    }
  }

  ngOnInit(): void {
    this.filterOptions = Object.values(FilterOption);
    // Trigerring the Add Employee button from url to add employee details.
    this.routerSubscription =  this.router.events.subscribe((event) => {
      console.log("main",event)
      console.log("main",event instanceof NavigationEnd)
      if (event instanceof NavigationEnd) {
        const url = event.urlAfterRedirects;
        if (url === '/employees/add') {
          this.onClickOpenModal();
        }
      }
    });
  }
 
  ngOnDestroy(): void {
    // Unsubscribe from the router events to avoid memory leaks
    this.routerSubscription.unsubscribe();
  }
  // Filter employees based on search input
  filterEmployeeBySearch(char: string) {
    if (this.selectedFilter) {
      this.employeeService.getEmployees().subscribe((res:any) => {
        this.employees = res.data
        this.searchFilteredEmpData = this.employees.filter((emp:Employee) => {
          return (emp[this.selectedFilter as keyof Employee] as string)
            .toLowerCase()
            .includes(char.toLowerCase());
        });
        this.dataShareService.updateFilteredData(this.searchFilteredEmpData);
      });
    }
  }

  // Handle the selection of a filter option
  selectedEvent(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.selectedFilter = selectedValue as FilterOption;
  }

  // Filter employees by name initial alphabet
  filterEmployeeByName(value: string | number) {
    if (typeof value == 'number') {
      this.selectedChar = undefined;
      // Retrieve all employees
          this.employeeService.getEmployees().subscribe(
      (res:any) => {
        this.employees = res.data;
        this.paginationFilteredEmpData = this.employees;
        this.dataShareService.updateFilteredData(
          this.paginationFilteredEmpData
        );
      }
    );
   
    } else {
      this.selectedChar = this.selectedChar === value ? undefined : value;
      const clickedAlphabet = value;
      this.employeeService.getEmployees().subscribe((res:any) => {
        this.employees = res.data;
        this.paginationFilteredEmpData = this.employees.filter((emp) => {
          if (
            this.selectedChar === undefined ||
            emp.firstName.charAt(0).toUpperCase() === clickedAlphabet
          ) {
            return true;
          }
          return undefined;
        });
        // Update filtered employee data for sharing
        this.dataShareService.updateFilteredData(
          this.paginationFilteredEmpData
        );
      });
    }
  }

  // Clear search input
  clearInput(inputEl: HTMLInputElement) {
    inputEl.value = '';
    this.filterEmployeeBySearch('');
  }


  // Open the modal dialog for adding a new employee
  onClickOpenModal() {
    this.isAddMode = true;
    this.dialog.open(ModalComponent, {
      data: { isAddMode: this.isAddMode },
    });
  }
}
